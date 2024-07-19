import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import Footer from '@/public/footer.png';

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
		{ city: 'Kota Palu', price: '15.000/kg', color: 'red', change: 'RP.298' },
		{
			city: 'Kabupaten Boul',
			price: '14.100/kg',
			color: 'yellow',
			change: 'RP.298',
		},
		{ city: 'Kabupaten Sigi', price: '13.370/kg', color: 'green', change: 'RP.298' },
		{ city: 'Kabupaten Donggala', price: '12.000/kg', color: 'red', change: 'RP.298' },
		{ city: 'Kabupaten Morowali', price: '11.000/kg', color: 'yellow', change: 'RP.298' },
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
	]

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
			<div className="relative mx-auto  -mt-24 px-8 lg:-mt-12 z-1 shadow-xl w-[20rem] sm:w-[28rem] gap-2 rounded-full py-4 flex flex-col items-center sm:flex-row flex-wrap overflow-hidden bg-white">
				<div className="flex-col">
					<h1 className="font-bold text-sm">Jenis Informasi</h1>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-6">
							BERAS <ChevronDownIcon />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Pilih Kategori</DropdownMenuLabel>
							<DropdownMenuItem>BERAS</DropdownMenuItem>
							<DropdownMenuItem>BERAS</DropdownMenuItem>
							<DropdownMenuItem>BERAS</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>BERAS</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="mx-4 border-l border-black h-auto self-stretch  sm:block" />
				<div className="flex-col">
					<h1 className="font-bold text-sm">Komoditas</h1>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-6">
							Beras <ChevronDownIcon />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Pilih Komoditas</DropdownMenuLabel>
							<DropdownMenuItem>Beras</DropdownMenuItem>
							<DropdownMenuItem>Beras</DropdownMenuItem>
							<DropdownMenuItem>Beras</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Beras</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="mx-4 border-l border-black h-auto self-stretch  sm:block" />
				<div className="flex-col ">
					<h1 className="font-bold text-sm ">Bulan</h1>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex p-0 items-center gap-6">
							APRIL <ChevronDownIcon />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Pilih Bulan</DropdownMenuLabel>
							{months.map((month, index) => (
								<DropdownMenuItem key={index}>{month}</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
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
				<div className="flex flex-col lg:flex-row justify-around items-center">
					<div className="h-full w-full ">
						<Map />
					</div>
					<div className="lg:flex-col flex-col self-center flex flex-wrap gap-4 lg:self-start">
						{CardContents.map((content, index) => (
							<Card
								key={index}
								className="flex rounded-2xl px-4 py-2 space-x-4 w-[290px]  justify-between placeholder-sky-400 ">
								<div>
									<h1 className="text-md">{content.city}</h1>
									<p className="text-2xl font-bold">{content.price}</p>
								</div>

								<div className="flex justify-between">
									<div
										className={cn(
											`rounded-md p-0 px-1 m-0 items-center flex text-white`,
											content.color === 'red' && 'bg-red-500',
											content.color === 'yellow' && 'bg-yellow-500',
											content.color === 'green' && 'bg-green-500',
										)}>
										<ArrowUpIcon className="text-white" />
										{content.change}
									</div>
								</div>
							</Card>
						))}

						<Link href="/pola-perdagangan" className="self-start sm:self-end">
							<p className="text-xs sm:text-sm self-end md:text-md text-blue-900 font-bold flex items-center">
								Data Selengkapnya
								<ChevronRightIcon width={20} height={20} />
							</p>
						</Link>
					</div>
				</div>
			</section>

			<section className=" px-4 sm:px-8 md:px-50 pt-4 space-y-4 sm:space-y-8 md:space-y-20">
				<h1 className="text-sm sm:text-xl md:text-2xl">
					*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar
				</h1>
				<div className="h-1 rounded-lg mt-10 bg-black/10 z-0"></div>

				<div className="  mx-auto -mt-10 pl-8 pr-0 -ml-40 sm:-ml-50 md:mx-auto  z-50 shadow-xl w-[42rem] scale-50 md:scale-100 rounded-full py-2 flex bg-white">
					<div className="flex-col ">
						<h1 className="font-bold text-sm">Jenis Informasi</h1>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-6">
								BERAS <ChevronDownIcon />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Pilih Kategori</DropdownMenuLabel>
								<DropdownMenuItem>BERAS</DropdownMenuItem>
								<DropdownMenuItem>BERAS</DropdownMenuItem>
								<DropdownMenuItem>BERAS</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>BERAS</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="mx-4 border-l border-black h-auto self-stretch  sm:block" />
					<div className="flex-col">
						<h1 className="font-bold text-sm">Komoditas</h1>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-6">
								Beras <ChevronDownIcon />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Pilih Komoditas</DropdownMenuLabel>
								<DropdownMenuItem>Beras</DropdownMenuItem>
								<DropdownMenuItem>Beras</DropdownMenuItem>
								<DropdownMenuItem>Beras</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Beras</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="mx-4 border-l border-black h-auto self-stretch  sm:block" />
					<div className="flex-col">
						<h1 className="font-bold text-sm">Pilih Kabupaten/Kota</h1>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-6">
								Beras <ChevronDownIcon />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Pilih Komoditas</DropdownMenuLabel>
								<DropdownMenuItem>Beras</DropdownMenuItem>
								<DropdownMenuItem>Beras</DropdownMenuItem>
								<DropdownMenuItem>Beras</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Beras</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="mx-4 border-l border-black h-auto self-stretch  sm:block" />
					<div className="flex-col">
						<h1 className="font-bold text-sm ">Bulan</h1>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-6">
								APRIL <ChevronDownIcon />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Pilih Bulan</DropdownMenuLabel>
								{months.map((month, index) => (
									<DropdownMenuItem key={index}>{month}</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<Button className=" m-0 bg-blue-300 rounded-full px-1 py-0 self-end ml-5">
						<MagnifyingGlassIcon
							className="text-white self-center p-0 m-0 "
							width={30}
							height={30}
						/>
					</Button>
				</div>

				<div>
					<h1 className="text-center p-8 mt-5 text-blue-800 text-lg sm:text-xl md:text-2xl items-center">
						Harga Konsumen Pangan Strategis Sulawesi Tengah
					</h1>
					<div className="flex justify-center items-start self-center  flex-wrap gap-4 ">
						{konsumenPangan.map((content, index) => (
							<Card key={index} className="flex-col  w-[18rem] p-4 shadow-xl">
								<div className="flex items-center justify-between">
									<div>
										<Image
											src={user}
											alt="user"
											width={50}
											height={50}
											className="rounded-full"
										/>
									</div>
									<div>
										<h1 className="font-bold text-lg">{content.komoditas}</h1>
										<p>{content.jenis}</p>
										<p className="font-bold">{content.harga}</p>
									</div>
									<div>{content.komoditas}</div>
								</div>
								<div className="h-1 rounded-lg bg-black/10"></div>
								<div className="flex justify-between">
									<p>{content.komoditas}</p>
									<p>DAY IN HIGH VOLATILITY</p>
								</div>
							</Card>
						))}
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
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<Card className="w-full">
						<CardHeader>
							<Image
								src={berita}
								className="rounded-2xl"
								alt="berita"
								width={900}
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
							<Button>Baca Selengkapnya</Button>
						</CardFooter>
					</Card>
					<Card className="w-full">
						<CardHeader>
							<Image
								src={berita2}
								className="rounded-2xl"
								alt="berita"
								width={900}
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
							<Button>Baca Selengkapnya</Button>
						</CardFooter>
					</Card>
					<Card className="w-full">
						<CardHeader>
							<Image
								src={berita3}
								className="rounded-2xl"
								alt="berita"
								width={900}
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
							<Button>Baca Selengkapnya</Button>
						</CardFooter>
					</Card>
				</div>
				<div className="h-1 rounded-lg mt-10 bg-black/10 z-0"></div>
			</section>
			<section className="px-4 sm:px-8 md:px-20 pt-4 space-y-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<Card className="flex items-center p-4 rounded-xl gap-4">
						<div className="bg-blue-400 p-2 rounded-md">
							<UserIcon width={30} height={30} className="text-white" />
						</div>
						<div>
							<h1 className="text-md font-bold">Kunjungan User</h1>
							<p>Jumlah Kunjungan User di Sulawesi Tengah</p>
						</div>
						<h1 className="text-4xl font-bold">3928</h1>
					</Card>
					<Card className="flex items-center p-4 rounded-xl gap-4">
						<div className="bg-blue-400 p-2 rounded-md">
							<ScaleIcon width={30} height={30} className="text-white" />
						</div>
						<div>
							<h1 className="text-md font-bold">Jumlah Komoditas</h1>
							<p>Jumlah Komoditas di Sulawesi Tengah</p>
						</div>
						<h1 className="text-4xl font-bold">30</h1>
					</Card>
					<Card className="flex items-center p-4 rounded-xl gap-4">
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
						<h1 className="text-4xl font-bold">60</h1>
					</Card>
				</div>
				<Separator className="shadow-lg" />
			</section>

			<footer className="mt-10 px-4 sm:px-10 py-6 bg-no-repeat bg-cover bg-[url('/footer.png')] text-white">
				<div className="flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
						<div className="flex items-center gap-4">
							<Image src={bank} alt="bank" width={45} height={45} />
							<div className="flex flex-col">
								<p className="text-sm">Kantor Perwakilan</p>
								<h1 className="text-lg">Bank Indonesia</h1>
								<p className="text-sm">Provinsi Sulawesi Tengah</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Image src={sulaw} alt="sulaw" width={30} height={30} />
							<div>
								<h1 className="text-lg">Pemerintahan</h1>
								<p className="text-sm">Provinsi Sulawesi Tengah</p>
							</div>
						</div>
					</div>
					<div className="text-center md:text-right w-full md:w-auto">
						<p className="font-bold text-lg">
							SEKRETARIAT TPID SULAWESI TENGAH KANTOR PERWAKILAN BANK INDONESIA
							PROVINSI SULAWESI TENGAH
						</p>
						<p>
							Jl. Sam Ratulangi No.23 Besusu Barat, Kec. Palu Timur, Kota Palu,
							Sulawesi Tengah 94118
						</p>
					</div>
				</div>
			</footer>
		</main>
	);
}
