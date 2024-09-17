
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
import { ChevronDown } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from '@/components/ui/use-toast';

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

import CheckboxOne from "@/components/admin/Checkboxes/CheckboxOne";
import Cookies from 'js-cookie';

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import WeekPicker from '@/components/ui/weekpicker';
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import MonthPicker from "./monthpicker"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export type Commodity = {
    commodity: string;
    dates: Record<string, number>;
};

export type CommodityNeraca = {
    commodity: string;
    dates: Record<string, { kebutuhan: number, ketersediaan: number; defisit: number }>;
};
// Sample data

interface CommodityOption {
    value: number;
    label: string;
}

type ShowHeaderKeys = 'kebutuhan' | 'ketersediaan' | 'defisit';


export default function Home() {
	const { toast } = useToast();

	const [checkboxState, setCheckboxState] = useState<{
		[key: string]: boolean;
	}>({}); // Menggunakan index signature
	const [checkboxStateNeraca, setCheckboxStateNeraca] = useState<{
		[key: string]: boolean;
	}>({}); // Menggunakan index signature

	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 20),
	});

	const [oneDate, setOneDate] = React.useState<Date | undefined>(new Date());

	const [dateNeraca, setDateNeraca] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 20),
	});

	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	const [selectedKabupaten, setSelectedKabupaten] = useState('');
	const [selectedKecamatan, setSelectedKecamatan] = useState('');

	const [columns, setColumns] = useState<ColumnDef<Commodity>[]>([]);
	const [columnsNeraca, setColumnsNeraca] = useState<
		ColumnDef<CommodityNeraca>[]
	>([]);

	const [data, setData] = useState<Commodity[]>([]);
	const [dataNeraca, setDataNeraca] = useState<CommodityNeraca[]>([]);

	const [activeTab, setActiveTab] = useState('profile');

	const [selectedKabupatenOption, setSelectedKabupatenOption] = useState<any[]>(
		[],
	);
	const [selectedKecamatanOption, setSelectedKecamatanOption] = useState<any[]>(
		[],
	);
	const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>(
		[],
	);

	const [selectedKabupatenOptionNeraca, setSelectedKabupatenOptionNeraca] =
		useState<any[]>([]);
	const [selectedKecamatanOptionNeraca, setSelectedKecamatanOptionNeraca] =
		useState<any[]>([]);
	const [selectedCommodityOptionNeraca, setSelectedCommodityOptionNeraca] =
		useState<any[]>([]);

	const [selectedKabupatenNeraca, setSelectedKabupatenNeraca] = useState('');
	const [selectedKecamatanNeraca, setSelectedKecamatanNeraca] = useState('');

	const [role, setRole] = useState('');
	const [userKabupaten, setUserKabupaten] = useState<number>();
	const [periode, setPeriode] = useState('');

	const periodeArray = [
		{ value: 'harian', label: 'Harian' },
		{ value: 'mingguan', label: 'Mingguan' },
		{ value: 'bulanan', label: 'Bulanan' },
	]

	const [showHeader, setShowHeader] = useState<{
		kebutuhan: boolean;
		ketersediaan: boolean;
		defisit: boolean;
	}>({
		kebutuhan: true,
		ketersediaan: true,
		defisit: true,
	});

	const handleTabClick = (tab: string): void => {
		setActiveTab(tab);
	};

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
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
	const [columnFiltersNeraca, setColumnFiltersNeraca] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibilityNeraca, setColumnVisibilityNeraca] =
		React.useState<VisibilityState>({});
	const [rowSelectionNeraca, setRowSelectionNeraca] = React.useState({});

	 const [startWeek, setStartWeek] = React.useState<Date>()
	 const [endWeek, setEndWeek] = React.useState<Date>()

	 const [startMonth, setStartMonth] = React.useState<Date>()
	 const [endMonth, setEndMonth] = React.useState<Date>()

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

	const handleCheckboxChange = (key: ShowHeaderKeys) => {
		setShowHeader((prevState) => ({
			...prevState,
			[key]: !prevState[key as keyof typeof prevState],
		}));
	};

	const getHargaPanganData = async (
		page: number = 1,
		limit: number = 2,
		start_date: string,
		end_date: string,
		komoditas: string,
		kota: string,
		kecamatan: string,
	) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/harga-pangan?start_date=${start_date}&end_date=${end_date}&komoditas=${komoditas}&kabupaten_kota_id=${kota}&kecamatan_id=${kecamatan}`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);
			if (response.data.data) {
				let headers = response.data.data.header;
				const columns = [
					{
						accessorKey: 'commodity',
						header: 'Komoditas',
					},
					...headers.map((date: any) => ({
						accessorKey: `dates['${date}']`,
						header: date,
					})),
				];
				setColumns(columns);
				setData(response.data.data.body[0]);
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

	const getNeracaPanganData = async (
		page: number = 1,
		limit: number = 2,
		start_date: string,
		end_date: string,
		komoditas: string,
		kota: string,
		kecamatan: string,
	) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/neraca-pangan?start_date=${start_date}&end_date=${end_date}&komoditas=${komoditas}&kabupaten_kota_id=${kota}&kecamatan_id=${kecamatan}`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);
			if (response.data.data) {
				let headers = response.data.data.header;

				const columns = [
					{
						accessorKey: 'commodity',
						header: 'Komoditas',
					},
					...headers.map((date: any) => ({
						accessorKey: `dates['${date}']`,
						header: date,
					})),
				];

				setDataNeraca(response.data.data.body);
				setColumnsNeraca(columns);
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

	const getCommodityOption = async (page: number = 1, limit: number = 2) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/commodities`,
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
				setSelectedCommodityOption(mappedOptions);
				setSelectedCommodityOptionNeraca(mappedOptions);

				const initialCheckboxState: { [key: number]: boolean } = {}; // Mendefinisikan tipe untuk initialCheckboxState
				mappedOptions.forEach((option: CommodityOption) => {
					initialCheckboxState[option.value] = true; // Set all checkboxes to unchecked initially
				});
				setCheckboxState(initialCheckboxState);
				setCheckboxStateNeraca(initialCheckboxState);
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

	const getKabupatenOption = async (page: number = 1, limit: number = 2) => {
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
				setSelectedKabupatenOption(mappedOptions);
				setSelectedKabupatenOptionNeraca(mappedOptions);
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

	const getKecamatanOption = async (
		page: number = 1,
		limit: number = 2,
		kabupatenId: string,
	) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kecamatan?kabupaten_id=${kabupatenId}`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);
			if (response.data.data) {
				const mappedOptions = response.data.data.map(
					(kecamatan: { name: string; id: number }) => ({
						value: kecamatan.id,
						label: kecamatan.name,
					}),
				);
				setSelectedKecamatanOption(mappedOptions);
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

	const getKecamatanOptionNeraca = async (
		page: number = 1,
		limit: number = 2,
		kabupatenId: string,
	) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kecamatan?kabupaten_id=${kabupatenId}`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);
			if (response.data.data) {
				const mappedOptions = response.data.data.map(
					(kecamatan: { name: string; id: number }) => ({
						value: kecamatan.id,
						label: kecamatan.name,
					}),
				);
				setSelectedKecamatanOption(mappedOptions);
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

	const handleCheckboxChangeCommodity = (value: number) => {
		// Ubah tipe value ke number
		setCheckboxState((prevState) => ({
			...prevState,
			[value]: !prevState[value], // Toggle checkbox state
		}));
	};

	const handleCheckboxChangeCommodityNeraca = (value: number) => {
		console.log('masuknya kesini');
		// Ubah tipe value ke number
		setCheckboxStateNeraca((prevState) => ({
			...prevState,
			[value]: !prevState[value], // Toggle checkbox state
		}));
	};

	const handleSubmitHargaPangan = () => {
		// console.log(selectedKabupaten, selectedKecamatan, date, checkboxState);
		if (date) {
			const start_date = date.from?.toISOString().split('T')[0]; // Format YYYY-MM-DD
			const end_date = date.to?.toISOString().split('T')[0]; // Format YYYY-MM-DD

			const checkedKeys = Object.keys(checkboxState)
				.filter((key) => checkboxState[key]) // Memfilter hanya yang bernilai true
				.join(',');
			console.log(
				checkedKeys,
				selectedKabupaten,
				selectedKecamatan,
				start_date,
				end_date,
			);

			getHargaPanganData(
				1,
				2,
				start_date as any,
				end_date as any,
				checkedKeys,
				selectedKabupaten,
				selectedKecamatan,
			);
		}
	};

	const handleSubmitNeracaPangan = () => {
		if (dateNeraca) {
			const start_date = dateNeraca.from?.toISOString().split('T')[0]; // Format YYYY-MM-DD
			const end_date = dateNeraca.to?.toISOString().split('T')[0]; // Format YYYY-MM-DD
			const checkedKeys = Object.keys(checkboxStateNeraca)
				.filter((key) => checkboxStateNeraca[key]) // Memfilter hanya yang bernilai true
				.join(',');
			getNeracaPanganData(
				1,
				2,
				start_date as any,
				end_date as any,
				checkedKeys,
				selectedKabupatenNeraca,
				selectedKecamatanNeraca,
			);
		}
	};

	const logout = () => {
		Cookies.remove('token');
		Cookies.remove('userEmail');
		Cookies.remove('userName');
		Cookies.remove('userId');
		window.location.href = '/auth';
	};

	const getRole = () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/me`, {
				headers: { Authorization: `Bearer ${Cookies.get('token')}` },
			})
			.then((res) => {
				setRole(res.data.role);
				setUserKabupaten(res.data.kabupaten_id);
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

	useEffect(() => {
		getHargaPanganData(1, 10, '', '', '', '', '');
		getNeracaPanganData(1, 10, '', '', '', '', '');
		getKabupatenOption();
		getCommodityOption();
		getRole();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (userKabupaten) {
			getKecamatanOption(1, 1, userKabupaten as unknown as string);
		}
	}, [userKabupaten]);


	return (
		<>
			<DefaultLayout>
				<Breadcrumb pageName="Statistik Perubahan Harga Wilayah" />
				<div className=" grid grid-cols-4 gap-4">
					<div style={{ flex: 2 }} className=" ">
						{/* <div className="flex gap-4 justify-between"> */}
							{/* <button
								className={`flex-1 inline-flex ${
									activeTab === 'profile'
										? 'bg-[#37B5FE] text-white'
										: 'text-[#37B5FE] border-2 border-[#37B5FE]'
								}  justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md   hover:-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
								id="profile-tab"
								type="button"
								role="tab"
								aria-controls="profile"
								aria-selected={activeTab === 'profile'}
								onClick={() => handleTabClick('profile')}>
								Harga Pangan
							</button>
							<button
								className={`flex-1 inline-flex ${
									activeTab === 'dashboard'
										? 'bg-[#37B5FE] text-white'
										: 'text-[#37B5FE] border-2 border-[#37B5FE]'
								}  justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md   hover:-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
								id="dashboard-tab"
								type="button"
								role="tab"
								aria-controls="dashboard"
								aria-selected={activeTab === 'dashboard'}
								onClick={() => handleTabClick('dashboard')}>
								Neraca Pangan
							</button> */}
						{/* </div> */}
						<div>
							<div id="default-tab-content">
								<div
									className={`rounded-lg bg-gray-50 dark:bg-gray-800`}
									id="profile"
									role="tabpanel"
									aria-labelledby="profile-tab">
									<div className="rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
										<div>
											<label
												htmlFor="periode"
												className="block text-sm font-medium leading-6 text-gray-900">
												Periode
											</label>
											<select
												onChange={(e) => {
													// getKecamatanOption(1, 2, e.target.value);
													setPeriode(e.target.value);
												}}
												// disabled={role == 'KABUPATEN' ? true : false}
												id="periode"
												name="periode"
												className={`mt-2 block w-full ${
													role == 'KABUPATEN' ? 'bg-gray' : ''
												} rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
												<option>Periode</option>
												{periodeArray.map((option) => (
													<option
														key={option.value}
														// selected={
														// 	option.value == option.value ? true : false
														// }
														value={option.value}>
														{option.label}
													</option>
												))}
											</select>
										</div>

										{periode === 'harian' && (
											<div className="mt-5">
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Periode
											</label>
											<div>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															id="date"
															variant={'outline'}
															className={cn(
																'w-full justify-start text-left font-normal',
																!oneDate && 'text-muted-foreground',
															)}>
															<CalendarIcon className="mr-2 h-4 w-4" />
															{oneDate ? format(oneDate, "PPP") : <span>Pick a date</span>}
														</Button>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
														  initialFocus
														  mode="single"
														  defaultMonth={oneDate}
														  selected={oneDate}
														  onSelect={setOneDate}
														  numberOfMonths={1}
														/>
													</PopoverContent>
												</Popover>
											</div>
										</div>
										)}

										{periode === 'mingguan' && (
											<>
											<div className="mt-5">
												<label
													htmlFor="location"
													className="block text-sm font-medium leading-6 text-gray-900">
													Minggu Awal
												</label>
													<WeekPicker date={startWeek} setDate={setStartWeek} />
											</div>
											<div className="mt-5">
												<label
													htmlFor="location"
													className="block text-sm font-medium leading-6 text-gray-900">
													Minggu Akhir
												</label>
													<WeekPicker date={endWeek} setDate={setEndWeek} />
												
											</div>
											</>
										)}

										{periode === 'bulanan' && (
											<>
											<div className="mt-5">
												<label
													htmlFor="location"
													className="block text-sm font-medium leading-6 text-gray-900">
													Bulan Awal
												</label>
													<MonthPicker date={startMonth} setDate={setStartMonth} />
											</div>
											<div className="mt-5">
												<label
													htmlFor="location"
													className="block text-sm font-medium leading-6 text-gray-900">
													Bulan Akhir
												</label>
													<MonthPicker date={endMonth} setDate={setEndMonth} />
												
											</div>
											</>
										)}


												
												


										<div className="mt-5">
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Provinsi
											</label>
											<select
												onChange={(e) => {
													getKecamatanOption(1, 2, e.target.value);
													setSelectedKabupaten(
														(e.target as HTMLSelectElement).value,
													);
												}}
												disabled={role == 'KABUPATEN' ? true : false}
												id="location"
												name="location"
												className={`mt-2 block w-full ${
													role == 'KABUPATEN' ? 'bg-gray' : ''
												} rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
												<option>Provinsi</option>
												{selectedKabupatenOption.map((option) => (
													<option
														key={option.value}
														selected={
															option.value == userKabupaten ? true : false
														}
														value={option.value}>
														{option.label}
													</option>
												))}
											</select>
										</div>
										<div className="mt-5">
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Kabupaten/Kota
											</label>
											<select
												onChange={(e) => {
													getKecamatanOption(1, 2, e.target.value);
													setSelectedKabupaten(
														(e.target as HTMLSelectElement).value,
													);
												}}
												disabled={role == 'KABUPATEN' ? true : false}
												id="location"
												name="location"
												className={`mt-2 block w-full ${
													role == 'KABUPATEN' ? 'bg-gray' : ''
												} rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
												<option>Kabupaten/Kota</option>
												{selectedKabupatenOption.map((option) => (
													<option
														key={option.value}
														selected={
															option.value == userKabupaten ? true : false
														}
														value={option.value}>
														{option.label}
													</option>
												))}
											</select>
										</div>
										<div className="mt-5">
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Kecamatan
											</label>
											<select
												id="location"
												name="location"
												onChange={(e) =>
													setSelectedKecamatan(
														(e.target as HTMLSelectElement).value,
													)
												}
												className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
												<option>Kecamatan</option>
												{selectedKecamatanOption.map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</select>
										</div>
										
										<div className="mt-5">
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Komoditas
											</label>
											{selectedCommodityOption.map((option) => (
												<CheckboxOne
													key={option.value}
													text={option.label}
													name={'komoditas'}
													value={option.value}
													checked={checkboxState[option.value] || false} // Use checkboxState to determine if checked
													onChange={() =>
														handleCheckboxChangeCommodity(option.value)
													}
												/>
											))}
										</div>
										<button
											onClick={handleSubmitHargaPangan}
											className="mt-5 bg-[#37B5FE] w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											Submit
										</button>
									</div>
								</div>
								{/* <div
									className={`mt-6 rounded-lg bg-gray-50 dark:bg-gray-800 ${
										activeTab === 'dashboard' ? '' : 'hidden'
									}`}
									id="dashboard"
									role="tabpanel"
									aria-labelledby="dashboard-tab">
									<div className="  rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
										<div>
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Kabupaten/Kota
											</label>
											<select
												id="location"
												name="location"
												onChange={(e) => {
													getKecamatanOptionNeraca(1, 2, e.target.value);
													setSelectedKabupatenNeraca(
														(e.target as HTMLSelectElement).value,
													);
												}}
												disabled={role == 'KABUPATEN' ? true : false}
												className={`mt-2 block w-full ${
													role == 'KABUPATEN' ? 'bg-gray' : ''
												} rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
												<option>Kabupaten/Kota</option>
												{selectedKabupatenOption.map((option) => (
													<option
														key={option.value}
														selected={
															option.value == userKabupaten ? true : false
														}
														value={option.value}>
														{option.label}
													</option>
												))}
											</select>
										</div>
										<div className="mt-5">
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Kecamatan
											</label>
											<select
												id="location"
												name="location"
												onChange={(e) =>
													setSelectedKecamatanNeraca(
														(e.target as HTMLSelectElement).value,
													)
												}
												className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
												<option>Kecamatan</option>
												{selectedKecamatanOption.map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</select>
										</div>
										<div className="mt-5">
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Periode
											</label>
											<div>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															id="date"
															variant={'outline'}
															className={cn(
																'w-full justify-start text-left font-normal',
																!dateNeraca && 'text-muted-foreground',
															)}>
															<CalendarIcon className="mr-2 h-4 w-4" />
															{dateNeraca?.from ? (
																dateNeraca.to ? (
																	<>
																		{format(dateNeraca.from, 'LLL dd, y')} -{' '}
																		{format(dateNeraca.to, 'LLL dd, y')}
																	</>
																) : (
																	format(dateNeraca.from, 'LLL dd, y')
																)
															) : (
																<span>Pick a date</span>
															)}
														</Button>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															initialFocus
															mode="range"
															defaultMonth={dateNeraca?.from}
															selected={dateNeraca}
															onSelect={setDateNeraca}
															numberOfMonths={2}
														/>
													</PopoverContent>
												</Popover>
											</div>
										</div>
										<div className="mt-5">
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Komoditas
											</label>
											{selectedCommodityOptionNeraca.map((option) => (
												<CheckboxOne
													key={option.value}
													text={option.label}
													name={'komoditas-neraca'}
													value={option.value}
													checked={checkboxStateNeraca[option.value] || false} // Use checkboxState to determine if checked
													onChange={() =>
														handleCheckboxChangeCommodityNeraca(option.value)
													}
												/>
											))}
										</div>
										<hr className="w-full h-1 mx-auto my-4 bg-slate-500 border-0 rounded md:my-10 dark:bg-gray-700" />
										<div className="">
											<label
												htmlFor="location"
												className="block text-sm font-medium leading-6 text-gray-900">
												Tampilkan
											</label>
											<div className="mt-2">
												<CheckboxOne
													key={'kebutuhan'}
													text={'kebutuhan'}
													name={'showHideHeader'}
													value={'kebutuhan'}
													checked={showHeader.kebutuhan}
													onChange={() => handleCheckboxChange('kebutuhan')}
												/>
											</div>
											<div className="mt-2">
												<CheckboxOne
													key={'ketersediaan'}
													text={'ketersediaan'}
													name={'showHideHeader'}
													value={'ketersediaan'}
													checked={showHeader.ketersediaan}
													onChange={() => handleCheckboxChange('ketersediaan')}
												/>
											</div>
											<div className="mt-2">
												<CheckboxOne
													key={'defisit'}
													text={'defisit'}
													name={'showHideHeader'}
													value={'defisit'}
													checked={showHeader.defisit}
													onChange={() => handleCheckboxChange('defisit')}
												/>
											</div>
										</div>
										<button
											onClick={handleSubmitNeracaPangan}
											className="mt-5 bg-[#37B5FE] w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											Submit
										</button>
									</div>
								</div> */}
							</div>
						</div>
					</div>
					<div className="col-span-3 rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
						<div
							className={`w-full  ${activeTab === 'profile' ? '' : 'hidden'}`}>
							<h1 className="text-2xl font-bold">Statistik Perubahan Harga Wilayah</h1>
							<div className="flex items-center py-4">
								<Input
									placeholder="Filter commodities..."
									value={
										(table
											.getColumn('commodity')
											?.getFilterValue() as string) ?? ''
									}
									onChange={(event) =>
										table
											.getColumn('commodity')
											?.setFilterValue(event.target.value)
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
										{table
											.getAllColumns()
											.filter((column) => column.getCanHide())
											.map((column) => (
												<DropdownMenuCheckboxItem
													key={column.id}
													className="capitalize"
													checked={column.getIsVisible()}
													onCheckedChange={(value) =>
														column.toggleVisibility(!!value)
													}>
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
											table.getRowModel().rows.map((row) => (
												<TableRow
													key={row.id}
													data-state={row.getIsSelected() && 'selected'}>
													{row
														.getVisibleCells()
														.map((cell, key) =>
															key === 0 ? (
																<TableCell key={cell.id}>
																	{flexRender(
																		cell.column.columnDef.cell,
																		cell.getContext(),
																	)}
																</TableCell>
															) : (
																<TableCell key={cell.id}>
																	{
																		row.original.dates[
																			cell.column.columnDef.header as string
																		]
																	}
																</TableCell>
															),
														)}
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
				</div>
			</DefaultLayout>
		</>
	);
}
