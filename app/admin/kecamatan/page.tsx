
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



interface Kecamatan {
    id: number;
    name: string;
    kabupaten_kota_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
interface kabupaten {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    value: number;
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
	const [kecamatanData, setKecamatanData] = useState<Kecamatan[]>([]);
	const [kabupatenData, setKabupatenData] = useState<kabupaten[]>([]);

	const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
		null,
	);
	const [selectedFile, setSelectedFile] = React.useState<File>();
	const [kecamatan, setKecamatan] = React.useState({
		id: 0,
		name: '',
	});

	const columns: ColumnDef<Kecamatan>[] = [
		{
			id: 'sequence',
			header: '#',
			cell: (info) => info.row.index + 1,
		},
		{
			accessorKey: 'name',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						Name
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			id: 'actions',
			accessorKey: 'id',
			header: ({ column }) => {
				return 'Actions';
			},
			cell: (row) => (
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => editKecamatan(Number(row.getValue()))}>
						Edit
					</Button>
					<Button
						variant="destructive"
						onClick={() => deleteKecamatan(Number(row.getValue()))}
						size="sm">
						Delete
					</Button>
				</div>
			),
		},
	];

	const [activeTab, setActiveTab] = useState('profile');

	const handleTabClick = (tab: string): void => {
		setActiveTab(tab);
	};

	const getKabupaten = async (page: number = 1, limit: number = 2) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kabupaten`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);
			if (response.data.data) {
				const mappedOptions = response.data.data.map(
					(kabupaten: { name: string; id: number }) => ({
						value: kabupaten.id,
						label: kabupaten.name,
					}),
				);
				setKabupatenData(mappedOptions);
				setPaginationInfo(response.data.paginationInfo);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: error.response.data.message,
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'error terjadi',
					text: 'mohon coba lagi nanti.',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
	};

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedKabupaten, setSelectedKabupaten] = useState({
		value: 0,
		label: 'Select',
	});

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable<Kecamatan>({
		data: kecamatanData,
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

	const getKecamatan = async (page: number = 1, limit: number = 2) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kecamatan`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);
			if (response.data.data) {
				setKecamatanData(response.data.data);
				console.log(response.data.data);
				setPaginationInfo(response.data.paginationInfo);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: error.response.data.message,
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'error terjadi',
					text: 'mohon coba lagi nanti.',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
	};

	const createKecamatan = async (e: any) => {
		e.preventDefault();
		Swal.fire({
			title: 'Loading...',
			target: document.getElementById('modal-dialog'),
			text: 'Mohon tunggu sebentar...',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		var res = await axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kecamatan`,
				{
					name: kecamatan.name,
					kabupaten_id: selectedKabupaten.value,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			)
			.then(function (response) {
				getKecamatan();
				setKecamatan({
					id: 0,
					name: '',
				});
				e.target.reset();
				Swal.close();
				setIsDialogOpen(false);
			})
			.catch(function (error) {
				console.log(error);
				if (error.response && error.response.status === 401) {
					Swal.fire({
						icon: 'error',
						target: document.getElementById('modal-dialog'),
						title: error.response.data.message,
						showConfirmButton: false,
						timer: 10000,
					});
				} else {
					Swal.fire({
						icon: 'error',
						target: document.getElementById('modal-dialog'),
						title: 'error terjadidsds',
						text: 'mohon coba lagi nanti.',
						showConfirmButton: false,
						timer: 10000,
					});
				}
			});
	};

	const editKecamatan = async (id: number) => {
		let fr = kecamatanData.find((f) => f.id === id);
		if (fr) {
			setKecamatan({
				id: fr.id,
				name: fr.name,
			});
			console.log(fr);

			let kab = kabupatenData.find((f) => f.value == fr?.kabupaten_kota_id);
			console.log('ini');
			console.log(kab);
			setSelectedKabupaten({
				value: fr.kabupaten_kota_id,
				label: kab?.name ?? '',
			});
			setIsDialogOpen(true);
		}
	};

	const updateKecamatan = async (e: any) => {
		e.preventDefault();
		Swal.fire({
			title: 'Loading...',
			target: document.getElementById('modal-dialog'),
			text: 'Mohon tunggu sebentar...',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
		try {
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kecamatan/${kecamatan.id}`,
				{
					name: kecamatan.name,
					kabupaten_id: selectedKabupaten.value,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);
			getKecamatan();
			setKecamatan({
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
					timer: 1500,
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'error terjadi',
					text: 'mohon coba lagi nanti.',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
	};

	const deleteKecamatan = async (id: number) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Loading...',
					text: 'Mohon tunggu sebentar...',
					allowOutsideClick: false,
					didOpen: () => {
						Swal.showLoading();
					},
				});
				try {
					await axios.delete(
						`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kecamatan/${id}`,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem('token')}`,
							},
						},
					);
					await getKecamatan();
					Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
				} catch (error) {}
			}
		});
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(event.target.files?.[0]);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setKecamatan({ ...kecamatan, [name]: value });
	};

	useEffect(() => {
		getKecamatan();
		console.log(kecamatanData);
		getKabupaten();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<DefaultLayout>
				<Breadcrumb pageName="Management Kecamatan" />
				<div className="col-span-3  rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
					<div className={`w-full  ${activeTab === 'profile' ? '' : 'hidden'}`}>
						<h1 className="text-2xl font-bold">Management Kecamatan</h1>
						<div className="flex items-center py-4">
							<Input
								placeholder="Filter Kecamatan..."
								value={
									(table.getColumn('name')?.getFilterValue() as string) ?? ''
								}
								onChange={(event) =>
									table.getColumn('name')?.setFilterValue(event.target.value)
								}
								className="max-w-sm"
							/>
							<DropdownMenu>
								<div className="ms-2">
									<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
										<DialogTrigger asChild>
											<Button
												variant="outline"
												onClick={() => setIsDialogOpen(true)}>
												Tambah Kecamatan
											</Button>
										</DialogTrigger>
										<DialogContent className="sm:max-w-[425px]">
											<form
												action=""
												method="dialog"
												onSubmit={
													kecamatan.id == 0 ? createKecamatan : updateKecamatan
												}>
												<DialogHeader>
													<DialogTitle>Tambah Kecamatan</DialogTitle>
												</DialogHeader>
												<div className="grid gap-4 py-4">
													<div>
														<Label htmlFor="name" className="text-right mb-3">
															Nama Kabupaten
														</Label>
														<Select
															onChange={(kabupatenData) =>
																setSelectedKabupaten({
																	value: kabupatenData!.value,
																	label: kabupatenData!.label,
																})
															}
															value={selectedKabupaten}
															className=" basic-single w-full border-none"
															options={kabupatenData as any}
														/>
													</div>
													<div className="">
														<Label htmlFor="name" className="text-right mb-3">
															Nama Kecamatan
														</Label>
														<Input
															id="name"
															name="name"
															value={kecamatan.name}
															onChange={handleInputChange}
															placeholder="Isi nama Kecamatan"
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
																	header.getContext(),
															  )}
													</TableHead>
												);
											})}
										</TableRow>
									))}
								</TableHeader>
								<TableBody>
									{table.getRowModel().rows?.length ? (
										table.getRowModel().rows.map((row) => (
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
