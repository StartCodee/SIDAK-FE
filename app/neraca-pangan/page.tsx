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
	const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>([]);

	const [detailHarga, setDetailHarga] = useState<any>();
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
			'absolute z-50 bg-white p-4 rounded-lg shadow-md flex items-center hidden md:block';
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
                            <td class="text-right">${Math.round(content?.ketersediaan as any).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            </tr>
                            <tr>
                            <td class="pr-2">Kebutuhan:</td>
                            <td class="text-right">${Math.round(content?.kebutuhan as any).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            </tr>
                            <tr>
                            <td colspan="2">
                                <hr class="my-1" />
                            </td>
                            </tr>
                            <tr class="font-bold">
                            <td class="pr-2">Neraca Pangan:</td>
                            <td class="text-right">${Math.round(content?.neraca as any).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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

	const getNeracaPangan = async (page: number = 1, limit: number = 2, date: string, komoditas: string) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/harga-pasokan?date=${date}&komoditas=${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				setCardContents(response.data.data);
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
		getNeracaPangan(1, 2, '2024-06', '18');
		console.log(cardContents);
		getCommodityOption();
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
			<MapNeraca cardContents={cardContents} />

			<section className="px-4 sm:px-8 lg:px-50 md:px-10 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col items-center space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 px-10 lg:grid-cols-3 xl:grid-cols-4 gap-[2rem] w-full ">
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
												<td className="text-right">{Math.round(content?.ketersediaan as any).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
											</tr>
											<tr>
												<td className="pr-2">Kebutuhan:</td>
												<td className="text-right">{Math.round(content?.kebutuhan as any).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
											</tr>
											<tr>
												<td colSpan={2}>
													<hr className="my-1" />
												</td>
											</tr>
											<tr className="font-bold">
												<td className="pr-2">Neraca Pangan:</td>
												<td className="text-right">{Math.round(content?.neraca as any).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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
			<Footer />
		</main>
	);
}
