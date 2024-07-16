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

	return (
		<main className="">
			<Navbar />

			{/* image header */}

			<div className="relative h-64 flex items-center justify-center">
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
						width={390}
						height={390}
						objectFit="cover"
						className="absolute opacity-60 right-0 top-0"
					/>
					<Image
						src={vector2}
						alt="vector2"
						width={390}
						height={390}
						objectFit="cover"
						className="absolute drop-shadow-md opacity-25 right-0 top-0"
					/>
				</div>

				<div className="flex-col absolute  items-center ">
					<p className="text-white text-4xl font-semibold">
						Sistem Informasi Komoditas : Harga dan Pasokan
					</p>
				</div>
				<div className="absolute bottom-0 mt-8 left-1/2 transform -translate-x-1/2 shadow-xl rounded-full p-4 flex bg-white z-30">
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
					<Separator orientation="vertical" className="mx-4 bg-black" />
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
			</div>

			{/* content */}
			<section className="px-20 pt-4 space-y-4">
				<div className=" flex justify-between">
					<h1>Dashboard</h1>
					<Card className="flex gap-4 px-10 text-base rounded-full bg-slate-200 items-center ">
						<p className="">Harga Pangan</p>
						<Button className="bg-blue-400 rounded-full text-white">
							Neraca Pangan
						</Button>
						<p className="">Data Flow</p>
					</Card>
				</div>
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
					{/* card with data information */}
					<div className="flex-col space-y-4">
						<Card className="flex rounded-2xl">
							<div>
								<CardHeader>
									<CardTitle>Kota Palu</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex justify-between">
										15.000/kg
										<div className="p-4 rounded-md bg-green-500">
											<ArrowUpIcon className="text-white" />
											RP.298
										</div>
									</div>
								</CardContent>
							</div>
						</Card>
						<Card className="flex rounded-2xl">
							<div>
								<CardHeader>
									<CardTitle>Kabupaten Buol</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex justify-between">
										14.100/kg
										<div className="p-4 rounded-md bg-green-500">
											<ArrowUpIcon className="text-white" />
											RP.298
										</div>
									</div>
								</CardContent>
							</div>
						</Card>
						<Card className="flex rounded-2xl">
							<div>
								<CardHeader>
									<CardTitle>Kabupaten Sigi</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex justify-between">
										15.000/kg
										<div className="p-4 rounded-md bg-green-500">
											<ArrowUpIcon className="text-white" />
											RP.298
										</div>
									</div>
								</CardContent>
							</div>
						</Card>
						<Card className="flex rounded-2xl">
							<div>
								<CardHeader>
									<CardTitle>Kabupaten Tolitoli</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex justify-between">
										15.000/kg
										<div className="p-4 rounded-md bg-green-500">
											<ArrowUpIcon className="text-white" />
											RP.298
										</div>
									</div>
								</CardContent>
							</div>
						</Card>
						<Card className="flex rounded-2xl">
							<div>
								<CardHeader>
									<CardTitle>Kabupaten Banggai</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex justify-between">
										15.000/kg
										<div className="p-4 rounded-md bg-green-500">
											<ArrowUpIcon className="text-white" />
											RP.298
										</div>
									</div>
								</CardContent>
							</div>
						</Card>
						<div className="flex justify-between ">
							<h1 className="text-2xl text-blue-600 font-bold flex items-center">
								Data Selengkapnya <ChevronRightIcon width={30} height={30} />
							</h1>
						</div>
					</div>
				</div>
			</section>

			<section className="px-20 pt-4 space-y-4">
				<h1>*Statistik Kunjungan, Jumlah Komoditas dan Jumlah Pasar</h1>
				<div className="flex justify-between">
					<Card className="flex items-center p-4 rounded-xl gap-4 content-center justify-items-center">
						<div className="bg-blue-400 p-2 rounded-md">
							<PersonIcon width={50} height={50} className="  text-white" />
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
							<PersonIcon width={50} height={50} className="  text-white" />
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
							<PersonIcon width={50} height={50} className="  text-white" />
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

			<footer className="bg-gradient-to-r mt-10 p-2 from-cyan-500 to-blue-500 flex justify-between">
				<div className="flex-col">
					<Image src={sidakhitam} alt="sidakhitam" width={520} height={97} />
					<div className="flex gap-4">
						<Image src={bank} alt="bank" width={45} height={45} />
						<Image src={sulaw} alt="sulaw" width={30} height={30} />
					</div>
				</div>
				<div className="w-[644px] text-right">
					<p className="font-bold text-lg pt-8">
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
