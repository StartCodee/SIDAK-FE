
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
import { AuthHeader } from '@/lib/authHeader';


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



interface Kabupaten {
    id: number;
    name: string;
    code: string;
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

    const [kabupatenData, setKabupatenData] = useState<Kabupaten[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [kabupaten, setKabupaten] = React.useState({
        id: 0,
        name: '',
        code:'',
    });

    const columns: ColumnDef<Kabupaten>[] = [
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
                    <Button variant="outline" size="sm" onClick={() => editKabupaten(row.getValue())}>Edit</Button>
                    <Button variant="destructive" onClick={() => deleteKabupaten(row.getValue())} size="sm">Delete</Button>
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

    const table = useReactTable<Kabupaten>({
        data: kabupatenData,
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

    const getKabupaten = async (page: number = 1, limit: number = 2) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kabupaten`, {
                headers: AuthHeader(),
            });
            if (response.data.data) {
                setKabupatenData(response.data.data);
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

    const createKabupaten = async (e: any) => {
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

        var res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kabupaten`,
            {
                name: kabupaten.name,
                code:kabupaten.code,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }
        )
            .then(function (response) {
                getKabupaten();
                setKabupaten({
                    id: 0,
                    name: '',
                    code:'',
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

    const editKabupaten = async (id: any) => {
        let fr = kabupatenData.find((f) => f.id === id);
        if (fr) {
            setKabupaten({
                id: fr.id,
                name: fr.name,
                code:fr.code,
            })
            setIsDialogOpen(true);
        }
    }

    const updateKabupaten = async (e: any) => {
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
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kabupaten/${kabupaten.id}`,
                {
                    name: kabupaten.name,
                    code:kabupaten.code,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            getKabupaten();
            setKabupaten({
                id: 0,
                name: '',
                code:'',
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


    const deleteKabupaten = async (id: any) => {
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
                        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kabupaten/${id}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    );
                    await getKabupaten();
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
        setKabupaten({ ...kabupaten, [name]: value });
    }

    useEffect(() => {
        getKabupaten();
    }, []);

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Management Kabupaten" />
                <div className="col-span-3 bg-white rounded-lg border border-stroke  px-7 py-10 shadow-default">
                    <div className={`w-full  ${activeTab === 'profile' ? '' : 'hidden'}`}>
                        <h1 className="text-2xl font-bold">Management Kabupaten</h1>
                        <div className="flex items-center py-4">
                            <Input
                                placeholder="Filter Kabupaten..."
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
                                            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Tambah Kabupaten</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <form action="" method="dialog" onSubmit={(kabupaten.id == 0) ? createKabupaten : updateKabupaten}>
                                                <DialogHeader>
                                                    <DialogTitle>Tambah Kabupaten</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="">
                                                        <Label htmlFor="name" className="text-right mb-3">
                                                            Nama Kabupaten
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            value={kabupaten.name}
                                                            onChange={handleInputChange}
                                                            placeholder="Nama Kabupaten"
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
