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
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import Select, { SingleValue } from 'react-select';
import HargaPanganSkeleton from '@/components/HargaPanganSkeleton';
import { Datepicker } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
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

const getCurrentDate = (): string => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan mulai dari 0, jadi perlu ditambah 1
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export default function Home() {
	const today = new Date();
	const formattedDate = formatDate(today);
	const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>([]);
	const [cardContents, setCardContents] = useState<cardContents[]>([]);
	const [selectedCommodity, setSelectedCommodity] = useState<SingleValue<{ value: string; label: string }> | null>(null);
	const [monitoringVolatilitas, setMonitoringVolatilitas] = useState<any>([]);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const closeDialog = () => setIsDialogOpen(false);
	const [loading, setLoading] = useState(true);

	const handleChangeMonth = () => {
		if (selectedDate) {
			let commodity = selectedCommodity ? selectedCommodity.value : '';
			let val = format(selectedDate, 'yyyy-MM-dd');
			getHargaPangan(val, commodity);
			getMonitoringVolatilitas(commodity);

		} else {
			console.log('No date selected');
		}
	}

	const getMonitoringVolatilitas = async (komoditas: string = '') => {
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

	const getHargaPangan = async (date: string = '', komoditas: string = '') => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/perubahan-harga?date=${date}&komoditas=${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				console.log(response.data.data);
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
				setSelectedCommodity(defaultOption);

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
		const today = getCurrentDate();
		getCommodityOption();
		getHargaPangan(today, '18');
		getMonitoringVolatilitas('18');
	}, []);

	return (
		<main>
			<Navbar />
			<Hero />
			<div
				style={{ marginTop: '-40px' }}
				className="mx-auto -mt-10 relative px-4 py-[0.4rem] sm:py-6 sm:px-8 shadow-xl w-[18rem] md:w-[32rem] sm:w-[32rem] rounded-xl md:rounded-full flex flex-col sm:flex-row items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm">Komoditas</h1>
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
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm ">Tanggal</h1>
					<div className="flex items-center h-10">
						<Datepicker theme={customTheme} onChange={
							(date) => {
								setSelectedDate(date as any);
							}
						} value={selectedDate} maxDate={new Date()} />
					</div>
				</div>
				<Button
					onClick={handleChangeMonth}
					className="bg-blue-300 w-12 h-12 rounded-full p-2">
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>
			<section className="px-4 sm:px-2 md:px-4 lg:px-14 pt-4 space-y-4 sm:space-y-4 md:space-y-6">
				<div className="flex flex-col sm:flex-row justify-between pt-10">
					<div className="flex-col">
						<h1 className="text-2xl sm:text-3xl md:text-4xl mb-3 font-semibold">
							Peta Perubahan Harga
						</h1>
						<Badge className="bg-green-400 text-xs sm:text-sm md:text-base rounded-full text-white gap-2">
							<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal{' '}
							{formattedDate}
						</Badge>
					</div>
					<div></div>
				</div>
				<div className="mx-auto self-center">
					<div className="h-full w-full ">
						<div id="container" className="relative h-full">
							<center>
								<Map cardContents={cardContents} />
							</center>
						</div>
					</div>
				</div>
				<br />
				<Badge className="bg-[#3AC1DF] text-xs sm:text-sm md:text-base rounded-full text-white">
					<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal {formattedDate}
				</Badge>
			</section>
			<section className="px-4 sm:px-8 md:px-10 lg:px-20 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col items-center space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
						{loading ? (
							<HargaPanganSkeleton />
						) : (cardContents.map((content, index) => (
							<div
								key={index}
								className="border border-gray-200 p-4 flex justify-between gap-6 rounded-lg shadow-md">
								<div
									className="flex flex-col gap-4"
								>
									<div>
										<h1 className="text-sm font-bold ">
											{content.city}
										</h1>
										<p className="font-light text-lg">Rp. {parseInt(content.price).toLocaleString()}</p>
									</div>
									<div>
										<p className="text-md font-semibold">{content.change}</p>
										<p className="text-[8px] font-light">DAY IN HIGH VOLATILITY</p>
									</div>
								</div>
								<div className="flex flex-col self-center">
									<div
										className={`rounded-xl p-2 self-center text-center  font-bold text-[12px] items-center flex text-white`}
										style={{
											background: content.color,
										}}>
										{content.color === '#bf7070' ? (
											<div className="flex gap-2">
												<ArrowUpIcon width={42} height={42} />

											</div>
										) : content.color === '#f1be5b' ? (
											<div className="flex gap-2">
												<ArrowDownIcon width={42} height={42} />

											</div>
										) : (
											<div className="flex gap-2">
												<SymbolIcon width={42} height={42} />

											</div>
										)}
									</div>
									{content.color === '#bf7070' ? (
										<div className="flex gap-2">
											Naik
										</div>
									) : content.color === '#f1be5b' ? (
										<div className="flex gap-2">
											Turun
										</div>
									) : (
										<div className="flex gap-2">
											Stabil
										</div>
									)}
								</div>
							</div>
						)))}
					</div>
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
						Indikator Daerah
					</h1>
					<div className="flex flex-wrap justify-center gap-4 mt-5">
						<div className="text-center w-48 md:w-60">
							<Card className="flex justify-between items-center p-4 rounded-xl gap-4">
								<div className="flex items-center gap-4">
									<div className="bg-[#ED4527] p-2 rounded-md">
										<ArrowUpIcon width={30} height={30} className="text-white" />
									</div>
									<div>
										<h1 className="text-md font-bold">{cardContents.filter((item) => item.color === '#bf7070').length}{' '}
											Daerah</h1>
										<p>Harga Naik</p>
									</div>
								</div>
							</Card>
						</div>
						<div className="text-center w-48 md:w-60">

							<Card className="flex justify-between items-center p-4 rounded-xl gap-4">
								<div className="flex items-center gap-4">
									<div className="bg-[#17D6A9] p-2 rounded-md">
										<ArrowDownIcon width={30} height={30} className="text-white" />
									</div>
									<div>
										<h1 className="text-md font-bold">{cardContents.filter((item) => item.color === '#f1be5b').length}{' '}
											Daerah</h1>
										<p>Harga Turun</p>
									</div>
								</div>
							</Card>
						</div>
						<div className="text-center w-48 md:w-60">

							<Card className="flex justify-between items-center p-4 rounded-xl gap-4">
								<div className="flex items-center gap-4">
									<div className="bg-[#3AC1DF] p-2 rounded-md">
										<SymbolIcon
											width={30}
											height={30}
											className="text-white"
										/>
									</div>
									<div>
										<h1 className="text-md font-bold">{cardContents.filter((item) => item.color === '#76bf70').length}{' '}
											Daerah</h1>
										<p>Stabil</p>
									</div>
								</div>
							</Card>
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
											{
												monitoringVolatilitas.komoditas
											}
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
											{
												monitoringVolatilitas.komoditas
											}
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
