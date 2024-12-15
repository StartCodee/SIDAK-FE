
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

import Select from 'react-select';

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
import { AuthHeader } from '@/lib/authHeader';


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



interface Pasar {
    id: number;
    name: string;
    kecamatan_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
interface kecamatan {
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

    const [pasarData, setPasarData] = useState<Pasar[]>([]);
    const [kecamatanData, setKecamatanData] = useState<any[]>([]);

    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [kecamatan, setPasar] = React.useState({
        id: 0,
        name: '',
    });

    const columns: ColumnDef<Pasar>[] = [
        {
            id: 'sequence',
            header: '#',
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'kabupaten_name',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }>
                        Nama Kabupaten
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'kecamatan_name',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }>
                        Nama Kecamatan
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
            accessorKey: 'id',
            header: ({ column }) => {
                return (
                    'Actions'
                );
            },
            cell: (row) => (
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => editPasar(row.getValue())}>Edit</Button>
                    <Button variant="destructive" onClick={() => deletePasar(row.getValue())} size="sm">Delete</Button>
                </div>
            ),
        },
    ];

    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tab: string): void => {
        setActiveTab(tab);
    };

    const getKecamatan = async (page: number = 1, limit: number = 2) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kecamatan`, {
                headers: AuthHeader(),
            });
            if (response.data.data) {
                const mappedOptions = response.data.data.map((kecamatan: { name: string, code: string }) => ({
                    value: kecamatan.code,
                    label: kecamatan.name,
                }));
                setKecamatanData(mappedOptions);
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

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedKabupaten, setSelectedKabupaten] = useState({
        value: 0,
        label: 'Select'
    });

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable<Pasar>({
        data: pasarData,
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

    const getPasar = async (page: number = 1, limit: number = 2) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/pasar`, {
                headers: AuthHeader(),
            });
            if (response.data.data) {
                setPasarData(response.data.data);
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

    const createPasar = async (e: any) => {
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
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/pasar`,
            {
                name: kecamatan.name,
                kecamatan_id: selectedKabupaten.value
            },
            {
                headers: AuthHeader(),
            }
        )
            .then(function (response) {
                getPasar();
                setPasar({
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
                        title: 'error terjadidsds',
                        text: 'mohon coba lagi nanti.',
                        showConfirmButton: false,
                        timer: 10000
                    });
                }
            })
    }

    const editPasar = async (id: any) => {
        let fr = pasarData.find((f) => f.id === id);
        if (fr) {
            setPasar({
                id: fr.id,
                name: fr.name,
            })
            console.log(fr);


            let kab = kecamatanData.find((f) => f.value == fr?.kecamatan_id);
            console.log(kecamatanData);
            setSelectedKabupaten({
                value: fr.kecamatan_id,
                label: kab.name

            })
            setIsDialogOpen(true);
        }
    }

    const updatePasar = async (e: any) => {
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
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/pasar/${kecamatan.id}`,
                {
                    name: kecamatan.name,
                    kecamatan_id: selectedKabupaten.value
                },
                {
                    headers: AuthHeader(),
                }
            );
            getPasar();
            setPasar({
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

    const deletePasar = async (id: any) => {
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
                        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/pasar/${id}`,
                        {
                            headers: AuthHeader(),
                        }
                    );
                    await getPasar();
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
        setPasar({ ...kecamatan, [name]: value });
    }

    useEffect(() => {
        getPasar();
        getKecamatan();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Management Pasar" />
                <div className="col-span-3  rounded-lg border border-stroke bg-white px-7  py-10 shadow-default">
                    <div className={`w-full  ${activeTab === 'profile' ? '' : 'hidden'}`}>
                        <h1 className="text-2xl font-bold">Management Pasar</h1>
                        <div className="flex items-center py-4">
                            <Input
                                placeholder="Filter Pasar..."
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
                                            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Tambah Pasar</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <form action="" method="dialog" onSubmit={(kecamatan.id == 0) ? createPasar : updatePasar}>
                                                <DialogHeader>
                                                    <DialogTitle>Tambah Pasar</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">

                                                    <div>
                                                        <Label htmlFor="name" className="text-right mb-3">
                                                            Nama Kecamatan
                                                        </Label>
                                                        <Select
                                                            onChange={(kecamatanData) => setSelectedKabupaten({ value: kecamatanData!.value, label: kecamatanData!.label })}
                                                            value={selectedKabupaten}
                                                            className=" basic-single w-full border-none"
                                                            options={kecamatanData}
                                                        />

                                                    </div>
                                                    <div className="">
                                                        <Label htmlFor="name" className="text-right mb-3">
                                                            Nama Pasar
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            value={kecamatan.name}
                                                            onChange={handleInputChange}
                                                            placeholder="Isi nama Pasar"
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
