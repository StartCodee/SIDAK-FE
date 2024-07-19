import React from 'react';
import Navbar from '@/components/ui/navbar';
import Image from 'next/image';
import Background from '@/public/bgg.png';
import vector1 from '@/public/vect1.svg';
import vector2 from '@/public/vect2.svg';
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
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import berita from '@/public/berita.png';
import berita2 from '@/public/berita 2.png';
import berita3 from '@/public/berita 3.png';

const BeritaPage: React.FC = () => {
	const data = [
		{
			Image: berita,
			id: 1,
			title:
				'Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga Pangan 1',
			content:
				'Pada Kamis, 2 februari 2024 kantor perwakilan bank indonesia provinsi sulawesi tengah, melakukan pengecekan stok beras di gudang BULOG. Tujuan kegiatan ini adalah. ',
		},
		{
			image: berita2,
			id: 2,
			title:
				'Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga Pangan 2',
			content:
				'Pada Kamis, 2 februari 2024 kantor perwakilan bank indonesia provinsi sulawesi tengah, melakukan pengecekan stok beras di gudang BULOG. Tujuan kegiatan ini adalah. ',
		},
		{
			image: berita3,
			id: 3,
			title:
				'Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga Pangan 3',
			content:
				'Pada Kamis, 2 februari 2024 kantor perwakilan bank indonesia provinsi sulawesi tengah, melakukan pengecekan stok beras di gudang BULOG. Tujuan kegiatan ini adalah. ',
		},
		{
			image: berita,
			id: 4,
			title:
				'Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga Pangan 4',
			content:
				'Pada Kamis, 2 februari 2024 kantor perwakilan bank indonesia provinsi sulawesi tengah, melakukan pengecekan stok beras di gudang BULOG. Tujuan kegiatan ini adalah. ',
		},
	];
	return (
		<>
			<Navbar />

			<section className="relative h-72 bg-[url('/bgg.png')] bg-no-repeat bg-cover flex items-center justify-center">
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
				<h1 className="z-10 text-white text-2xl font-semibold">
					Halaman Berita
				</h1>
				<div className="absolute -bottom-8 lg:-bottom-6 z-1 shadow-xl w-[16rem] lg:w-[24rem] rounded-full p-4 flex bg-white">
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
<Card className="m-4 sm:m-6 lg:m-10 shadow-xl border-t-0 pb-10">
    <CardHeader>
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-10 text-center font-extrabold">
            Berita Terbaru
        </h1>
    </CardHeader>
    <CardContent className="flex flex-col gap-4 px-4 sm:px-10 md:px-30 lg:px-50 pb-20">
        <div className="flex flex-col lg:flex-row mb-5 ">
            <Image
                src={data[0].Image}
                alt={data[0].title}
                width={1000}
                height={300}
                className="rounded-2xl mr-15"
            />
            <div>
                <h1 className="text-lg sm:text-xl md:text-2xl mb-10 text-left font-bold">
                    Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG
                    Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga
                    Pangan
                </h1>
                <div className="h-1 rounded-lg mt-10 bg-black z-0"></div>
            </div>
        </div>
        <div>
            <p className="text-justify text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
                Pada Kamis, 2 Februari 2024, Kantor Perwakilan Bank Indonesia
                Provinsi Sulawesi Tengah bersama BULOG Provinsi Sulawesi Tengah
                melakukan pengecekan stok beras di gudang BULOG. Tujuan kegiatan
                ini adalah untuk memastikan ketersediaan beras mencukupi dan
                mencegah kenaikan harga pangan, khususnya beras.
                <br /> <br />
                Tim dari Bank Indonesia dan BULOG memeriksa kondisi stok beras,
                mengevaluasi jumlah persediaan, dan memastikan kualitas beras
                yang disimpan sesuai standar. Kepala Kantor Perwakilan Bank
                Indonesia Sulawesi Tengah menekankan pentingnya sinergi antara
                berbagai pihak dalam menjaga stabilitas harga pangan. BULOG
                terus berupaya menjaga pasokan beras dengan langkah strategis,
                termasuk importasi beras jika diperlukan dan optimalisasi
                produksi dalam negeri.
                <br /> <br />
                Kegiatan pengecekan ini mendapat sambutan positif dari pedagang
                dan konsumen, yang merasa lebih tenang dengan jaminan
                ketersediaan beras. Seorang pedagang di Pasar Induk Palu
                menyatakan bahwa kepastian pasokan beras penting untuk menjaga
                harga tetap stabil dan terjangkau bagi konsumen. "Jika stok
                beras cukup, kami sebagai pedagang juga tidak khawatir dengan
                fluktuasi harga yang bisa merugikan," katanya.
                <br /> <br />
                Diharapkan, dengan langkah preventif ini, harga beras di
                Sulawesi Tengah tetap stabil, tidak membebani masyarakat, dan
                menjadi contoh bagi daerah lain dalam menjaga ketersediaan dan
                stabilitas harga pangan. Sinergi antara berbagai pihak
                diharapkan dapat terus berlanjut demi kesejahteraan masyarakat
                dan ketahanan pangan nasional.
            </p>
        </div>
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
