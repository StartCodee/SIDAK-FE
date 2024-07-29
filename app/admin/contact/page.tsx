'use client';
import { useState, useEffect } from 'react';
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
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Cookies from 'js-cookie';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb';
import React from 'react';

export default function Home() {
    	const [activeTab, setActiveTab] = useState('profile');
        const [data, setData] = useState([]);
        const { toast } = useToast();

        const columns: ColumnDef<any>[] = [
					{
						id: 'sequence',
						header: '#',
						cell: (info) => info.row.index + 1,
					},
					{
						accessorKey: 'name',
						header: 'Name',
					},
					{
						accessorKey: 'email',
						header: 'Email',
					},
					{
						accessorKey: 'message',
						header: 'Message',
					},
                    {
                        accessorKey: 'created_at',
                        header: 'Created_at',
                    },
				];

        const getData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/contact`,
                    {
                        headers: {
                            'content-type': 'application/json',
                            Authorization: `Bearer ${Cookies.get('token')}`,
                        },
                    },
                );
                if (response.data.data) {
                    setData(response.data.data);
                }
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    toast({
                        title: 'Unauthorized',
                        description: 'Please login to continue.',
                        variant: 'destructive',
                    });
                }
            }
        }

        useEffect(() => {
            getData();
        }, []);

        const [sorting, setSorting] = React.useState<SortingState>([]);
		const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
		const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
		const [rowSelection, setRowSelection] = React.useState({});

        const table = useReactTable({
					data: data,
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

                useEffect(() => {
									// Function to register the service worker for notifications
									const registerForNotifications = () => {
										if (
											'serviceWorker' in navigator &&
											'PushManager' in window
										) {
											navigator.serviceWorker
												.register('/sw.js')
												.then((swReg) => {
													console.log('Service Worker Registered', swReg);

													// Request permission for notifications
													Notification.requestPermission().then(
														(permission) => {
															if (permission === 'granted') {
																swReg.pushManager
																	.subscribe({
																		userVisibleOnly: true,
																		applicationServerKey:
																			'BBJGBkTHwxZ8NcKSB7bncu-Iy1uNCTSuBktlRCjp590tXa6ILiLuNmRd8upC38dblCwH-fDrIpD14CgxsLdQ3Lk',
																	})
																	.then((subscription) => {
																		fetch(
																			`${process.env.NEXT_PUBLIC_BACKEND_HOST}/subscribe`,
																			{
																				method: 'POST',
																				headers: {
																					'Content-Type': 'application/json',
																				},
																				body: JSON.stringify(subscription),
																			},
																		)
																			.then((response) => response.json())
																			.then((data) => {
																				console.log(data.message);
																			});
																	});
															}
														},
													);
												});
										}
									};

									// Handle admin registration form submission
									const handleAdminRegister = (event: any) => {
										event.preventDefault();
										registerForNotifications();
									};

									// Add event listener to admin register form
									const adminRegisterForm =
										document.getElementById('adminRegisterForm');
									if (adminRegisterForm) {
										adminRegisterForm.addEventListener(
											'submit',
											handleAdminRegister,
										);
									}

									return () => {
										if (adminRegisterForm) {
											adminRegisterForm.removeEventListener(
												'submit',
												handleAdminRegister,
											);
										}
									};
								}, []);

	return (
		<>
			<DefaultLayout>
				<Breadcrumb pageName="Contact" />
				<div className="col-span-3  rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
					<div className={`w-full  ${activeTab === 'profile' ? '' : 'hidden'}`}>
                        <form id="adminRegisterForm" className='p-4 space-y-4'>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Admin Email
                            </label>
                            <div className='grid grid-cols-3 gap-4 items-center'>
                                <div className="col-span-2">
                                    <input
                                        id="email"
                                        name="adminEmail"
                                        type="email"
                                        placeholder="Admin Email"
                                        className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="col-span-1 rounded-sm bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Register for Notifications
                                </button>
                            </div>
                        </form>
						<div className="rounded-md border">
							<Table>
								<TableHeader>
									{table.getHeaderGroups().map((headerGroup) => (
										<TableRow key={headerGroup.id}>
											{headerGroup.headers.map((header) => (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
														  )}
												</TableHead>
											))}
										</TableRow>
									))}
								</TableHeader>
								<TableBody>
									{table.getRowModel().rows?.length ? (
										table.getRowModel().rows.map((row, key) => (
											<TableRow
												key={row.id}
												data-state={row.getIsSelected() && 'selected'}>
												{row.getVisibleCells().map((cell) => (
													<TableCell key={cell.id}>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext(),
														)}
													</TableCell>
												))}
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell
												colSpan={columns.length}
												className="h-24 text-center">
												No results.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
						<div className="flex items-center justify-end space-x-2 py-4">
							<div className="flex-1 text-sm text-muted-foreground">
								{table.getFilteredSelectedRowModel().rows.length} of{' '}
								{table.getFilteredRowModel().rows.length} row(s) selected.
							</div>
							<div className="space-x-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}>
									Previous
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}>
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
