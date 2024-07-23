'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Dialog from '@/components/ui/modal-harga';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import vector1 from '@/public/vect1.svg';
import vector2 from '@/public/vect2.svg';
import {
	MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { format } from 'date-fns';

import {
	CounterClockwiseClockIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	SymbolIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';
import { DatePicker } from '@/components/ui/datepicker';
import React from 'react';
import Hero from '@/components/ui/hero';
import Select from 'react-select';
import Map from '@/components/ui/map';

import MonthPicker from '@/components/ui/monthpicker';

export default function Home() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [detailHarga, setDetailHarga] = useState({} as { city: string; price: string; color: string; change: string; id: string; } | undefined);
	const [selectedDate, setSelectedDate] = React.useState<Date>();
	const closeDialog = () => setIsDialogOpen(false);

	const options = [
		{ value: '1', label: 'Beras Premium' },
		{ value: '2', label: 'Daging Ayam' },
		{ value: '3', label: 'Daging Sapi' },
		{ value: '4', label: 'Minyak Goreng' },
		{ value: '5', label: 'Bawang Merah' },
		{ value: '6', label: 'Bawang Putih' },
		{ value: '7', label: 'Telur Ayam' },
		{ value: '8', label: 'Gula Pasir' },
		{ value: '9', label: 'Cabe Merah' },
		{ value: '10', label: 'Cabe Rawit' },
		{ value: '11', label: 'Ikan' },
	]

	const [cardContents, setCardContents] = useState([
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Beras Premium",
		// 	"price": "15,167",
		// 	"color": "Green",
		// 	"change": "-8.7%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Cabai Merah Besar",
		// 	"price": "27,083",
		// 	"color": "Green",
		// 	"change": "-33.2%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Cabai Rawit Merah",
		// 	"price": "57,778",
		// 	"color": "Red",
		// 	"change": "14.5%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Bawang Merah",
		// 	"price": "50,833",
		// 	"color": "Red",
		// 	"change": "12.7%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Gula Pasir Kemasan",
		// 	"price": "18,500",
		// 	"color": "Red",
		// 	"change": "0.7%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Minyak Goreng Sawit Kemasan Premium",
		// 	"price": "18,694",
		// 	"color": "Red",
		// 	"change": "1.2%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Daging Ayam Ras",
		// 	"price": "41,944",
		// 	"color": "Green",
		// 	"change": "-3.6%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Telur Ayam Ras",
		// 	"price": "32,000",
		// 	"color": "Red",
		// 	"change": "1.3%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Daging Sapi Paha Belakang",
		// 	"price": "130,000",
		// 	"color": "Green",
		// 	"change": "-2.6%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Ikan Tongkol",
		// 	"price": "35,000",
		// 	"color": "Green",
		// 	"change": "-3.1%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Kota Palu",
		// 	"item": "Bawang Putih Honan",
		// 	"price": "49,222",
		// 	"color": "Green",
		// 	"change": "-0.4%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Beras Premium",
		// 	"price": "13,300",
		// 	"color": "Green",
		// 	"change": "-3.7%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Cabai Merah Besar",
		// 	"price": "49,000",
		// 	"color": "Red",
		// 	"change": "39.9%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Cabai Rawit Merah",
		// 	"price": "51,574",
		// 	"color": "Red",
		// 	"change": "6.2%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Bawang Merah",
		// 	"price": "43,842",
		// 	"color": "Green",
		// 	"change": "-5.8%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Gula Pasir Kemasan",
		// 	"price": "20,833",
		// 	"color": "Green",
		// 	"change": "-0.6%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Minyak Goreng Sawit Kemasan Premium",
		// 	"price": "18,704",
		// 	"color": "Green",
		// 	"change": "-0.4%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Daging Ayam Ras",
		// 	"price": "32,593",
		// 	"color": "Green",
		// 	"change": "-7.5%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Telur Ayam Ras",
		// 	"price": "33,150",
		// 	"color": "Green",
		// 	"change": "-5.8%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Daging Sapi Paha Belakang",
		// 	"price": "140,000",
		// 	"color": "Red",
		// 	"change": "0.1%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Ikan Tongkol",
		// 	"price": "24,815",
		// 	"color": "Red",
		// 	"change": "10.1%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Luwuk",
		// 	"item": "Bawang Putih Honan",
		// 	"price": "47,472",
		// 	"color": "Green",
		// 	"change": "-3.9%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Beras Premium",
		// 	"price": "15,889",
		// 	"color": "Green",
		// 	"change": "-2.8%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Cabai Merah Besar",
		// 	"price": "47,500",
		// 	"color": "Red",
		// 	"change": "56.8%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Cabai Rawit Merah",
		// 	"price": "61,944",
		// 	"color": "Red",
		// 	"change": "25.4%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Bawang Merah",
		// 	"price": "46,389",
		// 	"color": "Green",
		// 	"change": "-1.4%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Gula Pasir Kemasan",
		// 	"price": "18,000",
		// 	"color": "Green",
		// 	"change": "-2.2%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Minyak Goreng Sawit Kemasan Premium",
		// 	"price": "18,111",
		// 	"color": "Red",
		// 	"change": "0.6%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Daging Ayam Ras",
		// 	"price": "34,000",
		// 	"color": "Red",
		// 	"change": "0.0%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Telur Ayam Ras",
		// 	"price": "33,789",
		// 	"color": "Green",
		// 	"change": "-12.4%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Daging Sapi Paha Belakang",
		// 	"price": "130,000",
		// 	"color": "Red",
		// 	"change": "0.0%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Ikan Tongkol",
		// 	"price": "28,611",
		// 	"color": "Red",
		// 	"change": "18.6%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Tolitoli",
		// 	"item": "Bawang Putih Honan",
		// 	"price": "48,056",
		// 	"color": "Red",
		// 	"change": "2.8%",
		// 	"bulan": "2024-06"
		// },
		// {
		// 	"city": "Morowali",
		// 	"item": "Beras Premium",
		// 	"price": "15,944",
		// 	"color": "Green",
		// 	"change": "-1.1%",
		// 	"bulan": "2024-06"
		// },










		



		{
			city: 'Kota Buol',
			price: '20.000/kg',
			color: '#f1be5b',
			change: 'RP.200',
			id: 'Buol'
		},
		{
			city: 'Kabupaten Morowali',
			price: '14.100/kg',
			color: '#f1be5b',
			change: 'Rp. 298',
			id: 'Morowali'
		},
		{
			city: 'Kabupaten Sigi',
			price: '13.370/kg',
			color: '#76bf70',
			change: 'Rp. 298',
			id: 'Sigi'
		},
		{
			city: 'Kabupaten Donggala',
			price: '12.000/kg',
			color: '#f1be5b',
			change: 'Rp. 298',
			id: 'Donggala'
		},
		{
			city: 'Kabupaten Morowali Utara',
			price: '11.000/kg',
			color: '#f1be5b',
			change: 'Rp. 298',
			id: 'MorowaliUtara'
		},

		{
			city: 'Kabupaten Parigi Moutong',
			price: '10.500/kg',
			color: '#76bf70',
			change: 'Rp. 298',
			id: 'Parigi'
		},
		{
			city: 'Kabupaten Toli-Toli',
			price: '10.000/kg',
			color: '#f1be5b',
			change: 'Rp. 298',
			id: 'Tolitoli'
		},
		{
			city: 'Kabupaten Poso',
			price: '9.800/kg',
			color: '#f1be5b',
			change: 'Rp. 298',
			id: 'Poso'
		},
		{
			city: 'Kabupaten Banggai',
			price: '9.500/kg',
			color: '#76bf70',
			change: 'Rp. 298',
			id: 'Banggai'
		},
		{
			city: 'Kabupaten Tojo Una-Una',
			price: '9.200/kg',
			color: '#f1be5b',
			change: 'Rp. 298',
			id: 'Touna'
		},
		{
			city: 'Kabupaten Banggai Kepulauan',
			price: '9.000/kg',
			color: '#f1be5b',
			change: 'Rp. 298',
			id: 'BanggaiKepulauan'
		},
		{
			city: 'Palu',
			price: '9.000/kg',
			color: '#f1be5b',
			change: 'Rp. 298',
			id: 'Palu'
		},
		{
			city: 'Kabupaten Banggai Laut',
			price: '9.000/kg',
			color: '#f1be5b',
			change: 'Rp. 298',
			id: 'BanggaiLaut'
		},

	]);

	const handleChangeMonth = () => {
		if (selectedDate) {
			let val = format(selectedDate, 'yyyy-MM');
			console.log(val);
			if (val === '2024-06') {
				setCardContents([
					{
						city: 'Kota Palu',
						price: '20.000/kg',
						color: '#bf7070',
						change: 'RP.200',
						id: 'element1'
					},
					{
						city: 'Kabupaten Boul',
						price: '14.100/kg',
						color: '#bf7070',
						change: 'Rp. 298',
						id: 'element2',
					},
					{
						city: 'Kabupaten Sigi',
						price: '13.370/kg',
						color: '#bf7070',
						change: 'Rp. 298',
						id: 'element3',
					},
					{
						city: 'Kabupaten Donggala',
						price: '12.000/kg',
						color: '#bf7070',
						change: 'Rp. 298',
						id: 'element4',
					},
					{
						city: 'Kabupaten Morowali',
						price: '11.000/kg',
						color: '#bf7070',
						change: 'Rp. 298',
						id: 'element5',
					},
					{
						city: 'Kabupaten Parigi Moutong',
						price: '10.500/kg',
						color: '#76bf70',
						change: 'Rp. 298',
						id: 'element6',
					},
					{
						city: 'Kabupaten Toli-Toli',
						price: '10.000/kg',
						color: '#bf7070',
						change: 'Rp. 298',
						id: 'element7',
					},
					{
						city: 'Kabupaten Poso',
						price: '9.800/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element8',
					},
					{
						city: 'Kabupaten Banggai',
						price: '9.500/kg',
						color: '#76bf70',
						change: 'Rp. 298',
						id: 'element9',
					},
					{
						city: 'Kabupaten Tojo Una-Una',
						price: '9.200/kg',
						color: '#bf7070',
						change: 'Rp. 298',
						id: 'element10',
					},
					{
						city: 'Kabupaten Banggai Kepulauan',
						price: '9.000/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element11',
					},
					{
						city: 'Kabupaten Banggai Kepulauan',
						price: '9.000/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element12',
					},
					{
						city: 'Kabupaten Banggai Laut',
						price: '9.000/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element13',
					},
				]);
			} else {
				setCardContents([
					{
						city: 'Kota Palu',
						price: '20.000/kg',
						color: '#f1be5b',
						change: 'RP.200',
						id: 'element1'
					},
					{
						city: 'Kabupaten Boul',
						price: '14.100/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element2',
					},
					{
						city: 'Kabupaten Sigi',
						price: '13.370/kg',
						color: '#76bf70',
						change: 'Rp. 298',
						id: 'element3',
					},
					{
						city: 'Kabupaten Donggala',
						price: '12.000/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element4',
					},
					{
						city: 'Kabupaten Morowali',
						price: '11.000/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element5',
					},
					{
						city: 'Kabupaten Parigi Moutong',
						price: '10.500/kg',
						color: '#76bf70',
						change: 'Rp. 298',
						id: 'element6',
					},
					{
						city: 'Kabupaten Toli-Toli',
						price: '10.000/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element7',
					},
					{
						city: 'Kabupaten Poso',
						price: '9.800/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element8',
					},
					{
						city: 'Kabupaten Banggai',
						price: '9.500/kg',
						color: '#76bf70',
						change: 'Rp. 298',
						id: 'element9',
					},
					{
						city: 'Kabupaten Tojo Una-Una',
						price: '9.200/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element10',
					},
					{
						city: 'Kabupaten Banggai Kepulauan',
						price: '9.000/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element11',
					},
					{
						city: 'Kabupaten Banggai Kepulauan',
						price: '9.000/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element12',
					},
					{
						city: 'Kabupaten Banggai Laut',
						price: '9.000/kg',
						color: '#f1be5b',
						change: 'Rp. 298',
						id: 'element13',
					},
				]);
			}
		} else {
			console.log('No date selected');
		}

	}

	const getColorByCity = (cityName: string) => {
		const cityData = cardContents.find(item => item.id === cityName);
		console.log(cityData, cityName);
		return cityData ? cityData.color : undefined;
	}

	const openDialog = (el: string) => {
		setDetailHarga(cardContents.find((card) => card.id === el));
		setIsDialogOpen(true);
	};

	const showCardArea = (city: string, id: string) => {
		const content = cardContents.find((card) => card.id === id);
		const path = document.getElementById(id);
		if (!path) return;
		const pathRect = path.getBoundingClientRect();
		const pathTop = pathRect.top + window.scrollY + 100; // Account for vertical scroll
		const pathLeft = pathRect.left + window.scrollX + 150;
		const card = document.createElement('div');
		card.id = 'card-' + id;
		card.className = 'absolute z-50 bg-white p-4 rounded-md shadow-md';
		card.style.top = `${pathTop}px`;
		card.style.left = `${pathLeft}px`;
		card.innerHTML = `
						<h1 class='text-lg font-semibold'> ${(content?.city)}</h1>
						<p class='text-xl font-bold'>${content?.price}</p>
						<span class="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
						<p class='text-sm '>Naik ${content?.change}</p>
						</span>
					`;
		document.body.appendChild(card);
	}

	const hideCardArea = (id: string) => {
		const card = document.getElementById('card-' + id);
		if (card) {
			card.remove();
		}
	}

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
						className=" basic-single w-[170px] border-none"
						options={options}
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
			<section className="px-4 sm:px-8 md:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col sm:flex-row justify-between pt-10">
					<div className="flex-col">
						<h1 className="text-2xl sm:text-3xl md:text-4xl mb-1 font-extrabold">
							PETA PERUBAHAN HARGA
						</h1>
						<Badge className="bg-green-400 text-xs sm:text-sm md:text-base rounded-full text-white gap-2">
							<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal 15
							April 2024
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
			<section className="px-4 sm:px-8 md:px-20 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col items-center space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
						{cardContents.map((content, index) => (
							<div
								key={index}
								style={{ alignContent: 'center' }}
								// style={{display: flex;align-content: center;flex-direction: column;justify-content: space-between;}}
								className="border border-gray-200 p-4 flex flex-col justify-between rounded-lg shadow-md">
								<div
									className="flex flex-col items-center justify-between space-y-2"
									style={{ flex: 1 }}>
									<h1 className="text-md font-light text-center">
										{content.city}
									</h1>
									<p className="font-bold text-2xl">{content.price}</p>
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
									<p className="text-md font-semibold">{content.price}</p>
									<p className="text-xs font-thin">DAY IN HIGH VOLATILITY</p>
								</div>
							</div>
						))}
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
				<section className="px-4 sm:px-8 md:px-20 pt-4 space-y-4">
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
											<div className="h-10 w-10 bg-red-500 rounded-sm"></div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="h-10 w-10 bg-red-500 rounded-sm"></div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="h-10 w-10 bg-red-500 rounded-sm"></div>
										</td>
										<td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
											Harga beras tetap sangat berfluktuasi sepanjang bulan Mei,
											dengan harga awalnya..... dipengaruhi oleh produksi di
											negara-negara kunci untuk tahun 2024/25, meskipun ada
											tantangan yang sedang berlangsung seperti...
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
											<div className="h-20 w-full bg-gradient-to-r from-red-500 via-green-600 to-red-700 rounded-md"></div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</TabsContent>
					<div className="h-1 rounded-lg mt-10 bg-black/10"></div>
				</section>
			</Tabs>
			<Dialog isOpen={isDialogOpen} onClose={closeDialog}>
				<div className="mt-2 overflow-y-auto max-h-132.5 md:max-h-full">
					<div className="shadow-lg overflow-hidden px-4 sm:px-10 rounded-lg p-4">
						<div className="flex flex-col space-y-10">
							<div className="flex justify-between">
								<h1 className="text-2xl font-bold">{detailHarga?.city}</h1>
								<button
									className=" text-black text-4xl hover:text-gray-700"
									onClick={closeDialog}>
									×
								</button>
							</div>
							<div className="flex flex-col sm:flex-row justify-around space-y-4 sm:space-y-0 gap-5">
								<div className="shadow-lg w-full sm:w-[20rem] p-4 text-lg flex flex-col rounded-lg">
									<p>Harga rata - rata {detailHarga?.city}: </p>
									<h1 className="font-bold">{detailHarga?.price}</h1>
								</div>
								<div className="shadow-lg w-full sm:w-[20rem] p-4 text-lg flex flex-col rounded-lg">
									<p>Harga Pada {detailHarga?.city}: </p>
									<h1 className="font-bold">{detailHarga?.price}</h1>
								</div>
								<div className="shadow-lg w-full sm:w-[20rem] p-4 text-lg flex flex-col rounded-lg">
									<p>Tanggal </p>
									<h1 className="font-bold">20 Juni 2024</h1>
								</div>
								<div className="shadow-lg w-full sm:w-[20rem] p-4 text-lg flex flex-col rounded-lg">
									<p>Komoditas </p>
									<h1 className="font-bold">Beras</h1>
								</div>
							</div>
							<Button
								className="bg-[#f0fdf4] text-[#228848] hover:bg-green-200 rounded-full cursor-pointer"
								asChild>
								<span className="self-end inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
									Export
								</span>
							</Button>
						</div>
						<div className="h-1 rounded-lg my-10 bg-black/10 z-0"></div>
						<div className="flex flex-col ">
							<h1 className="text-2xl font-bold mb-3">Tabel Harga Harian</h1>
							<div className="overflow-x-auto">
								<table className="rounded-lg overflow-hidden w-full border border-gray-300">
									<thead>
										<tr className="bg-blue-200">
											<th className="px-4 py-2">Subjek</th>
											<th className="px-4 py-2">02 April 2024</th>
											<th className="px-4 py-2">03 April 2024</th>
											<th className="px-4 py-2">04 April 2024</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="px-4 py-2">Kab Touna</td>
											<td className="px-4 py-2">Rp. 12.572</td>
											<td className="px-4 py-2">Rp. 12.572</td>
											<td className="px-4 py-2">Rp. 12.572</td>
										</tr>
										<tr className="bg-blue-200">
											<td
												className="border-b-2 border-black px-4 py-2"
												colSpan={4}></td>
										</tr>
										<tr>
											<td className="px-4 py-2">Pasar Wajo</td>
											<td className="px-4 py-2">Rp. 12.572</td>
											<td className="px-4 py-2">Rp. 12.572</td>
											<td className="px-4 py-2">Rp. 12.572</td>
										</tr>
										<tr className="bg-blue-200">
											<td className="px-4 py-2">Pasar Sentral</td>
											<td className="px-4 py-2">Rp. 12.572</td>
											<td className="px-4 py-2">Rp. 12.572</td>
											<td className="px-4 py-2">Rp. 12.572</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				{/* <div className="flex justify-end w-full">
					<button
						className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
						onClick={closeDialog}>
						Close
					</button>
				</div> */}
			</Dialog>
			<Footer />
		</main>
	);
}
