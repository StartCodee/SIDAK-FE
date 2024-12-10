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
import { useEffect, useState } from 'react';
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
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';

import MonthPicker from '@/components/ui/monthpicker';

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
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedCommodity, setSelectedCommodity] = useState('');
	const [detailHarga, setDetailHarga] = useState({} as { city: string; price: string; color: string; change: string; id: string; } | undefined);
	const [selectedDate, setSelectedDate] = React.useState<Date>();
	const closeDialog = () => setIsDialogOpen(false);

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

	const [cardContents, setCardContents] = useState<cardContents[]>([]);

	const handleChangeMonth = () => {
		if (selectedDate) {
			let commodity = selectedCommodity;
			let val = format(selectedDate, 'yyyy-MM');
			const filteredData = mockData.filter(data =>
				data.item.includes(selectedCommodity) && data.bulan === val
			);
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
				className="mx-auto z-1 relative px-4 py-[0.4rem] sm:py-2 sm:px-8 shadow-xl w-[18rem] md:w-[30rem] sm:w-[30rem] rounded-xl md:rounded-full flex flex-col sm:flex-row items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Komoditas</h1>
					<Select
						onChange={(option) => setSelectedCommodity(option!.value)}
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
			<section className="px-4 sm:px-8 md:px-10 lg:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
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
			<section className="px-4 sm:px-8 md:px-10 lg:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col items-center space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
						{cardContents.map((content, index) => (
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
										<p className="font-light text-lg">{content.price}</p>
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
						))}
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
								<h1 className="sm:text-2xl text-lg font-bold">
									{detailHarga?.city}
								</h1>
								<button
									className=" text-black text-4xl hover:text-gray-700"
									onClick={closeDialog}>
									×
								</button>
							</div>
							<div className="flex flex-col sm:flex-row justify-around space-y-4 sm:space-y-0 gap-5">
								<div className="shadow-lg w-full sm:w-[20rem] p-4 sm:text-lg text-md  flex flex-col rounded-lg">
									<p>Harga rata - rata {detailHarga?.city}: </p>
									<h1 className="font-bold">{detailHarga?.price}</h1>
								</div>
								<div className="shadow-lg w-full sm:w-[20rem] p-4 sm:text-lg text-md  flex flex-col rounded-lg">
									<p>Harga Pada {detailHarga?.city}: </p>
									<h1 className="font-bold">{detailHarga?.price}</h1>
								</div>
								<div className="shadow-lg w-full sm:w-[20rem] p-4 sm:text-lg text-md  flex flex-col rounded-lg">
									<p>Tanggal </p>
									<h1 className="font-bold">20 Juni 2024</h1>
								</div>
								<div className="shadow-lg w-full sm:w-[20rem] p-4 sm:text-lg text-md  flex flex-col rounded-lg">
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
							<h1 className="sm:text-2xl text-lg font-bold mb-3">
								Tabel Harga Harian
							</h1>
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
