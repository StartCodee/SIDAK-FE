'use client';

import { Button } from '@/components/ui/button';
import { Chart } from '@/app/neraca-pangan/chart';
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

interface cardContents {
	city: string;
	komoditas: string;
	ketersediaan: string;
	kebutuhan: string;
	neraca: string;
	color: string;
	id: string;
}

export default function Home() {

	const options = [
		{ value: 'Beras', label: 'Beras' },
		{ value: 'Bawang Merah', label: 'Bawang Merah' },
		{ value: 'Bawang Putih', label: 'Bawang Putih' },
		{ value: 'Cabai Merah', label: 'Cabai Merah' },
		{ value: 'Cabai Rawit', label: 'Cabai Rawit' },
		{ value: 'Daging Ayam', label: 'Daging Ayam' },
		{ value: 'Telur Ayam', label: 'Telur Ayam' },
	]
	const [selectedCommodity, setSelectedCommodity] = useState('');

	const [detailHarga, setDetailHarga] = useState({} as { city: string; ketersediaan: string; kebutuhan: string; neraca: string; color: string; id: string; } | undefined);
	const [selectedDate, setSelectedDate] = React.useState<Date>();

	const mockData = [
		{
			"city": "Banggai Kepulauan",
			"komoditas": "Beras",
			"ketersediaan": "992.99 ton",
			"kebutuhan": "899.48 ton",
			"neraca": "93.51 ton",
			"color": "#76bf70",
			"id": "BanggaiKepulauan"
		},
		{
			"city": "Banggai",
			"komoditas": "Beras",
			"ketersediaan": "141013.22 ton",
			"kebutuhan": "2,952.17 ton",
			"neraca": "138,061.05 ton",
			"color": "#76bf70",
			"id": "Banggai"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Beras",
			"ketersediaan": "35483.73 ton",
			"kebutuhan": "1,349.28 ton",
			"neraca": "34,134.45 ton",
			"color": "#76bf70",
			"id": "MorowaliUtara"
		},
		{
			"city": "Poso",
			"komoditas": "Beras",
			"ketersediaan": "77879.42 ton",
			"kebutuhan": "2,113.89 ton",
			"neraca": "75,765.53 ton",
			"color": "#76bf70",
			"id": "Poso"
		},
		{
			"city": "Donggala",
			"komoditas": "Beras",
			"ketersediaan": "57266.29 ton",
			"kebutuhan": "2,893.10 ton",
			"neraca": "54,373.19 ton",
			"color": "#76bf70",
			"id": "Donggala"
		},
		{
			"city": "Tolitoli",
			"komoditas": "Beras",
			"ketersediaan": "57937.49 ton",
			"kebutuhan": "1,538.56 ton",
			"neraca": "56,398.93 ton",
			"color": "#76bf70",
			"id": "Tolitoli"
		},
		{
			"city": "Buol",
			"komoditas": "Beras",
			"ketersediaan": "16798.44 ton",
			"kebutuhan": "985.63 ton",
			"neraca": "15,812.81 ton",
			"color": "#76bf70",
			"id": "Buol"
		},
		{
			"city": "Parigi Moutong",
			"komoditas": "Beras",
			"ketersediaan": "245039.66 ton",
			"kebutuhan": "3,215.62 ton",
			"neraca": "241,824.04 ton",
			"color": "#76bf70",
			"id": "Parigi"
		},
		{
			"city": "Tojo Una-una",
			"komoditas": "Beras",
			"ketersediaan": "5677.34 ton",
			"kebutuhan": "1,174.23 ton",
			"neraca": "4,503.11 ton",
			"color": "#76bf70",
			"id": "Touna"
		},
		{
			"city": "Sigi",
			"komoditas": "Beras",
			"ketersediaan": "80066.14 ton",
			"kebutuhan": "2,078.85 ton",
			"neraca": "77,987.29 ton",
			"color": "#76bf70",
			"id": "Sigi"
		},
		{
			"city": "Banggai Laut",
			"komoditas": "Beras",
			"ketersediaan": "0 ton",
			"kebutuhan": "596.79 ton",
			"neraca": "-596.79 ton",
			"color": "#bf7070",
			"id": "BanggaiLaut"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Beras",
			"ketersediaan": "25365.23 ton",
			"kebutuhan": "987.22 ton",
			"neraca": "24,378.01 ton",
			"color": "#76bf70",
			"id": "MorowaliUtara"
		},
		{
			"city": "Kota Palu",
			"komoditas": "Beras",
			"ketersediaan": "888.75 ton",
			"kebutuhan": "2,768.25 ton",
			"neraca": "-1,879.50 ton",
			"color": "#bf7070",
			"id": "Palu"
		},
		{
			"city": "Morowali",
			"komoditas": "Beras",
			"ketersediaan": "888.75 ton",
			"kebutuhan": "2,768.25 ton",
			"neraca": "-1,879.50 ton",
			"color": "#bf7070",
			"id": "Morowali"
		},
		{
			"city": "Banggai Laut",
			"komoditas": "Beras",
			"ketersediaan": "888.75 ton",
			"kebutuhan": "2,768.25 ton",
			"neraca": "-1,879.50 ton",
			"color": "#bf7070",
			"id": "BanggaiLaut"
		},
		{
			"city": "Banggai Kepulauan",
			"komoditas": "Bawang Merah",
			"ketersediaan": "17.5 ton",
			"kebutuhan": "94.79 ton",
			"neraca": "-77.3 ton",
			"color": "#bf7070",
			"id": "BanggaiKepulauan"
		},
		{
			"city": "Morowali",
			"komoditas": "Bawang Merah",
			"ketersediaan": "17.5 ton",
			"kebutuhan": "94.79 ton",
			"neraca": "-77.3 ton",
			"color": "#bf7070",
			"id": "Morowali"
		},
		{
			"city": "Banggai",
			"komoditas": "Bawang Merah",
			"ketersediaan": "112 ton",
			"kebutuhan": "427.5 ton",
			"neraca": "-315.5 ton",
			"color": "#bf7070",
			"id": "Banggai"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Bawang Merah",
			"ketersediaan": "4.9 ton",
			"kebutuhan": "227.72 ton",
			"neraca": "-222.8 ton",
			"color": "#bf7070",
			"id": "MorowaliUtara"
		},
		{
			"city": "Poso",
			"komoditas": "Bawang Merah",
			"ketersediaan": "546.5 ton",
			"kebutuhan": "345.27 ton",
			"neraca": "201.2 ton",
			"color": "#76bf70",
			"id": "Poso"
		},
		{
			"city": "Donggala",
			"komoditas": "Bawang Merah",
			"ketersediaan": "990.5 ton",
			"kebutuhan": "238.01 ton",
			"neraca": "752.5 ton",
			"color": "#76bf70",
			"id": "Donggala"
		},
		{
			"city": "Tolitoli",
			"komoditas": "Bawang Merah",
			"ketersediaan": "0 ton",
			"kebutuhan": "198.34 ton",
			"neraca": "-198.3 ton",
			"color": "#bf7070",
			"id": "Tolitoli"
		},
		{
			"city": "Buol",
			"komoditas": "Bawang Merah",
			"ketersediaan": "26.9 ton",
			"kebutuhan": "134.27 ton",
			"neraca": "-107.4 ton",
			"color": "#bf7070",
			"id": "Buol"
		},
		{
			"city": "Parigi Moutong",
			"komoditas": "Bawang Merah",
			"ketersediaan": "2039.2 ton",
			"kebutuhan": "374.67 ton",
			"neraca": "1,664.50 ton",
			"color": "#76bf70",
			"id": "Parigi"
		},
		{
			"city": "Tojo Una-una",
			"komoditas": "Bawang Merah",
			"ketersediaan": "68.1 ton",
			"kebutuhan": "156.16 ton",
			"neraca": "-88.1 ton",
			"color": "#bf7070",
			"id": "Touna"
		},
		{
			"city": "Sigi",
			"komoditas": "Bawang Merah",
			"ketersediaan": "4427.3 ton",
			"kebutuhan": "434.12 ton",
			"neraca": "3,993.20 ton",
			"color": "#76bf70",
			"id": "Sigi"
		},
		{
			"city": "Banggai Laut",
			"komoditas": "Bawang Merah",
			"ketersediaan": "0 ton",
			"kebutuhan": "92.69 ton",
			"neraca": "-92.7 ton",
			"color": "#bf7070",
			"id": "BanggaiLaut"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Bawang Merah",
			"ketersediaan": "0 ton",
			"kebutuhan": "203.19 ton",
			"neraca": "-203.2 ton",
			"color": "#bf7070",
			"id": "MorowaliUtara"
		},
		{
			"city": "Kota Palu",
			"komoditas": "Bawang Merah",
			"ketersediaan": "855 ton",
			"kebutuhan": "635.49 ton",
			"neraca": "219.9 ton",
			"color": "#76bf70",
			id: 'Palu'
		},
		{
			"city": "Banggai Kepulauan",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "175.75 ton",
			"neraca": "-176 ton",
			"color": "#bf7070",
			"id": "BanggaiKepulauan"
		},
		{
			"city": "Banggai",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "783.26 ton",
			"neraca": "-783 ton",
			"color": "#bf7070",
			"id": "Banggai"
		},
		{
			"city": "Morowali",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "783.26 ton",
			"neraca": "-783 ton",
			"color": "#bf7070",
			"id": "Morowali"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "345.67 ton",
			"neraca": "-346 ton",
			"color": "#bf7070",
			"id": "MorowaliUtara"
		},
		{
			"city": "Poso",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "469.08 ton",
			"neraca": "-469 ton",
			"color": "#bf7070",
			"id": "Poso"
		},
		{
			"city": "Donggala",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "461.22 ton",
			"neraca": "-461 ton",
			"color": "#bf7070",
			"id": "Donggala"
		},
		{
			"city": "Tolitoli",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "366.1 ton",
			"neraca": "-366 ton",
			"color": "#bf7070",
			"id": "Tolitoli"
		},
		{
			"city": "Buol",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "287.2 ton",
			"neraca": "-287 ton",
			"color": "#bf7070",
			"id": "Buol"
		},
		{
			"city": "Parigi Moutong",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "632.94 ton",
			"neraca": "-633 ton",
			"color": "#bf7070",
			"id": "Parigi"
		},
		{
			"city": "Tojo Una-una",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "302.85 ton",
			"neraca": "-303 ton",
			"color": "#bf7070",
			"id": "Touna"
		},
		{
			"city": "Sigi",
			"komoditas": "Bawang Putih",
			"ketersediaan": "9 ton",
			"kebutuhan": "601.58 ton",
			"neraca": "-611 ton",
			"color": "#bf7070",
			"id": "Sigi"
		},
		{
			"city": "Banggai Laut",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "133.33 ton",
			"neraca": "-133 ton",
			"color": "#bf7070",
			"id": "BanggaiLaut"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "341.84 ton",
			"neraca": "-342 ton",
			"color": "#bf7070",
			"id": "MorowaliUtara"
		},
		{
			"city": "Kota Palu",
			"komoditas": "Bawang Putih",
			"ketersediaan": "- ton",
			"kebutuhan": "697.49 ton",
			"neraca": "-697 ton",
			"color": "#bf7070",
			id: 'Palu'
		},
		{
			"city": "Banggai Kepulauan",
			"komoditas": "Cabai Merah",
			"ketersediaan": "9 ton",
			"kebutuhan": "4.44 ton",
			"neraca": "4.6 ton",
			"color": "#76bf70",
			"id": "BanggaiKepulauan"
		},
		{
			"city": "Banggai",
			"komoditas": "Cabai Merah",
			"ketersediaan": "61.2 ton",
			"kebutuhan": "31.39 ton",
			"neraca": "29.8 ton",
			"color": "#76bf70",
			"id": "Banggai"
		},
		{
			"city": "Morowali",
			"komoditas": "Cabai Merah",
			"ketersediaan": "61.2 ton",
			"kebutuhan": "31.39 ton",
			"neraca": "29.8 ton",
			"color": "#76bf70",
			"id": "Morowali"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Cabai Merah",
			"ketersediaan": "74.9 ton",
			"kebutuhan": "7.5 ton",
			"neraca": "67.4 ton",
			"color": "#76bf70",
			"id": "MorowaliUtara"
		},
		{
			"city": "Poso",
			"komoditas": "Cabai Merah",
			"ketersediaan": "250.2 ton",
			"kebutuhan": "4.03 ton",
			"neraca": "246.2 ton",
			"color": "#76bf70",
			"id": "Poso"
		},
		{
			"city": "Donggala",
			"komoditas": "Cabai Merah",
			"ketersediaan": "154.2 ton",
			"kebutuhan": "23.43 ton",
			"neraca": "130.8 ton",
			"color": "#76bf70",
			"id": "Donggala"
		},
		{
			"city": "Tolitoli",
			"komoditas": "Cabai Merah",
			"ketersediaan": "42.8 ton",
			"kebutuhan": "12.98 ton",
			"neraca": "29.8 ton",
			"color": "#76bf70",
			"id": "Tolitoli"
		},
		{
			"city": "Buol",
			"komoditas": "Cabai Merah",
			"ketersediaan": "436.1 ton",
			"kebutuhan": "3.01 ton",
			"neraca": "433.1 ton",
			"color": "#76bf70",
			"id": "Buol"
		},
		{
			"city": "Parigi Moutong",
			"komoditas": "Cabai Merah",
			"ketersediaan": "1,980.10 ton",
			"kebutuhan": "32.74 ton",
			"neraca": "1,947.40 ton",
			"color": "#76bf70",
			"id": "Parigi"
		},
		{
			"city": "Tojo Una-una",
			"komoditas": "Cabai Merah",
			"ketersediaan": "210 ton",
			"kebutuhan": "2.7 ton",
			"neraca": "207.3 ton",
			"color": "#76bf70",
			"id": "Touna"
		},
		{
			"city": "Sigi",
			"komoditas": "Cabai Merah",
			"ketersediaan": "1,432.70 ton",
			"kebutuhan": "29.87 ton",
			"neraca": "1,402.80 ton",
			"color": "#76bf70",
			"id": "Sigi"
		},
		{
			"city": "Banggai Laut",
			"komoditas": "Cabai Merah",
			"ketersediaan": "- ton",
			"kebutuhan": "7.02 ton",
			"neraca": "-7.0 ton",
			"color": "#bf7070",
			"id": "BanggaiLaut"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Cabai Merah",
			"ketersediaan": "12.4 ton",
			"kebutuhan": "6.05 ton",
			"neraca": "6.3 ton",
			"color": "#76bf70",
			"id": "MorowaliUtara"
		},
		{
			"city": "Kota Palu",
			"komoditas": "Cabai Merah",
			"ketersediaan": "91.9 ton",
			"kebutuhan": "44.95 ton",
			"neraca": "47 ton",
			"color": "#76bf70",
			id: 'Palu'
		},
		{
			"city": "Banggai Kepulauan",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "247.4 ton",
			"kebutuhan": "13.82 ton",
			"neraca": "234 ton",
			"color": "#76bf70",
			"id": "BanggaiKepulauan"
		},
		{
			"city": "Banggai",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "247.6 ton",
			"kebutuhan": "56.8 ton",
			"neraca": "191 ton",
			"color": "#76bf70",
			"id": "Banggai"
		},
		{
			"city": "Morowali",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "247.6 ton",
			"kebutuhan": "56.8 ton",
			"neraca": "191 ton",
			"color": "#76bf70",
			"id": "Morowali"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "162.4 ton",
			"kebutuhan": "50.45 ton",
			"neraca": "112 ton",
			"color": "#76bf70",
			"id": "MorowaliUtara"
		},
		{
			"city": "Poso",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "1,468.60 ton",
			"kebutuhan": "68.45 ton",
			"neraca": "1,400 ton",
			"color": "#76bf70",
			"id": "Poso"
		},
		{
			"city": "Donggala",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "461.1 ton",
			"kebutuhan": "72.76 ton",
			"neraca": "388 ton",
			"color": "#76bf70",
			"id": "Donggala"
		},
		{
			"city": "Tolitoli",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "47.1 ton",
			"kebutuhan": "39.85 ton",
			"neraca": "7 ton",
			"color": "#76bf70",
			"id": "Tolitoli"
		},
		{
			"city": "Buol",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "1,465.70 ton",
			"kebutuhan": "18.66 ton",
			"neraca": "1,447 ton",
			"color": "#76bf70",
			"id": "Buol"
		},
		{
			"city": "Parigi Moutong",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "3,340.70 ton",
			"kebutuhan": "90.94 ton",
			"neraca": "3,250 ton",
			"color": "#76bf70",
			"id": "Parigi"
		},
		{
			"city": "Tojo Una-una",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "744 ton",
			"kebutuhan": "33.12 ton",
			"neraca": "711 ton",
			"color": "#76bf70",
			"id": "Touna"
		},
		{
			"city": "Sigi",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "3,003.50 ton",
			"kebutuhan": "91.73 ton",
			"neraca": "2,912 ton",
			"color": "#76bf70",
			"id": "Sigi"
		},
		{
			"city": "Banggai Laut",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "48.7 ton",
			"kebutuhan": "13.16 ton",
			"neraca": "36 ton",
			"color": "#76bf70",
			"id": "BanggaiLaut"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "83.9 ton",
			"kebutuhan": "37.31 ton",
			"neraca": "47 ton",
			"color": "#76bf70",
			"id": "MorowaliUtara"
		},
		{
			"city": "Kota Palu",
			"komoditas": "Cabai Rawit",
			"ketersediaan": "314.2 ton",
			"kebutuhan": "88.35 ton",
			"neraca": "226 ton",
			"color": "#76bf70",
			id: 'Palu'
		},
		{
			"city": "Banggai Kepulauan",
			"komoditas": "Daging Ayam",
			"ketersediaan": "11.8 ton",
			"kebutuhan": "1.48 ton",
			"neraca": "10 ton",
			"color": "#76bf70",
			"id": "BanggaiKepulauan"
		},
		{
			"city": "Banggai",
			"komoditas": "Daging Ayam",
			"ketersediaan": "1,135.40 ton",
			"kebutuhan": "37.37 ton",
			"neraca": "1,098 ton",
			"color": "#76bf70",
			"id": "Banggai"
		},
		{
			"city": "Morowali",
			"komoditas": "Daging Ayam",
			"ketersediaan": "1,135.40 ton",
			"kebutuhan": "37.37 ton",
			"neraca": "1,098 ton",
			"color": "#76bf70",
			"id": "Morowali"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Daging Ayam",
			"ketersediaan": "121.8 ton",
			"kebutuhan": "34.09 ton",
			"neraca": "88 ton",
			"color": "#76bf70",
			"id": "MorowaliUtara"
		},
		{
			"city": "Poso",
			"komoditas": "Daging Ayam",
			"ketersediaan": "119 ton",
			"kebutuhan": "63.42 ton",
			"neraca": "56 ton",
			"color": "#76bf70",
			"id": "Poso"
		},
		{
			"city": "Donggala",
			"komoditas": "Daging Ayam",
			"ketersediaan": "512.8 ton",
			"kebutuhan": "25.9 ton",
			"neraca": "487 ton",
			"color": "#76bf70",
			"id": "Donggala"
		},
		{
			"city": "Tolitoli",
			"komoditas": "Daging Ayam",
			"ketersediaan": "59.5 ton",
			"kebutuhan": "28.73 ton",
			"neraca": "31 ton",
			"color": "#76bf70",
			"id": "Tolitoli"
		},
		{
			"city": "Buol",
			"komoditas": "Daging Ayam",
			"ketersediaan": "29.3 ton",
			"kebutuhan": "15.05 ton",
			"neraca": "14 ton",
			"color": "#76bf70",
			"id": "Buol"
		},
		{
			"city": "Parigi Moutong",
			"komoditas": "Daging Ayam",
			"ketersediaan": "468.6 ton",
			"kebutuhan": "61.84 ton",
			"neraca": "407 ton",
			"color": "#76bf70",
			"id": "Parigi"
		},
		{
			"city": "Tojo Una-una",
			"komoditas": "Daging Ayam",
			"ketersediaan": "255 ton",
			"kebutuhan": "15.55 ton",
			"neraca": "239 ton",
			"color": "#76bf70",
			"id": "Touna"
		},
		{
			"city": "Sigi",
			"komoditas": "Daging Ayam",
			"ketersediaan": "37.8 ton",
			"kebutuhan": "37.33 ton",
			"neraca": "0 ton",
			"color": "#76bf70",
			"id": "Sigi"
		},
		{
			"city": "Banggai Laut",
			"komoditas": "Daging Ayam",
			"ketersediaan": "- ton",
			"kebutuhan": "3.8 ton",
			"neraca": "-4 ton",
			"color": "#bf7070",
			"id": "BanggaiLaut"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Daging Ayam",
			"ketersediaan": "9 ton",
			"kebutuhan": "25.71 ton",
			"neraca": "-17 ton",
			"color": "#bf7070",
			"id": "MorowaliUtara"
		},
		{
			"city": "Kota Palu",
			"komoditas": "Daging Ayam",
			"ketersediaan": "4852.921 ton",
			"kebutuhan": "141.05 ton",
			"neraca": "4,712 ton",
			"color": "#76bf70",
			id: 'Palu'
		},
		{
			"city": "Banggai Kepulauan",
			"komoditas": "Telur Ayam",
			"ketersediaan": "74.42 ton",
			"kebutuhan": "322.37 ton",
			"neraca": "-247.95 ton",
			"color": "#bf7070",
			"id": "BanggaiKepulauan"
		},
		{
			"city": "Banggai",
			"komoditas": "Telur Ayam",
			"ketersediaan": "347.89 ton",
			"kebutuhan": "1,745.89 ton",
			"neraca": "-1,398.01 ton",
			"color": "#bf7070",
			"id": "Banggai"
		},
		{
			"city": "Morowali",
			"komoditas": "Telur Ayam",
			"ketersediaan": "347.89 ton",
			"kebutuhan": "1,745.89 ton",
			"neraca": "-1,398.01 ton",
			"color": "#bf7070",
			"id": "Morowali"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Telur Ayam",
			"ketersediaan": "122.74 ton",
			"kebutuhan": "1,190.42 ton",
			"neraca": "-1,067.68 ton",
			"color": "#bf7070",
			"id": "MorowaliUtara"
		},
		{
			"city": "Poso",
			"komoditas": "Telur Ayam",
			"ketersediaan": "436.76 ton",
			"kebutuhan": "1,356.92 ton",
			"neraca": "-920.16 ton",
			"color": "#bf7070",
			"id": "Poso"
		},
		{
			"city": "Donggala",
			"komoditas": "Telur Ayam",
			"ketersediaan": "893.13 ton",
			"kebutuhan": "1,175.24 ton",
			"neraca": "-282.12 ton",
			"color": "#bf7070",
			"id": "Donggala"
		},
		{
			"city": "Tolitoli",
			"komoditas": "Telur Ayam",
			"ketersediaan": "493.13 ton",
			"kebutuhan": "755.38 ton",
			"neraca": "-262.25 ton",
			"color": "#bf7070",
			"id": "Tolitoli"
		},
		{
			"city": "Buol",
			"komoditas": "Telur Ayam",
			"ketersediaan": "208.64 ton",
			"kebutuhan": "467.23 ton",
			"neraca": "-258.59 ton",
			"color": "#bf7070",
			"id": "Buol"
		},
		{
			"city": "Parigi Moutong",
			"komoditas": "Telur Ayam",
			"ketersediaan": "124.15 ton",
			"kebutuhan": "1,802.42 ton",
			"neraca": "-1,678.27 ton",
			"color": "#bf7070",
			"id": "Parigi"
		},
		{
			"city": "Tojo Una-una",
			"komoditas": "Telur Ayam",
			"ketersediaan": "157.72 ton",
			"kebutuhan": "546.21 ton",
			"neraca": "-388.50 ton",
			"color": "#bf7070",
			"id": "Touna"
		},
		{
			"city": "Sigi",
			"komoditas": "Telur Ayam",
			"ketersediaan": "3,073.52 ton",
			"kebutuhan": "1,301.28 ton",
			"neraca": "1,772.24 ton",
			"color": "#76bf70",
			"id": "Sigi"
		},
		{
			"city": "Banggai Laut",
			"komoditas": "Telur Ayam",
			"ketersediaan": "22.55 ton",
			"kebutuhan": "273.98 ton",
			"neraca": "-251.43 ton",
			"color": "#bf7070",
			"id": "BanggaiLaut"
		},
		{
			"city": "Morowali Utara",
			"komoditas": "Telur Ayam",
			"ketersediaan": "25.18 ton",
			"kebutuhan": "894.95 ton",
			"neraca": "-869.77 ton",
			"color": "#bf7070",
			"id": "MorowaliUtara"
		},
		{
			"city": "Kota Palu",
			"komoditas": "Telur Ayam",
			"ketersediaan": "1,408.86 ton",
			"kebutuhan": "2,870.55 ton",
			"neraca": "-1,461.69 ton",
			"color": "#bf7070",
			id: 'Palu'
		}
	]

	const [cardContents, setCardContents] = useState<cardContents[]>([]);

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const closeDialog = () => setIsDialogOpen(false);

	const openDialog = (el: string) => {
		setDetailHarga(cardContents.find((card) => card.id === el));
		setIsDialogOpen(true);
	};

	const showCardArea = (id: string) => {
		console.log(id)
		const content = cardContents.find((card) => card.id === id);
		const path = document.getElementById(id);
		const pathRect = path ? path.getBoundingClientRect() : null;
		const pathTop = pathRect ? pathRect.top + window.scrollY + 120 : 0;
		const pathLeft = pathRect ? pathRect.left + window.scrollX + 150 : 0;
		const card = document.createElement('div');
		card.id = 'card-' + id;
		card.className =
			'absolute z-50 bg-white p-4 rounded-lg shadow-md flex items-center';
		card.style.top = `${pathTop}px`;
		card.style.left = `${pathLeft}px`;
		card.innerHTML = `
                    <div class="h-full w-20  rounded-md text-white mr-4 flex-shrink-0 bg-[${content?.color}]">
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
                            <td class="text-right">${content?.ketersediaan}</td>
                            </tr>
                            <tr>
                            <td class="pr-2">Kebutuhan:</td>
                            <td class="text-right">${content?.kebutuhan}</td>
                            </tr>
                            <tr>
                            <td colspan="2">
                                <hr class="my-1" />
                            </td>
                            </tr>
                            <tr class="font-bold">
                            <td class="pr-2">Neraca Pangan:</td>
                            <td class="text-right">${content?.neraca}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    `;
		console.log(card);
		document.body.appendChild(card);
	}

	const hideCardArea = (id: string) => {
		const card = document.getElementById('card-' + id);
		if (card) {
			card.remove();
		}
	}

	const handleChangeMonth = () => {
		if (selectedDate) {
			let commodity = selectedCommodity;
			const filteredData = mockData.filter(data =>
				data.komoditas.includes(selectedCommodity)
			);
			setCardContents(filteredData);
		} else {
			console.log('No date selected');
		}

	}

	const getColorByCity = (cityName: string) => {
		const cityData = cardContents.find(item => item.id === cityName);
		console.log(cityData, cityName);
		return cityData ? cityData.color : undefined;
	}

	useEffect(() => {
		const filteredData = mockData.filter(data =>
			data.komoditas.includes('Beras')
		);
		setCardContents(filteredData);
		console.log(filteredData);
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
					className="bg-blue-300 rounded-full p-2"
					onClick={handleChangeMonth}>
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>
			{/* content */}
			<Tabs defaultValue="table">
				<section className="px-4 sm:px-8 lg:px-50 md:px-10 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
					<div className="flex flex-col sm:flex-row justify-between pt-10">
						<div className="flex-col mb-3">
							<h1 className="text-2xl sm:text-3xl md:text-4xl mb-1 font-extrabold">
								NERACA PANGAN
							</h1>
							<Badge className="bg-green-400 text-xs sm:text-sm md:text-base rounded-full text-white gap-2">
								<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal 15
								April 2024
							</Badge>
						</div>
						<TabsList className="rounded-full w-max p-4 py-6 text-black">
							<TabsTrigger
								className="rounded-full text-md font-bold"
								value="table">
								Peta
							</TabsTrigger>
							<TabsTrigger
								className="rounded-full text-md font-bold"
								value="grafik">
								Grafik
							</TabsTrigger>
						</TabsList>
					</div>
					<div className="mx-auto  self-center">
						<TabsContent value="table">
							<div className="h-full w-full ">
								<div id="container" className="relative w-full h-full  ">
									<center>
										<svg
											viewBox="0 0 731 723"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<rect width="731" height="723" fill="" />
											<g
												id="Map_selengkapnya_beras"
												filter="url(#filter0_d_0_1)">
												<g id="Map fix">
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Buol');
														}}
														onMouseLeave={() => {
															hideCardArea('Buol');
														}}
														onClick={() => {
															openDialog('Buol');
														}}
														fill={getColorByCity('Buol')}
														id="Buol">
														<mask
															id="path-1-outside-1_0_1"
															maskUnits="userSpaceOnUse"
															x="204.912"
															y="6.13086"
															width="206"
															height="101"
															fill="black">
															<rect
																fill="white"
																x="204.912"
																y="6.13086"
																width="206"
																height="101"
															/>
															<path d="M210.373 95.0862C210.373 95.0862 213.56 93.0365 215.829 85.756C215.829 85.756 223.333 79.3856 229.47 78.7051C229.47 78.7051 233.107 77.1145 232.657 65.2837C232.657 65.2837 235.843 57.0931 234.025 53.6824C232.206 50.2718 232.19 50.7227 234.59 49.8126C236.99 48.9026 238.572 45.0327 238.572 45.0327C238.572 45.0327 244.708 42.9257 244.487 40.1135C244.265 37.3013 242.226 33.2019 244.487 30.4717C246.748 27.7416 251.983 26.151 252.212 22.9617C252.442 19.7724 255.17 17.7309 260.397 19.0919C265.624 20.4529 264.944 24.831 276.315 18.6655H286.998C286.998 18.6655 293.593 16.3617 294.502 11.1309C294.502 11.1309 304.055 11.59 297.46 18.1818L294.273 21.3711L293.364 29.1107C293.364 29.1107 304.276 47.5416 316.098 46.4019L330.419 46.1724C330.419 46.1724 335.875 42.5321 341.102 44.8032C341.102 44.8032 349.516 43.434 351.105 43.434C351.105 43.434 353.383 40.9334 359.969 43.6636C359.969 43.6636 367.924 39.3428 367.924 42.9831C367.924 46.6233 372.242 55.4944 380.656 50.034C380.656 50.034 386.112 46.6233 386.341 45.0245C386.341 45.0245 389.069 43.8849 397.483 47.3038C397.483 47.3038 401.35 49.1239 404.529 48.4434C407.708 47.7629 406.348 50.2636 399.753 51.8541C393.158 53.4447 384.973 55.4944 383.834 55.9535C382.696 56.4126 382.696 61.4139 376.33 64.1441C376.33 64.1441 377.698 73.2447 370.874 68.0139C370.874 68.0139 363.369 63.9145 363.369 61.873C363.369 59.8315 358.142 53.6824 352.907 59.8233C352.907 59.8233 345.403 64.8328 339.947 65.0541L330.173 69.834C330.173 69.834 324.037 69.834 319.031 73.4743H309.478C309.478 73.4743 308.34 78.9346 299.705 77.795H290.84C290.84 77.795 285.155 76.2044 282.427 76.8849C282.427 76.8849 281.747 82.1158 283.336 84.1654C283.336 84.1654 279.469 86.2151 277.65 86.2151C275.832 86.2151 267.418 81.6648 262.42 86.2151C257.423 90.7654 257.415 92.5856 257.415 92.5856C257.415 92.5856 258.553 98.956 254.006 101.916C254.006 101.916 244.921 99.7677 244.224 98.4887C244.224 98.4887 236.909 99.6529 232.378 97.3245C232.378 97.3245 225.062 101.744 220.065 99.6529C215.067 97.5622 210.356 96.8653 210.356 96.8653C210.356 96.8653 209.357 95.9963 210.356 95.0944L210.373 95.0862Z" />
														</mask>
														<path
															d="M210.373 95.0862C210.373 95.0862 213.56 93.0365 215.829 85.756C215.829 85.756 223.333 79.3856 229.47 78.7051C229.47 78.7051 233.107 77.1145 232.657 65.2837C232.657 65.2837 235.843 57.0931 234.025 53.6824C232.206 50.2718 232.19 50.7227 234.59 49.8126C236.99 48.9026 238.572 45.0327 238.572 45.0327C238.572 45.0327 244.708 42.9257 244.487 40.1135C244.265 37.3013 242.226 33.2019 244.487 30.4717C246.748 27.7416 251.983 26.151 252.212 22.9617C252.442 19.7724 255.17 17.7309 260.397 19.0919C265.624 20.4529 264.944 24.831 276.315 18.6655H286.998C286.998 18.6655 293.593 16.3617 294.502 11.1309C294.502 11.1309 304.055 11.59 297.46 18.1818L294.273 21.3711L293.364 29.1107C293.364 29.1107 304.276 47.5416 316.098 46.4019L330.419 46.1724C330.419 46.1724 335.875 42.5321 341.102 44.8032C341.102 44.8032 349.516 43.434 351.105 43.434C351.105 43.434 353.383 40.9334 359.969 43.6636C359.969 43.6636 367.924 39.3428 367.924 42.9831C367.924 46.6233 372.242 55.4944 380.656 50.034C380.656 50.034 386.112 46.6233 386.341 45.0245C386.341 45.0245 389.069 43.8849 397.483 47.3038C397.483 47.3038 401.35 49.1239 404.529 48.4434C407.708 47.7629 406.348 50.2636 399.753 51.8541C393.158 53.4447 384.973 55.4944 383.834 55.9535C382.696 56.4126 382.696 61.4139 376.33 64.1441C376.33 64.1441 377.698 73.2447 370.874 68.0139C370.874 68.0139 363.369 63.9145 363.369 61.873C363.369 59.8315 358.142 53.6824 352.907 59.8233C352.907 59.8233 345.403 64.8328 339.947 65.0541L330.173 69.834C330.173 69.834 324.037 69.834 319.031 73.4743H309.478C309.478 73.4743 308.34 78.9346 299.705 77.795H290.84C290.84 77.795 285.155 76.2044 282.427 76.8849C282.427 76.8849 281.747 82.1158 283.336 84.1654C283.336 84.1654 279.469 86.2151 277.65 86.2151C275.832 86.2151 267.418 81.6648 262.42 86.2151C257.423 90.7654 257.415 92.5856 257.415 92.5856C257.415 92.5856 258.553 98.956 254.006 101.916C254.006 101.916 244.921 99.7677 244.224 98.4887C244.224 98.4887 236.909 99.6529 232.378 97.3245C232.378 97.3245 225.062 101.744 220.065 99.6529C215.067 97.5622 210.356 96.8653 210.356 96.8653C210.356 96.8653 209.357 95.9963 210.356 95.0944L210.373 95.0862Z"
															fill={getColorByCity('Buol')}
														/>
														<path
															d="M210.373 95.0862C210.373 95.0862 213.56 93.0365 215.829 85.756C215.829 85.756 223.333 79.3856 229.47 78.7051C229.47 78.7051 233.107 77.1145 232.657 65.2837C232.657 65.2837 235.843 57.0931 234.025 53.6824C232.206 50.2718 232.19 50.7227 234.59 49.8126C236.99 48.9026 238.572 45.0327 238.572 45.0327C238.572 45.0327 244.708 42.9257 244.487 40.1135C244.265 37.3013 242.226 33.2019 244.487 30.4717C246.748 27.7416 251.983 26.151 252.212 22.9617C252.442 19.7724 255.17 17.7309 260.397 19.0919C265.624 20.4529 264.944 24.831 276.315 18.6655H286.998C286.998 18.6655 293.593 16.3617 294.502 11.1309C294.502 11.1309 304.055 11.59 297.46 18.1818L294.273 21.3711L293.364 29.1107C293.364 29.1107 304.276 47.5416 316.098 46.4019L330.419 46.1724C330.419 46.1724 335.875 42.5321 341.102 44.8032C341.102 44.8032 349.516 43.434 351.105 43.434C351.105 43.434 353.383 40.9334 359.969 43.6636C359.969 43.6636 367.924 39.3428 367.924 42.9831C367.924 46.6233 372.242 55.4944 380.656 50.034C380.656 50.034 386.112 46.6233 386.341 45.0245C386.341 45.0245 389.069 43.8849 397.483 47.3038C397.483 47.3038 401.35 49.1239 404.529 48.4434C407.708 47.7629 406.348 50.2636 399.753 51.8541C393.158 53.4447 384.973 55.4944 383.834 55.9535C382.696 56.4126 382.696 61.4139 376.33 64.1441C376.33 64.1441 377.698 73.2447 370.874 68.0139C370.874 68.0139 363.369 63.9145 363.369 61.873C363.369 59.8315 358.142 53.6824 352.907 59.8233C352.907 59.8233 345.403 64.8328 339.947 65.0541L330.173 69.834C330.173 69.834 324.037 69.834 319.031 73.4743H309.478C309.478 73.4743 308.34 78.9346 299.705 77.795H290.84C290.84 77.795 285.155 76.2044 282.427 76.8849C282.427 76.8849 281.747 82.1158 283.336 84.1654C283.336 84.1654 279.469 86.2151 277.65 86.2151C275.832 86.2151 267.418 81.6648 262.42 86.2151C257.423 90.7654 257.415 92.5856 257.415 92.5856C257.415 92.5856 258.553 98.956 254.006 101.916C254.006 101.916 244.921 99.7677 244.224 98.4887C244.224 98.4887 236.909 99.6529 232.378 97.3245C232.378 97.3245 225.062 101.744 220.065 99.6529C215.067 97.5622 210.356 96.8653 210.356 96.8653C210.356 96.8653 209.357 95.9963 210.356 95.0944L210.373 95.0862Z"
															stroke="#FFFEFE"
															stroke-width="8"
															mask="url(#path-1-outside-1_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Tolitoli');
														}}
														onMouseLeave={() => {
															hideCardArea('Tolitoli');
														}}
														onClick={() => {
															openDialog('Tolitoli');
														}}
														fill={getColorByCity('Tolitoli')}
														id="Tolitoli">
														<mask
															id="path-2-outside-2_0_1"
															maskUnits="userSpaceOnUse"
															x="98.7129"
															y="0"
															width="168"
															height="119"
															fill="black">
															<rect
																fill="white"
																x="98.7129"
																width="168"
																height="119"
															/>
															<path d="M102.713 92.0655C102.713 92.0655 104.182 96.9615 109.968 97.5507V110.579L117.414 110.189C117.414 110.189 126.819 104.604 132.215 101.326C132.215 101.326 146.326 99.5174 147.895 105.592C147.895 105.592 161.907 105.592 162.107 108.828C162.306 112.064 162.007 112.156 165.045 111.276C168.083 110.396 173.28 113.234 173.28 113.234C173.28 113.234 183.573 101.965 186.213 101.965C188.853 101.965 192.978 102.745 194.738 101.766C196.498 100.787 199.934 100.007 202.574 100.397C202.574 100.397 206.791 98.8286 210.12 93.9327C210.12 93.9327 211.788 92.5634 213.158 88.5471C214.528 84.5307 223.252 79.0455 227.469 78.8464C227.469 78.8464 230.897 76.2988 231.096 74.5396C231.296 72.7804 230.706 67.7765 231.976 64.5485C233.246 61.3204 233.836 55.9265 233.645 53.4786C233.645 53.4786 230.806 50.1509 232.665 49.263C234.525 48.3751 234.624 48.483 238.642 43.4874C238.642 43.4874 242.859 41.0394 243.838 40.6494C243.838 40.6494 241.581 31.6375 243.838 28.7995C246.096 25.9615 250.504 25.2727 251.484 22.0364C252.463 18.8 254.721 17.24 256.091 17.24C256.091 17.24 245.706 7.34841 241 10.3856C241 10.3856 240.219 13.1323 237.472 10.4852C237.472 10.4852 234.334 8.32761 230.615 8.13675C230.615 8.13675 226.108 5.9792 225.817 5.58918C225.526 5.19916 221.019 5 221.019 5C221.019 5 220.139 9.89598 217.391 9.89598C214.644 9.89598 213.083 9.40639 213.963 8.13675C214.843 6.86711 202.201 5.9792 201.62 8.72593C201.038 11.4727 202.499 17.7379 202.499 17.7379C202.499 17.7379 203.479 20.8746 202.4 23.5135C202.4 23.5135 208.111 29.2891 199.818 33.7037C199.818 33.7037 195.568 38.6993 199.818 43.1057C204.068 47.5121 192.306 56.9223 192.306 56.9223C192.306 56.9223 184.561 61.4283 183.88 62.5071C183.88 62.5071 177.314 63.4863 173.296 71.129C169.279 78.7717 170.648 83.7673 170.648 83.7673C170.648 83.7673 168 89.5429 166.241 89.742C164.481 89.9412 151.249 88.0741 151.249 88.0741L139.486 85.4269C139.486 85.4269 138.706 79.4522 130.862 77.7842C130.862 77.7842 130.862 73.4774 132.04 69.3615C133.219 65.2455 132.821 59.9595 132.821 59.9595C132.821 59.9595 129.094 57.3124 123.216 58.4907C123.216 58.4907 122.926 61.3287 118.908 62.1171C118.908 62.1171 116.949 67.8014 118.219 76.9129C119.489 86.0244 112.533 89.9412 102.738 92.0987L102.713 92.0655Z" />
														</mask>
														<path
															d="M102.713 92.0655C102.713 92.0655 104.182 96.9615 109.968 97.5507V110.579L117.414 110.189C117.414 110.189 126.819 104.604 132.215 101.326C132.215 101.326 146.326 99.5174 147.895 105.592C147.895 105.592 161.907 105.592 162.107 108.828C162.306 112.064 162.007 112.156 165.045 111.276C168.083 110.396 173.28 113.234 173.28 113.234C173.28 113.234 183.573 101.965 186.213 101.965C188.853 101.965 192.978 102.745 194.738 101.766C196.498 100.787 199.934 100.007 202.574 100.397C202.574 100.397 206.791 98.8286 210.12 93.9327C210.12 93.9327 211.788 92.5634 213.158 88.5471C214.528 84.5307 223.252 79.0455 227.469 78.8464C227.469 78.8464 230.897 76.2988 231.096 74.5396C231.296 72.7804 230.706 67.7765 231.976 64.5485C233.246 61.3204 233.836 55.9265 233.645 53.4786C233.645 53.4786 230.806 50.1509 232.665 49.263C234.525 48.3751 234.624 48.483 238.642 43.4874C238.642 43.4874 242.859 41.0394 243.838 40.6494C243.838 40.6494 241.581 31.6375 243.838 28.7995C246.096 25.9615 250.504 25.2727 251.484 22.0364C252.463 18.8 254.721 17.24 256.091 17.24C256.091 17.24 245.706 7.34841 241 10.3856C241 10.3856 240.219 13.1323 237.472 10.4852C237.472 10.4852 234.334 8.32761 230.615 8.13675C230.615 8.13675 226.108 5.9792 225.817 5.58918C225.526 5.19916 221.019 5 221.019 5C221.019 5 220.139 9.89598 217.391 9.89598C214.644 9.89598 213.083 9.40639 213.963 8.13675C214.843 6.86711 202.201 5.9792 201.62 8.72593C201.038 11.4727 202.499 17.7379 202.499 17.7379C202.499 17.7379 203.479 20.8746 202.4 23.5135C202.4 23.5135 208.111 29.2891 199.818 33.7037C199.818 33.7037 195.568 38.6993 199.818 43.1057C204.068 47.5121 192.306 56.9223 192.306 56.9223C192.306 56.9223 184.561 61.4283 183.88 62.5071C183.88 62.5071 177.314 63.4863 173.296 71.129C169.279 78.7717 170.648 83.7673 170.648 83.7673C170.648 83.7673 168 89.5429 166.241 89.742C164.481 89.9412 151.249 88.0741 151.249 88.0741L139.486 85.4269C139.486 85.4269 138.706 79.4522 130.862 77.7842C130.862 77.7842 130.862 73.4774 132.04 69.3615C133.219 65.2455 132.821 59.9595 132.821 59.9595C132.821 59.9595 129.094 57.3124 123.216 58.4907C123.216 58.4907 122.926 61.3287 118.908 62.1171C118.908 62.1171 116.949 67.8014 118.219 76.9129C119.489 86.0244 112.533 89.9412 102.738 92.0987L102.713 92.0655Z"
															fill={getColorByCity('Tolitoli')}
														/>
														<path
															d="M102.713 92.0655C102.713 92.0655 104.182 96.9615 109.968 97.5507V110.579L117.414 110.189C117.414 110.189 126.819 104.604 132.215 101.326C132.215 101.326 146.326 99.5174 147.895 105.592C147.895 105.592 161.907 105.592 162.107 108.828C162.306 112.064 162.007 112.156 165.045 111.276C168.083 110.396 173.28 113.234 173.28 113.234C173.28 113.234 183.573 101.965 186.213 101.965C188.853 101.965 192.978 102.745 194.738 101.766C196.498 100.787 199.934 100.007 202.574 100.397C202.574 100.397 206.791 98.8286 210.12 93.9327C210.12 93.9327 211.788 92.5634 213.158 88.5471C214.528 84.5307 223.252 79.0455 227.469 78.8464C227.469 78.8464 230.897 76.2988 231.096 74.5396C231.296 72.7804 230.706 67.7765 231.976 64.5485C233.246 61.3204 233.836 55.9265 233.645 53.4786C233.645 53.4786 230.806 50.1509 232.665 49.263C234.525 48.3751 234.624 48.483 238.642 43.4874C238.642 43.4874 242.859 41.0394 243.838 40.6494C243.838 40.6494 241.581 31.6375 243.838 28.7995C246.096 25.9615 250.504 25.2727 251.484 22.0364C252.463 18.8 254.721 17.24 256.091 17.24C256.091 17.24 245.706 7.34841 241 10.3856C241 10.3856 240.219 13.1323 237.472 10.4852C237.472 10.4852 234.334 8.32761 230.615 8.13675C230.615 8.13675 226.108 5.9792 225.817 5.58918C225.526 5.19916 221.019 5 221.019 5C221.019 5 220.139 9.89598 217.391 9.89598C214.644 9.89598 213.083 9.40639 213.963 8.13675C214.843 6.86711 202.201 5.9792 201.62 8.72593C201.038 11.4727 202.499 17.7379 202.499 17.7379C202.499 17.7379 203.479 20.8746 202.4 23.5135C202.4 23.5135 208.111 29.2891 199.818 33.7037C199.818 33.7037 195.568 38.6993 199.818 43.1057C204.068 47.5121 192.306 56.9223 192.306 56.9223C192.306 56.9223 184.561 61.4283 183.88 62.5071C183.88 62.5071 177.314 63.4863 173.296 71.129C169.279 78.7717 170.648 83.7673 170.648 83.7673C170.648 83.7673 168 89.5429 166.241 89.742C164.481 89.9412 151.249 88.0741 151.249 88.0741L139.486 85.4269C139.486 85.4269 138.706 79.4522 130.862 77.7842C130.862 77.7842 130.862 73.4774 132.04 69.3615C133.219 65.2455 132.821 59.9595 132.821 59.9595C132.821 59.9595 129.094 57.3124 123.216 58.4907C123.216 58.4907 122.926 61.3287 118.908 62.1171C118.908 62.1171 116.949 67.8014 118.219 76.9129C119.489 86.0244 112.533 89.9412 102.738 92.0987L102.713 92.0655Z"
															stroke="#FEFBFB"
															stroke-width="8"
															mask="url(#path-2-outside-2_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Parigi');
														}}
														onMouseLeave={() => {
															hideCardArea('Parigi');
														}}
														onClick={() => {
															openDialog('Parigi');
														}}
														fill={getColorByCity('Parigi')}
														id="Parigi">
														<mask
															id="path-3-outside-3_0_1"
															maskUnits="userSpaceOnUse"
															x="54.832"
															y="89.9062"
															width="241"
															height="305"
															fill="black">
															<rect
																fill="white"
																x="54.832"
																y="89.9062"
																width="241"
																height="305"
															/>
															<path d="M128.344 385.824C128.344 385.824 136.86 382.627 140.167 380.731C140.167 380.731 150.601 380.731 157.554 377.802C157.554 377.802 162.511 375.044 165.115 375.217C165.115 375.217 161.721 370.813 159.811 369.262C157.902 367.711 157.207 365.204 157.12 363.653C157.034 362.102 154.256 358.215 151.556 358.215C148.856 358.215 143.474 357.612 141.556 350.796C141.556 350.796 141.296 348.125 137.988 347.866C134.681 347.608 131.469 348.814 129.125 352.184C129.125 352.184 124.342 352.27 122.867 353.131C122.867 353.131 119.212 348.47 119.125 347.263C119.039 346.057 113.127 342.602 113.127 342.602C113.127 342.602 109.559 335.527 108.431 335.182C107.302 334.838 104.69 335.441 103.474 333.114C102.259 330.788 101.738 327.591 93.0402 320.344C93.0402 320.344 85.5662 307.918 84.8717 303.687C84.1773 299.456 83.396 293.416 82.528 289.625C81.6599 285.833 82.7884 278.836 85.7485 275.993C85.7485 275.993 86.4429 269.694 80.8786 265.635C80.8786 265.635 79.4897 258.388 79.837 254.76C79.837 254.76 80.271 252.779 76.2692 250.702V234.218C76.2692 234.218 80.9654 230.848 80.705 225.506C80.4446 220.163 80.271 216.191 80.271 216.191C80.271 216.191 88.5263 216.191 89.9238 209.806C91.3214 203.421 90.5315 200.836 90.9655 200.051C91.3995 199.267 92.7884 196.682 91.1391 194.442C91.1391 194.442 90.3579 192.805 92.6148 190.9C94.8718 188.996 95.9221 185.118 94.3509 182.016C92.7797 178.914 106.348 165.704 106.348 165.704C106.348 165.704 110.262 159.664 112.085 154.313C112.085 154.313 117.823 152.245 119.386 146.463C119.386 146.463 129.212 135.588 140.158 134.123C140.158 134.123 141.113 135.157 143.284 134.123C145.454 133.089 147.98 128.686 154.759 128.169C161.539 127.652 165.627 128.772 169.013 127.48C172.398 126.187 183.961 128.427 184.655 131.021C185.35 133.615 193.605 136.234 193.605 136.234L193.865 140.069C193.865 140.069 195.697 142.344 197.338 139.681L197.077 135.778C197.077 135.778 198.978 134.735 200.15 136.295C201.322 137.854 203.622 139.543 207.615 139.414C207.615 139.414 214.36 148.384 218.874 145.523C223.388 142.663 234.586 139.931 234.586 139.931C234.586 139.931 241.001 146.557 244.604 145.256C248.206 143.955 254.951 143.498 254.951 143.498C254.951 143.498 254.621 140.25 255.472 139.664C256.322 139.078 259.534 134.856 267.651 136.217C267.651 136.217 268.041 130.047 276.878 131.866C276.878 131.866 280.941 134.14 281.982 134.14C281.982 134.14 301.974 135.571 284.508 125.196C284.508 125.196 286.557 119.742 280.194 119.845C273.831 119.948 264.89 112.245 264.89 112.245L264.786 110.53C264.786 110.53 257.13 106.032 255.949 104.326C255.949 104.326 248.189 102.396 245.281 100.793C242.373 99.1902 235.793 101.543 235.793 101.543L232.017 99.509C232.017 99.509 222.103 103.792 218.761 101.973C215.419 100.155 209.595 99.0868 208.848 97.9062C208.848 97.9062 205.315 103.154 199.1 103.257C199.1 103.257 194.508 103.257 192.893 105.394C192.893 105.394 186.105 103.257 182.008 106.997C177.91 110.737 173.596 118.018 168.752 115.235C168.752 115.235 165.306 112.236 159.803 115.235C159.803 115.235 161.2 108.919 155.922 109.565C150.645 110.211 145.141 108.919 145.141 108.919C145.141 108.919 144.707 104.964 140.827 104.964C136.947 104.964 131.452 103.464 131.452 103.464C131.452 103.464 129.082 102.077 122.719 107.419C116.356 112.762 112.806 114.804 106.226 113.201C106.226 113.201 104.394 113.098 104.394 116.2C104.394 119.302 99.6548 125.3 99.6548 125.3L98.7954 134.933C98.7954 134.933 89.6287 139 93.8388 142.956C93.8388 142.956 94.16 146.17 90.7138 146.489C87.2676 146.807 86.8335 151.736 86.8335 151.736C86.8335 151.736 84.7849 155.691 83.3873 155.803L82.9533 163.826C82.9533 163.826 87.1547 163.826 88.6651 172.279C88.6651 172.279 90.2797 176.234 85.3231 178.061C80.3665 179.888 81.3387 185.015 81.3387 185.015C81.3387 185.015 79.3161 187.798 76.2866 187.367C76.2866 187.367 73.6911 189.082 73.0401 190.9C72.389 192.718 68.6216 193.572 68.6216 193.572L67.7622 201.275C67.7622 201.275 64.5244 205.558 65.6095 213.795C66.6945 222.033 61.0782 225.032 61.0782 225.032C61.0782 225.032 58.2743 228.031 61.0782 230.487C63.882 232.942 64.9584 239.689 61.7292 241.077C61.7292 241.077 60.6528 243.007 61.9462 245.463C61.9462 245.463 58.7084 248.246 61.408 250.28C64.1077 252.313 64.6459 255.734 61.8421 259.052C61.8421 259.052 60.8698 260.654 61.9462 262.154C63.0226 263.653 62.0504 271.787 62.0504 271.787C62.0504 271.787 62.2674 274.89 64.2032 276.07L64.5244 284.42L74.9845 298.655C74.9845 298.655 74.1251 303.791 77.6755 305.29C77.6755 305.29 80.0453 312.459 78.3265 314.596C76.6078 316.733 77.8925 322.515 77.8925 322.515L80.4793 329.788C80.4793 329.788 81.5557 337.604 80.9134 339.422C80.271 341.24 86.521 343.808 86.521 343.808C86.521 343.808 84.1512 352.365 85.4446 354.191C86.7381 356.018 88.0315 354.51 87.5974 359.112C87.5974 359.112 93.8475 358.465 95.4707 364.463L100.21 364.782C100.21 364.782 104.95 367.996 106.894 366.169C106.894 366.169 112.389 370.451 112.068 376.871C112.068 376.871 117.025 380.826 117.893 380.826C118.761 380.826 124.681 375.579 126.625 378.896C128.57 382.214 128.7 383.17 128.362 385.798L128.344 385.824Z" />
														</mask>
														<path
															d="M128.344 385.824C128.344 385.824 136.86 382.627 140.167 380.731C140.167 380.731 150.601 380.731 157.554 377.802C157.554 377.802 162.511 375.044 165.115 375.217C165.115 375.217 161.721 370.813 159.811 369.262C157.902 367.711 157.207 365.204 157.12 363.653C157.034 362.102 154.256 358.215 151.556 358.215C148.856 358.215 143.474 357.612 141.556 350.796C141.556 350.796 141.296 348.125 137.988 347.866C134.681 347.608 131.469 348.814 129.125 352.184C129.125 352.184 124.342 352.27 122.867 353.131C122.867 353.131 119.212 348.47 119.125 347.263C119.039 346.057 113.127 342.602 113.127 342.602C113.127 342.602 109.559 335.527 108.431 335.182C107.302 334.838 104.69 335.441 103.474 333.114C102.259 330.788 101.738 327.591 93.0402 320.344C93.0402 320.344 85.5662 307.918 84.8717 303.687C84.1773 299.456 83.396 293.416 82.528 289.625C81.6599 285.833 82.7884 278.836 85.7485 275.993C85.7485 275.993 86.4429 269.694 80.8786 265.635C80.8786 265.635 79.4897 258.388 79.837 254.76C79.837 254.76 80.271 252.779 76.2692 250.702V234.218C76.2692 234.218 80.9654 230.848 80.705 225.506C80.4446 220.163 80.271 216.191 80.271 216.191C80.271 216.191 88.5263 216.191 89.9238 209.806C91.3214 203.421 90.5315 200.836 90.9655 200.051C91.3995 199.267 92.7884 196.682 91.1391 194.442C91.1391 194.442 90.3579 192.805 92.6148 190.9C94.8718 188.996 95.9221 185.118 94.3509 182.016C92.7797 178.914 106.348 165.704 106.348 165.704C106.348 165.704 110.262 159.664 112.085 154.313C112.085 154.313 117.823 152.245 119.386 146.463C119.386 146.463 129.212 135.588 140.158 134.123C140.158 134.123 141.113 135.157 143.284 134.123C145.454 133.089 147.98 128.686 154.759 128.169C161.539 127.652 165.627 128.772 169.013 127.48C172.398 126.187 183.961 128.427 184.655 131.021C185.35 133.615 193.605 136.234 193.605 136.234L193.865 140.069C193.865 140.069 195.697 142.344 197.338 139.681L197.077 135.778C197.077 135.778 198.978 134.735 200.15 136.295C201.322 137.854 203.622 139.543 207.615 139.414C207.615 139.414 214.36 148.384 218.874 145.523C223.388 142.663 234.586 139.931 234.586 139.931C234.586 139.931 241.001 146.557 244.604 145.256C248.206 143.955 254.951 143.498 254.951 143.498C254.951 143.498 254.621 140.25 255.472 139.664C256.322 139.078 259.534 134.856 267.651 136.217C267.651 136.217 268.041 130.047 276.878 131.866C276.878 131.866 280.941 134.14 281.982 134.14C281.982 134.14 301.974 135.571 284.508 125.196C284.508 125.196 286.557 119.742 280.194 119.845C273.831 119.948 264.89 112.245 264.89 112.245L264.786 110.53C264.786 110.53 257.13 106.032 255.949 104.326C255.949 104.326 248.189 102.396 245.281 100.793C242.373 99.1902 235.793 101.543 235.793 101.543L232.017 99.509C232.017 99.509 222.103 103.792 218.761 101.973C215.419 100.155 209.595 99.0868 208.848 97.9062C208.848 97.9062 205.315 103.154 199.1 103.257C199.1 103.257 194.508 103.257 192.893 105.394C192.893 105.394 186.105 103.257 182.008 106.997C177.91 110.737 173.596 118.018 168.752 115.235C168.752 115.235 165.306 112.236 159.803 115.235C159.803 115.235 161.2 108.919 155.922 109.565C150.645 110.211 145.141 108.919 145.141 108.919C145.141 108.919 144.707 104.964 140.827 104.964C136.947 104.964 131.452 103.464 131.452 103.464C131.452 103.464 129.082 102.077 122.719 107.419C116.356 112.762 112.806 114.804 106.226 113.201C106.226 113.201 104.394 113.098 104.394 116.2C104.394 119.302 99.6548 125.3 99.6548 125.3L98.7954 134.933C98.7954 134.933 89.6287 139 93.8388 142.956C93.8388 142.956 94.16 146.17 90.7138 146.489C87.2676 146.807 86.8335 151.736 86.8335 151.736C86.8335 151.736 84.7849 155.691 83.3873 155.803L82.9533 163.826C82.9533 163.826 87.1547 163.826 88.6651 172.279C88.6651 172.279 90.2797 176.234 85.3231 178.061C80.3665 179.888 81.3387 185.015 81.3387 185.015C81.3387 185.015 79.3161 187.798 76.2866 187.367C76.2866 187.367 73.6911 189.082 73.0401 190.9C72.389 192.718 68.6216 193.572 68.6216 193.572L67.7622 201.275C67.7622 201.275 64.5244 205.558 65.6095 213.795C66.6945 222.033 61.0782 225.032 61.0782 225.032C61.0782 225.032 58.2743 228.031 61.0782 230.487C63.882 232.942 64.9584 239.689 61.7292 241.077C61.7292 241.077 60.6528 243.007 61.9462 245.463C61.9462 245.463 58.7084 248.246 61.408 250.28C64.1077 252.313 64.6459 255.734 61.8421 259.052C61.8421 259.052 60.8698 260.654 61.9462 262.154C63.0226 263.653 62.0504 271.787 62.0504 271.787C62.0504 271.787 62.2674 274.89 64.2032 276.07L64.5244 284.42L74.9845 298.655C74.9845 298.655 74.1251 303.791 77.6755 305.29C77.6755 305.29 80.0453 312.459 78.3265 314.596C76.6078 316.733 77.8925 322.515 77.8925 322.515L80.4793 329.788C80.4793 329.788 81.5557 337.604 80.9134 339.422C80.271 341.24 86.521 343.808 86.521 343.808C86.521 343.808 84.1512 352.365 85.4446 354.191C86.7381 356.018 88.0315 354.51 87.5974 359.112C87.5974 359.112 93.8475 358.465 95.4707 364.463L100.21 364.782C100.21 364.782 104.95 367.996 106.894 366.169C106.894 366.169 112.389 370.451 112.068 376.871C112.068 376.871 117.025 380.826 117.893 380.826C118.761 380.826 124.681 375.579 126.625 378.896C128.57 382.214 128.7 383.17 128.362 385.798L128.344 385.824Z"
															fill={getColorByCity('Parigi')}
														/>
														<path
															d="M128.344 385.824C128.344 385.824 136.86 382.627 140.167 380.731C140.167 380.731 150.601 380.731 157.554 377.802C157.554 377.802 162.511 375.044 165.115 375.217C165.115 375.217 161.721 370.813 159.811 369.262C157.902 367.711 157.207 365.204 157.12 363.653C157.034 362.102 154.256 358.215 151.556 358.215C148.856 358.215 143.474 357.612 141.556 350.796C141.556 350.796 141.296 348.125 137.988 347.866C134.681 347.608 131.469 348.814 129.125 352.184C129.125 352.184 124.342 352.27 122.867 353.131C122.867 353.131 119.212 348.47 119.125 347.263C119.039 346.057 113.127 342.602 113.127 342.602C113.127 342.602 109.559 335.527 108.431 335.182C107.302 334.838 104.69 335.441 103.474 333.114C102.259 330.788 101.738 327.591 93.0402 320.344C93.0402 320.344 85.5662 307.918 84.8717 303.687C84.1773 299.456 83.396 293.416 82.528 289.625C81.6599 285.833 82.7884 278.836 85.7485 275.993C85.7485 275.993 86.4429 269.694 80.8786 265.635C80.8786 265.635 79.4897 258.388 79.837 254.76C79.837 254.76 80.271 252.779 76.2692 250.702V234.218C76.2692 234.218 80.9654 230.848 80.705 225.506C80.4446 220.163 80.271 216.191 80.271 216.191C80.271 216.191 88.5263 216.191 89.9238 209.806C91.3214 203.421 90.5315 200.836 90.9655 200.051C91.3995 199.267 92.7884 196.682 91.1391 194.442C91.1391 194.442 90.3579 192.805 92.6148 190.9C94.8718 188.996 95.9221 185.118 94.3509 182.016C92.7797 178.914 106.348 165.704 106.348 165.704C106.348 165.704 110.262 159.664 112.085 154.313C112.085 154.313 117.823 152.245 119.386 146.463C119.386 146.463 129.212 135.588 140.158 134.123C140.158 134.123 141.113 135.157 143.284 134.123C145.454 133.089 147.98 128.686 154.759 128.169C161.539 127.652 165.627 128.772 169.013 127.48C172.398 126.187 183.961 128.427 184.655 131.021C185.35 133.615 193.605 136.234 193.605 136.234L193.865 140.069C193.865 140.069 195.697 142.344 197.338 139.681L197.077 135.778C197.077 135.778 198.978 134.735 200.15 136.295C201.322 137.854 203.622 139.543 207.615 139.414C207.615 139.414 214.36 148.384 218.874 145.523C223.388 142.663 234.586 139.931 234.586 139.931C234.586 139.931 241.001 146.557 244.604 145.256C248.206 143.955 254.951 143.498 254.951 143.498C254.951 143.498 254.621 140.25 255.472 139.664C256.322 139.078 259.534 134.856 267.651 136.217C267.651 136.217 268.041 130.047 276.878 131.866C276.878 131.866 280.941 134.14 281.982 134.14C281.982 134.14 301.974 135.571 284.508 125.196C284.508 125.196 286.557 119.742 280.194 119.845C273.831 119.948 264.89 112.245 264.89 112.245L264.786 110.53C264.786 110.53 257.13 106.032 255.949 104.326C255.949 104.326 248.189 102.396 245.281 100.793C242.373 99.1902 235.793 101.543 235.793 101.543L232.017 99.509C232.017 99.509 222.103 103.792 218.761 101.973C215.419 100.155 209.595 99.0868 208.848 97.9062C208.848 97.9062 205.315 103.154 199.1 103.257C199.1 103.257 194.508 103.257 192.893 105.394C192.893 105.394 186.105 103.257 182.008 106.997C177.91 110.737 173.596 118.018 168.752 115.235C168.752 115.235 165.306 112.236 159.803 115.235C159.803 115.235 161.2 108.919 155.922 109.565C150.645 110.211 145.141 108.919 145.141 108.919C145.141 108.919 144.707 104.964 140.827 104.964C136.947 104.964 131.452 103.464 131.452 103.464C131.452 103.464 129.082 102.077 122.719 107.419C116.356 112.762 112.806 114.804 106.226 113.201C106.226 113.201 104.394 113.098 104.394 116.2C104.394 119.302 99.6548 125.3 99.6548 125.3L98.7954 134.933C98.7954 134.933 89.6287 139 93.8388 142.956C93.8388 142.956 94.16 146.17 90.7138 146.489C87.2676 146.807 86.8335 151.736 86.8335 151.736C86.8335 151.736 84.7849 155.691 83.3873 155.803L82.9533 163.826C82.9533 163.826 87.1547 163.826 88.6651 172.279C88.6651 172.279 90.2797 176.234 85.3231 178.061C80.3665 179.888 81.3387 185.015 81.3387 185.015C81.3387 185.015 79.3161 187.798 76.2866 187.367C76.2866 187.367 73.6911 189.082 73.0401 190.9C72.389 192.718 68.6216 193.572 68.6216 193.572L67.7622 201.275C67.7622 201.275 64.5244 205.558 65.6095 213.795C66.6945 222.033 61.0782 225.032 61.0782 225.032C61.0782 225.032 58.2743 228.031 61.0782 230.487C63.882 232.942 64.9584 239.689 61.7292 241.077C61.7292 241.077 60.6528 243.007 61.9462 245.463C61.9462 245.463 58.7084 248.246 61.408 250.28C64.1077 252.313 64.6459 255.734 61.8421 259.052C61.8421 259.052 60.8698 260.654 61.9462 262.154C63.0226 263.653 62.0504 271.787 62.0504 271.787C62.0504 271.787 62.2674 274.89 64.2032 276.07L64.5244 284.42L74.9845 298.655C74.9845 298.655 74.1251 303.791 77.6755 305.29C77.6755 305.29 80.0453 312.459 78.3265 314.596C76.6078 316.733 77.8925 322.515 77.8925 322.515L80.4793 329.788C80.4793 329.788 81.5557 337.604 80.9134 339.422C80.271 341.24 86.521 343.808 86.521 343.808C86.521 343.808 84.1512 352.365 85.4446 354.191C86.7381 356.018 88.0315 354.51 87.5974 359.112C87.5974 359.112 93.8475 358.465 95.4707 364.463L100.21 364.782C100.21 364.782 104.95 367.996 106.894 366.169C106.894 366.169 112.389 370.451 112.068 376.871C112.068 376.871 117.025 380.826 117.893 380.826C118.761 380.826 124.681 375.579 126.625 378.896C128.57 382.214 128.7 383.17 128.362 385.798L128.344 385.824Z"
															stroke="#FCFBFB"
															stroke-width="8"
															mask="url(#path-3-outside-3_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Morowali');
														}}
														onMouseLeave={() => {
															hideCardArea('Morowali');
														}}
														onClick={() => {
															openDialog('Morowali');
														}}
														fill={getColorByCity('Morowali')}
														id="Morowali">
														<mask
															id="path-4-outside-4_0_1"
															maskUnits="userSpaceOnUse"
															x="272.766"
															y="529.91"
															width="195"
															height="186"
															fill="black">
															<rect
																fill="white"
																x="272.766"
																y="529.91"
																width="195"
																height="186"
															/>
															<path d="M278.319 573.825C278.319 573.825 286.435 574.677 287.846 567.312C287.846 567.312 285.673 561.837 284.919 561.083C284.165 560.328 286.24 559.574 286.24 559.574C286.24 559.574 293.222 552.777 294.73 548.154C294.73 548.154 298.216 542.306 302.652 539.662C307.087 537.017 311.425 534.009 312.933 533.911C314.441 533.814 312.179 539.103 319.728 540.611C327.277 542.12 338.499 542.306 338.499 542.306C338.499 542.306 340.566 542.688 342.411 545.323C344.256 547.959 352.932 558.252 354.724 558.252C354.724 558.252 356.046 559.104 358.21 559.006C358.21 559.006 359.346 559.574 359.248 561.837C359.15 564.1 365.946 574.296 365.946 574.296C365.946 574.296 374.337 585.335 376.608 586.843C376.608 586.843 375.668 592.788 377.079 594.395C377.079 594.395 377.362 599.586 382.552 602.514C382.552 602.514 388.868 615.159 391.609 616.951C394.35 618.744 388.682 618.646 388.123 619.596C388.123 619.596 388.877 625.355 388.877 626.579C388.877 626.579 395.672 628.372 400.382 637.05H408.366C408.366 637.05 411.507 639.384 411.852 640.547H417.521C417.521 640.547 418.204 643.351 417.113 644.238C416.022 645.125 416.022 654.008 420.182 653.6C424.343 653.192 425.576 652.233 425.576 652.233C425.576 652.233 430.765 651.55 432.335 652.783C433.906 654.017 437.525 657.699 437.525 657.699C437.525 657.699 435.884 667.807 427.217 671.631C427.217 671.631 425.718 676.751 432.273 678.668C438.829 680.585 442.244 686.459 443.131 689.6C444.018 692.742 449.483 693.15 451.532 691.517C451.532 691.517 452.765 690.63 455.222 691.038C455.222 691.038 456.039 695.679 460.891 695.546C460.891 695.546 465.043 698.758 462.177 698.891C459.312 699.024 454.193 698.82 454.539 703.328C454.885 707.836 455.222 708.448 452.969 708.794C450.716 709.14 449.279 709.548 448.942 709.886C448.605 710.223 445.597 710.436 445.597 709.131L443.956 709.202L443.823 706.744L438.634 706.948C438.634 706.948 437.951 708.794 437.951 709.477C437.951 710.161 435.493 711.323 434.402 710.915V705.316C434.402 705.316 436.523 702.307 436.177 697.596C435.831 692.884 430.375 691.65 430.375 691.65L423.34 691.517L414.94 683.114V677.923C414.94 677.923 416.102 677.239 415.215 675.74C414.327 674.24 405.377 672.456 405.377 672.456C405.377 672.456 401.278 670.957 400.524 666.511C399.77 662.065 394.306 662.891 394.306 662.891L392.39 663.574H387.679C387.679 663.574 377.708 666.307 376.954 667.744L371.694 667.673C371.694 667.673 366.433 664.621 362.805 664.869C362.805 664.869 362.557 665.366 360.073 665.065C357.589 664.763 356.099 661.985 354.014 661.835C351.929 661.684 347.902 658.755 347.804 658.4C347.707 658.045 342.739 657.655 342.739 657.655L337.071 654.576L337.514 651.745C337.514 651.745 334.933 649.358 334.88 647.77C334.826 646.181 334.081 644.087 338.854 641.904C343.626 639.721 343.325 639.97 343.325 639.97L343.227 633.909C343.227 633.909 345.516 630.732 347.201 629.588C348.887 628.443 348.789 624.024 348.789 624.024C348.789 624.024 356.888 616.02 351.22 611.947C345.551 607.874 340.238 597.926 340.238 597.926L331.695 597.527C331.695 597.527 328.661 590.668 327.073 590.171C325.485 589.674 317.182 590.073 317.182 590.073C317.182 590.073 313.057 585.45 309.526 585.104C309.526 585.104 306.493 582.468 305.747 580.729C305.002 578.99 295.457 576.656 291.589 577.002C291.589 577.002 287.686 576.31 286.595 575.955C285.504 575.6 281.725 574.659 281.725 574.659L278.31 574.509C278.31 574.509 277.086 574.225 278.31 573.843L278.319 573.825Z" />
														</mask>
														<path
															d="M278.319 573.825C278.319 573.825 286.435 574.677 287.846 567.312C287.846 567.312 285.673 561.837 284.919 561.083C284.165 560.328 286.24 559.574 286.24 559.574C286.24 559.574 293.222 552.777 294.73 548.154C294.73 548.154 298.216 542.306 302.652 539.662C307.087 537.017 311.425 534.009 312.933 533.911C314.441 533.814 312.179 539.103 319.728 540.611C327.277 542.12 338.499 542.306 338.499 542.306C338.499 542.306 340.566 542.688 342.411 545.323C344.256 547.959 352.932 558.252 354.724 558.252C354.724 558.252 356.046 559.104 358.21 559.006C358.21 559.006 359.346 559.574 359.248 561.837C359.15 564.1 365.946 574.296 365.946 574.296C365.946 574.296 374.337 585.335 376.608 586.843C376.608 586.843 375.668 592.788 377.079 594.395C377.079 594.395 377.362 599.586 382.552 602.514C382.552 602.514 388.868 615.159 391.609 616.951C394.35 618.744 388.682 618.646 388.123 619.596C388.123 619.596 388.877 625.355 388.877 626.579C388.877 626.579 395.672 628.372 400.382 637.05H408.366C408.366 637.05 411.507 639.384 411.852 640.547H417.521C417.521 640.547 418.204 643.351 417.113 644.238C416.022 645.125 416.022 654.008 420.182 653.6C424.343 653.192 425.576 652.233 425.576 652.233C425.576 652.233 430.765 651.55 432.335 652.783C433.906 654.017 437.525 657.699 437.525 657.699C437.525 657.699 435.884 667.807 427.217 671.631C427.217 671.631 425.718 676.751 432.273 678.668C438.829 680.585 442.244 686.459 443.131 689.6C444.018 692.742 449.483 693.15 451.532 691.517C451.532 691.517 452.765 690.63 455.222 691.038C455.222 691.038 456.039 695.679 460.891 695.546C460.891 695.546 465.043 698.758 462.177 698.891C459.312 699.024 454.193 698.82 454.539 703.328C454.885 707.836 455.222 708.448 452.969 708.794C450.716 709.14 449.279 709.548 448.942 709.886C448.605 710.223 445.597 710.436 445.597 709.131L443.956 709.202L443.823 706.744L438.634 706.948C438.634 706.948 437.951 708.794 437.951 709.477C437.951 710.161 435.493 711.323 434.402 710.915V705.316C434.402 705.316 436.523 702.307 436.177 697.596C435.831 692.884 430.375 691.65 430.375 691.65L423.34 691.517L414.94 683.114V677.923C414.94 677.923 416.102 677.239 415.215 675.74C414.327 674.24 405.377 672.456 405.377 672.456C405.377 672.456 401.278 670.957 400.524 666.511C399.77 662.065 394.306 662.891 394.306 662.891L392.39 663.574H387.679C387.679 663.574 377.708 666.307 376.954 667.744L371.694 667.673C371.694 667.673 366.433 664.621 362.805 664.869C362.805 664.869 362.557 665.366 360.073 665.065C357.589 664.763 356.099 661.985 354.014 661.835C351.929 661.684 347.902 658.755 347.804 658.4C347.707 658.045 342.739 657.655 342.739 657.655L337.071 654.576L337.514 651.745C337.514 651.745 334.933 649.358 334.88 647.77C334.826 646.181 334.081 644.087 338.854 641.904C343.626 639.721 343.325 639.97 343.325 639.97L343.227 633.909C343.227 633.909 345.516 630.732 347.201 629.588C348.887 628.443 348.789 624.024 348.789 624.024C348.789 624.024 356.888 616.02 351.22 611.947C345.551 607.874 340.238 597.926 340.238 597.926L331.695 597.527C331.695 597.527 328.661 590.668 327.073 590.171C325.485 589.674 317.182 590.073 317.182 590.073C317.182 590.073 313.057 585.45 309.526 585.104C309.526 585.104 306.493 582.468 305.747 580.729C305.002 578.99 295.457 576.656 291.589 577.002C291.589 577.002 287.686 576.31 286.595 575.955C285.504 575.6 281.725 574.659 281.725 574.659L278.31 574.509C278.31 574.509 277.086 574.225 278.31 573.843L278.319 573.825Z"
															fill={getColorByCity('Morowali')}
														/>
														<path
															d="M278.319 573.825C278.319 573.825 286.435 574.677 287.846 567.312C287.846 567.312 285.673 561.837 284.919 561.083C284.165 560.328 286.24 559.574 286.24 559.574C286.24 559.574 293.222 552.777 294.73 548.154C294.73 548.154 298.216 542.306 302.652 539.662C307.087 537.017 311.425 534.009 312.933 533.911C314.441 533.814 312.179 539.103 319.728 540.611C327.277 542.12 338.499 542.306 338.499 542.306C338.499 542.306 340.566 542.688 342.411 545.323C344.256 547.959 352.932 558.252 354.724 558.252C354.724 558.252 356.046 559.104 358.21 559.006C358.21 559.006 359.346 559.574 359.248 561.837C359.15 564.1 365.946 574.296 365.946 574.296C365.946 574.296 374.337 585.335 376.608 586.843C376.608 586.843 375.668 592.788 377.079 594.395C377.079 594.395 377.362 599.586 382.552 602.514C382.552 602.514 388.868 615.159 391.609 616.951C394.35 618.744 388.682 618.646 388.123 619.596C388.123 619.596 388.877 625.355 388.877 626.579C388.877 626.579 395.672 628.372 400.382 637.05H408.366C408.366 637.05 411.507 639.384 411.852 640.547H417.521C417.521 640.547 418.204 643.351 417.113 644.238C416.022 645.125 416.022 654.008 420.182 653.6C424.343 653.192 425.576 652.233 425.576 652.233C425.576 652.233 430.765 651.55 432.335 652.783C433.906 654.017 437.525 657.699 437.525 657.699C437.525 657.699 435.884 667.807 427.217 671.631C427.217 671.631 425.718 676.751 432.273 678.668C438.829 680.585 442.244 686.459 443.131 689.6C444.018 692.742 449.483 693.15 451.532 691.517C451.532 691.517 452.765 690.63 455.222 691.038C455.222 691.038 456.039 695.679 460.891 695.546C460.891 695.546 465.043 698.758 462.177 698.891C459.312 699.024 454.193 698.82 454.539 703.328C454.885 707.836 455.222 708.448 452.969 708.794C450.716 709.14 449.279 709.548 448.942 709.886C448.605 710.223 445.597 710.436 445.597 709.131L443.956 709.202L443.823 706.744L438.634 706.948C438.634 706.948 437.951 708.794 437.951 709.477C437.951 710.161 435.493 711.323 434.402 710.915V705.316C434.402 705.316 436.523 702.307 436.177 697.596C435.831 692.884 430.375 691.65 430.375 691.65L423.34 691.517L414.94 683.114V677.923C414.94 677.923 416.102 677.239 415.215 675.74C414.327 674.24 405.377 672.456 405.377 672.456C405.377 672.456 401.278 670.957 400.524 666.511C399.77 662.065 394.306 662.891 394.306 662.891L392.39 663.574H387.679C387.679 663.574 377.708 666.307 376.954 667.744L371.694 667.673C371.694 667.673 366.433 664.621 362.805 664.869C362.805 664.869 362.557 665.366 360.073 665.065C357.589 664.763 356.099 661.985 354.014 661.835C351.929 661.684 347.902 658.755 347.804 658.4C347.707 658.045 342.739 657.655 342.739 657.655L337.071 654.576L337.514 651.745C337.514 651.745 334.933 649.358 334.88 647.77C334.826 646.181 334.081 644.087 338.854 641.904C343.626 639.721 343.325 639.97 343.325 639.97L343.227 633.909C343.227 633.909 345.516 630.732 347.201 629.588C348.887 628.443 348.789 624.024 348.789 624.024C348.789 624.024 356.888 616.02 351.22 611.947C345.551 607.874 340.238 597.926 340.238 597.926L331.695 597.527C331.695 597.527 328.661 590.668 327.073 590.171C325.485 589.674 317.182 590.073 317.182 590.073C317.182 590.073 313.057 585.45 309.526 585.104C309.526 585.104 306.493 582.468 305.747 580.729C305.002 578.99 295.457 576.656 291.589 577.002C291.589 577.002 287.686 576.31 286.595 575.955C285.504 575.6 281.725 574.659 281.725 574.659L278.31 574.509C278.31 574.509 277.086 574.225 278.31 573.843L278.319 573.825Z"
															stroke="white"
															stroke-width="8"
															mask="url(#path-4-outside-4_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Banggai');
														}}
														onMouseLeave={() => {
															hideCardArea('Banggai');
														}}
														onClick={() => {
															openDialog('Banggai');
														}}
														fill={getColorByCity('Banggai')}
														id="Banggai">
														<mask
															id="path-5-outside-5_0_1"
															maskUnits="userSpaceOnUse"
															x="354.578"
															y="301.066"
															width="243"
															height="160"
															fill="black">
															<rect
																fill="white"
																x="354.578"
																y="301.066"
																width="243"
																height="160"
															/>
															<path d="M358.578 364.182C358.578 364.182 358.578 372.88 359.507 375.426C360.437 377.972 365.189 388.868 365.189 388.868C365.189 388.868 367.161 390.493 369.827 390.024C372.494 389.556 375.969 386.896 375.969 386.549C375.969 386.201 380.721 387.826 380.721 387.826H384.083L385.239 386.435C385.239 386.435 388.948 390.032 388.6 394.899C388.6 394.899 399.494 403.362 391.615 413.215C391.615 413.215 389.182 416.578 384.544 417.038C384.544 417.038 388.14 427.474 388.14 428.864C388.14 430.255 385.125 429.794 385.012 430.368C384.899 430.942 382.467 435.007 383.04 435.703C383.614 436.398 386.637 439.647 387.21 439.874C387.784 440.1 384.665 445.208 385.36 447.868C386.055 450.527 389.182 456.331 389.182 456.331H409.814C409.814 456.331 416.19 454.011 420.126 449.258C424.061 444.505 433.452 443.002 433.452 443.002C433.452 443.002 435.884 441.029 437.622 441.151C437.622 441.151 439.594 433.617 442.261 432.227C442.261 432.227 443.303 430.141 446.665 428.403C450.027 426.666 452.225 421.452 452.225 421.452L462.658 412.989V406.732L472.509 402.909V396.305C472.509 396.305 473.091 394.567 474.481 393.638L477.608 391.552C477.608 391.552 477.148 388.65 479.459 388.424C481.77 388.198 484.672 388.076 484.672 388.076C484.672 388.076 484.09 383.784 487.452 380.656C490.813 377.528 496.373 370.342 496.373 370.342C496.373 370.342 494.175 361.765 499.153 359.446C504.132 357.126 512.48 357.942 512.48 357.942L521.636 355.04C521.636 355.04 526.848 354.927 529.054 355.501C531.261 356.075 535.083 354.806 535.309 350.635C535.309 350.635 536.934 347.038 541.338 345.534C541.338 345.534 549.217 349.827 547.714 354.345C546.211 358.864 547.367 361.765 547.367 361.765C547.367 361.765 552.466 362.347 554.785 365.363C557.105 368.378 561.857 369.881 561.857 369.881C561.857 369.881 565.219 374.868 565.914 374.982C566.609 375.095 573.211 375.911 575.183 375.216C577.155 374.521 580.977 372.314 581.212 365.476L583.992 362.695C583.992 362.695 581.09 359.446 583.41 352.842C585.729 346.238 589.786 346.238 589.786 346.238V340.329C589.786 340.329 590.942 336.384 592.453 335.923C593.964 335.463 589.552 329.319 589.552 329.319C589.552 329.319 579.935 323.758 584.105 319.353C584.105 319.353 587.232 318.545 581.438 316.807C575.643 315.069 567.417 311.124 565.905 309.386C565.905 309.386 550.607 306.84 544.7 307.762C538.792 308.683 535.083 307.066 535.083 307.066C535.083 307.066 531.956 314.713 518.856 315.182C518.856 315.182 512.714 315.295 509.813 316.572C509.813 316.572 505.99 315.764 504.132 317.154C504.132 317.154 500.657 317.849 498.337 316.807C498.337 316.807 491.735 325.149 494.167 325.504C496.6 325.86 497.068 327.008 502.047 326.547C507.025 326.086 510.742 330.718 510.742 330.718C510.742 330.718 520.133 330.483 520.48 333.733C520.48 333.733 514.573 335.123 513.409 335.584C512.245 336.045 497.311 336.926 495.905 336.999C494.499 337.071 487.751 341.501 487.751 341.501C487.751 341.501 480.017 345.09 472.42 335.382C472.42 335.382 470.731 334.048 467.289 336.651C463.846 339.254 457.235 338.057 453.712 335.592C450.188 333.127 441.897 337.629 441.897 337.629C441.897 337.629 432.611 337.766 430.712 336.853C430.712 336.853 428.741 336.78 426.074 338.89L417.92 338.324C417.92 338.324 413.135 337.621 410.606 339.027C408.076 340.434 407.656 342.333 407.656 342.333H404.424C404.424 342.333 404.634 346.909 402.807 348.873C400.981 350.837 402.525 355.347 402.525 355.347C402.525 355.347 397.813 364.983 390.289 360.763C390.289 360.763 384.172 358.581 380.163 360.343C380.163 360.343 372.777 373.284 363.354 365.055C363.354 365.055 361.164 363.576 358.602 364.207L358.578 364.182Z" />
														</mask>
														<path
															d="M358.578 364.182C358.578 364.182 358.578 372.88 359.507 375.426C360.437 377.972 365.189 388.868 365.189 388.868C365.189 388.868 367.161 390.493 369.827 390.024C372.494 389.556 375.969 386.896 375.969 386.549C375.969 386.201 380.721 387.826 380.721 387.826H384.083L385.239 386.435C385.239 386.435 388.948 390.032 388.6 394.899C388.6 394.899 399.494 403.362 391.615 413.215C391.615 413.215 389.182 416.578 384.544 417.038C384.544 417.038 388.14 427.474 388.14 428.864C388.14 430.255 385.125 429.794 385.012 430.368C384.899 430.942 382.467 435.007 383.04 435.703C383.614 436.398 386.637 439.647 387.21 439.874C387.784 440.1 384.665 445.208 385.36 447.868C386.055 450.527 389.182 456.331 389.182 456.331H409.814C409.814 456.331 416.19 454.011 420.126 449.258C424.061 444.505 433.452 443.002 433.452 443.002C433.452 443.002 435.884 441.029 437.622 441.151C437.622 441.151 439.594 433.617 442.261 432.227C442.261 432.227 443.303 430.141 446.665 428.403C450.027 426.666 452.225 421.452 452.225 421.452L462.658 412.989V406.732L472.509 402.909V396.305C472.509 396.305 473.091 394.567 474.481 393.638L477.608 391.552C477.608 391.552 477.148 388.65 479.459 388.424C481.77 388.198 484.672 388.076 484.672 388.076C484.672 388.076 484.09 383.784 487.452 380.656C490.813 377.528 496.373 370.342 496.373 370.342C496.373 370.342 494.175 361.765 499.153 359.446C504.132 357.126 512.48 357.942 512.48 357.942L521.636 355.04C521.636 355.04 526.848 354.927 529.054 355.501C531.261 356.075 535.083 354.806 535.309 350.635C535.309 350.635 536.934 347.038 541.338 345.534C541.338 345.534 549.217 349.827 547.714 354.345C546.211 358.864 547.367 361.765 547.367 361.765C547.367 361.765 552.466 362.347 554.785 365.363C557.105 368.378 561.857 369.881 561.857 369.881C561.857 369.881 565.219 374.868 565.914 374.982C566.609 375.095 573.211 375.911 575.183 375.216C577.155 374.521 580.977 372.314 581.212 365.476L583.992 362.695C583.992 362.695 581.09 359.446 583.41 352.842C585.729 346.238 589.786 346.238 589.786 346.238V340.329C589.786 340.329 590.942 336.384 592.453 335.923C593.964 335.463 589.552 329.319 589.552 329.319C589.552 329.319 579.935 323.758 584.105 319.353C584.105 319.353 587.232 318.545 581.438 316.807C575.643 315.069 567.417 311.124 565.905 309.386C565.905 309.386 550.607 306.84 544.7 307.762C538.792 308.683 535.083 307.066 535.083 307.066C535.083 307.066 531.956 314.713 518.856 315.182C518.856 315.182 512.714 315.295 509.813 316.572C509.813 316.572 505.99 315.764 504.132 317.154C504.132 317.154 500.657 317.849 498.337 316.807C498.337 316.807 491.735 325.149 494.167 325.504C496.6 325.86 497.068 327.008 502.047 326.547C507.025 326.086 510.742 330.718 510.742 330.718C510.742 330.718 520.133 330.483 520.48 333.733C520.48 333.733 514.573 335.123 513.409 335.584C512.245 336.045 497.311 336.926 495.905 336.999C494.499 337.071 487.751 341.501 487.751 341.501C487.751 341.501 480.017 345.09 472.42 335.382C472.42 335.382 470.731 334.048 467.289 336.651C463.846 339.254 457.235 338.057 453.712 335.592C450.188 333.127 441.897 337.629 441.897 337.629C441.897 337.629 432.611 337.766 430.712 336.853C430.712 336.853 428.741 336.78 426.074 338.89L417.92 338.324C417.92 338.324 413.135 337.621 410.606 339.027C408.076 340.434 407.656 342.333 407.656 342.333H404.424C404.424 342.333 404.634 346.909 402.807 348.873C400.981 350.837 402.525 355.347 402.525 355.347C402.525 355.347 397.813 364.983 390.289 360.763C390.289 360.763 384.172 358.581 380.163 360.343C380.163 360.343 372.777 373.284 363.354 365.055C363.354 365.055 361.164 363.576 358.602 364.207L358.578 364.182Z"
															fill={getColorByCity('Banggai')}
														/>
														<path
															d="M358.578 364.182C358.578 364.182 358.578 372.88 359.507 375.426C360.437 377.972 365.189 388.868 365.189 388.868C365.189 388.868 367.161 390.493 369.827 390.024C372.494 389.556 375.969 386.896 375.969 386.549C375.969 386.201 380.721 387.826 380.721 387.826H384.083L385.239 386.435C385.239 386.435 388.948 390.032 388.6 394.899C388.6 394.899 399.494 403.362 391.615 413.215C391.615 413.215 389.182 416.578 384.544 417.038C384.544 417.038 388.14 427.474 388.14 428.864C388.14 430.255 385.125 429.794 385.012 430.368C384.899 430.942 382.467 435.007 383.04 435.703C383.614 436.398 386.637 439.647 387.21 439.874C387.784 440.1 384.665 445.208 385.36 447.868C386.055 450.527 389.182 456.331 389.182 456.331H409.814C409.814 456.331 416.19 454.011 420.126 449.258C424.061 444.505 433.452 443.002 433.452 443.002C433.452 443.002 435.884 441.029 437.622 441.151C437.622 441.151 439.594 433.617 442.261 432.227C442.261 432.227 443.303 430.141 446.665 428.403C450.027 426.666 452.225 421.452 452.225 421.452L462.658 412.989V406.732L472.509 402.909V396.305C472.509 396.305 473.091 394.567 474.481 393.638L477.608 391.552C477.608 391.552 477.148 388.65 479.459 388.424C481.77 388.198 484.672 388.076 484.672 388.076C484.672 388.076 484.09 383.784 487.452 380.656C490.813 377.528 496.373 370.342 496.373 370.342C496.373 370.342 494.175 361.765 499.153 359.446C504.132 357.126 512.48 357.942 512.48 357.942L521.636 355.04C521.636 355.04 526.848 354.927 529.054 355.501C531.261 356.075 535.083 354.806 535.309 350.635C535.309 350.635 536.934 347.038 541.338 345.534C541.338 345.534 549.217 349.827 547.714 354.345C546.211 358.864 547.367 361.765 547.367 361.765C547.367 361.765 552.466 362.347 554.785 365.363C557.105 368.378 561.857 369.881 561.857 369.881C561.857 369.881 565.219 374.868 565.914 374.982C566.609 375.095 573.211 375.911 575.183 375.216C577.155 374.521 580.977 372.314 581.212 365.476L583.992 362.695C583.992 362.695 581.09 359.446 583.41 352.842C585.729 346.238 589.786 346.238 589.786 346.238V340.329C589.786 340.329 590.942 336.384 592.453 335.923C593.964 335.463 589.552 329.319 589.552 329.319C589.552 329.319 579.935 323.758 584.105 319.353C584.105 319.353 587.232 318.545 581.438 316.807C575.643 315.069 567.417 311.124 565.905 309.386C565.905 309.386 550.607 306.84 544.7 307.762C538.792 308.683 535.083 307.066 535.083 307.066C535.083 307.066 531.956 314.713 518.856 315.182C518.856 315.182 512.714 315.295 509.813 316.572C509.813 316.572 505.99 315.764 504.132 317.154C504.132 317.154 500.657 317.849 498.337 316.807C498.337 316.807 491.735 325.149 494.167 325.504C496.6 325.86 497.068 327.008 502.047 326.547C507.025 326.086 510.742 330.718 510.742 330.718C510.742 330.718 520.133 330.483 520.48 333.733C520.48 333.733 514.573 335.123 513.409 335.584C512.245 336.045 497.311 336.926 495.905 336.999C494.499 337.071 487.751 341.501 487.751 341.501C487.751 341.501 480.017 345.09 472.42 335.382C472.42 335.382 470.731 334.048 467.289 336.651C463.846 339.254 457.235 338.057 453.712 335.592C450.188 333.127 441.897 337.629 441.897 337.629C441.897 337.629 432.611 337.766 430.712 336.853C430.712 336.853 428.741 336.78 426.074 338.89L417.92 338.324C417.92 338.324 413.135 337.621 410.606 339.027C408.076 340.434 407.656 342.333 407.656 342.333H404.424C404.424 342.333 404.634 346.909 402.807 348.873C400.981 350.837 402.525 355.347 402.525 355.347C402.525 355.347 397.813 364.983 390.289 360.763C390.289 360.763 384.172 358.581 380.163 360.343C380.163 360.343 372.777 373.284 363.354 365.055C363.354 365.055 361.164 363.576 358.602 364.207L358.578 364.182Z"
															stroke="white"
															stroke-width="8"
															mask="url(#path-5-outside-5_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('MorowaliUtara');
														}}
														onMouseLeave={() => {
															hideCardArea('MorowaliUtara');
														}}
														onClick={() => {
															openDialog('MorowaliUtara');
														}}
														fill={getColorByCity('MorowaliUtara')}
														id="MorowaliUtara">
														<mask
															id="path-6-outside-6_0_1"
															maskUnits="userSpaceOnUse"
															x="197.195"
															y="400.926"
															width="201"
															height="176"
															fill="black">
															<rect
																fill="white"
																x="197.195"
																y="400.926"
																width="201"
																height="176"
															/>
															<path d="M216.387 499.951C216.387 499.951 214.493 504.292 212.865 505.92C211.237 507.548 202.823 520.159 202.823 520.159C202.823 520.159 201.195 523.82 201.195 525.991V533.046L202.28 535.898L202.547 539.016L202.685 541.454L203.495 546.881L212.848 547.561C212.848 547.561 225.327 548.646 231.7 554.34C231.7 554.34 243.766 552.85 246.892 559.225C246.892 559.225 251.095 563.161 253.266 567.365C255.436 571.569 259.234 569.941 259.234 569.941C259.234 569.941 267.64 567.908 277.268 572.112C277.268 572.112 284.046 571.302 286.079 566.004L283.228 559.63C283.228 559.63 282.547 558.949 286.079 556.106C289.61 553.264 295.707 542.815 295.707 542.815C295.707 542.815 306.145 534.674 310.081 533.589C310.081 533.589 311.029 530.066 310.081 526.672C309.134 523.278 303.846 521.52 303.975 518.264C303.975 518.264 292.856 510.667 292.314 505.24C291.771 499.813 288.654 497.918 287.431 499.27C286.208 500.622 286.346 505.102 286.346 505.102L278.345 505.507C278.345 505.507 275.666 504.249 277.466 502.535C277.466 502.535 278.612 500.648 278.698 498.03C278.784 495.411 285.329 496.066 285.329 496.066C285.329 496.066 289.911 496.315 290.324 491.81C290.738 487.305 290.324 485.996 290.979 485.591C291.634 485.186 292.701 484.85 292.701 486.168C292.701 487.486 292.788 495.506 292.788 495.506L299.91 495.669C299.91 495.669 300.565 495.669 300.728 493.947L303.105 493.783C303.105 493.783 305.809 500.33 309.986 500.33C309.986 500.33 313.345 502.052 313.75 506.058C313.75 506.058 323.981 507.29 326.927 507.204C329.872 507.118 334.704 502.785 334.704 502.785C334.704 502.785 338.226 503.112 338.467 500.002C338.467 500.002 344.031 495.911 345.349 490.828C346.666 485.746 348.785 480.836 350.18 480.181C351.575 479.526 351.739 473.962 351.739 473.962C351.739 473.962 356.571 467.329 361.316 468.561C361.316 468.561 363.693 470.137 365.657 468.405C367.62 466.674 371.547 464.219 376.792 464.46C376.792 464.46 378.3 464.374 381.822 459.74C385.344 455.105 385.749 455.303 388.677 455.002C388.677 455.002 385.034 451.349 385.93 446.465C386.826 441.581 388.505 439.522 386.834 438.618C385.164 437.713 380.788 435.448 384.587 432.476C384.587 432.476 386.567 431.485 388.161 431.563C389.754 431.64 388.841 426.317 386.791 423.121C384.742 419.925 385.267 415.971 385.267 415.971C385.267 415.971 377.886 414.679 377.128 409.812C376.37 404.945 376.827 404.936 376.827 404.936C376.827 404.936 368.912 404.557 364.881 408.356C364.881 408.356 360.317 409.958 355.218 407.788C355.218 407.788 351.644 411.25 347.08 411.25C342.515 411.25 337.494 416.273 337.494 416.273C337.494 416.273 328.288 416.496 325.549 420.08C322.81 423.663 314.895 427.996 312.622 424.034C310.348 420.071 302.201 417.565 300.53 419.167C300.53 419.167 301.064 424.111 294.217 423.121C294.217 423.121 288.662 429.056 284.175 430.348C279.688 431.64 277.027 434.535 268.656 432.631C268.656 432.631 252.68 437.575 245.377 445.414C238.073 453.253 224.69 456.828 220.427 456.527C216.164 456.225 209.773 456.371 209.773 456.371C209.773 456.371 205.364 464.968 204.985 469.835C204.985 469.835 201.635 474.478 203.46 479.044C205.286 483.609 206.811 486.96 207.034 489.011C207.034 489.011 208.171 490.992 209.541 491.371C209.541 491.371 212.167 498.719 216.37 499.951H216.387Z" />
														</mask>
														<path
															d="M216.387 499.951C216.387 499.951 214.493 504.292 212.865 505.92C211.237 507.548 202.823 520.159 202.823 520.159C202.823 520.159 201.195 523.82 201.195 525.991V533.046L202.28 535.898L202.547 539.016L202.685 541.454L203.495 546.881L212.848 547.561C212.848 547.561 225.327 548.646 231.7 554.34C231.7 554.34 243.766 552.85 246.892 559.225C246.892 559.225 251.095 563.161 253.266 567.365C255.436 571.569 259.234 569.941 259.234 569.941C259.234 569.941 267.64 567.908 277.268 572.112C277.268 572.112 284.046 571.302 286.079 566.004L283.228 559.63C283.228 559.63 282.547 558.949 286.079 556.106C289.61 553.264 295.707 542.815 295.707 542.815C295.707 542.815 306.145 534.674 310.081 533.589C310.081 533.589 311.029 530.066 310.081 526.672C309.134 523.278 303.846 521.52 303.975 518.264C303.975 518.264 292.856 510.667 292.314 505.24C291.771 499.813 288.654 497.918 287.431 499.27C286.208 500.622 286.346 505.102 286.346 505.102L278.345 505.507C278.345 505.507 275.666 504.249 277.466 502.535C277.466 502.535 278.612 500.648 278.698 498.03C278.784 495.411 285.329 496.066 285.329 496.066C285.329 496.066 289.911 496.315 290.324 491.81C290.738 487.305 290.324 485.996 290.979 485.591C291.634 485.186 292.701 484.85 292.701 486.168C292.701 487.486 292.788 495.506 292.788 495.506L299.91 495.669C299.91 495.669 300.565 495.669 300.728 493.947L303.105 493.783C303.105 493.783 305.809 500.33 309.986 500.33C309.986 500.33 313.345 502.052 313.75 506.058C313.75 506.058 323.981 507.29 326.927 507.204C329.872 507.118 334.704 502.785 334.704 502.785C334.704 502.785 338.226 503.112 338.467 500.002C338.467 500.002 344.031 495.911 345.349 490.828C346.666 485.746 348.785 480.836 350.18 480.181C351.575 479.526 351.739 473.962 351.739 473.962C351.739 473.962 356.571 467.329 361.316 468.561C361.316 468.561 363.693 470.137 365.657 468.405C367.62 466.674 371.547 464.219 376.792 464.46C376.792 464.46 378.3 464.374 381.822 459.74C385.344 455.105 385.749 455.303 388.677 455.002C388.677 455.002 385.034 451.349 385.93 446.465C386.826 441.581 388.505 439.522 386.834 438.618C385.164 437.713 380.788 435.448 384.587 432.476C384.587 432.476 386.567 431.485 388.161 431.563C389.754 431.64 388.841 426.317 386.791 423.121C384.742 419.925 385.267 415.971 385.267 415.971C385.267 415.971 377.886 414.679 377.128 409.812C376.37 404.945 376.827 404.936 376.827 404.936C376.827 404.936 368.912 404.557 364.881 408.356C364.881 408.356 360.317 409.958 355.218 407.788C355.218 407.788 351.644 411.25 347.08 411.25C342.515 411.25 337.494 416.273 337.494 416.273C337.494 416.273 328.288 416.496 325.549 420.08C322.81 423.663 314.895 427.996 312.622 424.034C310.348 420.071 302.201 417.565 300.53 419.167C300.53 419.167 301.064 424.111 294.217 423.121C294.217 423.121 288.662 429.056 284.175 430.348C279.688 431.64 277.027 434.535 268.656 432.631C268.656 432.631 252.68 437.575 245.377 445.414C238.073 453.253 224.69 456.828 220.427 456.527C216.164 456.225 209.773 456.371 209.773 456.371C209.773 456.371 205.364 464.968 204.985 469.835C204.985 469.835 201.635 474.478 203.46 479.044C205.286 483.609 206.811 486.96 207.034 489.011C207.034 489.011 208.171 490.992 209.541 491.371C209.541 491.371 212.167 498.719 216.37 499.951H216.387Z"
															fill={getColorByCity('MorowaliUtara')}
														/>
														<path
															d="M216.387 499.951C216.387 499.951 214.493 504.292 212.865 505.92C211.237 507.548 202.823 520.159 202.823 520.159C202.823 520.159 201.195 523.82 201.195 525.991V533.046L202.28 535.898L202.547 539.016L202.685 541.454L203.495 546.881L212.848 547.561C212.848 547.561 225.327 548.646 231.7 554.34C231.7 554.34 243.766 552.85 246.892 559.225C246.892 559.225 251.095 563.161 253.266 567.365C255.436 571.569 259.234 569.941 259.234 569.941C259.234 569.941 267.64 567.908 277.268 572.112C277.268 572.112 284.046 571.302 286.079 566.004L283.228 559.63C283.228 559.63 282.547 558.949 286.079 556.106C289.61 553.264 295.707 542.815 295.707 542.815C295.707 542.815 306.145 534.674 310.081 533.589C310.081 533.589 311.029 530.066 310.081 526.672C309.134 523.278 303.846 521.52 303.975 518.264C303.975 518.264 292.856 510.667 292.314 505.24C291.771 499.813 288.654 497.918 287.431 499.27C286.208 500.622 286.346 505.102 286.346 505.102L278.345 505.507C278.345 505.507 275.666 504.249 277.466 502.535C277.466 502.535 278.612 500.648 278.698 498.03C278.784 495.411 285.329 496.066 285.329 496.066C285.329 496.066 289.911 496.315 290.324 491.81C290.738 487.305 290.324 485.996 290.979 485.591C291.634 485.186 292.701 484.85 292.701 486.168C292.701 487.486 292.788 495.506 292.788 495.506L299.91 495.669C299.91 495.669 300.565 495.669 300.728 493.947L303.105 493.783C303.105 493.783 305.809 500.33 309.986 500.33C309.986 500.33 313.345 502.052 313.75 506.058C313.75 506.058 323.981 507.29 326.927 507.204C329.872 507.118 334.704 502.785 334.704 502.785C334.704 502.785 338.226 503.112 338.467 500.002C338.467 500.002 344.031 495.911 345.349 490.828C346.666 485.746 348.785 480.836 350.18 480.181C351.575 479.526 351.739 473.962 351.739 473.962C351.739 473.962 356.571 467.329 361.316 468.561C361.316 468.561 363.693 470.137 365.657 468.405C367.62 466.674 371.547 464.219 376.792 464.46C376.792 464.46 378.3 464.374 381.822 459.74C385.344 455.105 385.749 455.303 388.677 455.002C388.677 455.002 385.034 451.349 385.93 446.465C386.826 441.581 388.505 439.522 386.834 438.618C385.164 437.713 380.788 435.448 384.587 432.476C384.587 432.476 386.567 431.485 388.161 431.563C389.754 431.64 388.841 426.317 386.791 423.121C384.742 419.925 385.267 415.971 385.267 415.971C385.267 415.971 377.886 414.679 377.128 409.812C376.37 404.945 376.827 404.936 376.827 404.936C376.827 404.936 368.912 404.557 364.881 408.356C364.881 408.356 360.317 409.958 355.218 407.788C355.218 407.788 351.644 411.25 347.08 411.25C342.515 411.25 337.494 416.273 337.494 416.273C337.494 416.273 328.288 416.496 325.549 420.08C322.81 423.663 314.895 427.996 312.622 424.034C310.348 420.071 302.201 417.565 300.53 419.167C300.53 419.167 301.064 424.111 294.217 423.121C294.217 423.121 288.662 429.056 284.175 430.348C279.688 431.64 277.027 434.535 268.656 432.631C268.656 432.631 252.68 437.575 245.377 445.414C238.073 453.253 224.69 456.828 220.427 456.527C216.164 456.225 209.773 456.371 209.773 456.371C209.773 456.371 205.364 464.968 204.985 469.835C204.985 469.835 201.635 474.478 203.46 479.044C205.286 483.609 206.811 486.96 207.034 489.011C207.034 489.011 208.171 490.992 209.541 491.371C209.541 491.371 212.167 498.719 216.37 499.951H216.387Z"
															stroke="#FFFEFE"
															stroke-width="8"
															mask="url(#path-6-outside-6_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Touna');
														}}
														onMouseLeave={() => {
															hideCardArea('Touna');
														}}
														onClick={() => {
															openDialog('Touna');
														}}
														fill={getColorByCity('Touna')}
														id="Touna">
														<mask
															id="path-7-outside-7_0_1"
															maskUnits="userSpaceOnUse"
															x="206.09"
															y="337.908"
															width="192"
															height="120"
															fill="black">
															<rect
																fill="white"
																x="206.09"
																y="337.908"
																width="192"
																height="120"
															/>
															<path d="M212.204 426.634C212.204 426.634 210.403 426.634 211.38 434.594C212.357 442.555 215.484 449.465 216.299 449.916C216.299 449.916 219.154 451.768 219.664 452.632L221.261 453.029C221.261 453.029 228.907 452.632 232.612 450.562C236.316 448.492 251.685 439.232 254.302 438.361C256.918 437.489 261.948 433.497 267.326 432.361C267.326 432.361 272.202 432.027 274.751 432.159C277.3 432.291 287.342 427.957 287.342 427.957L292.805 423.225C292.805 423.225 297.248 422.759 297.826 422.556C298.404 422.354 298.769 421.887 299.865 419.093C299.865 419.093 302.703 417.358 307.07 420.626C311.437 423.895 311.802 423.023 312.023 424.626C312.244 426.229 317.265 425.49 318.14 424.556C319.015 423.622 320.179 423.023 321.997 422.626C323.815 422.229 327.162 418.23 327.893 418.027C328.624 417.825 328.989 416.961 331.24 418.027C333.492 419.093 337.425 416.23 337.425 416.23C337.425 416.23 341.427 412.899 343.101 412.697C344.774 412.495 350.671 411.833 352.344 409.429C352.344 409.429 352.998 408.363 358.24 410.16C358.24 410.16 361.367 410.892 368.138 407.226C368.138 407.226 370.101 406.293 374.833 406.69V412.355C374.833 412.355 379.786 417.553 385.385 415.957C390.984 414.362 393.83 407.561 393.83 407.561C393.83 407.561 394.628 401.258 391.425 398.861C388.222 396.464 386.625 392.262 386.625 392.262L384.731 387.998L383.49 386.465C383.49 386.465 382.836 388.73 379.633 387.928C376.43 387.127 375.343 385.594 372.794 385.594C372.794 385.594 371.197 386.193 370.687 387.391C370.177 388.589 365.377 390.395 362.828 389.391L357.221 377.392C357.221 377.392 355.471 370.995 355.692 365.322L355.768 364.591C355.768 364.591 343.908 365.657 339.388 364.591C339.388 364.591 335.964 362.459 335.166 360.926C334.367 359.393 329.414 358.327 327.672 358.194L327.817 353.992C327.817 353.992 330 351.86 329.924 348.195C329.847 344.53 327.817 341.931 324.902 343.262C321.988 344.592 319.151 346.125 319.151 346.125C319.151 346.125 319.737 350.856 317.766 351.129C315.795 351.401 315.506 351.463 315.149 350.397C314.792 349.331 314.495 347.93 314.495 347.93C314.495 347.93 312.091 346.53 312.167 349.199C312.244 351.868 312.023 352.467 312.023 352.467C312.023 352.467 301.615 355.533 300.519 357.665C299.423 359.797 298.846 367.735 289.967 369.735C289.967 369.735 288.294 370.871 288.217 374.404C288.217 374.404 280.724 376.473 278.099 380.201C275.473 383.928 269.288 391.733 268.999 394.27C268.999 394.27 260.92 397.733 260.045 400.939C259.17 404.145 260.631 406.472 258.006 407.538C258.006 407.538 255.746 417.934 251.09 420.805C246.434 423.677 245.848 433.809 236.239 429.272C236.239 429.272 233.911 426.805 228.449 426.673C228.449 426.673 225.679 425.272 225.466 424.875C225.254 424.478 219.197 428.011 212.179 426.642L212.204 426.634Z" />
														</mask>
														<path
															d="M212.204 426.634C212.204 426.634 210.403 426.634 211.38 434.594C212.357 442.555 215.484 449.465 216.299 449.916C216.299 449.916 219.154 451.768 219.664 452.632L221.261 453.029C221.261 453.029 228.907 452.632 232.612 450.562C236.316 448.492 251.685 439.232 254.302 438.361C256.918 437.489 261.948 433.497 267.326 432.361C267.326 432.361 272.202 432.027 274.751 432.159C277.3 432.291 287.342 427.957 287.342 427.957L292.805 423.225C292.805 423.225 297.248 422.759 297.826 422.556C298.404 422.354 298.769 421.887 299.865 419.093C299.865 419.093 302.703 417.358 307.07 420.626C311.437 423.895 311.802 423.023 312.023 424.626C312.244 426.229 317.265 425.49 318.14 424.556C319.015 423.622 320.179 423.023 321.997 422.626C323.815 422.229 327.162 418.23 327.893 418.027C328.624 417.825 328.989 416.961 331.24 418.027C333.492 419.093 337.425 416.23 337.425 416.23C337.425 416.23 341.427 412.899 343.101 412.697C344.774 412.495 350.671 411.833 352.344 409.429C352.344 409.429 352.998 408.363 358.24 410.16C358.24 410.16 361.367 410.892 368.138 407.226C368.138 407.226 370.101 406.293 374.833 406.69V412.355C374.833 412.355 379.786 417.553 385.385 415.957C390.984 414.362 393.83 407.561 393.83 407.561C393.83 407.561 394.628 401.258 391.425 398.861C388.222 396.464 386.625 392.262 386.625 392.262L384.731 387.998L383.49 386.465C383.49 386.465 382.836 388.73 379.633 387.928C376.43 387.127 375.343 385.594 372.794 385.594C372.794 385.594 371.197 386.193 370.687 387.391C370.177 388.589 365.377 390.395 362.828 389.391L357.221 377.392C357.221 377.392 355.471 370.995 355.692 365.322L355.768 364.591C355.768 364.591 343.908 365.657 339.388 364.591C339.388 364.591 335.964 362.459 335.166 360.926C334.367 359.393 329.414 358.327 327.672 358.194L327.817 353.992C327.817 353.992 330 351.86 329.924 348.195C329.847 344.53 327.817 341.931 324.902 343.262C321.988 344.592 319.151 346.125 319.151 346.125C319.151 346.125 319.737 350.856 317.766 351.129C315.795 351.401 315.506 351.463 315.149 350.397C314.792 349.331 314.495 347.93 314.495 347.93C314.495 347.93 312.091 346.53 312.167 349.199C312.244 351.868 312.023 352.467 312.023 352.467C312.023 352.467 301.615 355.533 300.519 357.665C299.423 359.797 298.846 367.735 289.967 369.735C289.967 369.735 288.294 370.871 288.217 374.404C288.217 374.404 280.724 376.473 278.099 380.201C275.473 383.928 269.288 391.733 268.999 394.27C268.999 394.27 260.92 397.733 260.045 400.939C259.17 404.145 260.631 406.472 258.006 407.538C258.006 407.538 255.746 417.934 251.09 420.805C246.434 423.677 245.848 433.809 236.239 429.272C236.239 429.272 233.911 426.805 228.449 426.673C228.449 426.673 225.679 425.272 225.466 424.875C225.254 424.478 219.197 428.011 212.179 426.642L212.204 426.634Z"
															fill={getColorByCity('Touna')}
														/>
														<path
															d="M212.204 426.634C212.204 426.634 210.403 426.634 211.38 434.594C212.357 442.555 215.484 449.465 216.299 449.916C216.299 449.916 219.154 451.768 219.664 452.632L221.261 453.029C221.261 453.029 228.907 452.632 232.612 450.562C236.316 448.492 251.685 439.232 254.302 438.361C256.918 437.489 261.948 433.497 267.326 432.361C267.326 432.361 272.202 432.027 274.751 432.159C277.3 432.291 287.342 427.957 287.342 427.957L292.805 423.225C292.805 423.225 297.248 422.759 297.826 422.556C298.404 422.354 298.769 421.887 299.865 419.093C299.865 419.093 302.703 417.358 307.07 420.626C311.437 423.895 311.802 423.023 312.023 424.626C312.244 426.229 317.265 425.49 318.14 424.556C319.015 423.622 320.179 423.023 321.997 422.626C323.815 422.229 327.162 418.23 327.893 418.027C328.624 417.825 328.989 416.961 331.24 418.027C333.492 419.093 337.425 416.23 337.425 416.23C337.425 416.23 341.427 412.899 343.101 412.697C344.774 412.495 350.671 411.833 352.344 409.429C352.344 409.429 352.998 408.363 358.24 410.16C358.24 410.16 361.367 410.892 368.138 407.226C368.138 407.226 370.101 406.293 374.833 406.69V412.355C374.833 412.355 379.786 417.553 385.385 415.957C390.984 414.362 393.83 407.561 393.83 407.561C393.83 407.561 394.628 401.258 391.425 398.861C388.222 396.464 386.625 392.262 386.625 392.262L384.731 387.998L383.49 386.465C383.49 386.465 382.836 388.73 379.633 387.928C376.43 387.127 375.343 385.594 372.794 385.594C372.794 385.594 371.197 386.193 370.687 387.391C370.177 388.589 365.377 390.395 362.828 389.391L357.221 377.392C357.221 377.392 355.471 370.995 355.692 365.322L355.768 364.591C355.768 364.591 343.908 365.657 339.388 364.591C339.388 364.591 335.964 362.459 335.166 360.926C334.367 359.393 329.414 358.327 327.672 358.194L327.817 353.992C327.817 353.992 330 351.86 329.924 348.195C329.847 344.53 327.817 341.931 324.902 343.262C321.988 344.592 319.151 346.125 319.151 346.125C319.151 346.125 319.737 350.856 317.766 351.129C315.795 351.401 315.506 351.463 315.149 350.397C314.792 349.331 314.495 347.93 314.495 347.93C314.495 347.93 312.091 346.53 312.167 349.199C312.244 351.868 312.023 352.467 312.023 352.467C312.023 352.467 301.615 355.533 300.519 357.665C299.423 359.797 298.846 367.735 289.967 369.735C289.967 369.735 288.294 370.871 288.217 374.404C288.217 374.404 280.724 376.473 278.099 380.201C275.473 383.928 269.288 391.733 268.999 394.27C268.999 394.27 260.92 397.733 260.045 400.939C259.17 404.145 260.631 406.472 258.006 407.538C258.006 407.538 255.746 417.934 251.09 420.805C246.434 423.677 245.848 433.809 236.239 429.272C236.239 429.272 233.911 426.805 228.449 426.673C228.449 426.673 225.679 425.272 225.466 424.875C225.254 424.478 219.197 428.011 212.179 426.642L212.204 426.634Z"
															stroke="#FEFEFE"
															stroke-width="8"
															mask="url(#path-7-outside-7_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Poso');
														}}
														onMouseLeave={() => {
															hideCardArea('Poso');
														}}
														onClick={() => {
															openDialog('Poso');
														}}
														fill={getColorByCity('Poso')}
														id="Poso">
														<mask
															id="path-8-outside-8_0_1"
															maskUnits="userSpaceOnUse"
															x="82.5762"
															y="374.043"
															width="139"
															height="181"
															fill="black">
															<rect
																fill="white"
																x="82.5762"
																y="374.043"
																width="139"
																height="181"
															/>
															<path d="M89.6648 444.377C89.6648 444.377 89.9899 440.469 93.1352 438.517C96.2805 436.565 100.074 431.139 100.724 429.075C100.724 429.075 104.628 430.377 108.749 429.618C108.749 429.618 111.35 423.107 115.362 423.541C115.362 423.541 120.133 416.813 116.446 413.123C112.759 409.433 109.399 405.311 103.217 402.488C103.217 402.488 101.916 401.729 106.254 400.427C110.591 399.126 109.507 395.327 109.507 395.327C109.507 395.327 111.458 394.893 115.362 395.761C115.362 395.761 118.182 391.42 119.483 390.986C120.783 390.552 127.18 388.925 129.133 388.491C131.086 388.057 137.808 384.15 137.808 384.15C137.808 384.15 154.614 382.089 157.976 380.351C161.338 378.615 161.554 377.528 163.939 378.29C163.939 378.29 166.651 386.43 163.939 388.816C161.227 391.203 159.516 399.343 165.143 401.187C170.769 403.031 174.023 410.086 173.587 416.38C173.587 416.38 177.274 417.356 178.249 423.649C178.249 423.649 179.55 425.819 183.129 422.89C186.707 419.961 188.225 419.851 188.225 419.851C188.225 419.851 196.249 415.293 203.838 415.293V421.912C203.838 421.912 210.777 422.237 211.535 425.06L209.368 424.951C209.368 424.951 208.609 449.043 219.018 454.035H208.718C208.718 454.035 201.237 468.903 201.346 474.654C201.346 474.654 205.575 483.119 205.575 487.133C205.575 487.133 209.695 490.715 211.538 496.032L215.008 498.635C215.008 498.635 209.587 509.27 202.323 517.627C202.323 517.627 198.203 526.093 201.456 534.99C201.456 534.99 202.215 546.058 203.19 547.143L198.311 548.228L196.577 549.855C196.577 549.855 191.156 551.265 185.518 547.902C179.88 544.537 173.375 540.198 173.375 540.198L170.446 538.897L145.399 508.077L142.471 504.387L139.87 501.13L138.244 498.744L134.123 497.876C134.123 497.876 131.086 507.86 130.111 508.945C130.111 508.945 127.835 519.037 125.015 522.074L115.039 517.842C115.039 517.842 97.0415 521.424 88.8001 512.199C88.8001 512.199 91.837 508.617 88.8001 502.215C88.8001 502.215 87.7163 499.612 90.3174 499.612C92.9184 499.612 96.6056 497.117 94.3297 492.125C92.0538 487.133 89.6671 486.374 89.6671 486.374C89.6671 486.374 87.8247 483.77 93.0292 482.358C98.2337 480.945 100.726 481.056 100.726 481.056C100.726 481.056 100.726 473.461 96.8224 470.747C96.8224 470.747 98.3397 464.887 94.6548 460.871C94.6548 460.871 98.5588 448.067 93.6794 445.461C93.6794 445.461 91.0784 446.004 89.6671 444.377H89.6648Z" />
														</mask>
														<path
															d="M89.6648 444.377C89.6648 444.377 89.9899 440.469 93.1352 438.517C96.2805 436.565 100.074 431.139 100.724 429.075C100.724 429.075 104.628 430.377 108.749 429.618C108.749 429.618 111.35 423.107 115.362 423.541C115.362 423.541 120.133 416.813 116.446 413.123C112.759 409.433 109.399 405.311 103.217 402.488C103.217 402.488 101.916 401.729 106.254 400.427C110.591 399.126 109.507 395.327 109.507 395.327C109.507 395.327 111.458 394.893 115.362 395.761C115.362 395.761 118.182 391.42 119.483 390.986C120.783 390.552 127.18 388.925 129.133 388.491C131.086 388.057 137.808 384.15 137.808 384.15C137.808 384.15 154.614 382.089 157.976 380.351C161.338 378.615 161.554 377.528 163.939 378.29C163.939 378.29 166.651 386.43 163.939 388.816C161.227 391.203 159.516 399.343 165.143 401.187C170.769 403.031 174.023 410.086 173.587 416.38C173.587 416.38 177.274 417.356 178.249 423.649C178.249 423.649 179.55 425.819 183.129 422.89C186.707 419.961 188.225 419.851 188.225 419.851C188.225 419.851 196.249 415.293 203.838 415.293V421.912C203.838 421.912 210.777 422.237 211.535 425.06L209.368 424.951C209.368 424.951 208.609 449.043 219.018 454.035H208.718C208.718 454.035 201.237 468.903 201.346 474.654C201.346 474.654 205.575 483.119 205.575 487.133C205.575 487.133 209.695 490.715 211.538 496.032L215.008 498.635C215.008 498.635 209.587 509.27 202.323 517.627C202.323 517.627 198.203 526.093 201.456 534.99C201.456 534.99 202.215 546.058 203.19 547.143L198.311 548.228L196.577 549.855C196.577 549.855 191.156 551.265 185.518 547.902C179.88 544.537 173.375 540.198 173.375 540.198L170.446 538.897L145.399 508.077L142.471 504.387L139.87 501.13L138.244 498.744L134.123 497.876C134.123 497.876 131.086 507.86 130.111 508.945C130.111 508.945 127.835 519.037 125.015 522.074L115.039 517.842C115.039 517.842 97.0415 521.424 88.8001 512.199C88.8001 512.199 91.837 508.617 88.8001 502.215C88.8001 502.215 87.7163 499.612 90.3174 499.612C92.9184 499.612 96.6056 497.117 94.3297 492.125C92.0538 487.133 89.6671 486.374 89.6671 486.374C89.6671 486.374 87.8247 483.77 93.0292 482.358C98.2337 480.945 100.726 481.056 100.726 481.056C100.726 481.056 100.726 473.461 96.8224 470.747C96.8224 470.747 98.3397 464.887 94.6548 460.871C94.6548 460.871 98.5588 448.067 93.6794 445.461C93.6794 445.461 91.0784 446.004 89.6671 444.377H89.6648Z"
															fill={getColorByCity('Poso')}
														/>
														<path
															d="M89.6648 444.377C89.6648 444.377 89.9899 440.469 93.1352 438.517C96.2805 436.565 100.074 431.139 100.724 429.075C100.724 429.075 104.628 430.377 108.749 429.618C108.749 429.618 111.35 423.107 115.362 423.541C115.362 423.541 120.133 416.813 116.446 413.123C112.759 409.433 109.399 405.311 103.217 402.488C103.217 402.488 101.916 401.729 106.254 400.427C110.591 399.126 109.507 395.327 109.507 395.327C109.507 395.327 111.458 394.893 115.362 395.761C115.362 395.761 118.182 391.42 119.483 390.986C120.783 390.552 127.18 388.925 129.133 388.491C131.086 388.057 137.808 384.15 137.808 384.15C137.808 384.15 154.614 382.089 157.976 380.351C161.338 378.615 161.554 377.528 163.939 378.29C163.939 378.29 166.651 386.43 163.939 388.816C161.227 391.203 159.516 399.343 165.143 401.187C170.769 403.031 174.023 410.086 173.587 416.38C173.587 416.38 177.274 417.356 178.249 423.649C178.249 423.649 179.55 425.819 183.129 422.89C186.707 419.961 188.225 419.851 188.225 419.851C188.225 419.851 196.249 415.293 203.838 415.293V421.912C203.838 421.912 210.777 422.237 211.535 425.06L209.368 424.951C209.368 424.951 208.609 449.043 219.018 454.035H208.718C208.718 454.035 201.237 468.903 201.346 474.654C201.346 474.654 205.575 483.119 205.575 487.133C205.575 487.133 209.695 490.715 211.538 496.032L215.008 498.635C215.008 498.635 209.587 509.27 202.323 517.627C202.323 517.627 198.203 526.093 201.456 534.99C201.456 534.99 202.215 546.058 203.19 547.143L198.311 548.228L196.577 549.855C196.577 549.855 191.156 551.265 185.518 547.902C179.88 544.537 173.375 540.198 173.375 540.198L170.446 538.897L145.399 508.077L142.471 504.387L139.87 501.13L138.244 498.744L134.123 497.876C134.123 497.876 131.086 507.86 130.111 508.945C130.111 508.945 127.835 519.037 125.015 522.074L115.039 517.842C115.039 517.842 97.0415 521.424 88.8001 512.199C88.8001 512.199 91.837 508.617 88.8001 502.215C88.8001 502.215 87.7163 499.612 90.3174 499.612C92.9184 499.612 96.6056 497.117 94.3297 492.125C92.0538 487.133 89.6671 486.374 89.6671 486.374C89.6671 486.374 87.8247 483.77 93.0292 482.358C98.2337 480.945 100.726 481.056 100.726 481.056C100.726 481.056 100.726 473.461 96.8224 470.747C96.8224 470.747 98.3397 464.887 94.6548 460.871C94.6548 460.871 98.5588 448.067 93.6794 445.461C93.6794 445.461 91.0784 446.004 89.6671 444.377H89.6648Z"
															stroke="white"
															stroke-width="8"
															mask="url(#path-8-outside-8_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Sigi');
														}}
														onMouseLeave={() => {
															hideCardArea('Sigi');
														}}
														onClick={() => {
															openDialog('Sigi');
														}}
														fill={getColorByCity('Sigi')}
														id="Sigi">
														<mask
															id="path-9-outside-9_0_1"
															maskUnits="userSpaceOnUse"
															x="12.1895"
															y="324.664"
															width="119"
															height="202"
															fill="black">
															<rect
																fill="white"
																x="12.1895"
																y="324.664"
																width="119"
																height="202"
															/>
															<path d="M52.6664 480.83C52.6664 480.83 49.6384 487.709 52.6664 493.372C52.6664 493.372 50.6471 516.433 55.4919 521.693C55.4919 521.693 56.9057 523.716 59.3281 521.693C59.3281 521.693 63.1642 519.669 68.009 512.386C72.8539 505.104 80.7267 511.172 80.7267 511.172C80.7267 511.172 90.6189 515.624 89.2052 506.114C89.2052 506.114 87.6656 502.473 89.3428 500.855C91.022 499.238 94.8562 499.642 95.4618 497.618C96.0674 495.594 93.4424 489.525 88.5976 486.29C88.5976 486.29 88.8021 483.147 91.3877 482.974C93.9733 482.8 100.092 480.828 100.092 480.828C100.092 480.828 99.8347 472.696 96.732 470.97C96.732 470.97 97.0761 465.011 96.2148 463.802C96.2148 463.802 92.3374 458.619 95.5247 455.597V447.565C95.5247 447.565 96.0418 444.801 89.4057 444.369C89.4057 444.369 88.8886 440.57 92.8526 437.288C96.8165 434.005 99.1445 432.105 100.092 428.046C100.092 428.046 105.177 428.909 108.193 428.565C108.193 428.565 112.501 422.001 115.604 422.433C115.604 422.433 122.067 414.746 114.139 408.614C106.211 402.482 102.935 400.756 102.935 400.756C102.935 400.756 102.591 399.633 104.573 399.375C106.555 399.117 109.227 395.402 109.658 393.243C109.658 393.243 112.934 392.725 115.26 393.761L118.88 389.184L126.981 386.937V382.102C126.981 382.102 125.343 373.726 116.381 380.721C116.381 380.721 110.348 378.945 110.348 377.933C110.348 376.92 110.865 371.651 107.072 367.939C107.072 367.939 105.348 364.571 103.883 367.162L101.815 367.249C101.815 367.249 101.298 364.313 93.7138 364.745C93.7138 364.745 93.5407 358.786 85.0957 359.218V354.295L83.3713 352.914C83.3713 352.914 83.3713 345.141 84.9227 344.191C84.9227 344.191 78.9768 341.6 77.5119 338.664C77.5119 338.664 76.8218 344.104 62.9479 345.488L62.8614 347.819L57.6037 348.25L54.845 345.832C54.845 345.832 50.7946 348.079 46.3135 347.732L45.7964 339.874L39.5083 338.664C39.5083 338.664 38.13 341.513 35.1137 342.205C32.0975 342.897 30.2886 341.214 30.2886 341.214C30.2886 341.214 29.2543 346.782 17.1895 349.976C17.1895 349.976 17.7066 360.081 24.6002 360.425C31.4939 360.77 33.9084 356.971 36.0615 362.412C36.0615 362.412 38.3875 365.176 38.3875 368.37C38.3875 368.37 41.7479 371.219 40.9732 375.194C40.1985 379.168 40.8866 386.508 36.4921 389.184C36.4921 389.184 36.8362 396.265 32.8722 397.82L32.6147 405.162C32.6147 405.162 29.856 410.776 30.029 411.812C30.2021 412.848 37.0957 425.199 33.6489 423.903C30.2021 422.608 25.2904 427.012 22.9624 434.267C20.6363 441.522 21.4975 442.99 21.4975 442.99C21.4975 442.99 30.6327 450.935 30.6327 452.489C30.6327 454.044 30.5462 458.19 30.5462 458.19C30.5462 458.19 34.5101 459.226 34.6831 461.904C34.8562 464.582 43.0751 479.376 52.6684 480.83H52.6664Z" />
														</mask>
														<path
															d="M52.6664 480.83C52.6664 480.83 49.6384 487.709 52.6664 493.372C52.6664 493.372 50.6471 516.433 55.4919 521.693C55.4919 521.693 56.9057 523.716 59.3281 521.693C59.3281 521.693 63.1642 519.669 68.009 512.386C72.8539 505.104 80.7267 511.172 80.7267 511.172C80.7267 511.172 90.6189 515.624 89.2052 506.114C89.2052 506.114 87.6656 502.473 89.3428 500.855C91.022 499.238 94.8562 499.642 95.4618 497.618C96.0674 495.594 93.4424 489.525 88.5976 486.29C88.5976 486.29 88.8021 483.147 91.3877 482.974C93.9733 482.8 100.092 480.828 100.092 480.828C100.092 480.828 99.8347 472.696 96.732 470.97C96.732 470.97 97.0761 465.011 96.2148 463.802C96.2148 463.802 92.3374 458.619 95.5247 455.597V447.565C95.5247 447.565 96.0418 444.801 89.4057 444.369C89.4057 444.369 88.8886 440.57 92.8526 437.288C96.8165 434.005 99.1445 432.105 100.092 428.046C100.092 428.046 105.177 428.909 108.193 428.565C108.193 428.565 112.501 422.001 115.604 422.433C115.604 422.433 122.067 414.746 114.139 408.614C106.211 402.482 102.935 400.756 102.935 400.756C102.935 400.756 102.591 399.633 104.573 399.375C106.555 399.117 109.227 395.402 109.658 393.243C109.658 393.243 112.934 392.725 115.26 393.761L118.88 389.184L126.981 386.937V382.102C126.981 382.102 125.343 373.726 116.381 380.721C116.381 380.721 110.348 378.945 110.348 377.933C110.348 376.92 110.865 371.651 107.072 367.939C107.072 367.939 105.348 364.571 103.883 367.162L101.815 367.249C101.815 367.249 101.298 364.313 93.7138 364.745C93.7138 364.745 93.5407 358.786 85.0957 359.218V354.295L83.3713 352.914C83.3713 352.914 83.3713 345.141 84.9227 344.191C84.9227 344.191 78.9768 341.6 77.5119 338.664C77.5119 338.664 76.8218 344.104 62.9479 345.488L62.8614 347.819L57.6037 348.25L54.845 345.832C54.845 345.832 50.7946 348.079 46.3135 347.732L45.7964 339.874L39.5083 338.664C39.5083 338.664 38.13 341.513 35.1137 342.205C32.0975 342.897 30.2886 341.214 30.2886 341.214C30.2886 341.214 29.2543 346.782 17.1895 349.976C17.1895 349.976 17.7066 360.081 24.6002 360.425C31.4939 360.77 33.9084 356.971 36.0615 362.412C36.0615 362.412 38.3875 365.176 38.3875 368.37C38.3875 368.37 41.7479 371.219 40.9732 375.194C40.1985 379.168 40.8866 386.508 36.4921 389.184C36.4921 389.184 36.8362 396.265 32.8722 397.82L32.6147 405.162C32.6147 405.162 29.856 410.776 30.029 411.812C30.2021 412.848 37.0957 425.199 33.6489 423.903C30.2021 422.608 25.2904 427.012 22.9624 434.267C20.6363 441.522 21.4975 442.99 21.4975 442.99C21.4975 442.99 30.6327 450.935 30.6327 452.489C30.6327 454.044 30.5462 458.19 30.5462 458.19C30.5462 458.19 34.5101 459.226 34.6831 461.904C34.8562 464.582 43.0751 479.376 52.6684 480.83H52.6664Z"
															fill={getColorByCity('Sigi')}
														/>
														<path
															d="M52.6664 480.83C52.6664 480.83 49.6384 487.709 52.6664 493.372C52.6664 493.372 50.6471 516.433 55.4919 521.693C55.4919 521.693 56.9057 523.716 59.3281 521.693C59.3281 521.693 63.1642 519.669 68.009 512.386C72.8539 505.104 80.7267 511.172 80.7267 511.172C80.7267 511.172 90.6189 515.624 89.2052 506.114C89.2052 506.114 87.6656 502.473 89.3428 500.855C91.022 499.238 94.8562 499.642 95.4618 497.618C96.0674 495.594 93.4424 489.525 88.5976 486.29C88.5976 486.29 88.8021 483.147 91.3877 482.974C93.9733 482.8 100.092 480.828 100.092 480.828C100.092 480.828 99.8347 472.696 96.732 470.97C96.732 470.97 97.0761 465.011 96.2148 463.802C96.2148 463.802 92.3374 458.619 95.5247 455.597V447.565C95.5247 447.565 96.0418 444.801 89.4057 444.369C89.4057 444.369 88.8886 440.57 92.8526 437.288C96.8165 434.005 99.1445 432.105 100.092 428.046C100.092 428.046 105.177 428.909 108.193 428.565C108.193 428.565 112.501 422.001 115.604 422.433C115.604 422.433 122.067 414.746 114.139 408.614C106.211 402.482 102.935 400.756 102.935 400.756C102.935 400.756 102.591 399.633 104.573 399.375C106.555 399.117 109.227 395.402 109.658 393.243C109.658 393.243 112.934 392.725 115.26 393.761L118.88 389.184L126.981 386.937V382.102C126.981 382.102 125.343 373.726 116.381 380.721C116.381 380.721 110.348 378.945 110.348 377.933C110.348 376.92 110.865 371.651 107.072 367.939C107.072 367.939 105.348 364.571 103.883 367.162L101.815 367.249C101.815 367.249 101.298 364.313 93.7138 364.745C93.7138 364.745 93.5407 358.786 85.0957 359.218V354.295L83.3713 352.914C83.3713 352.914 83.3713 345.141 84.9227 344.191C84.9227 344.191 78.9768 341.6 77.5119 338.664C77.5119 338.664 76.8218 344.104 62.9479 345.488L62.8614 347.819L57.6037 348.25L54.845 345.832C54.845 345.832 50.7946 348.079 46.3135 347.732L45.7964 339.874L39.5083 338.664C39.5083 338.664 38.13 341.513 35.1137 342.205C32.0975 342.897 30.2886 341.214 30.2886 341.214C30.2886 341.214 29.2543 346.782 17.1895 349.976C17.1895 349.976 17.7066 360.081 24.6002 360.425C31.4939 360.77 33.9084 356.971 36.0615 362.412C36.0615 362.412 38.3875 365.176 38.3875 368.37C38.3875 368.37 41.7479 371.219 40.9732 375.194C40.1985 379.168 40.8866 386.508 36.4921 389.184C36.4921 389.184 36.8362 396.265 32.8722 397.82L32.6147 405.162C32.6147 405.162 29.856 410.776 30.029 411.812C30.2021 412.848 37.0957 425.199 33.6489 423.903C30.2021 422.608 25.2904 427.012 22.9624 434.267C20.6363 441.522 21.4975 442.99 21.4975 442.99C21.4975 442.99 30.6327 450.935 30.6327 452.489C30.6327 454.044 30.5462 458.19 30.5462 458.19C30.5462 458.19 34.5101 459.226 34.6831 461.904C34.8562 464.582 43.0751 479.376 52.6684 480.83H52.6664Z"
															stroke="#FBFBFB"
															stroke-width="8"
															mask="url(#path-9-outside-9_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Donggala');
														}}
														onMouseLeave={() => {
															hideCardArea('Donggala');
														}}
														onClick={() => {
															openDialog('Donggala');
														}}
														fill={getColorByCity('Donggala')}
														id="Donggala">
														<mask
															id="path-10-outside-10_0_1"
															maskUnits="userSpaceOnUse"
															x="4"
															y="90.8418"
															width="108"
															height="245"
															fill="black">
															<rect
																fill="white"
																x="4"
																y="90.8418"
																width="108"
																height="245"
															/>
															<path d="M43.6007 307.809V310.571L47.0539 315.635L49.8203 322.388C49.8203 322.388 62.0927 330.833 67.449 330.833C72.8053 330.833 76.2682 328.375 80.2413 332.062L77.4749 324.079L77.2983 319.016L79.2014 315.486V313.648L79.0249 310.266L74.3553 304.89L74.0119 302.432C74.0119 302.432 75.0518 301.665 70.7256 297.212C66.3993 292.759 62.9462 286.772 62.9462 286.772L63.1228 278.484C63.1228 278.484 58.1098 275.417 60.3563 269.273C60.3563 269.273 59.8364 263.896 58.9731 261.752C58.9731 261.752 63.4661 259.6 60.3563 253.77L57.7665 249.622L59.493 247.931L58.9731 243.94C58.9731 243.94 63.986 239.643 60.3563 234.877L57.0699 229.813L63.6427 221.979C63.6427 221.979 66.0658 219.521 63.6427 210.005C63.6427 210.005 63.2993 207.086 65.2025 203.861C67.1056 200.637 67.1056 197.718 67.1056 195.26C67.1056 195.26 71.0787 194.798 73.1584 190.65C75.2382 186.502 78.8581 188.497 78.8581 188.497L81.9679 185.578V181.282C81.9679 181.282 90.434 178.214 90.434 176.367C90.434 174.519 90.0906 169.456 87.6675 166.537L83.5179 163.922L83.6945 157.63C83.6945 157.63 88.5308 155.94 88.364 149.186C88.364 149.186 91.3071 146.728 93.8969 147.347C93.8969 147.347 97.5266 145.195 93.8969 142.284C93.8969 142.284 94.9368 137.831 98.3899 136.759C101.843 135.687 102.196 133.84 102.196 132.149C102.196 130.458 103.06 126.162 103.06 126.162L107.896 119.103V100.367C107.896 100.367 100.46 97.7525 99.7731 94.8418H91.4738L86.6375 99.4518C86.6375 99.4518 83.3511 98.8418 80.4179 107.129C80.4179 107.129 78.5147 107.896 83.871 118.955L85.0777 130.467L74.1885 135.844L59.3263 136.001L55.0098 142.911C55.0098 142.911 59.1595 145.831 55.3532 150.432C51.5469 155.033 46.5339 157.491 57.0798 165.325C57.0798 165.325 62.436 170.545 58.8063 174.694C55.1766 178.842 50.6836 176.384 50.6836 176.384C50.6836 176.384 47.0539 176.227 43.6007 173.77L36.8612 176.227C36.8612 176.227 36.3413 180.219 42.0507 182.833C47.7602 185.447 57.6095 193.892 55.1864 202.789L55.7063 212.619C55.7063 212.619 52.2532 222.598 46.377 227.208C46.377 227.208 40.4713 225.055 36.8612 225.822L35.4878 221.369L29.9549 218.606C29.9549 218.606 32.2014 211.853 24.7654 209.395L19.2325 207.704C19.2325 207.704 17.506 210.624 18.0259 212.158L8 210.162C8 210.162 8 216.454 16.2993 222.903C24.5986 229.351 25.3932 233.552 37.7343 228.428C37.7343 228.428 43.9539 228.271 42.9238 232.576C41.8938 236.881 44.6504 238.101 44.6504 238.101C44.6504 238.101 39.9808 244.393 41.7074 247.312C41.7074 247.312 36.5179 252.532 36.5179 259.748C36.5179 259.748 33.4081 264.506 33.7514 265.735C34.0948 266.964 36.1745 270.188 34.2714 274.946C34.2714 274.946 33.5846 283.086 40.3242 299.356C40.3242 299.356 39.4609 303.19 43.6105 307.8L43.6007 307.809Z" />
														</mask>
														<path
															d="M43.6007 307.809V310.571L47.0539 315.635L49.8203 322.388C49.8203 322.388 62.0927 330.833 67.449 330.833C72.8053 330.833 76.2682 328.375 80.2413 332.062L77.4749 324.079L77.2983 319.016L79.2014 315.486V313.648L79.0249 310.266L74.3553 304.89L74.0119 302.432C74.0119 302.432 75.0518 301.665 70.7256 297.212C66.3993 292.759 62.9462 286.772 62.9462 286.772L63.1228 278.484C63.1228 278.484 58.1098 275.417 60.3563 269.273C60.3563 269.273 59.8364 263.896 58.9731 261.752C58.9731 261.752 63.4661 259.6 60.3563 253.77L57.7665 249.622L59.493 247.931L58.9731 243.94C58.9731 243.94 63.986 239.643 60.3563 234.877L57.0699 229.813L63.6427 221.979C63.6427 221.979 66.0658 219.521 63.6427 210.005C63.6427 210.005 63.2993 207.086 65.2025 203.861C67.1056 200.637 67.1056 197.718 67.1056 195.26C67.1056 195.26 71.0787 194.798 73.1584 190.65C75.2382 186.502 78.8581 188.497 78.8581 188.497L81.9679 185.578V181.282C81.9679 181.282 90.434 178.214 90.434 176.367C90.434 174.519 90.0906 169.456 87.6675 166.537L83.5179 163.922L83.6945 157.63C83.6945 157.63 88.5308 155.94 88.364 149.186C88.364 149.186 91.3071 146.728 93.8969 147.347C93.8969 147.347 97.5266 145.195 93.8969 142.284C93.8969 142.284 94.9368 137.831 98.3899 136.759C101.843 135.687 102.196 133.84 102.196 132.149C102.196 130.458 103.06 126.162 103.06 126.162L107.896 119.103V100.367C107.896 100.367 100.46 97.7525 99.7731 94.8418H91.4738L86.6375 99.4518C86.6375 99.4518 83.3511 98.8418 80.4179 107.129C80.4179 107.129 78.5147 107.896 83.871 118.955L85.0777 130.467L74.1885 135.844L59.3263 136.001L55.0098 142.911C55.0098 142.911 59.1595 145.831 55.3532 150.432C51.5469 155.033 46.5339 157.491 57.0798 165.325C57.0798 165.325 62.436 170.545 58.8063 174.694C55.1766 178.842 50.6836 176.384 50.6836 176.384C50.6836 176.384 47.0539 176.227 43.6007 173.77L36.8612 176.227C36.8612 176.227 36.3413 180.219 42.0507 182.833C47.7602 185.447 57.6095 193.892 55.1864 202.789L55.7063 212.619C55.7063 212.619 52.2532 222.598 46.377 227.208C46.377 227.208 40.4713 225.055 36.8612 225.822L35.4878 221.369L29.9549 218.606C29.9549 218.606 32.2014 211.853 24.7654 209.395L19.2325 207.704C19.2325 207.704 17.506 210.624 18.0259 212.158L8 210.162C8 210.162 8 216.454 16.2993 222.903C24.5986 229.351 25.3932 233.552 37.7343 228.428C37.7343 228.428 43.9539 228.271 42.9238 232.576C41.8938 236.881 44.6504 238.101 44.6504 238.101C44.6504 238.101 39.9808 244.393 41.7074 247.312C41.7074 247.312 36.5179 252.532 36.5179 259.748C36.5179 259.748 33.4081 264.506 33.7514 265.735C34.0948 266.964 36.1745 270.188 34.2714 274.946C34.2714 274.946 33.5846 283.086 40.3242 299.356C40.3242 299.356 39.4609 303.19 43.6105 307.8L43.6007 307.809Z"
															fill={getColorByCity('Donggala')}
														/>
														<path
															d="M43.6007 307.809V310.571L47.0539 315.635L49.8203 322.388C49.8203 322.388 62.0927 330.833 67.449 330.833C72.8053 330.833 76.2682 328.375 80.2413 332.062L77.4749 324.079L77.2983 319.016L79.2014 315.486V313.648L79.0249 310.266L74.3553 304.89L74.0119 302.432C74.0119 302.432 75.0518 301.665 70.7256 297.212C66.3993 292.759 62.9462 286.772 62.9462 286.772L63.1228 278.484C63.1228 278.484 58.1098 275.417 60.3563 269.273C60.3563 269.273 59.8364 263.896 58.9731 261.752C58.9731 261.752 63.4661 259.6 60.3563 253.77L57.7665 249.622L59.493 247.931L58.9731 243.94C58.9731 243.94 63.986 239.643 60.3563 234.877L57.0699 229.813L63.6427 221.979C63.6427 221.979 66.0658 219.521 63.6427 210.005C63.6427 210.005 63.2993 207.086 65.2025 203.861C67.1056 200.637 67.1056 197.718 67.1056 195.26C67.1056 195.26 71.0787 194.798 73.1584 190.65C75.2382 186.502 78.8581 188.497 78.8581 188.497L81.9679 185.578V181.282C81.9679 181.282 90.434 178.214 90.434 176.367C90.434 174.519 90.0906 169.456 87.6675 166.537L83.5179 163.922L83.6945 157.63C83.6945 157.63 88.5308 155.94 88.364 149.186C88.364 149.186 91.3071 146.728 93.8969 147.347C93.8969 147.347 97.5266 145.195 93.8969 142.284C93.8969 142.284 94.9368 137.831 98.3899 136.759C101.843 135.687 102.196 133.84 102.196 132.149C102.196 130.458 103.06 126.162 103.06 126.162L107.896 119.103V100.367C107.896 100.367 100.46 97.7525 99.7731 94.8418H91.4738L86.6375 99.4518C86.6375 99.4518 83.3511 98.8418 80.4179 107.129C80.4179 107.129 78.5147 107.896 83.871 118.955L85.0777 130.467L74.1885 135.844L59.3263 136.001L55.0098 142.911C55.0098 142.911 59.1595 145.831 55.3532 150.432C51.5469 155.033 46.5339 157.491 57.0798 165.325C57.0798 165.325 62.436 170.545 58.8063 174.694C55.1766 178.842 50.6836 176.384 50.6836 176.384C50.6836 176.384 47.0539 176.227 43.6007 173.77L36.8612 176.227C36.8612 176.227 36.3413 180.219 42.0507 182.833C47.7602 185.447 57.6095 193.892 55.1864 202.789L55.7063 212.619C55.7063 212.619 52.2532 222.598 46.377 227.208C46.377 227.208 40.4713 225.055 36.8612 225.822L35.4878 221.369L29.9549 218.606C29.9549 218.606 32.2014 211.853 24.7654 209.395L19.2325 207.704C19.2325 207.704 17.506 210.624 18.0259 212.158L8 210.162C8 210.162 8 216.454 16.2993 222.903C24.5986 229.351 25.3932 233.552 37.7343 228.428C37.7343 228.428 43.9539 228.271 42.9238 232.576C41.8938 236.881 44.6504 238.101 44.6504 238.101C44.6504 238.101 39.9808 244.393 41.7074 247.312C41.7074 247.312 36.5179 252.532 36.5179 259.748C36.5179 259.748 33.4081 264.506 33.7514 265.735C34.0948 266.964 36.1745 270.188 34.2714 274.946C34.2714 274.946 33.5846 283.086 40.3242 299.356C40.3242 299.356 39.4609 303.19 43.6105 307.8L43.6007 307.809Z"
															stroke="white"
															stroke-width="8"
															mask="url(#path-10-outside-10_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('Palu');
														}}
														onMouseLeave={() => {
															hideCardArea('Palu');
														}}
														onClick={() => {
															openDialog('Palu');
														}}
														fill={getColorByCity('Palu')}
														id="Palu">
														<mask
															id="path-11-outside-11_0_1"
															maskUnits="userSpaceOnUse"
															x="25.1934"
															y="290.732"
															width="66.4433"
															height="71.183"
															fill="black">
															<rect
																fill="white"
																x="25.1934"
																y="290.732"
																width="66.4433"
																height="71.183"
															/>
															<path d="M31.6855 334.577L41.1454 330.738C41.1454 330.738 42.6255 339.312 45.5892 339.467C48.553 339.621 50.8621 338.879 51.0379 335.496L51.7256 322.262L48.5189 316.714L44.7992 310.973L43.8994 308.153L44.6731 303.332L51.5402 298.838L59.8313 297.358L64.4118 300.028C64.4118 300.028 66.1616 303.411 55.4801 307.198C55.4801 307.198 53.6275 312.648 61.2456 310.625C68.8637 308.602 69.8716 309.339 69.8716 309.339L70.8859 313.381C70.8859 313.381 52.4986 317.451 56.3463 320.944C60.194 324.437 60.7718 330.025 65.6448 330.279C65.6448 330.279 70.5518 333.308 75.1523 332.166C79.7527 331.024 82.1324 332.352 82.3236 335.313C82.5149 338.273 84.4513 341.489 84.4513 341.489L82.846 345.395C82.846 345.395 78.497 351.765 63.0959 352.344L62.3767 356.119L57.1484 355.847L53.6113 353.232L44.6478 354.158L42.7812 342.956C42.7812 342.956 37.9642 338.197 33.6534 340.403C29.3426 342.61 29.7299 335.371 31.6855 334.577Z" />
														</mask>
														<path
															d="M31.6855 334.577L41.1454 330.738C41.1454 330.738 42.6255 339.312 45.5892 339.467C48.553 339.621 50.8621 338.879 51.0379 335.496L51.7256 322.262L48.5189 316.714L44.7992 310.973L43.8994 308.153L44.6731 303.332L51.5402 298.838L59.8313 297.358L64.4118 300.028C64.4118 300.028 66.1616 303.411 55.4801 307.198C55.4801 307.198 53.6275 312.648 61.2456 310.625C68.8637 308.602 69.8716 309.339 69.8716 309.339L70.8859 313.381C70.8859 313.381 52.4986 317.451 56.3463 320.944C60.194 324.437 60.7718 330.025 65.6448 330.279C65.6448 330.279 70.5518 333.308 75.1523 332.166C79.7527 331.024 82.1324 332.352 82.3236 335.313C82.5149 338.273 84.4513 341.489 84.4513 341.489L82.846 345.395C82.846 345.395 78.497 351.765 63.0959 352.344L62.3767 356.119L57.1484 355.847L53.6113 353.232L44.6478 354.158L42.7812 342.956C42.7812 342.956 37.9642 338.197 33.6534 340.403C29.3426 342.61 29.7299 335.371 31.6855 334.577Z"
															fill={getColorByCity('Palu')}
														/>
														<path
															d="M31.6855 334.577L41.1454 330.738C41.1454 330.738 42.6255 339.312 45.5892 339.467C48.553 339.621 50.8621 338.879 51.0379 335.496L51.7256 322.262L48.5189 316.714L44.7992 310.973L43.8994 308.153L44.6731 303.332L51.5402 298.838L59.8313 297.358L64.4118 300.028C64.4118 300.028 66.1616 303.411 55.4801 307.198C55.4801 307.198 53.6275 312.648 61.2456 310.625C68.8637 308.602 69.8716 309.339 69.8716 309.339L70.8859 313.381C70.8859 313.381 52.4986 317.451 56.3463 320.944C60.194 324.437 60.7718 330.025 65.6448 330.279C65.6448 330.279 70.5518 333.308 75.1523 332.166C79.7527 331.024 82.1324 332.352 82.3236 335.313C82.5149 338.273 84.4513 341.489 84.4513 341.489L82.846 345.395C82.846 345.395 78.497 351.765 63.0959 352.344L62.3767 356.119L57.1484 355.847L53.6113 353.232L44.6478 354.158L42.7812 342.956C42.7812 342.956 37.9642 338.197 33.6534 340.403C29.3426 342.61 29.7299 335.371 31.6855 334.577Z"
															stroke="white"
															stroke-width="8"
															mask="url(#path-11-outside-11_0_1)"
														/>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('BanggaiLaut');
														}}
														onMouseLeave={() => {
															hideCardArea('BanggaiLaut');
														}}
														onClick={() => {
															openDialog('BanggaiLaut');
														}}
														fill={getColorByCity('BanggaiLaut')}
														id="BanggaiLaut">
														<g id="Vector">
															<mask
																id="path-12-outside-12_0_1"
																maskUnits="userSpaceOnUse"
																x="505.6"
																y="515.697"
																width="28"
																height="40"
																fill="black">
																<rect
																	fill="white"
																	x="505.6"
																	y="515.697"
																	width="28"
																	height="40"
																/>
																<path d="M509.614 546.338L511.823 541.917V532.742C511.823 532.742 515.05 522.547 515.897 521.86C516.744 521.173 519.8 519.306 525.408 522.536V526.11C525.408 526.11 529.345 529.179 529.345 530.646C529.345 532.112 528.612 538.251 526.495 538.904C524.378 539.557 518.678 542.925 517.728 547.312C516.778 551.699 510.793 552.352 510.129 549.797C509.465 547.243 509.614 546.338 509.614 546.338Z" />
															</mask>
															<path
																d="M509.614 546.338L511.823 541.917V532.742C511.823 532.742 515.05 522.547 515.897 521.86C516.744 521.173 519.8 519.306 525.408 522.536V526.11C525.408 526.11 529.345 529.179 529.345 530.646C529.345 532.112 528.612 538.251 526.495 538.904C524.378 539.557 518.678 542.925 517.728 547.312C516.778 551.699 510.793 552.352 510.129 549.797C509.465 547.243 509.614 546.338 509.614 546.338Z"
																fill={getColorByCity('BanggaiLaut')}
															/>
															<path
																d="M509.614 546.338L511.823 541.917V532.742C511.823 532.742 515.05 522.547 515.897 521.86C516.744 521.173 519.8 519.306 525.408 522.536V526.11C525.408 526.11 529.345 529.179 529.345 530.646C529.345 532.112 528.612 538.251 526.495 538.904C524.378 539.557 518.678 542.925 517.728 547.312C516.778 551.699 510.793 552.352 510.129 549.797C509.465 547.243 509.614 546.338 509.614 546.338Z"
																stroke="white"
																stroke-width="8"
																mask="url(#path-12-outside-12_0_1)"
															/>
														</g>
														<g id="Vector_2">
															<mask
																id="path-13-outside-13_0_1"
																maskUnits="userSpaceOnUse"
																x="547.896"
																y="491.947"
																width="32"
																height="33"
																fill="black">
																<rect
																	fill="white"
																	x="547.896"
																	y="491.947"
																	width="32"
																	height="33"
																/>
																<path d="M553.013 518.619C553.013 518.619 555.988 507.52 562.077 502.984C568.166 498.448 572.789 496.008 572.789 496.008C572.789 496.008 573.842 495.562 573.682 497.085C573.522 498.608 574.563 504.851 574.563 504.851L569.447 508.849C569.447 508.849 567.605 510.613 567.124 508.929C566.643 507.245 564.32 509.089 564.32 509.089L563.782 511.976C563.782 511.976 562.077 517.176 560.646 517.737C559.216 518.299 551.891 522.01 553.013 518.619Z" />
															</mask>
															<path
																d="M553.013 518.619C553.013 518.619 555.988 507.52 562.077 502.984C568.166 498.448 572.789 496.008 572.789 496.008C572.789 496.008 573.842 495.562 573.682 497.085C573.522 498.608 574.563 504.851 574.563 504.851L569.447 508.849C569.447 508.849 567.605 510.613 567.124 508.929C566.643 507.245 564.32 509.089 564.32 509.089L563.782 511.976C563.782 511.976 562.077 517.176 560.646 517.737C559.216 518.299 551.891 522.01 553.013 518.619Z"
																fill={getColorByCity('BanggaiLaut')}
															/>
															<path
																d="M553.013 518.619C553.013 518.619 555.988 507.52 562.077 502.984C568.166 498.448 572.789 496.008 572.789 496.008C572.789 496.008 573.842 495.562 573.682 497.085C573.522 498.608 574.563 504.851 574.563 504.851L569.447 508.849C569.447 508.849 567.605 510.613 567.124 508.929C566.643 507.245 564.32 509.089 564.32 509.089L563.782 511.976C563.782 511.976 562.077 517.176 560.646 517.737C559.216 518.299 551.891 522.01 553.013 518.619Z"
																stroke="white"
																stroke-width="8"
																mask="url(#path-13-outside-13_0_1)"
															/>
														</g>
														<g id="Vector_3">
															<mask
																id="path-14-outside-14_0_1"
																maskUnits="userSpaceOnUse"
																x="593.498"
																y="451.33"
																width="37"
																height="69"
																fill="black">
																<rect
																	fill="white"
																	x="593.498"
																	y="451.33"
																	width="37"
																	height="69"
																/>
																<path d="M604.01 465.251C604.01 465.251 603.175 469.077 601.675 470.291C600.176 471.506 598.231 474.484 598.231 475.331C598.231 476.179 597.761 478.596 598.231 479.157C598.7 479.718 601.87 482.697 601.87 482.697C601.87 482.697 599.444 485.961 599.169 487.359C598.894 488.756 598.894 493.235 598.894 493.235C598.894 493.235 597.498 494.174 597.498 495.938C597.498 497.702 598.15 504.243 599.455 505.354C600.76 506.465 602.991 510.107 605.795 510.485C608.599 510.863 612.594 509.271 614.093 509.363V514.586C614.093 514.586 615.306 517.472 617.08 515.056V512.169C617.08 512.169 622.299 506.476 624.908 505.64L625.652 497.805C625.652 497.805 625 491.184 622.768 487.359C620.536 483.533 621.932 476.442 621.932 476.442L620.067 468.046C620.067 468.046 620.811 459.284 618.385 459.181C615.958 459.078 613.635 453.957 613.166 457.692C612.697 461.426 612.239 466.179 612.239 466.179C612.239 466.179 608.599 467.107 608.05 464.965C607.501 462.823 604.044 465.24 604.044 465.24L604.01 465.251Z" />
															</mask>
															<path
																d="M604.01 465.251C604.01 465.251 603.175 469.077 601.675 470.291C600.176 471.506 598.231 474.484 598.231 475.331C598.231 476.179 597.761 478.596 598.231 479.157C598.7 479.718 601.87 482.697 601.87 482.697C601.87 482.697 599.444 485.961 599.169 487.359C598.894 488.756 598.894 493.235 598.894 493.235C598.894 493.235 597.498 494.174 597.498 495.938C597.498 497.702 598.15 504.243 599.455 505.354C600.76 506.465 602.991 510.107 605.795 510.485C608.599 510.863 612.594 509.271 614.093 509.363V514.586C614.093 514.586 615.306 517.472 617.08 515.056V512.169C617.08 512.169 622.299 506.476 624.908 505.64L625.652 497.805C625.652 497.805 625 491.184 622.768 487.359C620.536 483.533 621.932 476.442 621.932 476.442L620.067 468.046C620.067 468.046 620.811 459.284 618.385 459.181C615.958 459.078 613.635 453.957 613.166 457.692C612.697 461.426 612.239 466.179 612.239 466.179C612.239 466.179 608.599 467.107 608.05 464.965C607.501 462.823 604.044 465.24 604.044 465.24L604.01 465.251Z"
																fill={getColorByCity('BanggaiLaut')}
															/>
															<path
																d="M604.01 465.251C604.01 465.251 603.175 469.077 601.675 470.291C600.176 471.506 598.231 474.484 598.231 475.331C598.231 476.179 597.761 478.596 598.231 479.157C598.7 479.718 601.87 482.697 601.87 482.697C601.87 482.697 599.444 485.961 599.169 487.359C598.894 488.756 598.894 493.235 598.894 493.235C598.894 493.235 597.498 494.174 597.498 495.938C597.498 497.702 598.15 504.243 599.455 505.354C600.76 506.465 602.991 510.107 605.795 510.485C608.599 510.863 612.594 509.271 614.093 509.363V514.586C614.093 514.586 615.306 517.472 617.08 515.056V512.169C617.08 512.169 622.299 506.476 624.908 505.64L625.652 497.805C625.652 497.805 625 491.184 622.768 487.359C620.536 483.533 621.932 476.442 621.932 476.442L620.067 468.046C620.067 468.046 620.811 459.284 618.385 459.181C615.958 459.078 613.635 453.957 613.166 457.692C612.697 461.426 612.239 466.179 612.239 466.179C612.239 466.179 608.599 467.107 608.05 464.965C607.501 462.823 604.044 465.24 604.044 465.24L604.01 465.251Z"
																stroke="white"
																stroke-width="8"
																mask="url(#path-14-outside-14_0_1)"
															/>
														</g>
														<g id="Vector_4">
															<mask
																id="path-15-outside-15_0_1"
																maskUnits="userSpaceOnUse"
																x="635.48"
																y="537.775"
																width="12"
																height="20"
																fill="black">
																<rect
																	fill="white"
																	x="635.48"
																	y="537.775"
																	width="12"
																	height="20"
																/>
																<path d="M639.73 543.326C639.73 543.326 639.169 546.705 639.73 549.637C639.73 549.637 639.421 552.696 640.851 553.142C642.282 553.589 643.724 552.959 642.408 548.893C642.408 548.893 642.351 546.522 642.099 545.388C641.847 544.254 640.542 541.642 639.73 543.326Z" />
															</mask>
															<path
																d="M639.73 543.326C639.73 543.326 639.169 546.705 639.73 549.637C639.73 549.637 639.421 552.696 640.851 553.142C642.282 553.589 643.724 552.959 642.408 548.893C642.408 548.893 642.351 546.522 642.099 545.388C641.847 544.254 640.542 541.642 639.73 543.326Z"
																fill={getColorByCity('BanggaiLaut')}
															/>
															<path
																d="M639.73 543.326C639.73 543.326 639.169 546.705 639.73 549.637C639.73 549.637 639.421 552.696 640.851 553.142C642.282 553.589 643.724 552.959 642.408 548.893C642.408 548.893 642.351 546.522 642.099 545.388C641.847 544.254 640.542 541.642 639.73 543.326Z"
																stroke="white"
																stroke-width="8"
																mask="url(#path-15-outside-15_0_1)"
															/>
														</g>
														<g id="Vector_5">
															<mask
																id="path-16-outside-16_0_1"
																maskUnits="userSpaceOnUse"
																x="647.287"
																y="538.701"
																width="15"
																height="19"
																fill="black">
																<rect
																	fill="white"
																	x="647.287"
																	y="538.701"
																	width="15"
																	height="19"
																/>
																<path d="M651.287 552.834V548.275C651.287 548.275 651.917 544.552 655.911 542.788C655.911 542.788 656.781 542.089 657.227 544.655C657.673 547.221 657.914 548.034 657.73 550.909C657.547 553.784 651.299 552.845 651.299 552.845L651.287 552.834Z" />
															</mask>
															<path
																d="M651.287 552.834V548.275C651.287 548.275 651.917 544.552 655.911 542.788C655.911 542.788 656.781 542.089 657.227 544.655C657.673 547.221 657.914 548.034 657.73 550.909C657.547 553.784 651.299 552.845 651.299 552.845L651.287 552.834Z"
																fill={getColorByCity('BanggaiLaut')}
															/>
															<path
																d="M651.287 552.834V548.275C651.287 548.275 651.917 544.552 655.911 542.788C655.911 542.788 656.781 542.089 657.227 544.655C657.673 547.221 657.914 548.034 657.73 550.909C657.547 553.784 651.299 552.845 651.299 552.845L651.287 552.834Z"
																stroke="white"
																stroke-width="8"
																mask="url(#path-16-outside-16_0_1)"
															/>
														</g>
														<g id="Vector_6">
															<mask
																id="path-17-outside-17_0_1"
																maskUnits="userSpaceOnUse"
																x="662.029"
																y="535.693"
																width="26"
																height="34"
																fill="black">
																<rect
																	fill="white"
																	x="662.029"
																	y="535.693"
																	width="26"
																	height="34"
																/>
																<path d="M666.029 542.694V549.017C666.029 549.017 668.032 553.702 668.341 557.769C668.65 561.835 675.528 567.585 680.335 564.515C685.142 561.445 683.711 557.574 683.711 557.574L671.717 539.693H667.162C667.162 539.693 666.041 540.106 666.041 542.683L666.029 542.694Z" />
															</mask>
															<path
																d="M666.029 542.694V549.017C666.029 549.017 668.032 553.702 668.341 557.769C668.65 561.835 675.528 567.585 680.335 564.515C685.142 561.445 683.711 557.574 683.711 557.574L671.717 539.693H667.162C667.162 539.693 666.041 540.106 666.041 542.683L666.029 542.694Z"
																fill={getColorByCity('BanggaiLaut')}
															/>
															<path
																d="M666.029 542.694V549.017C666.029 549.017 668.032 553.702 668.341 557.769C668.65 561.835 675.528 567.585 680.335 564.515C685.142 561.445 683.711 557.574 683.711 557.574L671.717 539.693H667.162C667.162 539.693 666.041 540.106 666.041 542.683L666.029 542.694Z"
																stroke="white"
																stroke-width="8"
																mask="url(#path-17-outside-17_0_1)"
															/>
														</g>
														<g id="Vector_7">
															<mask
																id="path-18-outside-18_0_1"
																maskUnits="userSpaceOnUse"
																x="658.951"
																y="560.334"
																width="13"
																height="14"
																fill="black">
																<rect
																	fill="white"
																	x="658.951"
																	y="560.334"
																	width="13"
																	height="14"
																/>
																<path d="M663.089 566.339C663.089 566.339 663.466 564.334 664.462 564.334C665.458 564.334 667.209 564.964 667.334 566.339C667.46 567.713 667.334 570.21 667.334 570.21H663.089C663.089 570.21 662.78 567.335 663.089 566.339Z" />
															</mask>
															<path
																d="M663.089 566.339C663.089 566.339 663.466 564.334 664.462 564.334C665.458 564.334 667.209 564.964 667.334 566.339C667.46 567.713 667.334 570.21 667.334 570.21H663.089C663.089 570.21 662.78 567.335 663.089 566.339Z"
																fill={getColorByCity('BanggaiLaut')}
															/>
															<path
																d="M663.089 566.339C663.089 566.339 663.466 564.334 664.462 564.334C665.458 564.334 667.209 564.964 667.334 566.339C667.46 567.713 667.334 570.21 667.334 570.21H663.089C663.089 570.21 662.78 567.335 663.089 566.339Z"
																stroke="white"
																stroke-width="8"
																mask="url(#path-18-outside-18_0_1)"
															/>
														</g>
														<g id="Vector_8">
															<mask
																id="path-19-outside-19_0_1"
																maskUnits="userSpaceOnUse"
																x="677.514"
																y="560.701"
																width="17"
																height="23"
																fill="black">
																<rect
																	fill="white"
																	x="677.514"
																	y="560.701"
																	width="17"
																	height="23"
																/>
																<path d="M681.514 574.403V570.588C681.514 570.588 682.727 564.964 683.906 564.712C685.084 564.46 690.383 568.458 690.017 579.282C690.017 579.282 689.273 579.97 687.396 578.286C685.519 576.602 681.525 575.342 681.525 574.414L681.514 574.403Z" />
															</mask>
															<path
																d="M681.514 574.403V570.588C681.514 570.588 682.727 564.964 683.906 564.712C685.084 564.46 690.383 568.458 690.017 579.282C690.017 579.282 689.273 579.97 687.396 578.286C685.519 576.602 681.525 575.342 681.525 574.414L681.514 574.403Z"
																fill={getColorByCity('BanggaiLaut')}
															/>
															<path
																d="M681.514 574.403V570.588C681.514 570.588 682.727 564.964 683.906 564.712C685.084 564.46 690.383 568.458 690.017 579.282C690.017 579.282 689.273 579.97 687.396 578.286C685.519 576.602 681.525 575.342 681.525 574.414L681.514 574.403Z"
																stroke="white"
																stroke-width="8"
																mask="url(#path-19-outside-19_0_1)"
															/>
														</g>
														<g id="Vector_9">
															<mask
																id="path-20-outside-20_0_1"
																maskUnits="userSpaceOnUse"
																x="706.686"
																y="519.33"
																width="21"
																height="31"
																fill="black">
																<rect
																	fill="white"
																	x="706.686"
																	y="519.33"
																	width="21"
																	height="31"
																/>
																<path d="M710.936 525.078C710.936 525.078 710.067 526.716 711.566 529.843C713.065 532.97 714.313 539.671 716.567 539.694C718.822 539.716 720.447 543.978 720.447 543.978C720.447 543.978 723.445 548.319 722.942 542.775C722.438 537.231 721.317 532.592 721.317 532.592C721.317 532.592 717.815 528.09 716.315 528.09C716.315 528.09 714.564 522.317 710.936 525.078Z" />
															</mask>
															<path
																d="M710.936 525.078C710.936 525.078 710.067 526.716 711.566 529.843C713.065 532.97 714.313 539.671 716.567 539.694C718.822 539.716 720.447 543.978 720.447 543.978C720.447 543.978 723.445 548.319 722.942 542.775C722.438 537.231 721.317 532.592 721.317 532.592C721.317 532.592 717.815 528.09 716.315 528.09C716.315 528.09 714.564 522.317 710.936 525.078Z"
																fill={getColorByCity('BanggaiLaut')}
															/>
															<path
																d="M710.936 525.078C710.936 525.078 710.067 526.716 711.566 529.843C713.065 532.97 714.313 539.671 716.567 539.694C718.822 539.716 720.447 543.978 720.447 543.978C720.447 543.978 723.445 548.319 722.942 542.775C722.438 537.231 721.317 532.592 721.317 532.592C721.317 532.592 717.815 528.09 716.315 528.09C716.315 528.09 714.564 522.317 710.936 525.078Z"
																stroke="white"
																stroke-width="8"
																mask="url(#path-20-outside-20_0_1)"
															/>
														</g>
													</g>
													<g
														style={{ cursor: 'pointer' }}
														onMouseEnter={() => {
															showCardArea('BanggaiKepulauan');
														}}
														onMouseLeave={() => {
															hideCardArea('BanggaiKepulauan');
														}}
														onClick={() => {
															openDialog('BanggaiKepulauan');
														}}
														fill={getColorByCity('BanggaiKepulauan')}
														id="BanggaiKepulauan">
														<mask
															id="path-21-outside-21_0_1"
															maskUnits="userSpaceOnUse"
															x="505.6"
															y="389.607"
															width="117"
															height="77"
															fill="black">
															<rect
																fill="white"
																x="505.6"
																y="389.607"
																width="117"
																height="77"
															/>
															<path d="M509.6 439.267V427.058C509.6 427.058 510.161 422.271 512.95 419.316C512.95 419.316 512.872 414.288 514.15 412.533C515.428 410.779 518.857 410.062 522.363 403.115C525.87 396.169 530.257 398.406 530.257 398.406C530.257 398.406 533.529 400.956 533.444 402.398C533.444 402.398 539.662 398.999 543.254 398.063C546.846 397.128 550.992 396.574 553.22 395.452C553.22 395.452 553.781 394.89 558.799 401.119C558.799 401.119 560.397 402.078 560.553 399.365C560.709 396.652 563.35 393.791 563.35 393.791C563.35 393.791 565.103 392.676 566.942 395.943C568.781 399.209 571.088 404.955 571.088 404.955C571.088 404.955 572.124 408.144 569.412 408.947C566.701 409.75 565.82 410.304 565.742 411.341C565.664 412.377 565.345 415.972 564.948 417.164C564.948 417.164 572.366 423.706 572.685 426.582C573.005 429.459 578.35 424.665 578.264 423.23C578.179 421.796 577.945 417.858 579.94 416.439C581.934 415.02 584.327 413.103 585.285 410.148C586.244 407.193 592.306 403.848 592.306 403.848C592.306 403.848 602.592 403.607 604.664 407.037C604.664 407.037 606.901 407.918 606.659 410.148C606.659 410.148 610.329 409.111 613.36 409.906C616.392 410.701 617.428 411.98 617.428 411.98C617.428 411.98 618.386 415.091 616.953 417.164C616.953 417.164 616.555 420.517 614.085 422.91C614.085 422.91 615.285 432.243 614.163 432.726C613.041 433.209 611.295 434.239 610.976 435.197C610.657 436.156 609.059 438.792 605.397 436.874C605.397 436.874 603.963 442.378 603.963 443.812H601.173C601.173 443.812 601.173 442.378 599.101 443.493C597.028 444.608 597.27 446.923 597.27 446.923C597.27 446.923 595.992 448.755 595.119 445.247C594.246 441.739 590.732 441.341 590.732 441.341C590.732 441.341 587.779 437.03 586.025 436.554C586.025 436.554 584.109 431.128 582.199 430.652C580.29 430.177 578.451 430.411 578.373 432.087C578.296 433.763 574.945 434.324 574.945 434.324C574.945 434.324 574.384 442.939 572.794 447.407L572.716 455.148C572.716 455.148 574.547 457.144 574.547 457.862C574.547 458.579 575.186 461.456 573.589 461.931C571.992 462.407 571.672 459.935 571.672 458.103C571.672 456.271 570.955 454.751 569.358 456.349C567.761 457.947 565.135 460.98 559.945 460.738C559.945 460.738 558.348 458.501 559.15 457.628L555.161 457.55C555.161 457.55 552.371 456.754 552.924 453.238C552.924 453.238 553.166 451.804 555.955 451.96L564.09 445.972C564.09 445.972 564.971 443.501 564.09 440.148C563.21 436.796 560.498 428.422 560.981 423.23C561.464 418.038 562.181 413.336 556.758 414.693C556.758 414.693 547.189 423.791 544.633 431.447C542.077 439.103 540.207 444.054 531.472 448.124L526.571 454.907C526.571 454.907 521.623 457.222 518.358 453.472C518.358 453.472 518.678 441.824 509.623 439.267H509.6Z" />
														</mask>
														<path
															d="M509.6 439.267V427.058C509.6 427.058 510.161 422.271 512.95 419.316C512.95 419.316 512.872 414.288 514.15 412.533C515.428 410.779 518.857 410.062 522.363 403.115C525.87 396.169 530.257 398.406 530.257 398.406C530.257 398.406 533.529 400.956 533.444 402.398C533.444 402.398 539.662 398.999 543.254 398.063C546.846 397.128 550.992 396.574 553.22 395.452C553.22 395.452 553.781 394.89 558.799 401.119C558.799 401.119 560.397 402.078 560.553 399.365C560.709 396.652 563.35 393.791 563.35 393.791C563.35 393.791 565.103 392.676 566.942 395.943C568.781 399.209 571.088 404.955 571.088 404.955C571.088 404.955 572.124 408.144 569.412 408.947C566.701 409.75 565.82 410.304 565.742 411.341C565.664 412.377 565.345 415.972 564.948 417.164C564.948 417.164 572.366 423.706 572.685 426.582C573.005 429.459 578.35 424.665 578.264 423.23C578.179 421.796 577.945 417.858 579.94 416.439C581.934 415.02 584.327 413.103 585.285 410.148C586.244 407.193 592.306 403.848 592.306 403.848C592.306 403.848 602.592 403.607 604.664 407.037C604.664 407.037 606.901 407.918 606.659 410.148C606.659 410.148 610.329 409.111 613.36 409.906C616.392 410.701 617.428 411.98 617.428 411.98C617.428 411.98 618.386 415.091 616.953 417.164C616.953 417.164 616.555 420.517 614.085 422.91C614.085 422.91 615.285 432.243 614.163 432.726C613.041 433.209 611.295 434.239 610.976 435.197C610.657 436.156 609.059 438.792 605.397 436.874C605.397 436.874 603.963 442.378 603.963 443.812H601.173C601.173 443.812 601.173 442.378 599.101 443.493C597.028 444.608 597.27 446.923 597.27 446.923C597.27 446.923 595.992 448.755 595.119 445.247C594.246 441.739 590.732 441.341 590.732 441.341C590.732 441.341 587.779 437.03 586.025 436.554C586.025 436.554 584.109 431.128 582.199 430.652C580.29 430.177 578.451 430.411 578.373 432.087C578.296 433.763 574.945 434.324 574.945 434.324C574.945 434.324 574.384 442.939 572.794 447.407L572.716 455.148C572.716 455.148 574.547 457.144 574.547 457.862C574.547 458.579 575.186 461.456 573.589 461.931C571.992 462.407 571.672 459.935 571.672 458.103C571.672 456.271 570.955 454.751 569.358 456.349C567.761 457.947 565.135 460.98 559.945 460.738C559.945 460.738 558.348 458.501 559.15 457.628L555.161 457.55C555.161 457.55 552.371 456.754 552.924 453.238C552.924 453.238 553.166 451.804 555.955 451.96L564.09 445.972C564.09 445.972 564.971 443.501 564.09 440.148C563.21 436.796 560.498 428.422 560.981 423.23C561.464 418.038 562.181 413.336 556.758 414.693C556.758 414.693 547.189 423.791 544.633 431.447C542.077 439.103 540.207 444.054 531.472 448.124L526.571 454.907C526.571 454.907 521.623 457.222 518.358 453.472C518.358 453.472 518.678 441.824 509.623 439.267H509.6Z"
															fill={getColorByCity('BanggaiKepulauan')}
														/>
														<path
															d="M509.6 439.267V427.058C509.6 427.058 510.161 422.271 512.95 419.316C512.95 419.316 512.872 414.288 514.15 412.533C515.428 410.779 518.857 410.062 522.363 403.115C525.87 396.169 530.257 398.406 530.257 398.406C530.257 398.406 533.529 400.956 533.444 402.398C533.444 402.398 539.662 398.999 543.254 398.063C546.846 397.128 550.992 396.574 553.22 395.452C553.22 395.452 553.781 394.89 558.799 401.119C558.799 401.119 560.397 402.078 560.553 399.365C560.709 396.652 563.35 393.791 563.35 393.791C563.35 393.791 565.103 392.676 566.942 395.943C568.781 399.209 571.088 404.955 571.088 404.955C571.088 404.955 572.124 408.144 569.412 408.947C566.701 409.75 565.82 410.304 565.742 411.341C565.664 412.377 565.345 415.972 564.948 417.164C564.948 417.164 572.366 423.706 572.685 426.582C573.005 429.459 578.35 424.665 578.264 423.23C578.179 421.796 577.945 417.858 579.94 416.439C581.934 415.02 584.327 413.103 585.285 410.148C586.244 407.193 592.306 403.848 592.306 403.848C592.306 403.848 602.592 403.607 604.664 407.037C604.664 407.037 606.901 407.918 606.659 410.148C606.659 410.148 610.329 409.111 613.36 409.906C616.392 410.701 617.428 411.98 617.428 411.98C617.428 411.98 618.386 415.091 616.953 417.164C616.953 417.164 616.555 420.517 614.085 422.91C614.085 422.91 615.285 432.243 614.163 432.726C613.041 433.209 611.295 434.239 610.976 435.197C610.657 436.156 609.059 438.792 605.397 436.874C605.397 436.874 603.963 442.378 603.963 443.812H601.173C601.173 443.812 601.173 442.378 599.101 443.493C597.028 444.608 597.27 446.923 597.27 446.923C597.27 446.923 595.992 448.755 595.119 445.247C594.246 441.739 590.732 441.341 590.732 441.341C590.732 441.341 587.779 437.03 586.025 436.554C586.025 436.554 584.109 431.128 582.199 430.652C580.29 430.177 578.451 430.411 578.373 432.087C578.296 433.763 574.945 434.324 574.945 434.324C574.945 434.324 574.384 442.939 572.794 447.407L572.716 455.148C572.716 455.148 574.547 457.144 574.547 457.862C574.547 458.579 575.186 461.456 573.589 461.931C571.992 462.407 571.672 459.935 571.672 458.103C571.672 456.271 570.955 454.751 569.358 456.349C567.761 457.947 565.135 460.98 559.945 460.738C559.945 460.738 558.348 458.501 559.15 457.628L555.161 457.55C555.161 457.55 552.371 456.754 552.924 453.238C552.924 453.238 553.166 451.804 555.955 451.96L564.09 445.972C564.09 445.972 564.971 443.501 564.09 440.148C563.21 436.796 560.498 428.422 560.981 423.23C561.464 418.038 562.181 413.336 556.758 414.693C556.758 414.693 547.189 423.791 544.633 431.447C542.077 439.103 540.207 444.054 531.472 448.124L526.571 454.907C526.571 454.907 521.623 457.222 518.358 453.472C518.358 453.472 518.678 441.824 509.623 439.267H509.6Z"
															stroke="white"
															stroke-width="8"
															mask="url(#path-21-outside-21_0_1)"
														/>
													</g>
												</g>
											</g>
											<defs>
												<filter
													id="filter0_d_0_1"
													x="0"
													y="0.849609"
													width="730.998"
													height="722.15"
													filterUnits="userSpaceOnUse"
													color-interpolation-filters="sRGB">
													<feFlood
														flood-opacity="0"
														result="BackgroundImageFix"
													/>
													<feColorMatrix
														in="SourceAlpha"
														type="matrix"
														values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
														result="hardAlpha"
													/>
													<feOffset dy="4" />
													<feGaussianBlur stdDeviation="2" />
													<feComposite in2="hardAlpha" operator="out" />
													<feColorMatrix
														type="matrix"
														values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
													/>
													<feBlend
														mode="normal"
														in2="BackgroundImageFix"
														result="effect1_dropShadow_0_1"
													/>
													<feBlend
														mode="normal"
														in="SourceGraphic"
														in2="effect1_dropShadow_0_1"
														result="shape"
													/>
												</filter>
											</defs>
										</svg>
									</center>
								</div>
							</div>
							<br />
							<br />
							<div className="flex gap-8">
								<div className="flex gap-2">
									<div className="w-5 h-5 rounded-sm bg-[#76bf70]"></div>
									<p>Surplus</p>
								</div>
								<div className="flex gap-2">
									<div className="w-5 h-5 rounded-sm bg-[#bf7070]"></div>
									<p>Defisit</p>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="grafik">
							<div className="h-full w-full ">
								<Chart />
							</div>
						</TabsContent>
					</div>
					<div className="h-1 rounded-lg mt-10 bg-black/10 z-0"></div>
				</section>
			</Tabs>

			<section className="px-4 sm:px-8 lg:px-50 md:px-10 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col items-center space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 px-20 lg:grid-cols-3 xl:grid-cols-4 gap-[2rem] w-full ">
						{cardContents.map((content, index) => (
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
												<td className="text-right">{content.ketersediaan}</td>
											</tr>
											<tr>
												<td className="pr-2">Kebutuhan:</td>
												<td className="text-right">{content.kebutuhan}</td>
											</tr>
											<tr>
												<td colSpan={2}>
													<hr className="my-1" />
												</td>
											</tr>
											<tr className="font-bold">
												<td className="pr-2">Neraca Pangan:</td>
												<td className="text-right">{content.neraca}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						))}
					</div>
				</div>
				<h1 className="text-sm m-0 p-0 sm:text-sm md:text-md">
					*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar
				</h1>
				<div className="h-1 rounded-lg bg-black/10"></div>
			</section>

			<Dialog isOpen={isDialogOpen} onClose={closeDialog}>
				<div className="mt-2">
					<h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
						Neraca {detailHarga?.city}
					</h1>
					<div className="h-1 rounded-lg my-5 bg-black z-0"></div>
					<div className="shadow-lg px-4 sm:px-6 md:px-10 rounded-lg p-4">
						<Tabs defaultValue="bulanan">
							<TabsList className="rounded-full flex sm:flex-row flex-col justify-end w-full h-full text-black">
								<TabsTrigger
									className="rounded-full text-xs sm:text-sm md:text-base"
									value="tahunan">
									Tahunan
								</TabsTrigger>
								<TabsTrigger
									className="rounded-full text-xs sm:text-sm md:text-base"
									value="triwulan">
									Triwulan
								</TabsTrigger>
								<TabsTrigger
									className="rounded-full text-xs sm:text-sm md:text-base"
									value="bulanan">
									Bulanan
								</TabsTrigger>
							</TabsList>

							<TabsContent value="tahunan">
								<div className="h-full w-full">
									<Chart />
								</div>
							</TabsContent>
							<TabsContent value="triwulan">
								<div className="h-full w-full">
									<Chart />
								</div>
							</TabsContent>
							<TabsContent value="bulanan">
								<div className="h-full w-full">
									<Chart />
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
				<div className="flex justify-end w-full">
					<button
						className="mt-4 px-3 py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm md:text-base"
						onClick={closeDialog}>
						Close
					</button>
				</div>
			</Dialog>

			<Footer />
		</main>
	);
}
