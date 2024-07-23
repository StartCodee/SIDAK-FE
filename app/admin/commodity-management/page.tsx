
"use client";

// import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import Swal from "sweetalert2";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from 'react';


import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
// import { useState } from "react";


import CheckboxFive from "@/components/admin/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/admin/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/admin/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/admin/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/admin/Checkboxes/CheckboxTwo";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"



interface Commodity {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
interface PaginationInfo {
    current_page: number;
    from: number;
    last_page: number;
    first_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page_url: string;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}


export default function Home() {

    const [commodityData, setCommodityData] = useState<Commodity[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [commodity, setCommodity] = React.useState({
        id: 0,
        name: '',
    });



    const columns: ColumnDef<Commodity>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                    <MoreHorizontal className="h-4 w-4" />
                </div>
            ),
        },
    ];



    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tab: string): void => {
        setActiveTab(tab);
    };

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable<Commodity>({
        data: commodityData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });


    const getCommodity = async (page: number = 1, limit: number = 2) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/commodities?page=${page}&limit=${limit}`, {
                headers: {
                    'content-type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.data) {
                setCommodityData(response.data.data);
                setPaginationInfo(response.data.paginationInfo);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'error terjadi',
                    text: 'mohon coba lagi nanti.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    const createCommodity = async (e: any) => {
        e.preventDefault();
        Swal.fire({
            title: 'Loading...',
            target: document.getElementById('modal-dialog'),
            text: 'Mohon tunggu sebentar...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        var bodyFormData = new FormData();
        if (selectedFile) {
            bodyFormData.append('image', selectedFile);
        }
        bodyFormData.append('name', commodity.name);
        var res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/commodities`,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }
        )
            .then(function (response) {
                getCommodity();
                setCommodity({
                    id: 0,
                    name: '',
                })
                e.target.reset();
                Swal.close()
                const modal = document.getElementById('modal-dialog') as HTMLDialogElement;
                if (modal) {
                    modal.close();
                }
            }).catch(function (error) {
                if (error.response && error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        target: document.getElementById('modal-dialog'),

                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 10000
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        target: document.getElementById('modal-dialog'),

                        title: 'error terjadidsds',
                        text: 'mohon coba lagi nanti.',
                        showConfirmButton: false,
                        timer: 10000
                    });
                }
            })
    }

    // const editCommodity = async (id: number) => {



    //     let fr = fruitData.find((f) => f.id === id);
    //     console.log(fr)
    //     if (fr) {
    //         setCommodity({
    //             id: fr.id,
    //             name: fr.name,
    //             stock: fr.stock,
    //             price: fr.price,
    //             description: fr.description,
    //             image: fr.image,
    //             category_id: 1
    //         });
    //         showModal()
    //     }
    // }


    // const updateCommodity = async (e: any) => {


    //     e.preventDefault();
    //     Swal.fire({
    //         title: 'Loading...',
    //         target: document.getElementById('my_modal_1'),
    //         text: 'Mohon tunggu sebentar...',
    //         allowOutsideClick: false,
    //         didOpen: () => {
    //             Swal.showLoading();
    //         }
    //     });
    //     var bodyFormData = new FormData();
    //     console.log(selectedFile);

    //     if (selectedFile) {
    //         bodyFormData.append('image', selectedFile);
    //     }

    //     bodyFormData.append('name', fruit.name);
    //     bodyFormData.append('stock', fruit.stock.toString());
    //     bodyFormData.append('price', fruit.price.toString());
    //     bodyFormData.append('description', fruit.description);
    //     bodyFormData.append('category_id', fruit.category_id.toString());

    //     var res = await axios.put(
    //         `${process.env.NEXT_PUBLIC_BACKEND_HOST}/fruits/update/${fruit.id}`,
    //         {
    //             name: fruit.name,
    //             stock: fruit.stock,
    //             price: fruit.price,
    //             description: fruit.description,
    //             category_id: 1
    //         },
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`

    //             },
    //         }
    //     )
    //         .then(function (response) {
    //             getCommodityData();
    //             setCommodity({
    //                 id: 0,
    //                 name: '',
    //                 stock: 0,
    //                 price: 0,
    //                 description: '',
    //                 image: '',
    //                 category_id: 0
    //             })
    //             e.target.reset();
    //             Swal.close()

    //             // close modal
    //             const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    //             if (modal) {
    //                 modal.close();
    //             }

    //         }).catch(function (error) {
    //             if (error.response && error.response.status === 401) {
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: error.response.data.message,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 })

    //                 logout()

    //             } else {
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'error terjadi',
    //                     text: 'mohon coba lagi nanti.',
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         })
    // }

    // const deleteCommodity = async (id: number) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire({
    //                 title: 'Loading...',
    //                 text: 'Mohon tunggu sebentar...',
    //                 allowOutsideClick: false,
    //                 didOpen: () => {
    //                     Swal.showLoading();
    //                 }
    //             });

    //             try {
    //                 await axios.delete(
    //                     `${process.env.NEXT_PUBLIC_BACKEND_HOST}/fruits/delete/${id}`,
    //                     {
    //                         headers: {
    //                             "Authorization": `Bearer ${localStorage.getItem('token')}`
    //                         }
    //                     }
    //                 );
    //                 await getCommodityData();
    //                 Swal.fire(
    //                     'Deleted!',
    //                     'Your fruit has been deleted.',
    //                     'success'
    //                 );
    //             } catch (error) {

    //             }
    //         }
    //     });
    // };




    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files?.[0])
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCommodity({ ...commodity, [name]: value });
    }



    useEffect(() => {
        getCommodity();
    }, []);


    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Management Komoditas" />

                <div className="col-span-3 bg-white rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                    <div className={`w-full  ${activeTab === 'profile' ? '' : 'hidden'}`}>
                        <h1 className="text-2xl font-bold">Management Komoditas</h1>
                        <div className="flex items-center py-4">
                            <Input
                                placeholder="Filter Komoditas..."
                                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("name")?.setFilterValue(event.target.value)
                                }
                                className="max-w-sm"
                            />
                            <DropdownMenu>

                                <div className="ms-2">
                                    <Dialog >
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Tambah Komoditas</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">

                                            <form action="" method="dialog" onSubmit={(commodity.id == 0) ? createCommodity : createCommodity}>
                                                <DialogHeader>
                                                    <DialogTitle>Tambah Komoditas</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="">
                                                        <Label htmlFor="name" className="text-right mb-3">
                                                            Nama Komoditas
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            value={commodity.name}
                                                            onChange={handleInputChange}
                                                            placeholder="Jahe"
                                                            className="col-span-3 mt-1"
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <Label htmlFor="name" className="text-right mb-3">
                                                            Nama Komoditas
                                                        </Label>
                                                        <Input
                                                            type="file" onChange={handleFileSelect}
                                                            id="name"
                                                            placeholder="Jahe"
                                                            className="col-span-3 mt-1"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Simpan</Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                </div>
                            </DropdownMenu>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder ? null : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row, key) => (
                                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>

                                                <TableCell>
                                                    {key + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {row.original.name}
                                                </TableCell>

                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                No results.
                                            </TableCell>
                                        </TableRow>)}
                                </TableBody>

                            </Table>
                        </div>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                {table.getFilteredRowModel().rows.length} row(s) selected.
                            </div>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
