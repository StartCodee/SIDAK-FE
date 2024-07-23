'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

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


interface cardContents {
	city: string;
	item: string;
	price: string;
	color: string;
	change: string;
	bulan: string;
	id: string;
}

export default function Home() {
	const [selectedValue, setSelectedValue] = useState<string>('harga-pangan');
	const [selectedCommodity, setSelectedCommodity] = useState('');
	
	const [selectedDate, setSelectedDate] = React.useState<Date>();
	const [selectedMonth, setSelectedMonth] = useState('');

	const handleValueChange = (e: any) => {
		console.log(e)
		setSelectedValue(e.value);
	};

	const options = [
		{ value: 'Beras Premium', label: 'Beras Premium' },
		{ value: 'Cabai Merah Besar', label: 'Cabai Merah Besar' },
		{ value: 'Cabai Rawit Merah', label: 'Cabai Rawit Merah' },
		{ value: 'Bawang Merah', label: 'Bawang Merah' },
		{ value: 'Gula Pasir Kemasan', label: 'Gula Pasir Kemasan' },
		{ value: 'Minyak Goreng', label: 'Minyak Goreng' },
		{ value: 'Daging Ayam Ras', label: 'Daging Ayam Ras' },
		{ value: 'Telur Ayam Ras', label: 'Telur Ayam Ras' },
		{ value: 'Daging Sapi', label: 'Daging Sapi' },
		{ value: 'Ikan Tongkol', label: 'Ikan Tongkol' },
		{ value: 'Bawang Putih', label: 'Bawang Putih' },
		{ value: 'Gula Pasir', label: 'Gula Pasir' },
	]

	const mockData = [
		{
			"city": "Kota palu",
			"item": "Beras Premium",
			"price": "15,167",
			"color": "#76bf70",
			"change": "-8.75%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Cabai Merah Besar",
			"price": "27,083",
			"color": "#76bf70",
			"change": "-33.24%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Cabai Rawit Merah",
			"price": "57,778",
			"color": "#bf7070",
			"change": "14.51%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Bawang Merah",
			"price": "50,833",
			"color": "#bf7070",
			"change": "12.68%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Gula Pasir Kemasan",
			"price": "18,500",
			"color": "#bf7070",
			"change": "0.74%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Minyak Goreng",
			"price": "18,694",
			"color": "#bf7070",
			"change": "1.18%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Daging Ayam Ras",
			"price": "41,944",
			"color": "#76bf70",
			"change": "-3.63%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Telur Ayam Ras",
			"price": "32,000",
			"color": "#bf7070",
			"change": "1.31%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#76bf70",
			"change": "-2.64%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Ikan Tongkol",
			"price": "35,000",
			"color": "#76bf70",
			"change": "-3.14%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Bawang Putih",
			"price": "49,222",
			"color": "#76bf70",
			"change": "-0.38%",
			"bulan": "2024-06",
			"id": "Palu"
		}, {
			"city": "Luwuk",
			"item": "Beras Premium",
			"price": "13,300",
			"color": "#76bf70",
			"change": "-3.72%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Cabai Merah Besar",
			"price": "49,000",
			"color": "#bf7070",
			"change": "39.94%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Cabai Rawit Merah",
			"price": "51,574",
			"color": "#bf7070",
			"change": "6.20%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Bawang Merah",
			"price": "43,842",
			"color": "#76bf70",
			"change": "-5.78%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Gula Pasir Kemasan",
			"price": "20,833",
			"color": "#76bf70",
			"change": "-0.56%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Minyak Goreng",
			"price": "18,704",
			"color": "#76bf70",
			"change": "-0.45%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Daging Ayam Ras",
			"price": "32,593",
			"color": "#76bf70",
			"change": "-7.53%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Telur Ayam Ras",
			"price": "33,150",
			"color": "#76bf70",
			"change": "-5.76%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Daging Sapi",
			"price": "140,000",
			"color": "#bf7070",
			"change": "0.05%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Ikan Tongkol",
			"price": "24,815",
			"color": "#bf7070",
			"change": "10.10%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Bawang Putih",
			"price": "47,472",
			"color": "#76bf70",
			"change": "-3.94%",
			"bulan": "2024-06",
			"id": "Banggai"
		}, {
			"city": "Tolitoli",
			"item": "Beras Premium",
			"price": "15,889",
			"color": "#76bf70",
			"change": "-2.84%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Cabai Merah Besar",
			"price": "47,500",
			"color": "#bf7070",
			"change": "56.80%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Cabai Rawit Merah",
			"price": "61,944",
			"color": "#bf7070",
			"change": "25.36%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Bawang Merah",
			"price": "46,389",
			"color": "#76bf70",
			"change": "-1.42%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Gula Pasir Kemasan",
			"price": "18,000",
			"color": "#76bf70",
			"change": "-2.24%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Minyak Goreng",
			"price": "18,111",
			"color": "#bf7070",
			"change": "0.62%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Daging Ayam Ras",
			"price": "34,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Telur Ayam Ras",
			"price": "33,789",
			"color": "#76bf70",
			"change": "-12.41%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Ikan Tongkol",
			"price": "28,611",
			"color": "#bf7070",
			"change": "18.63%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Bawang Putih",
			"price": "48,056",
			"color": "#bf7070",
			"change": "2.76%",
			"bulan": "2024-06",
			"id": "Tolitoli"
		}, {
			"city": "Morowali",
			"item": "Beras Premium",
			"price": "15,944",
			"color": "#76bf70",
			"change": "-1.12%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Cabai Merah Besar",
			"price": "51,667",
			"color": "#bf7070",
			"change": "10.22%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Cabai Rawit Merah",
			"price": "65,000",
			"color": "#bf7070",
			"change": "5.05%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Bawang Merah",
			"price": "49,167",
			"color": "#76bf70",
			"change": "-19.73%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Gula Pasir Kemasan",
			"price": "20,000",
			"color": "#bf7070",
			"change": "3.56%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Minyak Goreng",
			"price": "22,000",
			"color": "#bf7070",
			"change": "10.00%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Daging Ayam Ras",
			"price": "30,000",
			"color": "#76bf70",
			"change": "-14.29%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Telur Ayam Ras",
			"price": "28,333",
			"color": "#76bf70",
			"change": "-4.56%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Daging Sapi",
			"price": "151,667",
			"color": "#bf7070",
			"change": "1.11%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Ikan Tongkol",
			"price": "34,167",
			"color": "#bf7070",
			"change": "12.71%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Bawang Putih",
			"price": "50,278",
			"color": "#bf7070",
			"change": "0.56%",
			"bulan": "2024-06",
			"id": "Morowali"
		}, {
			"city": "Poso",
			"item": "Beras Premium",
			"price": "14,417",
			"color": "#76bf70",
			"change": "-6.65%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Cabai Merah Besar",
			"price": "56,944",
			"color": "#bf7070",
			"change": "3.01%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Cabai Rawit Merah",
			"price": "62,389",
			"color": "#bf7070",
			"change": "4.17%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Bawang Merah",
			"price": "40,611",
			"color": "#76bf70",
			"change": "-15.69%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Gula Pasir Kemasan",
			"price": "18,639",
			"color": "#76bf70",
			"change": "-1.90%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Minyak Goreng",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Daging Ayam Ras",
			"price": "31,778",
			"color": "#76bf70",
			"change": "-6.38%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Telur Ayam Ras",
			"price": "29,750",
			"color": "#bf7070",
			"change": "0.47%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Daging Sapi",
			"price": "140,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Ikan Tongkol",
			"price": "37,778",
			"color": "#bf7070",
			"change": "18.26%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Bawang Putih",
			"price": "45,000",
			"color": "#bf7070",
			"change": "2.53%",
			"bulan": "2024-06",
			"id": "Poso"
		}, {
			"city": "Donggala",
			"item": "Beras Premium",
			"price": "14,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Cabai Merah Besar",
			"price": "54,537",
			"color": "#bf7070",
			"change": "55.08%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Cabai Rawit Merah",
			"price": "64,593",
			"color": "#bf7070",
			"change": "21.74%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Bawang Merah",
			"price": "39,944",
			"color": "#76bf70",
			"change": "-11.24%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Gula Pasir Kemasan",
			"price": "18,278",
			"color": "#bf7070",
			"change": "1.23%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Minyak Goreng",
			"price": "25,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Daging Ayam Ras",
			"price": "31,972",
			"color": "#bf7070",
			"change": "0.23%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Telur Ayam Ras",
			"price": "31,694",
			"color": "#bf7070",
			"change": "5.65%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Ikan Tongkol",
			"price": "23,389",
			"color": "#bf7070",
			"change": "7.31%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Bawang Putih",
			"price": "44,833",
			"color": "#76bf70",
			"change": "-0.82%",
			"bulan": "2024-06",
			"id": "Donggala"
		}, {
			"city": "Buol",
			"item": "Beras Premium",
			"price": "15,000",
			"color": "#76bf70",
			"change": "-0.73%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Cabai Merah Besar",
			"price": "51,296",
			"color": "#bf7070",
			"change": "56.50%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Cabai Rawit Merah",
			"price": "70,926",
			"color": "#bf7070",
			"change": "15.36%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Bawang Merah",
			"price": "40,278",
			"color": "#76bf70",
			"change": "-13.35%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Gula Pasir Kemasan",
			"price": "18,889",
			"color": "#76bf70",
			"change": "-1.31%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Minyak Goreng",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Daging Ayam Ras",
			"price": "31,573",
			"color": "#76bf70",
			"change": "-3.42%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Telur Ayam Ras",
			"price": "31,842",
			"color": "#76bf70",
			"change": "-7.41%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Daging Sapi",
			"price": "120,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Ikan Tongkol",
			"price": "25,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Bawang Putih",
			"price": "46,204",
			"color": "#76bf70",
			"change": "-7.08%",
			"bulan": "2024-06",
			"id": "Buol"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Beras Premium",
			"price": "17,292",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Cabai Merah Besar",
			"price": "64,815",
			"color": "#bf7070",
			"change": "45.84%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Cabai Rawit Merah",
			"price": "50,000",
			"color": "#76bf70",
			"change": "-18.80%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Bawang Merah",
			"price": "53,148",
			"color": "#bf7070",
			"change": "1.77%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Gula Pasir Kemasan",
			"price": "19,667",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Minyak Goreng",
			"price": "20,667",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Daging Ayam Ras",
			"price": "36,522",
			"color": "#76bf70",
			"change": "-4.88%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Telur Ayam Ras",
			"price": "33,126",
			"color": "#76bf70",
			"change": "-2.39%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Daging Sapi",
			"price": "140,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Ikan Tongkol",
			"price": "30,000",
			"color": "#bf7070",
			"change": "10.20%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Bawang Putih",
			"price": "60,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Parigi Moutong",
			"item": "Beras Premium",
			"price": "14,111",
			"color": "#76bf70",
			"change": "-1.68%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Cabai Merah Besar",
			"price": "55,741",
			"color": "#bf7070",
			"change": "43.33%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Cabai Rawit Merah",
			"price": "67,870",
			"color": "#bf7070",
			"change": "7.32%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Bawang Merah",
			"price": "43,426",
			"color": "#76bf70",
			"change": "-5.44%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Gula Pasir Kemasan",
			"price": "19,000",
			"color": "#76bf70",
			"change": "-3.12%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Minyak Goreng",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Daging Ayam Ras",
			"price": "36,880",
			"color": "#76bf70",
			"change": "-2.38%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Telur Ayam Ras",
			"price": "30,889",
			"color": "#76bf70",
			"change": "-1.65%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Daging Sapi",
			"price": "140,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Ikan Tongkol",
			"price": "26,296",
			"color": "#bf7070",
			"change": "3.27%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Bawang Putih",
			"price": "50,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Parigi"
		}, {
			"city": "Tojo Una-Una",
			"item": "Beras Premium",
			"price": "14,111",
			"color": "#76bf70",
			"change": "-1.68%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Cabai Merah Besar",
			"price": "55,278",
			"color": "#bf7070",
			"change": "31.50%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Cabai Rawit Merah",
			"price": "55,648",
			"color": "#bf7070",
			"change": "15.35%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Bawang Merah",
			"price": "43,981",
			"color": "#76bf70",
			"change": "-5.94%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Gula Pasir Kemasan",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Minyak Goreng",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Daging Ayam Ras",
			"price": "32,500",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Telur Ayam Ras",
			"price": "32,148",
			"color": "#76bf70",
			"change": "-7.31%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Ikan Tongkol",
			"price": "40,000",
			"color": "#bf7070",
			"change": "6.93%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Bawang Putih",
			"price": "49,056",
			"color": "#76bf70",
			"change": "-1.89%",
			"bulan": "2024-06",
			"id": "Touna"
		}, {
			"city": "Sigi",
			"item": "Beras Premium",
			"price": "16,000",
			"color": "#76bf70",
			"change": "-0.69%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Cabai Merah Besar",
			"price": "53,889",
			"color": "#bf7070",
			"change": "51.17%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Cabai Rawit Merah",
			"price": "64,259",
			"color": "#bf7070",
			"change": "24.60%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Bawang Merah",
			"price": "38,741",
			"color": "#76bf70",
			"change": "-5.34%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Gula Pasir Kemasan",
			"price": "18,463",
			"color": "#76bf70",
			"change": "-1.96%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Minyak Goreng",
			"price": "19,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Daging Ayam Ras",
			"price": "35,296",
			"color": "#bf7070",
			"change": "1.25%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Telur Ayam Ras",
			"price": "28,000",
			"color": "#76bf70",
			"change": "-2.51%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Daging Sapi",
			"price": "125,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Ikan Tongkol",
			"price": "38,333",
			"color": "#bf7070",
			"change": "6.70%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Bawang Putih",
			"price": "44,574",
			"color": "#76bf70",
			"change": "-0.95%",
			"bulan": "2024-06",
			"id": "Sigi"
		}, {
			"city": "Banggai Laut",
			"item": "Beras Premium",
			"price": "14,667",
			"color": "#76bf70",
			"change": "-2.22%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Cabai Merah Besar",
			"price": "57,222",
			"color": "#bf7070",
			"change": "9.96%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Cabai Rawit Merah",
			"price": "56,667",
			"color": "#bf7070",
			"change": "13.33%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Bawang Merah",
			"price": "49,722",
			"color": "#76bf70",
			"change": "-4.79%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Gula Pasir",
			"price": "22,000",
			"color": "#76bf70",
			"change": "-3.42%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Minyak Goreng",
			"price": "20,000",
			"color": "#bf7070",
			"change": "4.25%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Daging Ayam Ras",
			"price": "45,000",
			"color": "#bf7070",
			"change": "8.92%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Telur Ayam Ras",
			"price": "32,711",
			"color": "#76bf70",
			"change": "-1.77%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Daging Sapi",
			"price": "138,889",
			"color": "#bf7070",
			"change": "3.73%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Ikan Tongkol",
			"price": "26,722",
			"color": "#bf7070",
			"change": "6.18%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Bawang Putih",
			"price": "49,167",
			"color": "#bf7070",
			"change": "2.31%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Beras Premium",
			"price": "18,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Cabai Merah Besar",
			"price": "56,667",
			"color": "#bf7070",
			"change": "25.93%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Cabai Rawit Merah",
			"price": "63,889",
			"color": "#bf7070",
			"change": "30.68%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Bawang Merah",
			"price": "50,000",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Gula Pasir",
			"price": "22,000",
			"color": "#bf7070",
			"change": "1.02%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Minyak Goreng",
			"price": "22,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Daging Ayam Ras",
			"price": "45,833",
			"color": "#bf7070",
			"change": "1.85%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Telur Ayam Ras",
			"price": "37,500",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Ikan Tongkol",
			"price": "30,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Bawang Putih",
			"price": "50,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "BanggaiLaut"
		}, {
			"city": "Morowali Utara",
			"item": "Beras Premium",
			"price": "18,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Cabai Merah Besar",
			"price": "56,667",
			"color": "#bf7070",
			"change": "25.93%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Cabai Rawit Merah",
			"price": "63,889",
			"color": "#bf7070",
			"change": "30.68%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Bawang Merah",
			"price": "50,000",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Gula Pasir",
			"price": "22,000",
			"color": "#bf7070",
			"change": "1.02%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Minyak Goreng",
			"price": "22,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Daging Ayam Ras",
			"price": "45,833",
			"color": "#bf7070",
			"change": "1.85%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Telur Ayam Ras",
			"price": "37,500",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Ikan Tongkol",
			"price": "30,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Bawang Putih",
			"price": "50,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-06",
			"id": "MorowaliUtara"
		},
		{
			"city": "Kota palu",
			"item": "Beras Premium",
			"price": "15,000",
			"color": "#76bf70",
			"change": "-1.10%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Cabai Merah Besar",
			"price": "23,438",
			"color": "#76bf70",
			"change": "-13.46%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Cabai Rawit Merah",
			"price": "40,625",
			"color": "#76bf70",
			"change": "-29.69%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Bawang Merah",
			"price": "39,719",
			"color": "#76bf70",
			"change": "-21.86%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Gula Pasir Kemasan",
			"price": "17,344",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Minyak Goreng",
			"price": "17,813",
			"color": "#76bf70",
			"change": "-4.72%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Daging Ayam Ras",
			"price": "42,188",
			"color": "#bf7070",
			"change": "0.58%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Telur Ayam Ras",
			"price": "30,000",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Daging Sapi",
			"price": "121,875",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Ikan Tongkol",
			"price": "32,656",
			"color": "#76bf70",
			"change": "-6.70%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Kota palu",
			"item": "Bawang Putih",
			"price": "43,500",
			"color": "#76bf70",
			"change": "-11.63%",
			"bulan": "2024-07",
			"id": "Palu"
		}, {
			"city": "Luwuk",
			"item": "Beras Premium",
			"price": "12,454",
			"color": "#76bf70",
			"change": "-6.36%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Cabai Merah Besar",
			"price": "45,625",
			"color": "#76bf70",
			"change": "-6.89%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Cabai Rawit Merah",
			"price": "55,052",
			"color": "#bf7070",
			"change": "6.74%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Bawang Merah",
			"price": "40,156",
			"color": "#76bf70",
			"change": "-8.41%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Gula Pasir Kemasan",
			"price": "19,406",
			"color": "#76bf70",
			"change": "-6.85%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Minyak Goreng",
			"price": "17,448",
			"color": "#76bf70",
			"change": "-6.71%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Daging Ayam Ras",
			"price": "30,755",
			"color": "#76bf70",
			"change": "-5.64%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Telur Ayam Ras",
			"price": "30,973",
			"color": "#76bf70",
			"change": "-6.57%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Daging Sapi",
			"price": "131,250",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Ikan Tongkol",
			"price": "24,063",
			"color": "#76bf70",
			"change": "-3.03%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Luwuk",
			"item": "Bawang Putih",
			"price": "45,469",
			"color": "#76bf70",
			"change": "-4.22%",
			"bulan": "2024-07",
			"id": "Banggai"
		}, {
			"city": "Tolitoli",
			"item": "Beras Premium",
			"price": "14,750",
			"color": "#76bf70",
			"change": "-7.17%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Cabai Merah Besar",
			"price": "42,500",
			"color": "#76bf70",
			"change": "-10.53%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Cabai Rawit Merah",
			"price": "49,375",
			"color": "#76bf70",
			"change": "-20.29%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Bawang Merah",
			"price": "41,250",
			"color": "#76bf70",
			"change": "-11.08%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Gula Pasir Kemasan",
			"price": "16,875",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Minyak Goreng",
			"price": "17,813",
			"color": "#76bf70",
			"change": "-1.65%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Daging Ayam Ras",
			"price": "31,875",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Telur Ayam Ras",
			"price": "32,194",
			"color": "#76bf70",
			"change": "-4.72%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Daging Sapi",
			"price": "121,875",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Ikan Tongkol",
			"price": "28,125",
			"color": "#76bf70",
			"change": "-1.70%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Tolitoli",
			"item": "Bawang Putih",
			"price": "45,000",
			"color": "#76bf70",
			"change": "-6.36%",
			"bulan": "2024-07",
			"id": "Tolitoli"
		}, {
			"city": "Morowali",
			"item": "Beras Premium",
			"price": "14,375",
			"color": "#76bf70",
			"change": "-9.84%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Cabai Merah Besar",
			"price": "48,125",
			"color": "#76bf70",
			"change": "-6.85%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Cabai Rawit Merah",
			"price": "51,250",
			"color": "#76bf70",
			"change": "-21.15%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Bawang Merah",
			"price": "37,500",
			"color": "#76bf70",
			"change": "-23.73%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Gula Pasir Kemasan",
			"price": "18,750",
			"color": "#76bf70",
			"change": "-6.25%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Minyak Goreng",
			"price": "18,875",
			"color": "#76bf70",
			"change": "-14.20%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Daging Ayam Ras",
			"price": "32,500",
			"color": "#bf7070",
			"change": "8.33%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Telur Ayam Ras",
			"price": "24,688",
			"color": "#76bf70",
			"change": "-12.87%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Daging Sapi",
			"price": "140,625",
			"color": "#76bf70",
			"change": "-7.28%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Ikan Tongkol",
			"price": "33,438",
			"color": "#76bf70",
			"change": "-2.13%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Morowali",
			"item": "Bawang Putih",
			"price": "37,917",
			"color": "#76bf70",
			"change": "-24.59%",
			"bulan": "2024-07",
			"id": "Morowali"
		}, {
			"city": "Poso",
			"item": "Beras Premium",
			"price": "14,500",
			"color": "#bf7070",
			"change": "0.58%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Cabai Merah Besar",
			"price": "50,133",
			"color": "#76bf70",
			"change": "-11.96%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Cabai Rawit Merah",
			"price": "51,933",
			"color": "#76bf70",
			"change": "-16.76%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Bawang Merah",
			"price": "34,667",
			"color": "#76bf70",
			"change": "-14.64%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Gula Pasir Kemasan",
			"price": "18,500",
			"color": "#76bf70",
			"change": "-0.75%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Minyak Goreng",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Daging Ayam Ras",
			"price": "29,467",
			"color": "#76bf70",
			"change": "-7.27%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Telur Ayam Ras",
			"price": "29,467",
			"color": "#76bf70",
			"change": "-0.95%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Daging Sapi",
			"price": "140,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Ikan Tongkol",
			"price": "30,000",
			"color": "#76bf70",
			"change": "-20.59%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Poso",
			"item": "Bawang Putih",
			"price": "45,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Poso"
		}, {
			"city": "Donggala",
			"item": "Beras Premium",
			"price": "13,973",
			"color": "#76bf70",
			"change": "-0.19%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Cabai Merah Besar",
			"price": "38,667",
			"color": "#76bf70",
			"change": "-29.10%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Cabai Rawit Merah",
			"price": "54,333",
			"color": "#76bf70",
			"change": "-15.88%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Bawang Merah",
			"price": "29,667",
			"color": "#76bf70",
			"change": "-25.73%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Gula Pasir Kemasan",
			"price": "19,000",
			"color": "#bf7070",
			"change": "3.95%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Minyak Goreng",
			"price": "25,044",
			"color": "#bf7070",
			"change": "0.18%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Daging Ayam Ras",
			"price": "30,067",
			"color": "#76bf70",
			"change": "-5.96%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Telur Ayam Ras",
			"price": "32,600",
			"color": "#bf7070",
			"change": "2.86%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Ikan Tongkol",
			"price": "34,222",
			"color": "#bf7070",
			"change": "46.32%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Donggala",
			"item": "Bawang Putih",
			"price": "42,667",
			"color": "#76bf70",
			"change": "-4.83%",
			"bulan": "2024-07",
			"id": "Donggala"
		}, {
			"city": "Buol",
			"item": "Beras Premium",
			"price": "15,367",
			"color": "#bf7070",
			"change": "2.45%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Cabai Merah Besar",
			"price": "49,889",
			"color": "#76bf70",
			"change": "-2.74%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Cabai Rawit Merah",
			"price": "48,222",
			"color": "#76bf70",
			"change": "-32.01%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Bawang Merah",
			"price": "35,111",
			"color": "#76bf70",
			"change": "-12.83%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Gula Pasir Kemasan",
			"price": "18,067",
			"color": "#76bf70",
			"change": "-4.35%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Minyak Goreng",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Daging Ayam Ras",
			"price": "33,722",
			"color": "#bf7070",
			"change": "6.81%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Telur Ayam Ras",
			"price": "31,028",
			"color": "#76bf70",
			"change": "-2.56%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Daging Sapi",
			"price": "120,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Ikan Tongkol",
			"price": "25,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Buol",
			"item": "Bawang Putih",
			"price": "44,000",
			"color": "#76bf70",
			"change": "-4.77%",
			"bulan": "2024-07",
			"id": "Buol"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Beras Premium",
			"price": "17,292",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Cabai Merah Besar",
			"price": "63,667",
			"color": "#76bf70",
			"change": "-1.77%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Cabai Rawit Merah",
			"price": "74,444",
			"color": "#bf7070",
			"change": "48.89%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Bawang Merah",
			"price": "43,222",
			"color": "#76bf70",
			"change": "-18.68%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Gula Pasir Kemasan",
			"price": "19,667",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Minyak Goreng",
			"price": "20,667",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Daging Ayam Ras",
			"price": "37,304",
			"color": "#bf7070",
			"change": "2.14%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Telur Ayam Ras",
			"price": "31,238",
			"color": "#76bf70",
			"change": "-5.70%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Daging Sapi",
			"price": "140,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Ikan Tongkol",
			"price": "30,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Banggai Kepulauan",
			"item": "Bawang Putih",
			"price": "57,556",
			"color": "#76bf70",
			"change": "-4.07%",
			"bulan": "2024-07",
			"id": "BanggaiKepulauan"
		}, {
			"city": "Parigi Moutong",
			"item": "Beras Premium",
			"price": "15,000",
			"color": "#bf7070",
			"change": "6.30%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Cabai Merah Besar",
			"price": "40,000",
			"color": "#76bf70",
			"change": "-28.24%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Cabai Rawit Merah",
			"price": "59,333",
			"color": "#76bf70",
			"change": "-12.58%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Bawang Merah",
			"price": "37,778",
			"color": "#76bf70",
			"change": "-13.01%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Gula Pasir Kemasan",
			"price": "18,956",
			"color": "#76bf70",
			"change": "-0.23%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Minyak Goreng",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Daging Ayam Ras",
			"price": "35,733",
			"color": "#76bf70",
			"change": "-3.11%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Telur Ayam Ras",
			"price": "29,867",
			"color": "#76bf70",
			"change": "-3.31%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Daging Sapi",
			"price": "140,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Ikan Tongkol",
			"price": "24,500",
			"color": "#76bf70",
			"change": "-6.83%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Parigi Moutong",
			"item": "Bawang Putih",
			"price": "47,133",
			"color": "#76bf70",
			"change": "-5.73%",
			"bulan": "2024-07",
			"id": "Parigi"
		}, {
			"city": "Tojo Una-Una",
			"item": "Beras Premium",
			"price": "15,000",
			"color": "#bf7070",
			"change": "6.30%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Cabai Merah Besar",
			"price": "57,556",
			"color": "#bf7070",
			"change": "4.12%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Cabai Rawit Merah",
			"price": "57,000",
			"color": "#bf7070",
			"change": "2.43%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Bawang Merah",
			"price": "34,333",
			"color": "#76bf70",
			"change": "-21.94%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Gula Pasir Kemasan",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Minyak Goreng",
			"price": "20,178",
			"color": "#bf7070",
			"change": "0.89%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Daging Ayam Ras",
			"price": "31,667",
			"color": "#76bf70",
			"change": "-2.56%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Telur Ayam Ras",
			"price": "32,000",
			"color": "#76bf70",
			"change": "-0.46%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Ikan Tongkol",
			"price": "39,000",
			"color": "#76bf70",
			"change": "-2.50%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Tojo Una-Una",
			"item": "Bawang Putih",
			"price": "46,222",
			"color": "#76bf70",
			"change": "-5.78%",
			"bulan": "2024-07",
			"id": "Touna"
		}, {
			"city": "Sigi",
			"item": "Beras Premium",
			"price": "16,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Cabai Merah Besar",
			"price": "37,289",
			"color": "#76bf70",
			"change": "-30.80%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Cabai Rawit Merah",
			"price": "50,200",
			"color": "#76bf70",
			"change": "-21.88%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Bawang Merah",
			"price": "33,111",
			"color": "#76bf70",
			"change": "-14.53%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Gula Pasir Kemasan",
			"price": "18,000",
			"color": "#76bf70",
			"change": "-2.51%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Minyak Goreng",
			"price": "19,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Daging Ayam Ras",
			"price": "34,767",
			"color": "#76bf70",
			"change": "-1.50%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Telur Ayam Ras",
			"price": "27,000",
			"color": "#76bf70",
			"change": "-3.57%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Daging Sapi",
			"price": "125,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Ikan Tongkol",
			"price": "38,333",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Sigi",
			"item": "Bawang Putih",
			"price": "41,311",
			"color": "#76bf70",
			"change": "-7.32%",
			"bulan": "2024-07",
			"id": "Sigi"
		}, {
			"city": "Banggai Laut",
			"item": "Beras Premium",
			"price": "14,378",
			"color": "#76bf70",
			"change": "-1.97%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Cabai Merah Besar",
			"price": "62,667",
			"color": "#bf7070",
			"change": "9.52%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Cabai Rawit Merah",
			"price": "54,400",
			"color": "#76bf70",
			"change": "-4.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Bawang Merah",
			"price": "43,000",
			"color": "#76bf70",
			"change": "-13.52%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Gula Pasir",
			"price": "22,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Minyak Goreng",
			"price": "20,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Daging Ayam Ras",
			"price": "44,800",
			"color": "#76bf70",
			"change": "-0.44%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Telur Ayam Ras",
			"price": "33,600",
			"color": "#bf7070",
			"change": "2.72%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Daging Sapi",
			"price": "137,333",
			"color": "#76bf70",
			"change": "-1.12%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Ikan Tongkol",
			"price": "30,000",
			"color": "#bf7070",
			"change": "12.27%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Bawang Putih",
			"price": "50,000",
			"color": "#bf7070",
			"change": "1.69%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Beras Premium",
			"price": "17,467",
			"color": "#76bf70",
			"change": "-2.96%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Cabai Merah Besar",
			"price": "52,667",
			"color": "#76bf70",
			"change": "-7.06%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Cabai Rawit Merah",
			"price": "53,000",
			"color": "#76bf70",
			"change": "-17.04%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Bawang Merah",
			"price": "50,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Gula Pasir",
			"price": "22,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Minyak Goreng",
			"price": "22,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Daging Ayam Ras",
			"price": "50,000",
			"color": "#bf7070",
			"change": "9.09%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Telur Ayam Ras",
			"price": "37,500",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Ikan Tongkol",
			"price": "30,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Banggai Laut",
			"item": "Bawang Putih",
			"price": "50,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "BanggaiLaut"
		}, {
			"city": "Morowali Utara",
			"item": "Beras Premium",
			"price": "17,467",
			"color": "#76bf70",
			"change": "-2.96%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Cabai Merah Besar",
			"price": "52,667",
			"color": "#76bf70",
			"change": "-7.06%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Cabai Rawit Merah",
			"price": "53,000",
			"color": "#76bf70",
			"change": "-17.04%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Bawang Merah",
			"price": "50,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Gula Pasir",
			"price": "22,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Minyak Goreng",
			"price": "22,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Daging Ayam Ras",
			"price": "50,000",
			"color": "#bf7070",
			"change": "9.09%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Telur Ayam Ras",
			"price": "37,500",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Daging Sapi",
			"price": "130,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Ikan Tongkol",
			"price": "30,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}, {
			"city": "Morowali Utara",
			"item": "Bawang Putih",
			"price": "50,000",
			"color": "#bf7070",
			"change": "0.00%",
			"bulan": "2024-07",
			"id": "MorowaliUtara"
		}
	];

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

	const [cardContents, setCardContents] = useState<cardContents[]>([]);


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
			let commodity = selectedCommodity;
			let val = format(selectedDate, 'yyyy-MM');
			const filteredData = mockData.filter(data =>
				data.item.includes(selectedCommodity) && data.bulan === val
			);
			console.log('ini val',val);
			console.log('ini commodity',commodity);
			setCardContents(filteredData);
		} else {
			console.log('No date selected');
		}
	}
	useEffect(() => {
		const filteredData = mockData.filter(data =>
			data.item.includes('Beras Premium') && data.bulan === "2024-06"
		);
		setCardContents(filteredData);
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
						onChange={(e) => handleValueChange(e)}
						className=" basic-single w-[170px] border-none"
						options={jenisInformasi}
					/>
				</div>
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Komoditas</h1>
					<Select
						className=" basic-single w-[170px] border-none"
						onChange={(option) => setSelectedCommodity(option!.value)}
						options={options}
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
										<p className="text-2xl font-bold">Rp {content.price}/Kg</p>
									</div>
									<div style={{ flex: 1 }} className="flex justify-end">
										<div
											className={`rounded-md p-0 px-1 m-0 font-bold text-[12px] items-center flex text-white`}
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
			<section className=" px-4 sm:px-8 md:px-10 lg:px-50 pt-4 ">
				<br />
				<h1 className="text-sm pb-10 p-0 sm:text-sm md:text-md">
					*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar
				</h1>
				<div className="h-1 rounded-lg  my-10 bg-black/10 z-0"></div>
				<div className="mx-auto z-1 relative -mt-20 px-4 py-[0.4rem] sm:py-2 sm:px-8 shadow-xl w-[18rem] space-y-2 lg:w-[55rem] rounded-xl lg:rounded-full flex flex-col lg:flex-row items-center lg:justify-between bg-white ">
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1">Jenis Informasi</h1>
						<Select
							className=" basic-single w-[170px] border-none"
							options={jenisInformasi}
						/>
					</div>
					<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1">Komoditas</h1>
						<Select
							className=" basic-single w-[170px] border-none"
							options={options}
						/>
					</div>
					<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
					<div className="flex-col flex-1">
						<h1 className="font-bold text-sm mb-1 ">Kabupaten/Kota</h1>
						<Select
							className=" basic-single w-[170px] border-none"
							options={kabupaten}
						/>
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
					<center>
						<div className="flex lg:justify-start justify-center items-start self-center  flex-wrap gap-10 ">
							{konsumenPangan.map((content, index) => (
								<Card
									key={index}
									className="flex-col rounded-3xl w-[18rem] p-4 shadow-xl">
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
					<Card className="md:w-[13rem] lg:w-[23rem]">
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
							<CardDescription className='mdtext-sm'>
								Pada rabu, 27 februari 2024 kantor perwakilan bank indonesia
								provinsi sulawesi tengah, ... Selengkapnya
							</CardDescription>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button asChild className="md:w-30 md:text-[10px]">
								<Link href="/berita/1">Baca Selengkapnya</Link>
							</Button>
						</CardFooter>
					</Card>
					<Card className="md:w-[13rem] lg:w-[23rem]">
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
							<CardDescription className='mdtext-sm'>
								Pada rabu, 27 februari 2024 kantor perwakilan bank indonesia
								provinsi sulawesi tengah, ... Selengkapnya
							</CardDescription>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button asChild className="md:w-30 md:text-[10px]">
								<Link href="/berita/1">Baca Selengkapnya</Link>
							</Button>
						</CardFooter>
					</Card>
					<Card className="md:w-[13rem] lg:w-[23rem]">
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
							<CardDescription className='mdtext-sm'>
								Pada rabu, 27 februari 2024 kantor perwakilan bank indonesia
								provinsi sulawesi tengah, ... Selengkapnya
							</CardDescription>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button asChild className="md:w-30 md:text-[10px]">
								<Link href="/berita/1">Baca Selengkapnya</Link>
							</Button>
						</CardFooter>
					</Card>
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
