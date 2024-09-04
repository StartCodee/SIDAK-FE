'use client';

import { CounterClockwiseClockIcon, ChevronRightIcon, ArrowDownIcon, ArrowUpIcon, SymbolIcon, TriangleDownIcon, TriangleUpIcon, BellIcon } from '@radix-ui/react-icons';
import { UserIcon, ScaleIcon, BuildingLibraryIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import MonthPicker from '@/components/ui/monthpicker';
import MapNeraca from '@/components/ui/map-neraca';
import Dialog from '@/components/ui/modal-harga';
import { Button } from '@/components/ui/button';

import MapPola from '@/components/ui/map-pola';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Hero from '@/components/ui/hero';
import Map from '@/components/ui/map';
import Select from 'react-select';
import { format, set,subDays } from 'date-fns';
import Swal from "sweetalert2";
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";
import React from 'react';
import { SkeletonCard } from '@/components/SkeletonCard';
import BeritaSkeleton from '@/components/BeritaSkeleton';
import SmallLineChart from '@/components/SmallLineChart';
import KomoditasSkeleton from '@/components/KomoditasSkeleton';
import HargaSkeleton from '@/components/HargaSkeleton';

interface cardContents {
	city: string;
	item: string;
	price: string;
	color: string;
	kabupaten_kota_id: string;
	komoditas_id: string;
	change: string;
	bulan: string;
	id: string;
}

const jenisInformasi = [
	{ value: 'harga-pangan', label: 'Harga Pangan' },
	{ value: 'neraca-pangan', label: 'Neraca Pangan' },
	{ value: 'perdagangan-pangan', label: 'Pola Perdagangan Pangan' },
];

const jenisPasar = [
	{ value: 'semua-pasar', label: 'Semua Pasar' },
];

const formatDate = (date: any) => {
	return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function Home() {
	const today = new Date();
	const formattedDate = formatDate(today);

	const [selectedKabupatenOption, setSelectedKabupatenOption] = useState<any[]>([]);
	const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>([]);
	const [selectedValue, setSelectedValue] = useState<string>('harga-pangan');
	const [detailHargaKonsumen, setDetailHargaKonsumen] = useState<any>();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [selectedCommodityKonsumen, setSelectedCommodityKonsumen] = useState('');
	const [selectedCommodity, setSelectedCommodity] = useState('');
	const [selectedKabupaten, setSelectedKabupaten] = useState('');

	const [selectedDateKonsumen, setSelectedDateKonsumen] = React.useState<Date>();
	const [selectedDate, setSelectedDate] = React.useState<Date>();
	const [selectedOption, setSelectedOption] = useState<any[]>([]);

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
	const [linkExportHg, setLinkExportHg] = useState('');


	const getDetailSupply = async (date: string, komoditas: string, kota: string) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/detail-data?date=${date}&komoditas=${komoditas}&kabupaten_kota_id=${kota}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				console.log(response.data.data);
				setdetailData(response.data.data);
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

	const closeDialog = () => setIsDialogOpen(false);

	const openDialog = (el: string, komoditas: string) => {

		try {
			let val = format(selectedDateKonsumen as any, 'yyyy-MM')
			const detail = hargaKonsumen.find((item) => item.city === el && item.item === komoditas);
			setDetailHargaKonsumen(detail);

			getDetailSupply(val, detail?.komoditas_id, detail?.kabupaten_kota_id);
			setLinkExportHg(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/export-excel?komoditas=${detail?.komoditas_id}&kabupaten_kota_id=${detail?.kabupaten_kota_id}&export=1`);
			setIsDialogOpen(true);
		} catch (error) {
			const detail = hargaKonsumen.find((item) => item.city === el && item.item === komoditas);
			setDetailHargaKonsumen(detail);
			let val = format(new Date(), 'yyyy-MM');

			getDetailSupply(val, detail?.komoditas_id, detail?.kabupaten_kota_id);
			setLinkExportHg(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/export-excel?komoditas=${detail?.komoditas_id}&kabupaten_kota_id=${detail?.kabupaten_kota_id}&export=1`);
			setIsDialogOpen(true);
		}

	};

	const handleValueChange = (e: any) => {
		setSelectedValue(e.value);
		if (e.value === 'neraca-pangan') {
			getNeracaPangan('', '18');
		}
		else if (e.value === 'perdagangan-pangan') {
			getPolaPerdagangan('', '18');
		} else {
			getHargaPangan('', '18');
		}
	};

	const handleValueChangeKonsumen = (e: any) => {
		setSelectedKabupaten(e.value);
	};

	const handleChangeMonth = () => {
		console.log('search');
		if (selectedDate) {
			let commodity = selectedCommodity;
			let val = format(selectedDate, 'yyyy-MM');
			if (selectedValue === 'harga-pangan') {
				getHargaPangan(val, commodity);
			} else if (selectedValue == 'neraca-pangan') {
				getNeracaPangan(val, commodity);
			}
			else if (selectedValue == 'perdagangan-pangan') {
				getPolaPerdagangan(val, commodity);
			}
		} else {
			console.log('No date selected');
		}
	}

	const handleChangeMonthKonsumen = () => {
		if (selectedDateKonsumen) {
			let commodity = selectedCommodityKonsumen;
			let val = format(selectedDateKonsumen, 'yyyy-MM');
			getHargaKonsumen(val, selectedKabupaten);
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

	const getBerita = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news?limit=3`, {
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

	const getHargaKonsumen = async (date: string = '', kabupaten_kota_id: string) => {
		if (!date) {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
			date = `${year}-${month}`;
		}
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/harga-konsumen?date=${date}&kabupaten_kota_id=${kabupaten_kota_id}`, {
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

	useEffect(() => {
		getHargaPangan('', '18');
		getHargaKonsumen('', '7201');
		getCommodityOption();
		getKabupatenOption();
		getDashboard();
		getBerita();
	}, []);

	return (
		<main>
			<Navbar />
			<Hero />
			<div
				style={{ marginTop: '-40px' }}
				className="mx-auto z-1 relative px-4 py-[0.4rem] sm:py-2 sm:px-8 shadow-xl w-[18rem] md:w-[40rem] sm:w-[40rem] rounded-xl md:rounded-full flex flex-col sm:flex-row items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Jenis Informasi</h1>
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
						onChange={(e) => handleValueChange(e)}
						className=" basic-single w-[170px] border-none"
						options={jenisInformasi}
					/>
				</div>
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Komoditas</h1>
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
						onChange={(option) => setSelectedCommodity(option!.value)}
						options={selectedCommodityOption}
					/>
				</div>
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1 ">Bulan</h1>
					<MonthPicker date={selectedDate} setDate={setSelectedDate} />
				</div>
				<Button
					onClick={handleChangeMonth}
					className="bg-blue-300 rounded-full p-2">
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>
			{selectedValue === 'harga-pangan' && (
				<section className="px-4 sm:px-8 md:px-10 lg:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
					<div className="flex flex-col sm:flex-row justify-between pt-10">
						<div className="flex-col">
							<h1 className="text-2xl sm:text-3xl md:text-4xl mb-1 font-extrabold">
								PETA PERUBAHAN HARGA
							</h1>
							<Badge className="bg-green-400 text-xs sm:text-sm md:text-base rounded-full text-white gap-2">
								<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal{' '}
								{formattedDate}
							</Badge>
						</div>
						<div></div>
					</div>
					<div className="flex gap-10 flex-col lg:flex-row justify-around items-center">
						<div className="h-full w-full ">
							<Map cardContents={cardContents} />
						</div>
						<div className="lg:flex-col  flex-col self-center flex flex-wrap gap-4 lg:self-start">
							{loadingCard ? (
								<HargaSkeleton />
							) : (
								cardContents.slice(0, 5).map((content, index) => (
									<Card
										key={index}
										className="flex rounded-2xl px-6 py-4 space-x-4 w-[350px]  justify-between placeholder-sky-400 ">
										<div style={{ flex: 2 }}>
											<h1 className="text-xs">{content.city}</h1>
											<p className="text-2xl font-bold">
												Rp{' '}
												{Math.round(content?.price as any)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
												/Kg
											</p>
										</div>
										<div style={{ flex: 1 }} className="flex justify-end">
											<div
												className={`rounded-md p-0 px-2 m-0 font-bold text-[12px] items-center flex text-white`}
												style={{ background: content.color }}>
												{content.color === '#bf7070' ? (
													<ArrowUpIcon width={20} height={20} />
												) : content.color === '#f1be5b' ? (
													<ArrowDownIcon width={20} height={20} />
												) : (
													<SymbolIcon width={20} height={20} />
												)}
												<span className="ml-1">{content.change}</span>
											</div>
										</div>
									</Card>
								))
							)}
							<Link href="/harga-pangan" className="self-start sm:self-end">
								<p className="text-xs sm:text-sm self-end md:text-md text-blue-900 font-bold flex items-center">
									Data Selengkapnya
									<ChevronRightIcon width={20} height={20} />
								</p>
							</Link>
						</div>
					</div>
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
						<section className="px-4 sm:px-8 md:px-10 lg:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
							<div className="flex flex-col sm:flex-row justify-between pt-10">
								<div className="flex-col mb-3">
									<h1 className="text-2xl sm:text-3xl md:text-4xl mb-3 font-extrabold">
										COMMODITY FLOW
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
					<MapPola flow={filteredFlow} />
				</>
			)}
			<section className=" px-4 sm:px-8 md:px-10 lg:px-50 pt-4 ">
				<br />
				<h1 className="text-sm pb-10 p-0 sm:text-sm md:text-md">
					*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar
				</h1>
				<div className="h-1 rounded-lg  my-10 bg-black/10 z-0"></div>
				<div className="mx-auto z-1 relative -mt-20 px-4 py-[0.4rem] sm:py-2 sm:px-8 shadow-xl w-[18rem] space-y-2 lg:w-[55rem] rounded-xl lg:rounded-full flex flex-col lg:flex-row items-center lg:justify-between bg-white ">
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1">Jenis Pasar</h1>
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
						/>
					</div>
					<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1">Komoditas</h1>
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
					</div>
					<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1 ">Kabupaten/Kota</h1>
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
							onChange={(option) => setSelectedKabupaten(option!.value)}
							className=" basic-single w-[170px] border-none"
							options={selectedKabupatenOption}
						/>
					</div>
					<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1 ">Bulan</h1>
						<MonthPicker
							date={selectedDateKonsumen}
							setDate={setSelectedDateKonsumen}
						/>
					</div>
					<Button
						onClick={handleChangeMonthKonsumen}
						className="bg-blue-300 rounded-full p-2">
						<MagnifyingGlassIcon
							className="text-white"
							width={24}
							height={24}
						/>
					</Button>
				</div>
				<div style={{ marginTop: '60px' }}>
					<h1 className="text-center px-8 mt-1 mb-10 text-blue-800 text-lg sm:text-xl md:text-2xl items-center">
						Harga Konsumen Pangan Strategis Sulawesi Tengah
					</h1>
					<center>
						<div className="flex lg:justify-center justify-center items-start self-center  flex-wrap gap-10 ">
							{loadingKomoditas ? (
								<KomoditasSkeleton />
							) : (
								hargaKonsumen.map((content, index) => {
									const last7DaysData = Array.from({ length: 7 }, (_, i) => {
										const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
										return content.last7DaysPrices[date] || 0;
									}).reverse(); // Reverse to start with the oldest date first

									return (
										<Card
											onClick={() => {
												openDialog(content.city, content.item);
											}}
											key={index}
											className="flex-col rounded-3xl w-[18rem] p-4 shadow-xl cursor-pointer relative">
											<div className="flex items-center space-x-4">
												<div>
													<Image
														src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${content.image}`}
														alt="user"
														width={50}
														height={50}
														className="rounded-full"
													/>
												</div>
												<div className="" style={{ height: '80px' }}>
													<h1 className="ms-2 text-left font-bold text-lg">
														{content.item.split(' ')[0]}
													</h1>
													<p className="text-left ms-2">
														{content.item.split(' ').slice(1).join(' ')}
													</p>
													<p className="text-left ms-2 font-bold">
														Rp{' '}
														{Math.round(content?.price as any)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													</p>
												</div>
												<div className="absolute top-2 right-2">
													<SmallLineChart data={last7DaysData} />
												</div>
											</div>
											<div className="h-1 rounded-lg bg-black/10 my-2"></div>
											<div className="flex justify-between items-center">
												<p>50</p>
												<p className="text-xs font-thin">
													DAY IN HIGH VOLATILITY
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="currentColor"
													className="size-4 fill-red-500">
													<path
														fillRule="evenodd"
														d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
										</Card>
									);
								})
							)}
						</div>
					</center>
					<div className="w-full mt-3 flex justify-end mb-10">
						<div className="flex gap-1">
							<div className="w-[24px] h-[24px] bg-[#76bf70]"></div>
							<div className="w-[24px] h-[24px] bg-[#f1be5b]"></div>
							<div className="w-[24px] h-[24px] bg-red-500"></div>
						</div>
					</div>
					<p className="text-center w-full sm:w-11/12 mx-auto m-8">
						Perubahan harga telah terjadi pada beberapa komoditas pangan
						strategis di beberapa kota/kabupaten di Provinsi Sulawesi Tengah
						sehingga mempengaruhi harga rata-rata pangan strategis Provinsi
						Sulawesi Tengah. Berdasarkan informasi diatas, pada tanggal
						24/06/2024 kenaikan dialami oleh komoditas . Untuk mengetahui detail
						harga per kota/kabupaten pada masing-masing komoditas dapat diakses
						dengan mengklik komoditas yang ingin diketahui.
					</p>
				</div>
			</section>
			<section className="px-4 sm:px-8 md:px-10 lg:px-10 pt-4 space-y-4">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
					Berita Hari Ini
				</h1>
				<div className="flex flex-wrap justify-center md:gap-10 lg:gap-24 gap-4 px-2 py-8">
					{loading ? (
						<BeritaSkeleton />
					) : (
						beritaData.map((item) => (
							<Card key={item.id} className="md:w-[13rem] lg:w-[23rem]">
								<CardHeader>
									<Image
										src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${item.image}`}
										className="rounded-2xl"
										alt="berita"
										width={300}
										height={200}
									/>
								</CardHeader>
								<CardContent>
									<CardDescription className="mdtext-sm">
										{item.title}
									</CardDescription>
								</CardContent>
								<CardFooter className="flex justify-between">
									<Button asChild className="md:w-30 md:text-[10px]">
										<Link href={`/berita/${item.id}`}>Baca Selengkapnya</Link>
									</Button>
								</CardFooter>
							</Card>
						))
					)}
				</div>
				<div className="h-1 rounded-lg mt-10 bg-black/10 z-0"></div>
			</section>
			<section className="px-4 sm:px-8 md:px-20 pt-4 space-y-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<Card className="flex justify-between items-center p-4 rounded-xl gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-blue-400 p-2 rounded-md">
								<UserIcon width={30} height={30} className="text-white" />
							</div>
							<div>
								<h1 className="text-md font-bold">Kunjungan User</h1>
								<p>Jumlah Kunjungan User di Sulawesi Tengah</p>
							</div>
						</div>
						<h1 className="text-4xl font-bold">3928</h1>
					</Card>
					<Card className="flex justify-between items-center p-4 rounded-xl gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-blue-400 p-2 rounded-md">
								<ScaleIcon width={30} height={30} className="text-white" />
							</div>
							<div>
								<h1 className="text-md font-bold">Jumlah Komoditas</h1>
								<p>Jumlah Komoditas di Sulawesi Tengah</p>
							</div>
						</div>
						<h1 className="text-4xl font-bold">
							{dashboardData.totalCommodities}
						</h1>
					</Card>
					<Card className="flex justify-between items-center p-4 rounded-xl gap-4">
						<div className="flex items-center gap-4">
							<div className="bg-blue-400 p-2 rounded-md">
								<BuildingLibraryIcon
									width={30}
									height={30}
									className="text-white"
								/>
							</div>
							<div>
								<h1 className="text-md font-bold">Jumlah Pasar</h1>
								<p>Jumlah Pasar di Sulawesi Tengah</p>
							</div>
						</div>
						<h1 className="text-4xl font-bold">{dashboardData.totalPasar}</h1>
					</Card>
				</div>
				<Separator className="shadow-lg" />
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
								<div className="shadow-lg w-[10rem] sm:w-[20rem] p-4 text-sm lg:text-lg flex flex-col rounded-lg">
									<p className="text-[10px] lg:text-lg">Harga </p>
									<h1 className="font-bold text-[10px] lg:text-lg">
										<div className="flex justify-between items-center">
											<div>
												Rp{' '}
												{Math.round(detailHargaKonsumen?.price as any)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											</div>
											<div>
												<TriangleUpIcon color="red" width={50} height={50} />
											</div>
										</div>
									</h1>
								</div>
								<div className="shadow-lg w-[10rem] sm:w-[20rem] p-4  text-sm lg:text-lg flex flex-col rounded-lg">
									<p className="text-[10px] lg:text-lg">
										Harga Rata - Rata (MtM)
									</p>
									<h1 className="font-bold text-[10px] lg:text-lg">
										<div className="flex justify-between items-center">
											<div>
												Rp{' '}
												{Math.round(detailHargaKonsumen?.price as any)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											</div>
											<div className="flex items-center">
												<TriangleUpIcon color="red" width={50} height={50} />
											</div>
										</div>
									</h1>
								</div>
								<div className="shadow-lg w-[10rem] sm:w-[20rem] p-4  text-sm lg:text-lg flex flex-col rounded-lg">
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
								</div>
							</div>
							<Button onClick={() => { window.open(linkExportHg, '_blank'); }}
								className="bg-[#f0fdf4] text-[#228848] hover:bg-green-200 rounded-full cursor-pointer"
								asChild>
								<span className="self-end inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
									Export
								</span>
							</Button>
						</div>
						<div className="h-1 rounded-lg my-10 bg-black/10 z-0"></div>
						<div className="flex flex-col ">
							<h1 className="sm:text-2xl text-lg font-bold mb-3">
								Tabel Harga Harian
							</h1>
							<div className="overflow-x-auto">
								<table className="min-w-full bg-white border border-1">
									<thead>
										<tr>
											<th className="border border-1 px-4 py-2 bg-blue-200">
												Subjek
											</th>
											{detailData.header != undefined &&
												detailData.header.map((item: any, index: any) => (
													<th
														key={index}
														className="border border-1 px-4 py-2 bg-blue-200">
														{item}
													</th>
												))}
										</tr>
									</thead>
									<tbody>
										{detailData.pasar != undefined && detailData.pasar.length > 0 ? (
											detailData.pasar.map(
												(pasarItem: any, pasarIndex: any) => (
													<tr key={pasarIndex}>
														<td className="px-4 py-2 border border-1">
															<h2>
																{pasarItem.pasar_name != 'null'
																	? pasarItem.pasar_name
																	: detailHargaKonsumen?.city}
															</h2>
														</td>
														{pasarItem.dates != undefined &&
															pasarItem.dates.map(
																(dateItem: any, dateIndex: any) => (
																	<td
																		className="border border-1 px-4 py-2"
																		key={dateIndex}>
																		<h2>
																			Rp{' '}
																			{dateItem.harga
																				.toString()
																				.replace(
																					/\B(?=(\d{3})+(?!\d))/g,
																					',',
																				) || ''}
																		</h2>
																	</td>
																),
															)}
													</tr>
												),
											)
										) : (
											<tr key="1">
												<td className="px-4 py-2 border border-1 text-center">
													Data Kosong
												</td>
											</tr>
										)
										}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</main>
	);
}
