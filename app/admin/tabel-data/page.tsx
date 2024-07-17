
"use client";

import * as React from "react";
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
import { useState } from "react";

import CheckboxFive from "@/components/admin/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/admin/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/admin/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/admin/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/admin/Checkboxes/CheckboxTwo";

export type Commodity = {
    commodity: string;
    dates: Record<string, number>;
};

export type CommodityNeraca = {
    commodity: string;
    dates: Record<string, { kebutuhan: number, ketersediaan: number; defisit: number }>;
};
// Sample data
const data: Commodity[] = [
    {
        commodity: "Beras Premium",
        dates: {
            "10/02/2023": 0,
            "11/02/2023": 0,
            "12/02/2023": 0,
            "13/02/2023": 0,
            "14/02/2023": 0,
            "15/02/2023": 0,
        },
    },
    {
        commodity: "Daging Ayam",
        dates: {
            "10/02/2023": 0,
            "11/02/2023": 0,
            "12/02/2023": 0,
            "13/02/2023": 0,
            "14/02/2023": 0,
            "15/02/2023": 0,
        },
    },
    // Add other commodities similarly...
];


const dataNeraca: CommodityNeraca[] = [
    {
        commodity: "Beras Premium",
        dates: {
            "10/02/2022": { kebutuhan: 1, ketersediaan: 150, defisit: 200 },
            "11/02/2022": { kebutuhan: 1, ketersediaan: 0, defisit: 0 },
            "12/02/2022": { kebutuhan: 1, ketersediaan: 0, defisit: 0 },
        },
    },
    {
        commodity: "Daging",
        dates: {
            "10/02/2022": { kebutuhan: 1, ketersediaan: 150, defisit: 200 },
            "11/02/2022": { kebutuhan: 1, ketersediaan: 0, defisit: 0 },
            "12/02/2022": { kebutuhan: 1, ketersediaan: 0, defisit: 0 },
        },
    },
    // Add other commodities similarly...
];


