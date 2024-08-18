'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import MonthPicker from '@/components/ui/monthpicker';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
	CounterClockwiseClockIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	SymbolIcon,
} from '@radix-ui/react-icons';
import Swal from "sweetalert2";
import axios from "axios";
import React from 'react';
import Hero from '@/components/ui/hero';
import Map from '@/components/ui/map';
import Select from 'react-select';
import HargaPanganSkeleton from '@/components/HargaPanganSkeleton';

interface cardContents {
	city: string;
	item: string;
	price: string;
	color: string;
	change: string;
	bulan: string;
	kabupaten_kota_id: string;
	id: string;
}

const formatDate = (date: any) => {
	return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function Home() {
	const today = new Date();
	const formattedDate = formatDate(today);
	const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>([]);
	const [cardContents, setCardContents] = useState<cardContents[]>([]);
	const [selectedCommodity, setSelectedCommodity] = useState('');
	const [monitoringVolatilitas, setMonitoringVolatilitas] = useState<any>([]);
	const [selectedDate, setSelectedDate] = React.useState<Date>();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [detailHarga, setDetailHarga] = useState<any>();
	const closeDialog = () => setIsDialogOpen(false);
	const [loading, setLoading] = useState(true);

	const handleChangeMonth = () => {
		if (selectedDate) {
			let commodity = selectedCommodity;
			let val = format(selectedDate, 'yyyy-MM');
			getHargaPangan(1, 2, val, commodity);
		} else {
			console.log('No date selected');
		}
	}


	const getMonitoringVolatilitas = async (komoditas: string) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/monitoring-volatilitas/${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data) {
				setMonitoringVolatilitas(response.data);
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

	const getHargaPangan = async (page: number = 1, limit: number = 2, date: string, komoditas: string) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/perubahan-harga?date=${date}&komoditas=${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				setCardContents(response.data.data);
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

	const getCommodityOption = async (page: number = 1, limit: number = 2) => {
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

	useEffect(() => {
		getHargaPangan(1, 2, '2024-06', '18');
		getCommodityOption();
		getMonitoringVolatilitas('18');
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<main>
			<Navbar />
			<Hero />
			<div
				style={{ marginTop: '-40px' }}
				className="mx-auto z-1 relative px-4 py-[0.4rem] sm:py-2 sm:px-8 shadow-xl w-[18rem] md:w-[30rem] sm:w-[30rem] rounded-xl md:rounded-full flex flex-col sm:flex-row items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Komoditas</h1>
					<Select
						onChange={(option) => setSelectedCommodity(option!.value)}
						className=" basic-single w-[170px] border-none"
						options={selectedCommodityOption}
					/>
				</div>
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm ">Bulan</h1>
					<MonthPicker date={selectedDate} setDate={setSelectedDate} />
				</div>
				<Button
					onClick={handleChangeMonth}
					className="bg-blue-300 rounded-full p-2">
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>
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
				<div className="mx-auto  self-center">
					<div className="h-full w-full ">
						<div id="container" className="relative w-full h-full  ">
							<center>
								<Map cardContents={cardContents} />
							</center>
						</div>
					</div>
				</div>
				<br />
				<h1 className="text-sm m-0 p-0 sm:text-sm md:text-md">
					*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar
				</h1>
				<div className="h-1 rounded-lg mt-10 bg-black/10 z-0"></div>
			</section>
			<section className="px-4 sm:px-8 md:px-10 lg:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col items-center space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
						{loading ? (
							<HargaPanganSkeleton />
						) : (
							cardContents.map((content, index) => (
								<div
									key={index}
									style={{ alignContent: 'center' }}
									className="border border-gray-200 p-4 flex flex-col justify-between rounded-lg shadow-md">
									<div
										className="flex flex-col items-center justify-between space-y-2"
										style={{ flex: 1 }}>
										<h1 className="text-md font-light text-center">
											{content.city}
										</h1>
										<p className="font-bold text-2xl">
											Rp{' '}
											{Math.round(content?.price as any)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</p>
										<div
											className={`rounded-md p-2 flex items-center justify-center text-white`}
											style={{
												background: content.color,
											}}>
											{content.color === '#bf7070' ? (
												<div className="flex gap-2">
													<ArrowUpIcon width={20} height={20} />
													Naik {content.change}
												</div>
											) : content.color === '#f1be5b' ? (
												<div className="flex gap-2">
													<ArrowDownIcon width={20} height={20} />
													Turun {content.change}
												</div>
											) : (
												<div className="flex gap-2">
													<SymbolIcon width={20} height={20} />
													Stabil
												</div>
											)}
										</div>
									</div>
									<div className="flex flex-col mt-6">
										<p className="text-md font-semibold">
											Rp{' '}
											{Math.round(content?.price as any)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</p>
										<p className="text-xs font-thin">DAY IN HIGH VOLATILITY</p>
									</div>
								</div>
							))
						)}
					</div>
					<div className="flex flex-wrap justify-center gap-4 mt-5">
						<div className="text-center w-48 md:w-60">
							<p className="font-bold text-2xl mt-4 mb-4">
								{cardContents.filter((item) => item.color === '#bf7070').length}{' '}
								Daerah
							</p>
							<div className="py-3 bg-red-500 rounded-t-md"></div>
							<p className="font-semibold text-lg mt-4 mb-4">Harga Naik</p>
						</div>
						<div className="text-center w-48 md:w-60">
							<p className="font-bold text-2xl mt-4 mb-4">
								{cardContents.filter((item) => item.color === '#f1be5b').length}{' '}
								Daerah
							</p>
							<div className="py-3 bg-yellow-500 rounded-t-md"></div>
							<p className="font-semibold text-lg mt-4 mb-4">Harga Turun</p>
						</div>
						<div className="text-center w-48 md:w-60">
							<p className="font-bold text-2xl mt-4 mb-4">
								{cardContents.filter((item) => item.color === '#76bf70').length}{' '}
								Daerah
							</p>
							<div className="py-3 bg-green-500 rounded-t-md"></div>
							<p className="font-semibold text-lg mt-4 mb-4">Stabil</p>
						</div>
					</div>
				</div>
				<div className="h-1 rounded-lg bg-black/10"></div>
			</section>
			<Tabs defaultValue="table">
				<section className="px-4 sm:px-8 md:px-10 lg:px-50 pt-4 space-y-4">
					<div className="flex flex-col space-y-4 sm:flex-row justify-between items-center">
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
							Monitoring Volatilitas
						</h1>
						<div className="flex gap-4 mt-4 sm:mt-0">
							<TabsList className="rounded-full text-black">
								<TabsTrigger className="rounded-full" value="table">
									Table
								</TabsTrigger>
								<TabsTrigger className="rounded-full" value="grafik">
									Grafik
								</TabsTrigger>
							</TabsList>
						</div>
					</div>
					<TabsContent value="table">
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Komoditas
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											1 Bulan Terakhir
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											3 Bulan Terakhir
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											12 Bulan Terakhir
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Keterangan
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									<tr>
										<td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900">
											Beras
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{monitoringVolatilitas.statusHarga1Bulan &&
											monitoringVolatilitas.statusHarga1Bulan === 'naik' ? (
												<div className="h-10 w-10 bg-red-500 rounded-sm"></div>
											) : monitoringVolatilitas.statusHarga1Bulan ===
											  'turun' ? (
												<div className="h-10 w-10 bg-yellow-500 rounded-sm"></div>
											) : monitoringVolatilitas.statusHarga1Bulan ===
											  'tidak tersedia' ? (
												<div className="h-10 w-10 bg-[#7C9299] rounded-sm"></div>
											) : (
												<div className="h-10 w-10 bg-green-500 rounded-sm"></div>
											)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{monitoringVolatilitas.statusHarga3Bulan &&
											monitoringVolatilitas.statusHarga3Bulan === 'naik' ? (
												<div className="h-10 w-10 bg-red-500 rounded-sm"></div>
											) : monitoringVolatilitas.statusHarga3Bulan ===
											  'turun' ? (
												<div className="h-10 w-10 bg-yellow-500 rounded-sm"></div>
											) : monitoringVolatilitas.statusHarga3Bulan ===
											  'tidak tersedia' ? (
												<div className="h-10 w-10 bg-[#7C9299] rounded-sm"></div>
											) : (
												<div className="h-10 w-10 bg-green-500 rounded-sm"></div>
											)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{monitoringVolatilitas.statusHarga12Bulan &&
											monitoringVolatilitas.statusHarga12Bulan === 'naik' ? (
												<div className="h-10 w-10 bg-red-500 rounded-sm"></div>
											) : monitoringVolatilitas.statusHarga12Bulan ===
											  'turun' ? (
												<div className="h-10 w-10 bg-yellow-500 rounded-sm"></div>
											) : monitoringVolatilitas.statusHarga12Bulan ===
											  'tidak tersedia' ? (
												<div className="h-10 w-10 bg-[#7C9299] rounded-sm"></div>
											) : (
												<div className="h-10 w-10 bg-green-500 rounded-sm"></div>
											)}
										</td>
										<td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
											{/* Harga beras tetap sangat berfluktuasi sepanjang bulan Mei,
											dengan harga awalnya..... dipengaruhi oleh produksi di
											negara-negara kunci untuk tahun 2024/25, meskipun ada
											tantangan yang sedang berlangsung seperti... */}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</TabsContent>
					<TabsContent value="grafik">
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Komoditas
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									<tr>
										<td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900">
											Beras
										</td>
										<td className="w-full py-5">
											<div className="flex w-full rounded-lg">
												{monitoringVolatilitas.daftarHarga12Bulan &&
													monitoringVolatilitas.daftarHarga12Bulan.map(
														(item: any, index: number) =>
															item.status_harga === 'naik' ? (
																<div
																	key={index}
																	className="h-[100px] flex-1 bg-red-500"></div>
															) : item.status_harga === 'turun' ? (
																<div
																	key={index}
																	className="h-[100px] flex-1 bg-yellow-500"></div>
															) : item.status_harga === 'tidak tersedia' ? (
																<div
																	key={index}
																	className="h-[100px] flex-1 bg-[#7C9299]"></div>
															) : (
																<div
																	key={index}
																	className="h-[100px] flex-1 bg-green-500"></div>
															),
													)}
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</TabsContent>
					<div className="h-1 rounded-lg mt-10 bg-black/10"></div>
				</section>
			</Tabs>

			<Footer />
		</main>
	);
}
