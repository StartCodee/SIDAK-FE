
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

export type Commodity = {
    commodity: string;
    dates: Record<string, number>;
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



// Define columns based on the data structure
export const columns: ColumnDef<Commodity>[] = [
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
    {
        accessorKey: "dates['13/02/2023']",
        header: "13/02/2023",
    },
    {
        accessorKey: "dates['14/02/2023']",
        header: "14/02/2023",
    },
    {
        accessorKey: "dates['15/02/2023']",
        header: "15/02/2023",
    },
];

export default function Home() {
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

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Input Data" />

                <div className="flex gap-10">
                    <div style={{ flex: 2 }} className=" ">

                        <div className="flex gap-4 justify-between">
                            <button
                                className='flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                id="profile-tab"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected={activeTab === 'profile'}
                                onClick={() => handleTabClick('profile')}
                            >
                                Profile
                            </button>
                            <button
                                className='flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                id="dashboard-tab"
                                type="button"
                                role="tab"
                                aria-controls="dashboard"
                                aria-selected={activeTab === 'dashboard'}
                                onClick={() => handleTabClick('dashboard')}
                            >
                                Dashboard
                            </button>
                        </div>



                        <div>
                            <div id="default-tab-content">
                                <div
                                    className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'profile' ? '' : 'hidden'}`}
                                    id="profile"
                                    role="tabpanel"
                                    aria-labelledby="profile-tab"
                                >
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Profile tab associated content</strong>.
                                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
                                    </p>
                                </div>
                                <div
                                    className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? '' : 'hidden'}`}
                                    id="dashboard"
                                    role="tabpanel"
                                    aria-labelledby="dashboard-tab"
                                >
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab associated content</strong>.
                                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
                                    </p>
                                </div>
                                <div
                                    className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'settings' ? '' : 'hidden'}`}
                                    id="settings"
                                    role="tabpanel"
                                    aria-labelledby="settings-tab"
                                >
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Settings tab associated content</strong>.
                                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
                                    </p>
                                </div>
                                <div
                                    className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'contacts' ? '' : 'hidden'}`}
                                    id="contacts"
                                    role="tabpanel"
                                    aria-labelledby="contacts-tab"
                                >
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Contacts tab associated content</strong>.
                                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 6 }} className=" bg-white rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                        <div className="w-full">
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
                    </div>
                </div>

            </DefaultLayout>
        </>
    );
}
