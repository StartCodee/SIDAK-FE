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
	BuildingLibraryIcon
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
		
	]

	return (
		<main>
			<Navbar />

			<div className="relative h-72 flex items-center justify-center">
				<Image
					src={Background}
					alt="background"
					layout="fill"
					objectFit="cover"
					className="z-0"
				/>
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

				<div className="flex-col mx-auto z-50  items-center ">
					<p className="text-white text-4xl font-semibold">
						Sistem Informasi Komoditas : Harga dan Pasokan
					</p>
				</div>
			</div>
			<div className="relative mx-auto -mt-24 lg:-mt-12 z-20 shadow-xl w-full lg:w-[380px] rounded-full p-4 flex bg-white">
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
				<Separator orientation="vertical" className="mx-4 border-black" />
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
				<Separator orientation="vertical" className="mx-4" />
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
			</div>

			{/* content */}
			<section className="px-20 pt-4 space-y-20">
				<div className="flex justify-between pt-10">
					<div className="flex-col">
						<h1 className="text-4xl font-extrabold">PETA PERUBAHAN HARGA</h1>
						<Badge className="bg-green-400 text-sm rounded-full text-white gap-2">
							<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal 15
							April 2024
						</Badge>
					</div>
					<div></div>
				</div>
				<div className="flex justify-between items-center">
					<Map />

					<div className="flex-col space-y-4 self-start">
						{CardContents.map((content, index) => (
							<Card
								key={index}
								className="flex rounded-2xl space-x-8 justify-between placeholder-sky-400 py-4 px-8">
								<div>
									<h1>{content.city}</h1>
									<p>{content.price}</p>
								</div>

								<div className="flex justify-between">
									<div
										className={cn(
											`p-4 rounded-md items-center flex text-white`,
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

						<div className="flex justify-between pt-10 ">
							<h1 className="text-2xl text-blue-500 font-bold flex items-center">
								Data Selengkapnya <ChevronRightIcon width={30} height={30} />
							</h1>
						</div>
					</div>
				</div>
			</section>

			<section className="px-20 pt-4">
				<Separator className="shadow-lg" />
				<h1>*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar</h1>
				<div className=" mt-8 w-[700px] mx-auto shadow-xl space-x-4 rounded-full p-4 flex bg-white z-30">
					<div className="flex-col">
						<h1 className="font-bold text-sm">Jenis Pasar</h1>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-6">
								Pasar Tradisional <ChevronDownIcon />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Pilih Jenis Pasar</DropdownMenuLabel>
								<DropdownMenuItem>Pasar Tradisional</DropdownMenuItem>
								<DropdownMenuItem>Pasar Tradisional</DropdownMenuItem>
								<DropdownMenuItem>Pasar Tradisional</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Pasar Tradisional</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<Separator orientation="vertical" />
					<div className="flex-col">
						<h1 className="font-bold text-sm">Kategori Komoditas</h1>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-6">
								Beras <ChevronDownIcon />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Pilih Kategori Komoditas</DropdownMenuLabel>
								<DropdownMenuItem>Beras</DropdownMenuItem>
								<DropdownMenuItem>Beras</DropdownMenuItem>
								<DropdownMenuItem>Beras</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Beras</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<Separator orientation="vertical" className="mx-4" />
					<div className="flex-col">
						<h1 className="font-bold text-sm">Kabupaten/Kota</h1>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-6">
								Palu <ChevronDownIcon />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Pilih Kabupaten/Kota</DropdownMenuLabel>
								<DropdownMenuItem>Palu</DropdownMenuItem>
								<DropdownMenuItem>Palu</DropdownMenuItem>
								<DropdownMenuItem>Palu</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Palu</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<Separator orientation="vertical" className="mx-4 shadow-xl" />
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
				</div>
				<div>
					<h1 className="text-center p-8 text-blue-800 text-2xl items-center">
						Harga Konsumen Pangan Strategis Sulawesi Tengah
					</h1>
					<div className="flex justify-between flex-wrap gap-4 ">
						{konsumenPangan.map((content, index) => (
							<Card key={index} className="flex-col  w-[18rem] p-4">
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
					<p className="text-center w-11/12 mx-auto m-8">
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

			<section className="px-20 pt-4 space-y-4">
				<h1 className="text-4xl font-bold">Berita Hari Ini</h1>
				<div className="flex justify-around">
					<Card className="w-[350px]">
						<CardHeader>
							<Image src={berita} alt="berita" width={350} height={200} />
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
					<Card className="w-[350px]">
						<CardHeader>
							<Image src={berita} alt="berita" width={350} height={200} />
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
					<Card className="w-[350px]">
						<CardHeader>
							<Image src={berita} alt="berita" width={350} height={200} />
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
			</section>

			<section className="px-20 pt-4 space-y-4 gap-4">
				<div className="flex justify-between gap-4">
					<Card className="flex items-center p-4 rounded-xl gap-4 content-center justify-items-center">
						<div className="bg-blue-400 p-2 rounded-md">
							<UserIcon width={30} height={30} className="  text-white" />
						</div>
						<div>
							<div className="flex items-center">
								<div>
									<h1 className="text-md font-bold">Kunjungan User</h1>
									Jumlah Kunjungan User di Sulawesi Tengah
								</div>
							</div>
						</div>
						<h1 className="text-4xl font-bold">3928</h1>
					</Card>
					<Card className="flex items-center p-4 rounded-xl gap-4">
						<div className="bg-blue-400 p-2 rounded-md">
							<ScaleIcon width={30} height={30} className="  text-white" />
						</div>
						<div>
							<div className="flex items-center">
								<div>
									<h1 className="text-md font-bold">Jumlah Komoditas</h1>
									Jumlah Komoditas di Sulawesi Tengah
								</div>
							</div>
						</div>
						<h1 className="text-4xl font-bold">30</h1>
					</Card>
					<Card className="flex items-center p-4 rounded-xl gap-4">
						<div className="bg-blue-400 p-2 rounded-md">
							<BuildingLibraryIcon width={30} height={30} className="  text-white" />
						</div>
						<div>
							<div className="flex items-center">
								<div>
									<h1 className="text-md font-bold">Jumlah Pasar</h1>
									Jumlah Pasar di Sulawesi Tengah
								</div>
							</div>
						</div>
						<h1 className="text-4xl font-bold">60</h1>
					</Card>
				</div>
				<Separator className="shadow-lg" />
			</section>

			<footer className=" mt-10 px-10 bg-no-repeat bg-cover bg-[url('/footer.png')] flex justify-between items-center text-white">
				<div className="flex-col">
					<div className="flex gap-4 ">
						<div className="flex items-center">
							<Image src={bank} alt="bank" width={45} height={45} />
							<div className="flex-col ">
								<p className='text-sm'>Kantor Perwakilan</p>
								<h1 className='text-lg p-0'>Bank Indonesia</h1>
								<p className='text-sm'>Provinsi Sulawesi Tengah</p>
							</div>
						</div>
						<div className="flex items-center">
							<Image src={sulaw} alt="sulaw" width={30} height={30} />
							<div>
								<h1 className='text-lg'>Pemerintahan</h1>
								<p className='text-sm'>Provinsi Sulawesi Tengah</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[644px] text-right">
					<p className="font-bold text-lg">
						SEKRETARIAT TPID SULAWESI TENGAH KANTOR PERWAKILAN BANK INDONESIA
						PROVINSI SULAWESI TENGAH
					</p>
					<p>
						Jl. Sam Ratulangi No.23 Besusu Barat, Kec. Palu Timur, Kota Palu,
						Sulawesi Tengah 94118
					</p>
				</div>
			</footer>
		</main>
	);
}
