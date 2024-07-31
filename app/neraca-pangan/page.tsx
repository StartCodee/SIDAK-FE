'use client';

import { Button } from '@/components/ui/button';
import Chart from '@/app/neraca-pangan/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Footer from '@/components/ui/footer';
import { Badge } from '@/components/ui/badge';
import {
	CounterClockwiseClockIcon,
} from '@radix-ui/react-icons';
import {
	MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Navbar from '@/components/ui/navbar';
import { useEffect, useState } from 'react';
import Dialog from '@/components/ui/modal-harga';
import React from 'react';
import { format } from 'date-fns';
import Hero from '@/components/ui/hero';
import Select from 'react-select';
import MonthPicker from '@/components/ui/monthpicker';
import MapNeraca from '@/components/ui/map-neraca';
import Swal from "sweetalert2";
import axios from "axios";
import NeracaPanganSkeleton from '@/components/NeracaPanganSkeleton';

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

export default function Home() {
	const [selectedCommodity, setSelectedCommodity] = useState('');
	const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>(
		[],
	);

	const [detailHarga, setDetailHarga] = useState<any>();
	const [selectedDate, setSelectedDate] = React.useState<Date>();

	const [cardContents, setCardContents] = useState<cardContents[]>([]);

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	const closeDialog = () => setIsDialogOpen(false);

	const openDialog = (el: string) => {
		setDetailHarga(cardContents.find((card) => card.id === el));
		setIsDialogOpen(true);
	};

	const showCardArea = (id: string) => {
		console.log(id);
		const content = cardContents.find((card) => card.id === id);
		const path = document.getElementById(id);
		const pathRect = path ? path.getBoundingClientRect() : null;
		const pathTop = pathRect ? pathRect.top + window.scrollY + 120 : 0;
		const pathLeft = pathRect ? pathRect.left + window.scrollX + 150 : 0;
		const card = document.createElement('div');
		card.id = 'card-' + id;
		card.className =
			'absolute z-50 bg-white p-4 rounded-lg shadow-md flex items-center hidden md:block';
		card.style.top = `${pathTop}px`;
		card.style.left = `${pathLeft}px`;
		card.innerHTML = `
                    <div class="h-full w-20  rounded-md text-white mr-4 flex-shrink-0 bg-[${
											content?.color
										}]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-20 mx-auto mt-0">
                        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h1 class="text-md font-bold">${content?.city} </h1>
                        <table class="w-full mt-2">
                        <tbody class="text-sm">
                            <tr>
                            <td class="pr-2">Ketersediaan:</td>
                            <td class="text-right">${Math.round(
															content?.ketersediaan as any,
														)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                            </tr>
                            <tr>
                            <td class="pr-2">Kebutuhan:</td>
                            <td class="text-right">${Math.round(
															content?.kebutuhan as any,
														)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                            </tr>
                            <tr>
                            <td colspan="2">
                                <hr class="my-1" />
                            </td>
                            </tr>
                            <tr class="font-bold">
                            <td class="pr-2">Neraca Pangan:</td>
                            <td class="text-right">${Math.round(
															content?.neraca as any,
														)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    `;
		console.log(card);
		document.body.appendChild(card);
	};

	const hideCardArea = (id: string) => {
		const card = document.getElementById('card-' + id);
		if (card) {
			card.remove();
		}
	};

	const handleChangeMonth = () => {
		try {
			console.log(selectedCommodity);
			getNeracaPangan(
				1,
				2,
				format(selectedDate as Date, 'yyyy-MM'),
				selectedCommodity,
			);
		} catch (error) {}
	};

	const getColorByCity = (cityName: string) => {
		const cityData = cardContents.find((item) => item.id === cityName);
		console.log(cityData, cityName);
		return cityData ? cityData.color : undefined;
	};

	const getNeracaPangan = async (
		page: number = 1,
		limit: number = 2,
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
		getNeracaPangan(1, 2, '2024-06', '18');
		console.log(cardContents);
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
					className="bg-blue-300 rounded-full p-2"
					onClick={handleChangeMonth}>
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>
			{/* content */}
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
