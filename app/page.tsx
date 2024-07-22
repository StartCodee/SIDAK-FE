'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import Map from '@/components/ui/map';
import { format } from 'date-fns';

import {
	CounterClockwiseClockIcon,
	ChevronRightIcon,
	ArrowDownIcon,
	RotateCounterClockwiseIcon,
	ReloadIcon,
	ArrowUpIcon,
	SymbolIcon
} from '@radix-ui/react-icons';
import {
	UserIcon,
	ScaleIcon,
	BuildingLibraryIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import berita from '@/public/berita.png';
import berita2 from '@/public/berita 2.png';
import berita3 from '@/public/berita 3.png';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import MapNeraca from '@/components/ui/map-neraca';
import MapPola from '@/components/ui/map-pola';
import React from 'react';
import Hero from '@/components/ui/hero';
import MonthPicker from '@/components/ui/monthpicker';
import Select from 'react-select';


export default function Home() {
	const [selectedValue, setSelectedValue] = useState<string>('harga-pangan');
	const [selectedDate, setSelectedDate] = React.useState<Date>();
	const [selectedMonth, setSelectedMonth] = useState('');

	const handleValueChange = (e: any) => {
		console.log(e)
		setSelectedValue(e.value);
	};

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

	const kabupaten = [
		{ value: 'Banggai', label: 'Kabupaten Banggai' },
		{ value: 'BanggaiKepulauan', label: 'Kabupaten Banggai Kepulauan' },
		{ value: 'BanggaiLaut', label: 'Kabupaten Banggai Laut' },
		{ value: 'Buol', label: 'Kabupaten Buol' },
		{ value: 'Donggala', label: 'Kabupaten Donggala' },
		{ value: 'Morowali', label: 'Kabupaten Morowali' },
		{ value: 'MorowaliUtara', label: 'Kabupaten Morowali Utara' },
		{ value: 'Parigi', label: 'Kabupaten Parigi Moutong' },
		{ value: 'Poso', label: 'Kabupaten Poso' },
		{ value: 'Sigi', label: 'Kabupaten Sigi' },
		{ value: 'Touna', label: 'Kabupaten Tojo Una-Una' },
		{ value: 'Tolitoli', label: 'Kabupaten Tolitoli' },
		{ value: 'Palu', label: 'Kota Palu' },
	];

	const jenisInformasi = [
		{ value: 'harga-pangan', label: 'Harga Pangan' },
		{ value: 'neraca-pangan', label: 'Neraca Pangan' },
		{ value: 'perdagangan-pangan', label: 'Pola Perdagangan Pangan' },
	];

	const konsumenPangan = [
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatility: '90',
			hari: '92',
			image: '/konsumen-pangan/rice.png',
		},
		{
			komoditas: 'Ayam',
			jenis: 'Broiler',
			harga: 'Rp. 30.000',
			volatility: '85',
			hari: '30',
			image: '/konsumen-pangan/ayam.png',
		},
		{
			komoditas: 'Bawang',
			jenis: 'Putih',
			harga: 'Rp. 25.000',
			volatility: '75',
			hari: '40',
			image: '/konsumen-pangan/bawangmerah.png',
		},
		{
			komoditas: 'Bawang',
			jenis: 'Merah',
			harga: 'Rp. 20.000',
			volatility: '70',
			hari: '50',
			image: '/konsumen-pangan/bawangungu.png',
		},
		{
			komoditas: 'Cabe',
			jenis: 'Merah',
			harga: 'Rp. 50.000',
			volatility: '60',
			hari: '20',
			image: '/konsumen-pangan/cabe.png',
		},
		{
			komoditas: 'Gula',
			jenis: 'Pasir',
			harga: 'Rp. 15.000',
			volatility: '80',
			hari: '70',
			image: '/konsumen-pangan/gula.png',
		},
		{
			komoditas: 'Ikan',
			jenis: 'Tuna',
			harga: 'Rp. 40.000',
			volatility: '65',
			hari: '60',
			image: '/konsumen-pangan/ikan.png',
		},
		{
			komoditas: 'Minyak',
			jenis: 'Goreng',
			harga: 'Rp. 22.000',
			volatility: '50',
			hari: '45',
			image: '/konsumen-pangan/minyak.png',
		},
		{
			komoditas: 'Rawit',
			jenis: 'Hijau',
			harga: 'Rp. 45.000',
			volatility: '95',
			hari: '25',
			image: '/konsumen-pangan/rawit.png',
		},
		{
			komoditas: 'Sapi',
			jenis: 'Daging',
			harga: 'Rp. 120.000',
			volatility: '55',
			hari: '15',
			image: '/konsumen-pangan/sapi.png',
		},
		{
			komoditas: 'Telor',
			jenis: 'Ayam',
			harga: 'Rp. 24.000',
			volatility: '45',
			hari: '35',
			image: '/konsumen-pangan/telor.png',
		},
	];

	const [cardContents, setCardContents] = useState([
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
			color: '#bf7070',
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

	const [cardContentsNeraca, setCardContentsNeraca] = useState([
		{
			city: 'Kota Buol',
			ketersediaan: '1000 ton',
			kebutuhan: '800 ton',
			neraca: '200 ton',
			color: '#bf7070',
			id: 'Buol'
		},
		{
			city: 'Kabupaten Morowali',
			ketersediaan: '900 ton',
			kebutuhan: '700 ton',
			neraca: '200 ton',
			color: '#bf7070',
			id: 'Morowali'
		},
		{
			city: 'Kabupaten Sigi',
			ketersediaan: '1100 ton',
			kebutuhan: '950 ton',
			neraca: '150 ton',
			color: '#76bf70',
			id: 'Sigi'
		},
		{
			city: 'Kabupaten Donggala',
			ketersediaan: '1200 ton',
			kebutuhan: '1000 ton',
			neraca: '200 ton',
			id: 'Donggala',
			color: '#bf7070'
		},
		{
			city: 'Kabupaten Morowali Utara',
			ketersediaan: '800 ton',
			kebutuhan: '600 ton',
			neraca: '200 ton',
			color: '#bf7070',
			id: 'MorowaliUtara'
		},
		{
			city: 'Kabupaten Parigi Moutong',
			ketersediaan: '1050 ton',
			kebutuhan: '850 ton',
			neraca: '200 ton',
			color: '#76bf70',
			id: 'Parigi'
		},
		{
			city: 'Kabupaten Toli-Toli',
			ketersediaan: '1000 ton',
			kebutuhan: '750 ton',
			neraca: '250 ton',
			color: '#bf7070',
			id: 'Tolitoli'
		},
		{
			city: 'Kabupaten Poso',
			ketersediaan: '950 ton',
			kebutuhan: '700 ton',
			neraca: '250 ton',
			color: '#76bf70',
			id: 'Poso'
		},
		{
			city: 'Kabupaten Banggai',
			ketersediaan: '850 ton',
			kebutuhan: '600 ton',
			neraca: '250 ton',
			color: '#76bf70',
			id: 'Banggai'
		},
		{
			city: 'Kabupaten Tojo Una-Una',
			ketersediaan: '980 ton',
			kebutuhan: '780 ton',
			neraca: '200 ton',
			color: '#bf7070',
			id: 'Touna'
		},
		{
			city: 'Kabupaten Banggai Kepulauan',
			ketersediaan: '920 ton',
			kebutuhan: '720 ton',
			neraca: '200 ton',
			color: '#76bf70',
			id: 'BanggaiKepulauan'
		},
		{
			city: 'Palu',
			ketersediaan: '930 ton',
			kebutuhan: '730 ton',
			neraca: '200 ton',
			color: '#76bf70',
			id: 'Palu'
		},
		{
			city: 'Kabupaten Banggai Laut',
			ketersediaan: '930 ton',
			kebutuhan: '730 ton',
			neraca: '200 ton',
			color: '#76bf70',
			id: 'BanggaiLaut'
		},
	]);

	const [flow, setFlow] = useState<any>([
		{ start: 'Buol', end: 'Tolitoli' },
		{ start: 'Parigi', end: 'Morowali' },
		{ start: 'Banggai', end: 'Morowali-Utara' },
		{ start: 'Touna', end: 'Poso' },
		{ start: 'Sigi', end: 'Donggala' },
		{ start: 'Palu', end: 'Banggai-Laut' },
		{ start: 'Palu', end: 'Banggai-Kepulauan' },
		{ start: 'Buol', end: 'gorontalo' },
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
				setCardContentsNeraca([
					{
						city: 'Kota Palu',
						ketersediaan: '1000 ton',
						kebutuhan: '800 ton',
						neraca: '200 ton',
						color: '#f1be5b',
						id: 'element1',
					},
					{
						city: 'Kabupaten Boul',
						ketersediaan: '900 ton',
						kebutuhan: '700 ton',
						neraca: '200 ton',
						color: '#f1be5b',
						id: 'element2',
					},
					{
						city: 'Kabupaten Sigi',
						ketersediaan: '1100 ton',
						kebutuhan: '950 ton',
						neraca: '150 ton',
						color: '#76bf70',
						id: 'element3',
					},
					{
						city: 'Kabupaten Donggala',
						ketersediaan: '1200 ton',
						kebutuhan: '1000 ton',
						neraca: '200 ton',
						id: 'element4',
						color: '#bf7070'
					},
					{
						city: 'Kabupaten Morowali',
						ketersediaan: '800 ton',
						kebutuhan: '600 ton',
						neraca: '200 ton',
						color: '#f1be5b',
						id: 'element5',
					},
					{
						city: 'Kabupaten Parigi Moutong',
						ketersediaan: '1050 ton',
						kebutuhan: '850 ton',
						neraca: '200 ton',
						color: '#76bf70',
						id: 'element6',
					},
					{
						city: 'Kabupaten Toli-Toli',
						ketersediaan: '1000 ton',
						kebutuhan: '750 ton',
						neraca: '250 ton',
						color: '#bf7070',
						id: 'element7',
					},
					{
						city: 'Kabupaten Poso',
						ketersediaan: '950 ton',
						kebutuhan: '700 ton',
						neraca: '250 ton',
						color: '#f1be5b',
						id: 'element8',
					},
					{
						city: 'Kabupaten Banggai',
						ketersediaan: '850 ton',
						kebutuhan: '600 ton',
						neraca: '250 ton',
						color: '#76bf70',
						id: 'element9',
					},
					{
						city: 'Kabupaten Tojo Una-Una',
						ketersediaan: '980 ton',
						kebutuhan: '780 ton',
						neraca: '200 ton',
						color: '#bf7070',
						id: 'element10',
					},
					{
						city: 'Kabupaten Banggai Kepulauan',
						ketersediaan: '920 ton',
						kebutuhan: '720 ton',
						neraca: '200 ton',
						color: '#f1be5b',
						id: 'element11',
					},
					{
						city: 'Kabupaten Banggai Kepulauan',
						ketersediaan: '930 ton',
						kebutuhan: '730 ton',
						neraca: '200 ton',
						color: '#f1be5b',
						id: 'element12',
					},
					{
						city: 'Banggai Laut',
						ketersediaan: '930 ton',
						kebutuhan: '730 ton',
						neraca: '200 ton',
						color: '#f1be5b',
						id: 'element13',
					},
				]);
				setFlow([
					{ start: 'Sigi', end: 'Donggala' },
					{ start: 'Palu', end: 'Banggai-Laut' },
					{ start: 'Palu', end: 'Banggai-Kepulauan' },
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

	return (
		<main>
			<Navbar />
			<Hero />
			<div className="relative mx-auto  -mt-24 px-8 lg:-mt-12 z-1 shadow-xl w-[18rem] sm:w-[44rem] h-20 gap-2  rounded-lg sm:rounded-full py-[0.4rem] flex flex-col items-center sm:flex-row flex-wrap  bg-white">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Jenis Informasi</h1>
					<Select onChange={(e) => handleValueChange(e)} className=" basic-single w-[170px] border-none" options={jenisInformasi} />
				</div>
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Komoditas</h1>
					<Select className=" basic-single w-[170px] border-none" options={options} />
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
			{/* content */}
			{selectedValue === 'harga-pangan' && (
				<section className="px-4 sm:px-8 md:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
					<div className="flex flex-col sm:flex-row justify-between pt-10">
						<div className="flex-col">
							<h1 className="text-2xl sm:text-3xl md:text-4xl mb-1 font-extrabold">
								PETA PERUBAHAN HARGA
							</h1>
							<Badge className="bg-green-400 text-xs sm:text-sm md:text-base rounded-full text-white gap-2">
								<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal 22
								Juli 2024
							</Badge>
						</div>
						<div></div>
					</div>
					<div className="flex gap-10 flex-col lg:flex-row justify-around items-center">
						<div className="h-full w-full ">
							<Map cardContents={cardContents} />
						</div>
						<div className="lg:flex-col  flex-col self-center flex flex-wrap gap-4 lg:self-start">
							{cardContents.slice(0, 5).map((content, index) => (
								<Card
									key={index}
									className="flex rounded-2xl px-6 py-4 space-x-4 w-[350px]  justify-between placeholder-sky-400 ">
									<div style={{ flex: 2 }}>
										<h1 className="text-xs">{content.city}</h1>
										<p className="text-2xl font-bold">{content.price}</p>
									</div>
									<div style={{ flex: 1 }} className="flex justify-end">
										<div
											className={`rounded-md p-0 px-1 m-0 items-center flex text-white`}
											style={{ background: content.color }}>
											{content.color === '#bf7070' ? (
												<ArrowUpIcon width={20} height={20} />
											) : content.color === '#f1be5b' ? (
												<ArrowDownIcon width={20} height={20} />
											) : (
												<SymbolIcon width={20} height={20} />

												
												)}
											{content.change}
										</div>
									</div>
								</Card>
							))}
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
					<MapPola flow={flow} />
				</>
			)}
			<section className=" px-4 sm:px-8 md:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<br />
				<h1 className="text-sm m-0 p-0 sm:text-sm md:text-md">
					*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar
				</h1>
				<div className="h-1 rounded-lg mt-10 bg-black/10 z-0"></div>
				<div
					style={{ marginTop: '-40px' }}
					className="mx-auto px-4 py-4 sm:py-2 sm:px-8 shadow-xl w-[20rem] sm:w-[55rem] rounded-xl md:rounded-full flex flex-col sm:flex-row items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4">
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1">Jenis Informasi</h1>
						<Select className=" basic-single w-[170px] border-none" options={jenisInformasi} />
					</div>
					<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1">Komoditas</h1>
						<Select className=" basic-single w-[170px] border-none" options={options} />
					</div>
					<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1 ">Kabupaten/Kota</h1>
						<Select className=" basic-single w-[170px] border-none" options={kabupaten} />
					</div>
					<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1 ">Bulan</h1>
						<MonthPicker date={selectedDate} setDate={setSelectedDate} />
					</div>
					<Button className="bg-blue-300 rounded-full p-2">
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
					<div className="flex justify-start items-start self-center  flex-wrap gap-10 ">
						{konsumenPangan.map((content, index) => (
							<Card key={index} className="flex-col rounded-3xl w-[18rem] p-4 shadow-xl">
								<div className="flex items-center space-x-4">
									<div>
										<Image
											src={content.image}
											alt="user"
											width={50}
											height={50}
											className="rounded-full"
										/>
									</div>
									<div className="">
										<h1 className="font-bold text-lg">{content.komoditas}</h1>
										<p>{content.jenis}</p>
										<p className="font-bold">{content.harga}</p>
									</div>
									<div></div>
								</div>
								<div className="h-1 rounded-lg bg-black/10 my-2"></div>
								<div className="flex justify-between items-center">
									<p>{content.volatility}</p>
									<p className="text-xs font-thin">DAY IN HIGH VOLATILITY</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="size-4 fill-red-500">
										{' '}
										<path
											fillRule="evenodd"
											d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
											clipRule="evenodd"
										/>{' '}
									</svg>
								</div>
							</Card>
						))}
					</div>

					<div className='w-full mt-3 flex justify-end mb-10'>
						<div className='flex gap-1'>

							<div className='w-[24px] h-[24px] bg-[#76bf70]'></div>
							<div className='w-[24px] h-[24px] bg-[#f1be5b]'></div>
							<div className='w-[24px] h-[24px] bg-red-500'></div>
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
			<section className="px-4 sm:px-8 md:px-20 pt-4 space-y-4">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
					Berita Hari Ini
				</h1>
				<div className="flex flex-wrap justify-center gap-24 p-8">
					<Card className="w-[23rem]">
						<CardHeader>
							<Image
								src={berita}
								className="rounded-2xl"
								alt="berita"
								width={300}
								height={200}
							/>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Pada rabu, 27 februari 2024 kantor perwakilan bank indonesia
								provinsi sulawesi tengah, ... Selengkapnya
							</CardDescription>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button asChild>
								<Link href="/berita/1">Baca Selengkapnya</Link>
							</Button>
						</CardFooter>
					</Card>
					<Card className="w-[23rem]">
						<CardHeader>
							<Image
								src={berita2}
								className="rounded-2xl"
								alt="berita"
								width={300}
								height={200}
							/>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Pada rabu, 27 februari 2024 kantor perwakilan bank indonesia
								provinsi sulawesi tengah, ... Selengkapnya
							</CardDescription>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button asChild>
								<Link href="/berita/1">Baca Selengkapnya</Link>
							</Button>
						</CardFooter>
					</Card>
					<Card className="w-[23rem]">
						<CardHeader>
							<Image
								src={berita3}
								className="rounded-2xl"
								alt="berita"
								width={300}
								height={200}
							/>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Pada rabu, 27 februari 2024 kantor perwakilan bank indonesia
								provinsi sulawesi tengah, ... Selengkapnya
							</CardDescription>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button asChild>
								<Link href="/berita/1">Baca Selengkapnya</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
				<div className="h-1 rounded-lg mt-10 bg-black/10 z-0"></div>
			</section>
			<section className="px-4 sm:px-8 md:px-20 pt-4 space-y-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
						<h1 className="text-4xl font-bold">30</h1>
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
						<h1 className="text-4xl font-bold">60</h1>
					</Card>
				</div>
				<Separator className="shadow-lg" />
			</section>
			<Footer />
		</main>
	);
}
