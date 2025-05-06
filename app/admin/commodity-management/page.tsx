
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
import { AuthHeader } from '@/lib/authHeader';

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
            id: 'sequence',
            header: '#',
            cell: (info) => info.row.index + 1,
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
            accessorKey: 'id',
            header: ({ column }) => {
                return (
                    'Actions'
                );
            },
            cell: (row) => (
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => editCommodity(Number(row.getValue()))}>Edit</Button>
                    <Button variant="destructive" onClick={() => deleteCommodity(Number(row.getValue()))} size="sm">Delete</Button>
                </div>
            ),
        },
    ];

    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tab: string): void => {
        setActiveTab(tab);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/commodities`, {
                headers: AuthHeader(),
            });
            if (response.data.data) {
                setCommodityData(response.data.data);
                console.log(response.data.data);
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
        let bodyFormData = new FormData();
        if (selectedFile) {
            bodyFormData.append('image', selectedFile);
        }
        console.log(commodity)
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
                setIsDialogOpen(false);
            }).catch(function (error) {
                console.log(error)
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
                        title: 'error terjadi',
                        text: 'mohon coba lagi nanti.',
                        showConfirmButton: false,
                        timer: 10000
                    });
                }
            })
    }

    const editCommodity = async (id: number) => {
        let fr = commodityData.find((f) => f.id === id);
        if (fr) {
            setCommodity({
                id: fr.id,
                name: fr.name,
            })
            setIsDialogOpen(true);
        }
    }

    const updateCommodity = async (e: any) => {
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

        let bodyFormData = new FormData();
        if (selectedFile) {
            bodyFormData.append('image', selectedFile);
        }
        bodyFormData.append('name', commodity.name);

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/commodities/${commodity.id}`,
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            getCommodity();
            setCommodity({
                id: 0,
                name: '',
            });
            e.target.reset();
            Swal.close();
            setIsDialogOpen(false);
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


    const deleteCommodity = async (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Loading...',
                    text: 'Mohon tunggu sebentar...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                try {
                    await axios.delete(
                        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/commodities/${id}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    );
                    await getCommodity();
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                } catch (error) {
                }
            }
        });
    };

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
                <div className="col-span-3 bg-white rounded-lg border border-stroke px-7  py-10 shadow-default">
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
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Tambah Komoditas</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <form action="" method="dialog" onSubmit={(commodity.id == 0) ? createCommodity : updateCommodity}>
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
                                                            name="name"
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
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
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
                                // disabled={!table.getCanPreviousPage()}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                // disabled={!table.getCanNextPage()}
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
