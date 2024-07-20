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

import { Chart } from '@/app/neraca-pangan/chart';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

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
import Map from '@/app/neraca-pangan/map';
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
		'JANUARI',
		'FEBRUARI',
		'MARET',
		'APRIL',
		'MEI',
		'JUNI',
		'JULI',
		'AGUSTUS',
		'SEPTEMBER',
		'OKTOBER',
		'NOVEMBER',
		'DESEMBER',
	];

	const CardContents = [
		{
			city: 'Kota Palu',
			ketersediaan: '1000 ton',
			kebutuhan: '800 ton',
			neraca: '200 ton',
			color: 'red',
		},
		{
			city: 'Kabupaten Boul',
			ketersediaan: '900 ton',
			kebutuhan: '700 ton',
			neraca: '200 ton',
			color: 'yellow',
		},
		{
			city: 'Kabupaten Sigi',
			ketersediaan: '1100 ton',
			kebutuhan: '950 ton',
			neraca: '150 ton',
			color: 'green',
		},
		{
			city: 'Kabupaten Donggala',
			ketersediaan: '1200 ton',
			kebutuhan: '1000 ton',
			neraca: '200 ton',
			color: 'red',
		},
		{
			city: 'Kabupaten Morowali',
			ketersediaan: '800 ton',
			kebutuhan: '600 ton',
			neraca: '200 ton',
			color: 'yellow',
		},
		{
			city: 'Kabupaten Parigi Moutong',
			ketersediaan: '1050 ton',
			kebutuhan: '850 ton',
			neraca: '200 ton',
			color: 'green',
		},
		{
			city: 'Kabupaten Toli-Toli',
			ketersediaan: '1000 ton',
			kebutuhan: '750 ton',
			neraca: '250 ton',
			color: 'red',
		},
		{
			city: 'Kabupaten Poso',
			ketersediaan: '950 ton',
			kebutuhan: '700 ton',
			neraca: '250 ton',
			color: 'yellow',
		},
		{
			city: 'Kabupaten Banggai',
			ketersediaan: '850 ton',
			kebutuhan: '600 ton',
			neraca: '250 ton',
			color: 'green',
		},
		{
			city: 'Kabupaten Tojo Una-Una',
			ketersediaan: '980 ton',
			kebutuhan: '780 ton',
			neraca: '200 ton',
			color: 'red',
		},
		{
			city: 'Kabupaten Banggai Kepulauan',
			ketersediaan: '920 ton',
			kebutuhan: '720 ton',
			neraca: '200 ton',
			color: 'yellow',
		},
		{
			city: 'Kabupaten Banggai Kepulauan',
			ketersediaan: '930 ton',
			kebutuhan: '730 ton',
			neraca: '200 ton',
			color: 'yellow',
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
			<div className="relative mx-auto  -mt-24 px-8 lg:-mt-12 z-1 shadow-xl w-[20rem] sm:w-[22rem] gap-2 rounded-full py-4 flex flex-col items-center sm:flex-row flex-wrap overflow-hidden bg-white">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm">Komoditas</h1>
					<Select>
						<SelectTrigger className="border-none">
							<SelectValue placeholder="Beras" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Komoditas</SelectLabel>
								<SelectItem value="beras">Beras</SelectItem>
								<SelectItem value="minyak">Minyak</SelectItem>
								<SelectItem value="gula">Gula</SelectItem>
								<SelectItem value="daging">Daging</SelectItem>
								<SelectItem value="telur">Telur</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="mx-4 border-l border-black h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm ">Bulan</h1>
					<Select>
						<SelectTrigger className="border-none">
							<SelectValue placeholder="Bulan" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Bulan</SelectLabel>
								{months.map((month, index) => (
									<SelectItem value={month} key={index}>
										{month} 2024
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<Button className="bg-blue-300 rounded-full p-2">
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>

			{/* content */}
			<Tabs defaultValue="table">
				<section className="px-4 sm:px-8 md:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
					<div className="flex flex-col sm:flex-row justify-between pt-10">
						<div className="flex-col mb-3">
							<h1 className="text-2xl sm:text-3xl md:text-4xl mb-3 font-extrabold">
								NERACA PANGAN
							</h1>
							<Badge className="bg-green-400 text-xs sm:text-sm md:text-base rounded-full text-white gap-2">
								<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal 15
								April 2024
							</Badge>
						</div>
						<TabsList className="rounded-full w-max text-black">
							<TabsTrigger className="rounded-full" value="table">
								Map
							</TabsTrigger>
							<TabsTrigger className="rounded-full" value="grafik">
								Grafik
							</TabsTrigger>
						</TabsList>
					</div>
					<div className="mx-auto  self-center">
						<TabsContent value="table">
							<div className="h-full w-full ">
								<Map />
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

			<section className="px-4 sm:px-8 md:px-20 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<div className="flex flex-col items-center space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full ">
						{CardContents.map((content, index) => (
							<div
								key={index}
								className="border border-gray-200 p-4 rounded-lg shadow-md flex items-center">
								<div
									className={`h-full w-20 rounded-r-none rounded-md  text-white mr-4 flex-shrink-0 ${
										content.color === 'red'
											? 'bg-red-500'
											: content.color === 'yellow'
											? 'bg-yellow-500'
											: 'bg-green-500'
									}`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="size-20 mx-auto mt-5">
										<path
											fillRule="evenodd"
											d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="flex-1">
									<h1 className="text-md  font-bold">{content.city}</h1>
									<table className="w-full mt-2">
										<tbody className="text-sm">
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

			<Footer />
		</main>
	);
}
