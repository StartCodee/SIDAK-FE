'use client';

import { CounterClockwiseClockIcon, ChevronRightIcon, ArrowDownIcon, ArrowUpIcon, ArrowRightIcon, SymbolIcon, TriangleDownIcon, TriangleUpIcon, BarChartIcon } from '@radix-ui/react-icons';
import { UserIcon, ScaleIcon, BuildingLibraryIcon, MagnifyingGlassIcon, CalendarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import MonthPicker from '@/components/ui/monthpicker';
import MapNeraca from '@/components/ui/map-neraca';
import Dialog from '@/components/ui/modal-harga';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import MapPola from '@/components/ui/map-pola';
import MapPolaPerdagangan from '@/components/ui/map-pola-perdagangan';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Hero from '@/components/ui/hero';
import Map from '@/components/ui/map';
import Select, { SingleValue } from 'react-select';
import { format, set, subDays } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";
import React from 'react';
import { SkeletonCard } from '@/components/SkeletonCard';
import BeritaSkeleton from '@/components/BeritaSkeleton';
import SmallLineChart from '@/components/SmallLineChart';
import KomoditasSkeleton from '@/components/KomoditasSkeleton';
import HargaSkeleton from '@/components/HargaSkeleton';
import StatusIndicators from '@/components/ui/status_indicator';
import HeroSearch from '@/components/hero-search';
import { Datepicker } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import db from '@/lib/db';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface cardContents {
	city: string;
	item: string;
	price: string;
	color: string;
	change: string;
	bulan: string;
	kabupaten_kota_id: string;
	komoditas_id: string;
	id: string;
}

const jenisInformasi = [
	{ value: 'harga-pangan', label: 'Harga Pangan' },
	{ value: 'neraca-pangan', label: 'Neraca Pangan' },
	{ value: 'perdagangan-pangan', label: 'Pola Perdagangan Pangan' },
];

const getCurrentDate = (): string => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan mulai dari 0, jadi perlu ditambah 1
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const back7days = (): string => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan mulai dari 0, jadi perlu ditambah 1
	const day = String(today.getDate() - 7).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

const jenisPasar = [
	{ value: 'semua-pasar', label: 'Semua Pasar' },
];

const formatDate = (date: any) => {
	return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const customTheme: CustomFlowbiteTheme["datepicker"] = {
	"root": {
		"base": "relative",
		"input": {
			field: {
				input: {
					withIcon: { on: "block", off: "hidden" },
					base: "block w-full bg-white !important border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50  text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm pl-10 rounded-lg"
				},
				icon: {
					base: "hidden"
				}
			}
		}
	},

	"popup": {
		"root": {
			"base": "absolute top-10 z-50 block pt-2",
			"inline": "relative top-0 z-auto",
			"inner": "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700"
		},
		"header": {
			"base": "",
			"title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
			"selectors": {
				"base": "mb-2 flex justify-between",
				"button": {
					"base": "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
					"prev": "",
					"next": "",
					"view": ""
				}
			}
		},
		"view": {
			"base": "p-1"
		},
		"footer": {
			"base": "mt-2 flex space-x-2",
			"button": {
				"base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
				"today": "bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
				"clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
			}
		}
	},
	"views": {
		"days": {
			"header": {
				"base": "mb-1 grid grid-cols-7",
				"title": "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
			},
			"items": {
				"base": "grid w-64 grid-cols-7",
				"item": {
					"base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-cyan-600 hover:text-white",
					"selected": "bg-cyan-700 text-white hover:bg-cyan-600",
					"disabled": "text-gray-500 bg-gray-200 cursor-not-allowed"
				}
			}
		},
		"months": {
			"items": {
				"base": "grid w-64 grid-cols-4",
				"item": {
					"base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-cyan-600 hover:text-white",
					"selected": "bg-cyan-700 text-white hover:bg-cyan-600",
					"disabled": "text-gray-500 bg-gray-200 cursor-not-allowed"
				}
			}
		},
		"years": {
			"items": {
				"base": "grid w-64 grid-cols-4",
				"item": {
					"base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-cyan-600 hover:text-white",
					"selected": "bg-cyan-700 text-white hover:bg-cyan-600",
					"disabled": "text-gray-500 bg-gray-200 cursor-not-allowed"
				}
			}
		},
		"decades": {
			"items": {
				"base": "grid w-64 grid-cols-4",
				"item": {
					"base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-cyan-600 hover:text-white",
					"selected": "bg-cyan-700 text-white hover:bg-cyan-600",
					"disabled": "text-gray-500 bg-gray-200 cursor-not-allowed"
				}
			}
		}
	}
};


export default function Home() {
	const { toast } = useToast();
	const today = new Date();
	const formattedDate = formatDate(today);

	const [visitorCount, setVisitorCount] = useState(0);

	useEffect(() => {
		const fetchVisitorCount = async () => {
			const count = await db.visitorCount.get(1);
			if (count) {
				setVisitorCount(count.count);
			}
		};

		const incrementVisitorCount = async () => {
			const count = await db.visitorCount.get(1);
			if (count) {
				const newCount = count.count + 1;
				await db.visitorCount.update(1, { count: newCount });
				fetchVisitorCount();
			}
		};

		incrementVisitorCount();
	}, []);

	const [selectedKabupatenOption, setSelectedKabupatenOption] = useState<any[]>([]);
	const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>([]);
	const [selectedValue, setSelectedValue] = useState<string>('harga-pangan');
	const [detailHargaKonsumen, setDetailHargaKonsumen] = useState<any>();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [selectedCommodityKonsumen, setSelectedCommodityKonsumen] = useState('');
	const [selectedCommodity, setSelectedCommodity] = useState<SingleValue<{ value: string; label: string }> | null>(null);
	const [selectedKabupaten, setSelectedKabupaten] = useState<SingleValue<{ value: string; label: string }> | null>(null);

	const [selectedDateKonsumen, setSelectedDateKonsumen] = useState<Date | undefined>(() => {
		const today = new Date();
		const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
		return oneMonthAgo;
	});
	const [selectedEndDateKonsumen, setSelectedEndDateKonsumen] = useState<Date | undefined>(new Date());
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const [selectedMonth, setSelectedMonth] = useState<any>();

	const [cardContents, setCardContents] = useState<cardContents[]>([]);
	const [loadingCard, setLoadingCard] = useState(true);

	const [hargaKonsumen, setHargaKonsumen] = useState<any[]>([]);

	const [cardContentsNeraca, setCardContentsNeraca] = useState<any>([]);

	const [detailData, setdetailData] = useState<any>([]);

	const [flow, setFlow] = useState<any>([]);

	const [filteredFlow, setFilteredFlow] = useState<any>([]);

	const [dashboardData, setDashboardData] = useState<any>({
		totalCommodities: 0,
		totalPasar: 0,
		totalUser: 0,
	});
	const [beritaData, setBeritaData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingKomoditas, setLoadingKomoditas] = useState(true);
	const [loadingDetail, setLoadingDetail] = useState(true);
	const [linkExportHg, setLinkExportHg] = useState('');

	const getDetailSupply = async (date: string, komoditas: string, kota: string) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/detail-data?end_date=${date}&komoditas=${komoditas}&kabupaten_kota_id=${kota}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				console.log(response.data.data);
				setdetailData(response.data.data);
				setLoadingDetail(false);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.response.data.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: 'mohon coba lagi nanti.',
				});
			}
		}
	};

	const closeDialog = () => setIsDialogOpen(false);

	const openDialog = (el: string, komoditas: string) => {
		try {
			let val = format(selectedEndDateKonsumen as any, 'yyyy-MM-dd');
			const detail = hargaKonsumen.find((item) => item.city === el && item.item === komoditas);
			console.log('ini val', val);
			setDetailHargaKonsumen(detail);
			getDetailSupply(val, detail?.komoditas_id, detail?.kabupaten_kota_id);
			setLinkExportHg(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/export-excel?date=${val}&komoditas=${detail?.komoditas_id}&kabupaten_kota_id=${detail?.kabupaten_kota_id}&export=1`);
			setIsDialogOpen(true);
		} catch (error) {
			const detail = hargaKonsumen.find((item) => item.city === el && item.item === komoditas);
			setDetailHargaKonsumen(detail);
			let val = format(selectedEndDateKonsumen as any, 'yyyy-mm-dd');
			getDetailSupply(val, detail?.komoditas_id, detail?.kabupaten_kota_id);
			setLinkExportHg(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/export-excel?date=${val}&komoditas=${detail?.komoditas_id}&kabupaten_kota_id=${detail?.kabupaten_kota_id}&export=1`);
			setIsDialogOpen(true);
		}
	};

	const handleValueChange = (e: any) => {
		setSelectedValue(e.value);
		if (e.value === 'neraca-pangan') {
			let today = selectedMonth.format('YYYY-MM');
			getNeracaPangan(today, '18');
		} else if (e.value === 'perdagangan-pangan') {
			let today = selectedMonth.format('YYYY-MM');
			getPolaPerdagangan(today, '18');
		} else {
			console.log(selectedDate)
			let today = format(selectedDate, 'yyyy-MM-dd');
			getHargaPangan(today, '18');
		}
	};

	const handleChangeMonth = () => {
		console.log('search');
		if (selectedDate || selectedMonth) {
			let commodity = selectedCommodity ? selectedCommodity.value : '';
			if (selectedValue === 'harga-pangan') {
				let val = format(selectedDate, 'yyyy-MM-dd');
				getHargaPangan(val, commodity);
			} else if (selectedValue == 'neraca-pangan') {
				let val = selectedMonth.format('YYYY-MM');
				getNeracaPangan(val, commodity);
			}
			else if (selectedValue == 'perdagangan-pangan') {
				let val = selectedMonth.format('YYYY-MM');
				getPolaPerdagangan(val, commodity);
			}
		} else {
			console.log('No date selected');
		}
	}

	const handleChangeMonthKonsumen = () => {
		if (selectedDateKonsumen) {
			let commodity = selectedCommodityKonsumen;
			let val = format(selectedDateKonsumen, 'yyyy-MM-dd');
			let val2 = format(selectedEndDateKonsumen ?? new Date(), 'yyyy-MM-dd');
			getHargaKonsumen(val, val2, selectedKabupaten?.value);
		} else {
			console.log('No date selected');
		}
	}

	const filterByClassification = (classification: string) => {
		if (classification === 'all') {
			return flow;
		} else {
			return flow.filter((item: any) => item.classification === classification);
		}
	};

	const changeTab = (tab: string) => {
		const newFilteredFlow = filterByClassification(tab);
		setFilteredFlow(newFilteredFlow);
	};

	const getHargaPangan = async (date: string = '', komoditas: string) => {
		if (!date) {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
			date = `${year}-${month}`;
		}
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/perubahan-harga?date=${date}&komoditas=${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				setCardContents(response.data.data);
				setLoadingCard(false);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.response.data.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: "mohon coba lagi nanti.",
				});
			}
		}
	};

	const getNeracaPangan = async (date: string = '', komoditas: string) => {
		if (!date) {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
			date = `${year}-${month}`;
		}
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/harga-pasokan?date=${date}&komoditas=${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				setCardContentsNeraca(response.data.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.response.data.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: "mohon coba lagi nanti.",
				});
			}
		}
	};

	const getPolaPerdagangan = async (date: string = '', komoditas: string) => {
		if (!date) {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
			date = `${year}-${month}`;
		}
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/pola-perdagangan?date=${date}&komoditas=${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				setFlow(response.data.data);
				setFilteredFlow(response.data.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.response.data.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: "mohon coba lagi nanti.",
				});
			}
		}
	};

	const getCommodityOption = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/commodities`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				const mappedOptions = response.data.data.map((kabupaten: { name: string, id: number }) => ({
					value: kabupaten.id,
					label: kabupaten.name,
				}));
				setSelectedCommodityOption(mappedOptions);
				const defaultOption = mappedOptions.find((option: { value: number; label: string }) => option.value === 18);
				console.log(defaultOption)
				setSelectedCommodity(defaultOption);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.response.data.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: "mohon coba lagi nanti.",
				});
			}
		}
	};

	const getKabupatenOption = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kabupaten`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				const mappedOptions = response.data.data.map((kabupaten: { name: string, id: number }) => ({
					value: kabupaten.id,
					label: kabupaten.name,
				}));
				setSelectedKabupatenOption(mappedOptions);
				setSelectedKabupaten(mappedOptions[0]);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.response.data.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: "mohon coba lagi nanti.",
				});
			}
		}
	};

	const getDashboard = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/dashboard`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data) {
				setDashboardData(response.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.response.data.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: "mohon coba lagi nanti.",
				});
			}
		}
	};

	const getBerita = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news?limit=4`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				setBeritaData(response.data.data);
				setLoading(false);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.response.data.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: "mohon coba lagi nanti.",
				});
			}
		}
	};

	const getHargaKonsumen = async (start_date: string = '', end_date: string = '', kabupaten_kota_id: string | undefined = undefined) => {
		if (!kabupaten_kota_id) {
			toast({
				variant: 'warning',
				title: 'Warning',
				description: "Pilih Kabupaten Kota terlebih dahulu.",
			});
			return;
		}
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/harga-konsumen?start_date=${start_date}&end_date=${end_date}&kabupaten_kota_id=${kabupaten_kota_id}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				setHargaKonsumen(response.data.data);
				setLoadingKomoditas(false);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.response.data.message,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: "mohon coba lagi nanti.",
				});
			}
		}
	};

	const [hargaKonsumenDesc, setHargaKonsumenDesc] = useState<string>('');

	const fetchDescription = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/description`);
			if (!response.ok) {
				throw new Error('Failed to fetch description');
			}
			const data = await response.json();
			setHargaKonsumenDesc(data.description);
		} catch (error) {
			console.error('Error fetching description:', error);
		}
	};

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	// detailData.header != undefined
	// console.log(detailData?.headers)
	const totalPages = Math.ceil(detailData?.headers?.length / itemsPerPage);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = detailData?.header?.slice(startIndex, endIndex);

	useEffect(() => {
		let today = getCurrentDate();


		const date = dayjs();
		setSelectedMonth(date);

		getHargaPangan(today, '18');
		let daysAgo = back7days();
		getHargaKonsumen(today, today, '7201');
		getCommodityOption();
		getKabupatenOption();
		getDashboard();
		getBerita();
		fetchDescription();
	}, []);

	return (
		<main>
			<Navbar />
			<Hero />
			<div
				className="mx-auto -mt-10 relative px-4 py-[0.4rem] sm:py-6 sm:px-8 shadow-xl w-[18rem] md:w-[44rem] sm:w-[40rem] rounded-xl md:rounded-full flex flex-col sm:flex-row items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Jenis Informasi</h1>
					<div className="flex items-center h-10">
						<Select
							styles={{
								control: (provided) => ({
									...provided,
									border: 'none',
									boxShadow: 'none',
									fontSize: '14px',
								}),
								input: (provided) => ({
									...provided,
									fontSize: '14px',
								}),
								singleValue: (provided) => ({
									...provided,
									fontSize: '14px',
								}),
								placeholder: (provided) => ({
									...provided,
									fontSize: '14px',
								}),
							}}
							components={{
								IndicatorSeparator: () => null
							}}
							onChange={(e) => handleValueChange(e)}
							className=" basic-single w-[170px] border-none"
							options={jenisInformasi}
							defaultValue={jenisInformasi[0]}
						/>
					</div>
				</div>
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Komoditas</h1>
					<div className="flex items-center h-10">
						<Select
							styles={{
								control: (provided) => ({
									...provided,
									border: 'none',
									boxShadow: 'none',
									fontSize: '14px',
								}),
								input: (provided) => ({
									...provided,
									fontSize: '14px',
								}),
								singleValue: (provided) => ({
									...provided,
									fontSize: '14px',
								}),
								placeholder: (provided) => ({
									...provided,
									fontSize: '14px',
								}),
							}}
							components={{
								IndicatorSeparator: () => null,
							}}
							onChange={(option) => setSelectedCommodity(option)}
							className="basic-single w-[170px] border-none"
							options={selectedCommodityOption}
							value={selectedCommodity}
						/>
					</div>
				</div>
				<div className="mx-4 border-l border-black/15 h-auto self-stretch sm:block" />
				<div className="flex-col flex-1">
					{selectedValue === 'harga-pangan' ? (
						<>
							<h1 className="font-bold text-sm">Tanggal</h1>
							<div className="flex items-center h-10">
								<Datepicker theme={customTheme}
									onChange={
										(date) => {
											setSelectedDate(date as any);
										}
									}
									maxDate={new Date()} />
							</div>

						</>
					) : (
						<>
							<h1 className="font-bold text-sm">Bulan</h1>
							<div className="flex items-center h-10">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker value={selectedMonth} onChange={(newValue) => setSelectedMonth(newValue as any)} views={['month', 'year']} />
								</LocalizationProvider>
							</div>
						</>

					)}

				</div>
				<Button
					onClick={handleChangeMonth}
					className="bg-blue-300 w-12 h-12 rounded-full p-2">
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>
			{selectedValue === 'harga-pangan' && (
				<section className="px-4 sm:px-2 md:px-4 lg:px-14 pt-4 space-y-4 sm:space-y-4 md:space-y-6">
					<div className="flex flex-col sm:flex-row justify-between pt-10">
						<div className="flex flex-col w-full gap-4 mb-3">
							<h1 className="text-2xl sm:text-3xl md:text-4xl mb-1 font-semibold">
								Peta Perubahan Harga
							</h1>
							{/* <Badge className="bg-green-400 text-xs sm:text-sm md:text-base rounded-full text-white gap-2">
								<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal 22
								Juli 2024
							</Badge> */}
							<div className="flex w-full bg-gray-200 rounded-lg overflow-hidden h-4">
								<div className="bg-[#17D6A9] h-full" style={{ width: "33.33%" }}></div>
								<div className="bg-[#F17A64] h-full" style={{ width: "33.33%" }}></div>
								<div className="bg-[#ED4527] h-full" style={{ width: "33.33%" }}></div>
							</div>
							<div className="flex justify-between">
								<p>Harga Terendah</p>
								<p>Harga Tertinggi</p>
							</div>
						</div>
					</div>
					{/* <div className="flex flex-col lg:flex-row items-center md:px-40 lg:px-96">
						<div className="h-full w-full">
							<Map cardContents={cardContents} />
						</div>
					</div> */}
					<center className="container">
						<Map cardContents={cardContents} />
					</center>
					<Badge className="bg-[#3AC1DF] text-xs sm:text-sm md:text-base rounded-full text-white">
						<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal {formattedDate}
					</Badge>
					<Carousel
						opts={{
							align: "start",
						}}
						plugins={[
							Autoplay({
								delay: 2000,
							}),
						]}
						className="w-full"
					>
						<CarouselContent>

							{cardContents.map((content, index) => (
								<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
									<Card
										key={index}
										className="flex rounded-2xl px-6 items-center shadow-md h-[139px] w-[358px] justify-between placeholder-sky-400 ">
										<div style={{ flex: 2 }}>
											<h1 className="text-md">{content.city}</h1>
											<p className="text-[20px] font-bold">Rp {parseInt(content.price).toLocaleString()}/Kg</p>
											{content.color === '#bf7070' ? (
												<p>Increase</p>
											) : content.color === '#f1be5b' ? (
												<p>Decrease</p>
											) : (
												<p>Stable</p>
											)}

										</div>
										<div className="flex flex-col">
											<div
												className={`rounded-xl p-2 self-center text-center  font-bold text-[12px] items-center flex text-white`}
												style={{ background: content.color }}>
												{content.color === '#bf7070' ? (
													<ArrowUpIcon width={42} height={42} />
												) : content.color === '#f1be5b' ? (
													<ArrowDownIcon width={42} height={42} />
												) : (
													<SymbolIcon width={42} height={42} />
												)}
											</div>
											{content.change}
										</div>

									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
					<Link href="/harga-pangan" className=" self-start sm:self-end">
						<p className="mt-4 text-xs sm:text-sm self-end md:text-md text-blue-900 font-bold flex items-center">
							Data Selengkapnya
							<ChevronRightIcon width={20} height={20} />
						</p>
					</Link>
				</section>

			)}
			{selectedValue === 'neraca-pangan' && (
				<>
					<MapNeraca cardContents={cardContentsNeraca} />
				</>
			)}
			{selectedValue === 'perdagangan-pangan' && (
				<>
					<Tabs defaultValue="all">
						<section className="px-4 sm:px-2 md:px-4 lg:px-14 pt-4 space-y-4 sm:space-y-4 md:space-y-6">
							<div className="flex flex-col sm:flex-row justify-between pt-10 mb-3">
								<div className="flex-col mb-3">
									<h1 className="text-2xl sm:text-3xl md:text-4xl mb-3 font-semibold">
										Commodity Flow
									</h1>
									<Badge className="bg-green-400 text-xs sm:text-sm md:text-base rounded-full text-white gap-2">
										<CounterClockwiseClockIcon /> Harga diperbaharui pada
										tanggal {formattedDate}
									</Badge>
								</div>
								<TabsList className="rounded-full  p-4 py-6 w-max text-black">
									<div
										onClick={() => {
											changeTab('all');
										}}>
										<TabsTrigger className="rounded-full text-md font-bold" value="all">
											All
										</TabsTrigger>
									</div>
									<div
										onClick={() => {
											changeTab('intra');
										}}>
										<TabsTrigger className="rounded-full text-md font-bold" value="intra">
											Intra
										</TabsTrigger>
									</div>
									<div
										onClick={() => {
											changeTab('out');
										}}>
										<TabsTrigger className="rounded-full text-md font-bold" value="out">
											Out
										</TabsTrigger>
									</div>
								</TabsList>
							</div>
						</section>
					</Tabs>
					{/* <MapPola flow={filteredFlow} /> */}
					<center className="container">
						<MapPolaPerdagangan cardContents={filteredFlow} />
					</center>
				</>
			)}
			<section className=" px-4 sm:px-8 md:px-10 lg:px-16 pt-4 ">
				<br />
				{/* <h1 className="text-sm pb-10 p-0 sm:text-sm md:text-md">
					*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar
				</h1> */}
				{/* <div className="h-1 rounded-lg  my-10 w-full bg-black/10 z-0"></div> */}
				<div style={{ marginTop: '60px' }}>
					<h1 className="font-semibold text-center px-8 mt-1 mb-8 text-lg sm:text-xl md:text-2xl lg:text-3xl items-center">
						Harga Konsumen Pangan Strategis Sulawesi Tengah
					</h1>
					<div className="mx-auto mb-12 z-1 relative px-4 py-[0.4rem] sm:py-6 sm:px-8 shadow-md w-[20rem] space-y-2 lg:w-[60rem] rounded-xl lg:rounded-full flex flex-col lg:flex-row items-center lg:justify-between bg-white ">
						<div className="flex-col flex-1">
							<h1 className="font-bold text-xs mb-1">Jenis Pasar</h1>
							<Select
								styles={{
									control: (provided) => ({
										...provided,
										border: 'none',
										boxShadow: 'none',
									}),
								}}
								components={{
									IndicatorSeparator: () => null
								}}
								className=" basic-single w-[170px] border-none"
								options={jenisPasar}
								defaultValue={jenisPasar[0]}
								isDisabled
							/>
						</div>
						{/* <div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" /> */}
						{/* <div className="flex-col flex-1">
						<h1 className="font-bold text-xs mb-1">Komoditas</h1>
						<Select
							styles={{
								control: (provided) => ({
									...provided,
									border: 'none',
									boxShadow: 'none',
								}),
							}}
							components={{
								IndicatorSeparator: () => null
							}}
							onChange={(e) => handleValueChangeKonsumen(e)}
							className=" basic-single w-[170px] border-none"
							options={selectedCommodityOption}
						/>
					</div> */}
						<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
						<div className="flex-col flex-1">
							<h1 className="font-bold text-xs mb-1 ">Kabupaten/Kota</h1>
							<Select
								styles={{
									control: (provided) => ({
										...provided,
										border: 'none',
										boxShadow: 'none',
									}),
								}}
								components={{
									IndicatorSeparator: () => null
								}}
								onChange={(option) => setSelectedKabupaten(option)}
								className=" basic-single w-[170px] border-none"
								options={selectedKabupatenOption}
								value={selectedKabupaten}
							/>
						</div>
						<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
						<div className="flex-col flex-1">
							<h1 className="font-bold text-xs mb-1 ">Dari Tanggal</h1>
							<Datepicker theme={customTheme} onChange={
								(date) => {
									setSelectedDateKonsumen(date as any);
								}
							} value={selectedDateKonsumen} maxDate={new Date()} />
						</div>
						<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
						<div className="flex-col flex-1">
							<h1 className="font-bold text-xs mb-1 ">Sampai Tanggal</h1>
							<Datepicker theme={customTheme} onChange={
								(date) => {
									setSelectedEndDateKonsumen(date as any);
								}
							} value={selectedEndDateKonsumen} maxDate={new Date()} />
						</div>
						<Button
							onClick={handleChangeMonthKonsumen}
							className="bg-blue-300 w-12 h-12 rounded-full p-2">
							<MagnifyingGlassIcon
								className="text-white"
								width={24}
								height={24}
							/>
						</Button>
					</div>

					<center>
						<div className="flex  justify-center items-start  flex-wrap gap-5 ">
							{loadingKomoditas ? (
								<KomoditasSkeleton />
							) : (
								hargaKonsumen.map((content, index) => {
									const last7DaysData = Array.from({ length: 8 }, (_, i) => {
										const date = format(subDays(selectedEndDateKonsumen as any, i), 'yyyy-MM-dd');
										return content.last7DaysPrices[date] || 0;
									}).reverse(); // Reverse to start with the oldest date first

									// Menghitung persentase volatilitas per hari
									const volatilityPercentages = last7DaysData.map((price, i, arr) => {
										if (i > 0 && arr[i - 1] !== 0) {
											// Hitung persentase perubahan jika hari sebelumnya bukan 0
											return ((price - arr[i - 1]) / arr[i - 1]) * 100;
										}
										return 0; // Jika tidak ada hari sebelumnya, set persentase ke 0
									});

									// Menghitung volatilitas tertinggi (maksimum persentase perubahan)
									const highestVolatility = Math.max(...volatilityPercentages.map(Math.abs));

									// Menentukan warna lonceng berdasarkan tingkat volatilitas
									let bellColor = 'fill-green-500'; // Default hijau untuk volatilitas rendah
									if (highestVolatility > 10) {
										bellColor = 'fill-red-500'; // Merah untuk volatilitas tinggi
									} else if (highestVolatility > 5) {
										bellColor = 'fill-yellow-500'; // Kuning untuk volatilitas sedang
									}

									return (
										// <Card
										// 	onClick={() => {
										// 		openDialog(content.city, content.item);
										// 	}}
										// 	key={index}
										// 	className="flex-col rounded-3xl w-[18rem] p-4 shadow-xl cursor-pointer relative">
										// 	<div className="flex items-center space-x-4">
										// 		<div>
										// 			<Image
										// 				src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${content.image}`}
										// 				alt="user"
										// 				width={50}
										// 				height={50}
										// 				className="rounded-full"
										// 			/>
										// 		</div>
										// 		<div className="" style={{ height: '80px' }}>
										// 			<h1 className="ms-2 text-left font-bold text-lg">
										// 				{content.item.split(' ')[0]}
										// 			</h1>
										// 			<p className="text-left ms-2">
										// 				{content.item.split(' ').slice(1).join(' ')}
										// 			</p>
										// 			<p className="text-left ms-2 font-bold">
										// Rp{' '}
										// {Math.round(content?.price as any)
										// 	.toString()
										// 	.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										// 			</p>
										// 		</div>
										// 		<div className="absolute top-2 right-2">
										// 			<SmallLineChart data={last7DaysData} />
										// 		</div>
										// 	</div>
										// 	<div className="h-1 rounded-lg bg-black/10 my-2"></div>
										// 	<div className="flex justify-between items-center">
										// 		<p style={{ fontSize: '12px' }}>{highestVolatility.toFixed(0)}%</p> {/* Tampilkan persentase volatilitas */}
										// 		<p className="text-xs font-thin">PERCENTAGE VOLATILITY</p>
										// 		<svg
										// 			xmlns="http://www.w3.org/2000/svg"
										// 			viewBox="0 0 24 24"
										// 			fill="currentColor"
										// 			className={`size-4 ${bellColor}`}>
										// 			<path
										// 				fillRule="evenodd"
										// 				d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
										// 				clipRule="evenodd"
										// 			/>
										// 		</svg>
										// 	</div>
										// </Card>
										<Card onClick={() => {
											openDialog(content.city, content.item);
										}}
											key={index} className="rounded-3xl p-6 bg-white shadow-lg w-[300px] cursor-pointer">
											<div className="flex items-center gap-4">
												<Image
													src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${content.image}`}
													alt="user"
													width={50}
													height={50}
													className="rounded-lg"
												/>
												<div className='text-left'>
													<h2 className="text-2xl font-bold">{content.item.split(' ')[0]}</h2>
													<p className="text-xl font-medium">Rp{' '}
														{Math.round(content?.price as any)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
												</div>
											</div>

											<div className="mt-4 flex flex-col gap-4">

												{/* progress bar */}
												{/* <div className='w-full bg-gray rounded-md h-2'></div> */}
												<div className="flex w-full bg-gray-200 rounded-lg overflow-hidden h-2">
													<div className="h-full" style={{ width: content.change, background: content.color }}></div>
													<div className="bg-[#D9D9D9] h-full" style={{ width: "100%" }}></div>
												</div>
												<div className="flex justify-between" style={{ color: content.color }}>
													<div className="flex items-center gap-2 text-sm">
														<span>0%</span>
														<span className='w-2 h-2 rounded-full' style={{ background: content.color }}></span>
														<span>Rp{' '}
															{Math.round(content?.price as any)
																.toString()
																.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>

													</div>
													<span className='flex items-center gap-1' >
														{/* <SmallLineChart data={last7DaysData} />  */}
														{content.color === '#bf7070' ? (
															<ArrowUpIcon width={15} height={15} />
														) : content.color === '#f1be5b' ? (
															<ArrowDownIcon width={15} height={15} />
														) : (
															<SymbolIcon width={15} height={15} />
														)}Neutral</span>
												</div>
												<p className="text-gray-600">Volatile Percentage</p>
											</div>
										</Card>
									);
								})
							)}

						</div>
					</center>

					<StatusIndicators />
					<p className="text-center w-full sm:w-11/12 mx-auto m-8">
						{hargaKonsumenDesc}
					</p>
				</div>
			</section>
			<section className="px-4 sm:px-2 md:px-4 lg:px-14 pt-4 space-y-4 sm:space-y-4 md:space-y-6">
				<div className="flex justify-between">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
						Berita Terbaru
					</h1>
					<Link href={`/berita`} className='flex gap-2 items-center text-[#3AC1DF]'>
						Lihat Semua <ArrowRightIcon />
					</Link>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-center">
					{loading ? (
						<BeritaSkeleton />
					) : (
						beritaData.map((item) => (
							<Link href={`/berita/${item.id}`} passHref key={item.id} className="w-full flex flex-col gap-4 items-center">
								<div className="w-full h-full">
									<Image
										src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${item.image}`}
										className="rounded-2xl w-full h-full object-cover"
										alt="berita"
										width={500}
										height={250}
									/>
								</div>
								<div className="flex flex-col gap-2 w-full">
									<p className="flex gap-2 items-center">
										<span className="w-2 h-2 rounded-full bg-[#3AC1DF]"></span>
										<CalendarIcon className="text-[#3AC1DF]" width={20} height={20} />
										{new Date(item.created_at).toLocaleDateString('id-ID', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</p>
									<h2 className="text-lg lg:text-xxl font-semibold text-black line-clamp-3">
										{item.title}
									</h2>
									<p className="text-md lg:text-base line-clamp-3">
										{item.content}
									</p>
								</div>
							</Link>
						))
					)}
				</div>
				{/* <div className="h-1 rounded-lg mt-10 bg-black/10 z-0"></div> */}
			</section>
			<section className="mt-12 px-4 sm:px-8 md:px-20 pt-4 space-y-8 py-8 mb-35">
				<h1 className='text-3xl font-bold text-[#3AC1DF] text-center'>Statistik Kunjungan, Komoditas, dan Pasar</h1>
				<div className="flex justify-center">
					<p className='text-center w-2/3'>Jelajahi opsi statistik kunjungan, komoditas, dan pasar yang dirancang untuk memenuhi kebutuhan Anda. Temukan keseimbangan sempurna antara kualitas dan keandalan.</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-30 -mt-50 px-10 relative">
					<Card className="flex justify-between items-center p-4 rounded-xl gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-[#3AC1DF] p-2 rounded-md">
								<UserIcon width={30} height={30} className="text-white" />
							</div>
							<div>
								<h1 className="text-md font-bold">3928 Kunjungan</h1>
								<p>Jumlah user yang mengunjungi Sidak</p>
							</div>
						</div>
					</Card>
					<Card className="flex justify-between items-center p-4 rounded-xl gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-[#3AC1DF] p-2 rounded-md">
								<ScaleIcon width={30} height={30} className="text-white" />
							</div>
							<div>
								<h1 className="text-md font-bold">30 Komoditas</h1>
								<p>Jumlah Komoditas di sulawesi Tengah</p>
							</div>
						</div>
					</Card>
					<Card className="flex justify-between items-center p-4 rounded-xl gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-[#3AC1DF] p-2 rounded-md">
								<BuildingLibraryIcon
									width={30}
									height={30}
									className="text-white"
								/>
							</div>
							<div>
								<h1 className="text-md font-bold">60 Pasar</h1>
								<p>Jumlah Pasar di sulawesi Tengah</p>
							</div>
						</div>
					</Card>
				</div>
			</section>
			<Footer />
			<Dialog isOpen={isDialogOpen} onClose={closeDialog}>
				<div className="mt-2 overflow-y-auto max-h-132.5 md:max-h-full">
					<div className="shadow-lg overflow-hidden px-4 sm:px-10 rounded-lg p-4">
						<div className="flex flex-col space-y-10">
							<div className="flex justify-between">
								<h1 className="sm:text-xl text-lg font-bold">
									Perkembangan Harga Harian : {detailHargaKonsumen?.item}
								</h1>
								<button
									className=" text-black text-4xl hover:text-gray-700"
									onClick={closeDialog}>
									×
								</button>
							</div>
							<div className="flex md:flex-row flex-wrap sm:flex-nowrap justify-around space-y-4 sm:space-y-0 gap-5">
								<div className="shadow-lg w-[10rem] sm:w-[20rem] p-4  text-sm lg:text-lg flex items-center gap-4  rounded-lg">
									<div className='w-full'>

										<p className="text-[10px] font-bold  lg:text-lg">
											Harga
										</p>
										<p>
											Rp{' '}
											{Math.round(detailHargaKonsumen?.price as any)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</p>
										<div className='flex items-center gap-1'>
											<div className='w-2 h-2 rounded-full bg-[#ED4527]'></div>
											<p>increase</p>
										</div>
									</div>
									<div className="flex flex-col items-center rounded-lg">
										<div
											className={`rounded-xl p-3 bg-[#ED4527] self-center text-center  font-bold text-[20px] items-center flex text-white`}
										>
											<TriangleUpIcon color="white" width={50} height={50} />
										</div>
										<p>
											{detailHargaKonsumen?.change}
										</p>
									</div>
								</div>
								<div className="shadow-lg w-[10rem] sm:w-[20rem] p-4  text-sm lg:text-lg flex items-center gap-4  rounded-lg">
									<div>

										<p className="text-[10px] font-bold lg:text-lg">
											Harga Rata - Rata <span className='font-normal'>
												(MtM)
											</span>
										</p>
										<p>
											Rp{' '}
											{Math.round(detailHargaKonsumen?.price as any)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</p>
										<div className='flex items-center gap-1'>
											<div className='w-2 h-2 rounded-full bg-[#ED4527]'></div>
											<p>increase</p>
										</div>
									</div>
									<div className="flex flex-col items-center rounded-lg">
										<div
											className={`rounded-xl p-3 bg-[#ED4527] self-center text-center  font-bold text-[20px] items-center flex text-white`}
										>
											<TriangleUpIcon color="white" width={50} height={50} />
										</div>
										<p>
											{detailHargaKonsumen?.change}
										</p>
									</div>
								</div>
								{/* <div className="shadow-lg w-[10rem] sm:w-[20rem] p-4  text-sm lg:text-lg flex flex-col rounded-lg">
									<p className="text-[10px] lg:text-lg">Volatilitas </p>
									<h1 className="font-bold text-[10px] lg:text-lg">
										<div className="flex justify-between items-center">
											<div>{detailHargaKonsumen?.volatility}</div>
											<div className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="red"
													className="size-10">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
													/>
												</svg>
											</div>
										</div>
									</h1>
								</div> */}
								<div className="shadow-lg w-[10rem] sm:w-[20rem] p-4  text-sm lg:text-lg flex items-center gap-4  rounded-lg">
									<div className='w-full'>

										<p className="text-[10px] font-bold  lg:text-lg">
											Volatilitas
										</p>
										<p>
											Rp{' '}
											{detailHargaKonsumen?.volatility}
										</p>
										<div className='flex items-center gap-1'>
											<div className='w-2 h-2 rounded-full bg-[#ED4527]'></div>
											<p>increase</p>
										</div>
									</div>
									<div className="flex flex-col items-center rounded-lg">
										<div
											className={`rounded-xl p-3 bg-[#ED4527] self-center text-center  font-bold text-[20px] items-center flex text-white`}
										>
											<BarChartIcon color="white" width={50} height={50} />
										</div>
										<p>
											{detailHargaKonsumen?.change}
										</p>
									</div>
								</div>
							</div>

						</div>
						<div className="flex flex-col gap-4 mt-11">
							<div className='flex justify-between items-center'>
								<h1 className="sm:text-2xl text-lg font-bold mb-3">
									Tabel Harga Harian
								</h1>
								<Button onClick={() => { window.open(linkExportHg, '_blank'); }}
									className="bg-[#17D6A9] text-white hover:scale-110 hover:bg-green-300 rounded-full cursor-pointer"
									asChild>

									<span className="self-end inline-flex items-center rounded-full bg-[#17D6A9] px-2 py-1 text-xs font-medium text-white  ring-1 ring-inset ring-green-600/20">
										<ArrowDownTrayIcon />
										Export
									</span>
								</Button>
							</div>
							<div className="overflow-x-auto">
								<table className="min-w-full bg-white text-[16px] rounded-md">
									<thead className='text-[16px] font-thin border-none rounded-md'>
										<tr className='border-none text-[16px] font-light'>
											<th className="px-4 py-2  bg-[#F6F9FA] font-normal">Subjek</th>
											{detailData.headers != undefined && detailData.headers.map((item: any, index: any) => (
												<th key={index} className="px-4 py-2 font-normal bg-[#F6F9FA]">
													{item}
												</th>
											))}
										</tr>
									</thead>
									<tbody className='border-none rounded-md'>
										{loadingDetail ? (
											// Tampilkan loading jika data sedang dimuat
											<tr>
												<td colSpan={9} className="px-4 py-2  text-center">
													Loading...
												</td>
											</tr>
										) : (
											<>
												{detailData.kabupatenData != undefined && detailData.kabupatenData.dates.length > 0 ? (
													<tr>
														<td className="px-4 py-2 ">
															<h2>{detailHargaKonsumen?.city}</h2>
														</td>
														{detailData.kabupatenData.dates.map((kabupatenDate: any, index: number) => (
															<td className="px-4 py-2 " key={index}>
																<h2>
																	{kabupatenDate.harga !== "-"
																		? `Rp ${kabupatenDate.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
																		: "-"}
																</h2>
															</td>
														))}
													</tr>
												) : null}
												{/* <tr>
													<td className="px-4 py-2  bg-blue-300" colSpan={9}></td>
												</tr> */}
												{detailData.pasarData != undefined && Object.keys(detailData.pasarData).length > 0 ? (
													Object.entries(detailData.pasarData).map(([pasarName, pasarDetails]: [string, any], pasarIndex: number) => (
														<tr key={pasarIndex}>
															<td className="px-4 py-2 ">
																<h2>{pasarName !== "null" ? pasarName : detailHargaKonsumen?.city}</h2>
															</td>
															{detailData.headers != undefined &&
																detailData.headers.map((headerDate: any, headerIndex: any) => {
																	const dateItem = pasarDetails.dates.find((date: any) => date.date === headerDate);
																	return (
																		<td className="px-4 py-2 " key={headerIndex}>
																			<h2>
																				{dateItem && dateItem.harga !== "-"
																					? `Rp ${dateItem.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
																					: "-"}
																			</h2>
																		</td>
																	);
																})}
														</tr>
													))
												) : (
													<tr key="1">
														<td className="px-4 py-2  text-center" colSpan={detailData.headers?.length + 1}>
															Data Kosong
														</td>
													</tr>
												)}
											</>
										)}
									</tbody>
									<tfoot>
										{loadingDetail ? (
											<tr>
												<td colSpan={9} className="px-4 py-2  text-center">

												</td>
											</tr>
										) : (
											<>
												<td colSpan={detailData.headers != undefined ? detailData.headers.length - 1 : undefined} className="px-4 py-2 ">
													<span className=''>{currentPage} - 10 of {totalPages}</span>
												</td>
												<td>
													<button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded-md mr-2">
														Previous
													</button>
												</td><td>
													<button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 rounded-md ml-2">
														Next
													</button>
												</td></>
										)}
									</tfoot>
								</table>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</main>
	);
}
