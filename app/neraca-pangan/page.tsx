'use client';

import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/footer';
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

export default function Home() {
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
				className="mx-auto z-1 relative px-4 py-[0.4rem] sm:py-2 sm:px-8 shadow-xl w-[18rem] md:w-[30rem] sm:w-[30rem] rounded-xl md:rounded-full flex flex-col sm:flex-row items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm ">Komoditas</h1>
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
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm ">Bulan</h1>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker value={selectedDate} onChange={(newValue) => setSelectedDate(newValue as any)} views={['month', 'year']} />
					</LocalizationProvider>
				</div>
				<Button
					className="bg-blue-300 rounded-full p-2"
					onClick={handleChangeMonth}>
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>
			<MapNeraca cardContents={cardContents} />
			<section className="px-4 sm:px-8 lg:px-50 md:px-10 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col items-center space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 px-10 lg:grid-cols-3 xl:grid-cols-4 gap-[2rem] w-full ">
						{loading ? (
							<NeracaPanganSkeleton />
						) : (
							cardContents.map((content, index) => (
								<div
									key={index}
									className="border border-gray-200  rounded-lg p-2 shadow-md flex items-center">
									<div
										className={` w-10 rounded-r-none rounded-md  text-white mr-4 flex-shrink-0 `}
										style={{
											background: content.color,
										}}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="size-10 mx-auto my-5">
											<path
												fillRule="evenodd"
												d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="flex-1">
										<h1 className="text-sm  font-bold">{content.city}</h1>
										<table className="w-full mt-2">
											<tbody className="text-xs">
												<tr>
													<td className="pr-2">Ketersediaan:</td>
													<td className="text-right">
														{Math.round(content?.ketersediaan as any)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													</td>
												</tr>
												<tr>
													<td className="pr-2">Kebutuhan:</td>
													<td className="text-right">
														{Math.round(content?.kebutuhan as any)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													</td>
												</tr>
												<tr>
													<td colSpan={2}>
														<hr className="my-1" />
													</td>
												</tr>
												<tr className="font-bold">
													<td className="pr-2">Neraca Pangan:</td>
													<td className="text-right">
														{Math.round(content?.neraca as any)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							))
						)}
					</div>
				</div>
				<h1 className="text-sm m-0 p-0 sm:text-sm md:text-md">
					*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar
				</h1>
				<div className="h-1 rounded-lg bg-black/10"></div>
			</section>
			<Footer />
		</main>
	);
}
