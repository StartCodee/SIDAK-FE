
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
import { useState, useEffect } from "react";


import CheckboxFive from "@/components/admin/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/admin/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/admin/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/admin/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/admin/Checkboxes/CheckboxTwo";
import Cookies from "js-cookie";


import axios from "axios";
import Swal from "sweetalert2";
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
import { BeritaForm } from "./berita-form";
import BeritaDelete from "./berita-delete";

interface News {
	id: number;
	title: string;
	content: string;
	author_id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	image: string | null;
}



export default function Home() {

	const [beritaData, setBeritaData] = useState<News[]>([]);

	const [selectedFile, setSelectedFile] = React.useState<File>();
	const [berita, setBerita] = useState({
		title: '',
		content: '',
	});

	const columns: ColumnDef<News>[] = [
		{
			id: 'sequence',
			header: '#',
			cell: (info) => info.row.index + 1,
		},
		{
			accessorKey: 'title',
			header: 'Judul Berita',
		},
		{
			accessorKey: 'created_at',
			header: 'Tanggal',
		},
		{
			id: 'actions',
			accessorKey: 'id',
			header: ({ column }) => {
				return 'Actions';
			},
			cell: (row) => {
				return (
					<div className="flex items-center space-x-2">
						<BeritaForm
							news={row.row.original}
							onBeritaDataUpdate={handleBeritaDataUpdate}
						/>
						<BeritaDelete id={row.row.original.id} onBeritaDataUpdate={handleBeritaDataUpdate} />
					</div>
				);
			},
		},
	];


	const [activeTab, setActiveTab] = useState('profile');


	const handleBeritaDataUpdate = (data: News[]) => {
		setBeritaData(data);
	};

	const getBerita = async (page: number = 1, limit: number = 20) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},

				},
			);
			if (response.data.data) {
				setBeritaData(response.data.data);
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

	// const createBerita = async (e: any) => {
	//     e.preventDefault();
	//     Swal.fire({
	//         title: 'Loading...',
	//         target: document.getElementById('modal-dialog'),
	//         text: 'Please wait',
	//         didOpen: () => {
	//             Swal.showLoading();
	//         }
	//     });

	//     // formData 
	//     const formData = new FormData();
	//     if (selectedFile) {
	//         formData.append('image', selectedFile);
	//     }
	//     formData.append('title', berita.title);
	//     formData.append('content', berita.content);
	//     formData.append('author_id', 1);

	//     var res = await axios
	// 				.post(
	// 					`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news`,
	// 					formData,
	// 					{
	// 						headers: {
	// 							'Content-Type': 'application/json',
	// 							Authorization: `Bearer ${localStorage.getItem('token')}`,
	// 						},
	// 					},
	// 				)
	// 				.then(function (response) {
	// 					getBerita();
	// 					setBerita({ title: '', content: '' });
	// 					e.target.reset();
	// 					Swal.close();
	// 					setIsDialogOpen(false);
	// 				})
	// 				.catch(function (error) {
	// 					console.log(error);
	// 					if (error.response && error.response.status === 401) {
	// 						Swal.fire({
	// 							icon: 'error',
	// 							target: document.getElementById('modal-dialog'),
	// 							title: error.response.data.message,
	// 							showConfirmButton: false,
	// 							timer: 10000,
	// 						});
	// 					} else {
	// 						Swal.fire({
	// 							icon: 'error',
	// 							target: document.getElementById('modal-dialog'),
	// 							title: 'error terjadi',
	// 							text: 'mohon coba lagi nanti.',
	// 							showConfirmButton: false,
	// 							timer: 10000,
	// 						});
	// 					}
	// 				});
	// };

	//    const handleFileSelect = (
	// 				event: React.ChangeEvent<HTMLInputElement>,
	// 			) => {
	// 				setSelectedFile(event.target.files?.[0]);
	// 			};

	//      const handleInputChange = (
	//                 event: React.ChangeEvent<HTMLInputElement>,
	//             ) => {
	//                 const { name, value } = event.target;
	//                 setBerita({ ...berita, [name]: value });
	//             };



	const handleTabClick = (tab: string): void => {
		setActiveTab(tab);
	};

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data: beritaData,
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
		getBerita();
	}, []);



	return (
		<>
			<DefaultLayout>
				<Breadcrumb pageName="Management Berita" />

				<div className="col-span-3  rounded-lg border border-stroke bg-white px-7  py-10 shadow-default">
					<div
						className={`w-full  ${activeTab === 'profile' ? '' : 'hidden'}`}>
						<h1 className="text-2xl font-bold">Management Berita</h1>
						<div className="flex items-center py-4">
							<Input
								placeholder="Filter commodities..."
								value={
									(table.getColumn('title')?.getFilterValue() as string) ?? ''
								}
								onChange={(event) =>
									table.getColumn('title')?.setFilterValue(event.target.value)
								}
								className="max-w-sm"
							/>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="ml-auto">
										Columns <ChevronDown className="ml-2 h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<div className="ms-2">
									<BeritaForm onBeritaDataUpdate={handleBeritaDataUpdate} />
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
