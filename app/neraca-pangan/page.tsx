'use client';

import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/footer';
import { Badge } from '@/components/ui/badge';
import {
	MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Navbar from '@/components/ui/navbar';
import { useEffect, useState } from 'react';
import React from 'react';
import { format, set } from 'date-fns';
import Hero from '@/components/ui/hero';
import Select, { SingleValue } from 'react-select';
import MapNeraca from '@/components/ui/map-neraca';
import {
	CounterClockwiseClockIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	SymbolIcon,
} from '@radix-ui/react-icons';
import Swal from "sweetalert2";
import axios from "axios";
import NeracaPanganSkeleton from '@/components/NeracaPanganSkeleton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface cardContents {
	city: string;
	komoditas: string;
	ketersediaan: string;
	kebutuhan: string;
	kabupaten_kota_id: string;
	neraca: string;
	color: string;
	id: string;
}

const getCurrentDate = (): string => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan mulai dari 0, jadi perlu ditambah 1
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const formatDate = (date: any) => {
	return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function Home() {
	const today = new Date();
	const formattedDate = formatDate(today);
	const [selectedCommodity, setSelectedCommodity] = useState<SingleValue<{ value: string; label: string }> | null>(null);
	const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>([]);

	const [selectedDate, setSelectedDate] = useState<any>();

	const [cardContents, setCardContents] = useState<cardContents[]>([]);

	const [loading, setLoading] = useState(true);

	const handleChangeMonth = () => {
		try {
			let commodity = selectedCommodity ? selectedCommodity.value : '';
			let val = selectedDate.format('YYYY-MM');
			getNeracaPangan(
				val,
				commodity,
			);
		} catch (error) {
			console.log(error)
		}
	};

	const getNeracaPangan = async (
		date: string,
		komoditas: string,
	) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/harga-pasokan?date=${date}&komoditas=${komoditas}`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);
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

	const getCommodityOption = async () => {
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
				const defaultOption = mappedOptions.find((option: { value: number; label: string }) => option.value === 18);
				setSelectedCommodity(defaultOption);
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

	useEffect(() => {
		const date = dayjs();
		setSelectedDate(date);
		getNeracaPangan(date.format('YYYY-MM'), '18');
		getCommodityOption();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
					<h1 className="font-bold text-sm ">Bulan</h1>
					<div className="flex items-center h-10">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker value={selectedDate} onChange={(newValue) => setSelectedDate(newValue as any)} views={['month', 'year']} />
						</LocalizationProvider>
					</div>
				</div>
				<Button
					className="bg-blue-300 w-12 h-12 rounded-full p-2">
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>
			<MapNeraca cardContents={cardContents} />

			<section className="px-4 sm:px-8 lg:px-20 md:px-10 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col items-center space-y-8">
					<Badge className="bg-[#3AC1DF] self-start text-xs sm:text-sm md:text-base rounded-full text-white">
						<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal {formattedDate}
					</Badge>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 px-10 lg:grid-cols-3 xl:grid-cols-4 gap-[2rem] w-full ">
						{loading ? (<NeracaPanganSkeleton />) : (cardContents.map((content, index) => (

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
										<table className="w-full mt-2">
											<tbody className="text-[10px]">
												<tr className="font-bold">
													<td className="pr-2">Neraca Pangan:</td>
													<td className="text-right">{content.neraca}</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div>
										<table className="w-full mt-2">
											<tbody className="text-xs">
												<tr>
													<td className="pr-2">Ketersediaan:</td>
													<td className="text-right">{content.ketersediaan}</td>
												</tr>
												<tr>
													<td className="pr-2">Kebutuhan:</td>
													<td className="text-right">{content.kebutuhan}</td>
												</tr>


											</tbody>
										</table>
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
				</div>

			</section>
			<Footer />
		</main>
	);
}