export default function Home() {

    // Define columns based on the data structure
    const columns: ColumnDef<Commodity>[] = [
        {
            accessorKey: "commodity",
            header: "Komoditas",
        },
        {
            accessorKey: "dates['10/02/2023']",
            header: "10/02/2023",
        },
        {
            accessorKey: "dates['11/02/2023']",
            header: "11/02/2023",
        },
        {
            accessorKey: "dates['12/02/2023']",
            header: "12/02/2023",
        },

    ];

    const columnsNeraca: ColumnDef<CommodityNeraca>[] = [

        {
            accessorKey: "dates['10/02/2022']",
            header: "10/02/2022",
        },
        {
            accessorKey: "dates['11/02/2022']",
            header: "11/02/2022",
        },

        {
            accessorKey: "dates['12/02/2022']",
            header: "12/02/2022",
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

    const table = useReactTable({
        data,
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


    const [sortingNeraca, setSortingNeraca] = React.useState<SortingState>([]);
    const [columnFiltersNeraca, setColumnFiltersNeraca] = React.useState<ColumnFiltersState>([]);
    const [columnVisibilityNeraca, setColumnVisibilityNeraca] = React.useState<VisibilityState>({});
    const [rowSelectionNeraca, setRowSelectionNeraca] = React.useState({});

    const tableNeraca = useReactTable({
        data: dataNeraca,
        columns: columnsNeraca,
        onSortingChange: setSortingNeraca,
        onColumnFiltersChange: setColumnFiltersNeraca,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibilityNeraca,
        onRowSelectionChange: setRowSelectionNeraca,
        state: {
            sorting: sortingNeraca,
            columnFilters: columnFiltersNeraca,
            columnVisibility: columnVisibilityNeraca,
            rowSelection: rowSelectionNeraca,
        },
    });

    const handleCheckboxChange = (key: string) => {
        setColumnVisibilityNeraca((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Tabel Data" />

                <div className="flex gap-10">
                    <div style={{ flex: 2 }} className=" ">

                        <div className="flex gap-4 justify-between">
                            <button
                                className={`flex-1 inline-flex ${activeTab === 'profile' ? 'bg-[#37B5FE] text-white' : 'text-[#37B5FE] border-2 border-[#37B5FE]'}  justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md   hover:-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                id="profile-tab"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected={activeTab === 'profile'}
                                onClick={() => handleTabClick('profile')}
                            >
                                Harga Pangan
                            </button>
                            <button
                                className={`flex-1 inline-flex ${activeTab === 'dashboard' ? 'bg-[#37B5FE] text-white' : 'text-[#37B5FE] border-2 border-[#37B5FE]'}  justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md   hover:-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                id="dashboard-tab"
                                type="button"
                                role="tab"
                                aria-controls="dashboard"
                                aria-selected={activeTab === 'dashboard'}
                                onClick={() => handleTabClick('dashboard')}
                            >
                                Neraca Pangan
                            </button>
                        </div>



                        <div>
                            <div id="default-tab-content">
                                <div
                                    className={`mt-6 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'profile' ? '' : 'hidden'}`}
                                    id="profile"
                                    role="tabpanel"
                                    aria-labelledby="profile-tab"
                                >
                                    <div className=" bg-white rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Kabupaten/Kota
                                            </label>
                                            <select
                                                id="location"
                                                name="location"

                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>Kabupaten/Kota</option>
                                            </select>

                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Kecamatan
                                            </label>
                                            <select
                                                id="location"
                                                name="location"

                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>Kecamatan</option>

                                            </select>

                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Periode
                                            </label>
                                            <select
                                                id="location"
                                                name="location"
                                                defaultValue="Canada"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>Periode</option>
                                            </select>

                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Komoditas
                                            </label>
                                            <div className="mt-2">
                                                <CheckboxOne text="Beras Premium" />

                                            </div>
                                            <div className="mt-2">
                                                <CheckboxOne text="Daging Sapi" />

                                            </div>
                                            <div className="mt-2">
                                                <CheckboxOne text="Daging Ayam" />

                                            </div>
                                        </div>

                                        <button className="mt-5 bg-[#37B5FE] w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={`mt-6 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? '' : 'hidden'}`}
                                    id="dashboard"
                                    role="tabpanel"
                                    aria-labelledby="dashboard-tab"
                                >
                                    <div className=" bg-white rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Kabupaten/Kota
                                            </label>
                                            <select
                                                id="location"
                                                name="location"

                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>Kabupaten/Kota</option>
                                            </select>

                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Kecamatan
                                            </label>
                                            <select
                                                id="location"
                                                name="location"

                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>Kecamatan</option>

                                            </select>

                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Periode
                                            </label>
                                            <select
                                                id="location"
                                                name="location"
                                                defaultValue="Canada"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>Periode</option>
                                            </select>

                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Komoditas
                                            </label>
                                            <div className="mt-2">
                                                <CheckboxOne text="Beras Premium" />

                                            </div>
                                            <div className="mt-2">
                                                <CheckboxOne text="Daging Sapi" />

                                            </div>
                                            <div className="mt-2">
                                                <CheckboxOne text="Daging Ayam" />

                                            </div>
                                        </div>
                                        <hr className="w-full h-1 mx-auto my-4 bg-slate-500 border-0 rounded md:my-10 dark:bg-gray-700" />
                                        <div className="">
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Tampilkan
                                            </label>
                                            <div className="mt-2">
                                                <CheckboxOne text="Kebutuhan" />

                                            </div>
                                            <div className="mt-2">
                                                <CheckboxOne text="Ketersediaan" />

                                            </div>
                                            <div className="mt-2">
                                                <CheckboxOne text="Defisit" />

                                            </div>
                                        </div>
                                        <button className="mt-5 bg-[#37B5FE] w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 6 }} className=" bg-white rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                        <div className={`w-full  ${activeTab === 'profile' ? '' : 'hidden'}`}>
                        <h1 className="text-2xl font-bold">Harga Pangan</h1>
                          
                            <div className="flex items-center py-4">
                                <Input
                                    placeholder="Filter commodities..."
                                    value={(table.getColumn("commodity")?.getFilterValue() as string) ?? ""}
                                    onChange={(event) =>
                                        table.getColumn("commodity")?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="ml-auto">
                                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
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
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                                    {row.getVisibleCells().map((cell, key) => (
                                                        key === 0 ? (
                                                            <TableCell key={cell.id}>
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </TableCell>
                                                        ) : (
                                                            <TableCell key={cell.id}>
                                                                {row.original.dates[cell.column.columnDef.header as string]}
                                                            </TableCell>
                                                        )
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
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

                        <div className={`w-full  ${activeTab === 'dashboard' ? '' : 'hidden'}`}>
                        <h1 className="text-2xl font-bold">Neraca Pangan</h1>

                            <div className="flex items-center py-4">
                                <Input
                                    placeholder="Filter commodities..."
                                    value={(table.getColumn("commodity")?.getFilterValue() as string) ?? ""}
                                    onChange={(event) =>
                                        table.getColumn("commodity")?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="ml-auto">
                                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        {tableNeraca.getHeaderGroups().map((headerGroup) => (
                                            <>
                                                {/* Header for Komoditas */}
                                                <TableRow key={headerGroup.id}>
                                                    <TableHead style={{ border: '1px solid black' }} key="komoditas-header" rowSpan={2}>
                                                        Komoditas
                                                    </TableHead>
                                                    {headerGroup.headers.map((header) => (
                                                        <TableHead style={{ border: '1px solid black' }} key={header.id} colSpan={3} className="text-center">
                                                            {header.column.columnDef.header as string}

                                                        </TableHead>
                                                    ))}
                                                </TableRow>
                                                {/* Header for Tanggal, Ketersediaan, and Defisit */}
                                                <TableRow key={`${headerGroup.id}-subheader`}>
                                                    {headerGroup.headers.map((header) => (
                                                        <>
                                                            <TableHead style={{ border: '1px solid black' }} key={`${header.id}-kebutuhan`}>
                                                                Kebutuhan
                                                            </TableHead>
                                                            <TableHead style={{ border: '1px solid black' }} key={`${header.id}-ketersediaan`}>
                                                                Ketersediaan
                                                            </TableHead>
                                                            <TableHead style={{ border: '1px solid black' }} key={`${header.id}-defisit`}>
                                                                Defisit
                                                            </TableHead>
                                                        </>
                                                    ))}
                                                </TableRow>
                                            </>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {tableNeraca.getRowModel().rows?.length ? (
                                            tableNeraca.getRowModel().rows.map((row) => (
                                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                                    <TableCell style={{ border: '1px solid black' }}>
                                                        {row.original.commodity}
                                                    </TableCell>
                                                    {
                                                        row.original.dates && Object.keys(row.original.dates).map((date) => (
                                                            <>
                                                                <TableCell style={{ border: '1px solid black' }} className="text-right">
                                                                    {row.original.dates[date].kebutuhan}
                                                                </TableCell>
                                                                <TableCell style={{ border: '1px solid black' }} className="text-right">
                                                                    {row.original.dates[date].ketersediaan}
                                                                </TableCell>
                                                                <TableCell style={{ border: '1px solid black' }} className="text-right">
                                                                    {row.original.dates[date].defisit}
                                                                </TableCell>
                                                            </>
                                                        ))
                                                    }
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columnsNeraca.length} className="h-24 text-center">
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>

                                    {/* <TableBody>
                                        {table.getRowModel().rows?.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                                    {row.getVisibleCells().map((cell, key) => (
                                                        key === 0 ? (
                                                            <TableCell key={cell.id}>
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </TableCell>
                                                        ) : (
                                                            <TableCell key={cell.id}>
                                                                {row.original.dates[cell.column.columnDef.header as string]}
                                                            </TableCell>
                                                        )
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody> */}
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
                </div>

            </DefaultLayout>
        </>
    );
}
