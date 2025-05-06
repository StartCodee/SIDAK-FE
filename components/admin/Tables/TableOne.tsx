'use client'

import { BRAND } from "@/types/brand";
import Image from "next/image";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useState } from "react";
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
import axios from 'axios';
import { Badge } from "@/components/ui/badge";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { set } from "date-fns";
import { get } from "http";
interface Komoditas {
	id: number;
	name: string;
	created_at: string; // Assuming this is part of the data structure
	tanggal: string; // Assuming this is part of the data structure
	komoditas_name: string; // Assuming this is part of the data structure
	kecamatan_name: string; // Assuming this is part of the data structure
	approved: boolean; // Assuming this is part of the data structure
}

const TableOne = () => {
const { toast } = useToast();
  const [supply, setSupply] = useState([]);
  const [role , setRole] = useState('');

  const getRole = () => {
	axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/me`, {
		headers:
			{ Authorization: `Bearer ${Cookies.get('token')}` },
	})
		.then((res) => {
			setRole(res.data.role);
		})
		.catch((err) => {
			if (err.response && err.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Unauthorized',
					description: 'You are not authorized to perform this action',
				});
				logout();
			} else {
				toast({
					title: 'Gagal input data',
					description: 'Data gagal diinput ke dalam database',
					variant: 'destructive',
				});
			}
		});
  };

  const logout = () => {
			Cookies.remove('token');
			Cookies.remove('userEmail');
			Cookies.remove('userName');
			Cookies.remove('userId');
			window.location.href = '/auth';
		};

  const acceptSupply = async (id: number) => {
	axios
		.put(
			`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/supply/approved/${id}`,
			{},
			{
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			},
		)
		.then((res) => {
			if (res.status === 200) {
				toast({
					title: 'Berhasil input data',
					description: 'Data berhasil diinput ke dalam database',
					variant: 'success',
				});
				getKomoditas();
			}
		})
		.catch((err) => {
			if (err.response && err.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Unauthorized',
					description: 'You are not authorized to perform this action',
				});
				logout();
			} else {
				toast({
					title: 'Gagal input data',
					description: 'Data gagal diinput ke dalam database',
					variant: 'destructive',
				});
			}
		});

  };

  const columns: ColumnDef<Komoditas[]>[] = [
		{
			id: 'sequence',
			header: '#',
			cell: (info) => info.row.index + 1,
		},
		{
			header: 'Time Stamp Input',
			accessorKey: 'created_at',
			cell: (info) => {
				// Cast the value to string, which is expected for a date
				const dateStr = info.getValue() as string;

				// Create a new Date object from the timestamp
				const date = new Date(dateStr);

				// Use Intl.DateTimeFormat to format the date to Jakarta time
				const options: Intl.DateTimeFormatOptions = {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					timeZone: 'Asia/Jakarta', // Set the timezone to Jakarta
				};

				const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(
					date,
				);
				return formattedDate;
			},
		},
		{
			header: 'Tanggal Data',
			accessorKey: 'tanggal',
			cell: (info) => {
				const dateStr = info.getValue() as string;
				const date = new Date(dateStr);
				// Format the date to YYYY-MM-DD
				const formattedDate = date.toISOString().split('T')[0];
				return formattedDate;
			},
		},
		{
			header: 'Komoditas',
			accessorKey: 'komoditas_name',
		},
		{
			header: 'Kecamatan',
			accessorKey: 'kecamatan_name',
		},
		{
			header: 'Harga',
			accessorKey: 'harga',
		},
		{
			header: 'Status',
			accessorKey: 'approved',
			cell: (info) => {
				return (
					<Badge variant={info.getValue() ? 'success' : 'destructive'}>
						{info.getValue() ? 'Approved' : 'Pending'}
					</Badge>
				);
			},
		},

		
	];

	if(role !== 'KABUPATEN'){
		columns.push({
			id: 'actions',
			accessorKey: 'id',
			header: () => {
				return 'Actions';
			},
			cell: (row) => {
				const id = row.getValue() as number;
				return (
					<Button
						className="bg-green-500 hover:bg-green-600"
						onClick={() => acceptSupply(id)}>
						Approve
					</Button>
				);
			},
		});

	}
	console.log(role);

  const getKomoditas = async () => {
    try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/supply?type=unapproved`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
				},
			);
			if (response.data.data) {
				setSupply(response.data.data);
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
  }

  const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
		data: supply,
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
    getKomoditas();
	getRole();
  }, []);

  return (
		<div className="rounded-lg mt-5 border border-stroke bg-white  pb-2.5 pt-6 shadow-default  sm:px-7.5 xl:pb-1">
			<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
				Data Harga Pangan
			</h4>
			<Input
				placeholder="Filter komoditas..."
				value={(table.getColumn('komoditas_name')?.getFilterValue() as string) ?? ''}
				onChange={(event) =>
					table.getColumn('komoditas_name')?.setFilterValue(event.target.value)
				}
				className="max-w-sm mb-4"
			/>
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
	);
};

export default TableOne;
