'use client'

import {useState} from 'react';
import Navbar from '@/components/ui/navbar';
import Image from 'next/image';
import Background from '@/public/bgg.png';
import vector1 from '@/public/vect1.svg';
import vector2 from '@/public/vect2.svg';
import Link from 'next/link';
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
import Footer from '@/components/ui/footer';

import berita from '@/public/berita.png';
import berita2 from '@/public/berita 2.png';
import berita3 from '@/public/berita 3.png';
import Hero from '@/components/ui/hero';

const BeritaPage: React.FC = () => {
	const data = [
		{
			Image: berita,
			id: 1,
			title: 'Kantor test',
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

	 const [query, setQuery] = useState('');
		const [filteredData, setFilteredData] = useState(data);

		const searchBerita = () => {
			// Filter the data based on the search query
			const filtered = data.filter((item) =>
				item.title.toLowerCase().includes(query.toLowerCase()) || item.content.toLowerCase().includes(query.toLowerCase()),
			);
			setFilteredData(filtered);
		};

	return (
		<>
			<Navbar />

			<Hero />

			<div
				style={{ marginTop: '-30px' }}
				className="mx-auto z-1 relative  py-[0.4rem] sm:py-2 px-2 shadow-xl w-[20rem] space-x-2 lg:w-[24rem] rounded-full flex items-center  bg-white ">
				<input
					type="text"
					placeholder="Cari Berita"
					id="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="w-min sm:w-full outline-none rounded-full active:ring-2 active:ring-blue-300 p-2"
				/>
				<Button onClick={searchBerita} className="bg-blue-300 rounded-full p-2">
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>

			<section className="min-h-screen">
				<Card className="m-4 sm:m-6 lg:m-10 border-none">
					<CardHeader>
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
							Berita Terbaru
						</h1>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						{filteredData.length > 0 ? (
							filteredData.map((item) => (
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
										<Button asChild className="mt-4">
											<Link href={`/berita/${item.id}`}>Baca Selengkapnya</Link>
										</Button>
									</CardContent>
								</Card>
							))
						) : (
							<Card className="w-full p-6 flex flex-col items-center justify-center bg-gray-100">
								<p className="text-lg text-gray-600">
									Tidak bisa menemukan berita yang anda cari
								</p>
							</Card>
						)}
					</CardContent>
				</Card>
			</section>

			<Footer />
		</>
	);
};

export default BeritaPage;
