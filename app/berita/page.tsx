import React from 'react';
import Navbar from '@/components/ui/navbar';
import Image from 'next/image';
import Background from '@/public/bgg.png';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
	CardFooter,

} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import bank from '@/public/bank.svg';
import sulaw from '@/public/sulaw.svg';
import {
	MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import berita from '@/public/berita.png';
import berita2 from '@/public/berita 2.png';
import berita3 from '@/public/berita 3.png';

const BeritaPage: React.FC = () => {
	const data = [
		{
			Image: berita,
			id: 1,
			title: 'Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga Pangan 1',
			content: 'Pada Kamis, 2 februari 2024 kantor perwakilan bank indonesia provinsi sulawesi tengah, melakukan pengecekan stok beras di gudang BULOG. Tujuan kegiatan ini adalah. ',
		},
		{
			image : berita2,
			id: 2,
			title: 'Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga Pangan 2',
			content: 'Pada Kamis, 2 februari 2024 kantor perwakilan bank indonesia provinsi sulawesi tengah, melakukan pengecekan stok beras di gudang BULOG. Tujuan kegiatan ini adalah. ',
		},
		{
			image : berita3,
			id: 3,
			title: 'Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga Pangan 3',
			content: 'Pada Kamis, 2 februari 2024 kantor perwakilan bank indonesia provinsi sulawesi tengah, melakukan pengecekan stok beras di gudang BULOG. Tujuan kegiatan ini adalah. ',
		},
		{
			image : berita,
			id: 4,
			title: 'Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga Pangan 4',
			content: 'Pada Kamis, 2 februari 2024 kantor perwakilan bank indonesia provinsi sulawesi tengah, melakukan pengecekan stok beras di gudang BULOG. Tujuan kegiatan ini adalah. ',
		},
	]
	return (
		<>
			<Navbar />

			<section className="relative h-72 bg-[url('/bgg.png')] bg-no-repeat bg-cover flex items-center justify-center">
				<h1 className="z-10 text-white text-2xl font-semibold">
					Halaman Berita
				</h1>
				<div className="absolute -bottom-8 lg:-bottom-6 z-20 shadow-xl w-[16rem] lg:w-[24rem] rounded-full p-4 flex bg-white">
					<input
						type="text"
						placeholder="Cari Berita"
						className="w-full outline-none rounded-full"
					/>
					<Button className="ml-2 bg-blue-600">
						<MagnifyingGlassIcon className="h-6 w-6" />
					</Button>
				</div>
			</section>

			<section>
				<Card className="m-4 sm:m-6 lg:m-10 border-none">
					<CardHeader>
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
							Berita Terbaru
						</h1>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						{data.map((item) => (
							<Card
								key={item.id}
								className="w-full flex flex-col lg:flex-row items-center mb-4">
								<CardHeader className="w-full lg:w-1/3">
									<Image
										src={item.image || berita}
										className="rounded-2xl w-full"
										alt="berita"
										width={350}
										height={200}
										layout="responsive"
									/>
								</CardHeader>
								<CardContent className="w-full lg:w-2/3 p-4 lg:p-6 ">
									<div>
										<h1 className="text-xl lg:text-2xl font-semibold text-black">
											{item.title}
										</h1>
										<div className="my-4 border-b border-black w-full" />
										<p className="text-lg lg:text-base ">{item.content}</p>
									</div>
									<Button className="mt-4">Baca Selengkapnya</Button>
								</CardContent>
							</Card>
						))}
					</CardContent>
				</Card>
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
		</>
	);
};

export default BeritaPage;
