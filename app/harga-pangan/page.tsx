import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Footer from '@/components/ui/footer';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import Map from '@/components/ui/map';
import {
	CounterClockwiseClockIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	SewingPinFilledIcon,
	PersonIcon,
	ArrowUpIcon,
	EnvelopeClosedIcon,
} from '@radix-ui/react-icons';
import {
	UserIcon,
	ScaleIcon,
	BuildingLibraryIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import user from '@/public/user.svg';
import Background from '@/public/bgg.png';
import vector1 from '@/public/vect1.svg';
import vector2 from '@/public/vect2.svg';
import sidak from '@/public/sida.png';
import sidakhitam from '@/public/sidakhitam.png';
import bank from '@/public/bank.svg';
import sulaw from '@/public/sulaw.svg';
import berita from '@/public/berita.png';
import berita2 from '@/public/berita 2.png';
import berita3 from '@/public/berita 3.png';
import Navbar from '@/components/ui/navbar';
import { cn } from '@/lib/utils';

export default function Home() {
	// foreach month in year
	const months = [
		'JUNI',
		'JULI',
	];
	const CardContents = [
		{ city: 'Kota Palu', price: '15.000/kg', color: 'red', change: 'RP.298' },
		{
			city: 'Kabupaten Boul',
			price: '14.100/kg',
			color: 'yellow',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Sigi',
			price: '13.370/kg',
			color: 'green',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Donggala',
			price: '12.000/kg',
			color: 'red',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Morowali',
			price: '11.000/kg',
			color: 'yellow',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Parigi Moutong',
			price: '10.500/kg',
			color: 'green',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Toli-Toli',
			price: '10.000/kg',
			color: 'red',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Poso',
			price: '9.800/kg',
			color: 'yellow',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Banggai',
			price: '9.500/kg',
			color: 'green',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Tojo Una-Una',
			price: '9.200/kg',
			color: 'red',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Banggai Kepulauan',
			price: '9.000/kg',
			color: 'yellow',
			change: 'Rp. 298',
		},
		{
			city: 'Kabupaten Banggai Kepulauan',
			price: '9.000/kg',
			color: 'yellow',
			change: 'Rp. 298',
		},
	];


	const konsumenPangan = [
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
		{
			komoditas: 'Beras',
			jenis: 'Premium',
			harga: 'Rp. 12.000',
			volatilitas: '90%',
			hari: '92',
		},
	];

	return (
		<main>
			<Navbar />

			<div className="relative h-72 flex items-center justify-center bg-no-repeat bg-cover bg-[url('/bgg.png')]">
				<div className="hidden lg:block">
					<Image
						src={vector1}
						alt="vector1"
						width={440}
						height={440}
						objectFit="cover"
						className="absolute opacity-60 right-0 top-0"
					/>
					<Image
						src={vector2}
						alt="vector2"
						width={440}
						height={440}
						objectFit="cover"
						className="absolute drop-shadow-md opacity-25 right-0 top-0"
					/>
				</div>

				<div className="flex-col mx-auto z-1 items-center ">
					<p className="text-lg text-center sm:text-2xl md:text-3xl lg:text-3xl  text-white font-semibold">
						Sistem Informasi Komoditas : Harga dan Pasokan
					</p>
				</div>
			</div>
			<div className="relative mx-auto  -mt-24 px-8 lg:-mt-12 z-1 shadow-xl w-[20rem] sm:w-[18rem] gap-2 rounded-full py-4 flex flex-col items-center sm:flex-row flex-wrap overflow-hidden bg-white">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm">Komoditas</h1>
					<Select>
						<SelectTrigger className="">
							<SelectValue placeholder="Select a fruit" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Fruits</SelectLabel>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="mx-4 border-l border-black h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1" >
					<h1 className="font-bold text-sm ">Bulan</h1>
					<Select>
						<SelectTrigger className="">
							<SelectValue placeholder="Bulan" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Fruits</SelectLabel>
								{months.map((month, index) => (
									<SelectItem value={month} key={index}>{month} 2024</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* content */}
			<section className="px-4 sm:px-8 md:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col sm:flex-row justify-between pt-10">
					<div className="flex-col">
						<h1 className="text-2xl sm:text-3xl md:text-4xl mb-8 font-extrabold">
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
						<Map />
					</div>
				</div>
				<div className="h-1 rounded-lg mt-10 bg-black/10 z-0"></div>
			</section>

			<section className="px-4 sm:px-8 md:px-20 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<h1 className="text-sm sm:text-xl md:text-2xl">
					*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar
				</h1>

				<div className="flex flex-col items-center space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
						{CardContents.map((content, index) => (
							<div
								key={index}
								className="border border-gray-200 p-4 rounded-lg shadow-md">
								<div className="flex flex-col items-center space-y-2">
									<h1 className="text-md font-light">{content.city}</h1>
									<p className="font-bold text-2xl">{content.price}</p>
									<div
										className={`rounded-md p-2 flex items-center justify-center text-white ${content.color === 'red'
											? 'bg-red-500'
											: content.color === 'yellow'
												? 'bg-yellow-500'
												: 'bg-green-500'
											}`}>
										<ArrowUpIcon className="text-white w-4 h-4 mr-1" />
										Naik {content.change}
									</div>
								</div>
								<div className="flex flex-col mt-4">
									<p className="text-md font-semibold">{content.price}</p>
									<p className="text-xs font-thin">DAY IN HIGH VOLATILITY</p>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-wrap justify-center gap-4 mt-5">
						<div className="text-center w-48 md:w-60">
							<p className="font-bold text-2xl mt-4 mb-4">4 Daerah</p>
							<div className="py-3 bg-red-500 rounded-t-md"></div>
							<p className="font-semibold text-lg mt-4 mb-4">Harga Naik</p>
						</div>
						<div className="text-center w-48 md:w-60">
							<p className="font-bold text-2xl mt-4 mb-4">5 Daerah</p>
							<div className="py-3 bg-yellow-500 rounded-t-md"></div>
							<p className="font-semibold text-lg mt-4 mb-4">Harga Turun</p>
						</div>
						<div className="text-center w-48 md:w-60">
							<p className="font-bold text-2xl mt-4 mb-4">3 Daerah</p>
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
										<td className="w-full">
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
			<Footer />
		</main>
	);
}
