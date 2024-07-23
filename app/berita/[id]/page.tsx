'use client'
import React, { useEffect, useState } from 'react';
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
import { useRouter } from "next/navigation";
import axios from 'axios';
import Swal from 'sweetalert2';
import Hero from '@/components/ui/hero';
import Footer from '@/components/ui/footer';



export default function Page({ params }: { params: { id: string } }) {
	const router = useRouter();

	const [berita, setBerita] = useState<any>({});


	const getBerita = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news/${params.id}`, {
				headers: {
					'content-type': 'application/json',
					// 'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			console.log(response);
			setBerita(response.data);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Error terjadi',
				text: 'Mohon coba lagi nanti.',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	useEffect(() => {
		getBerita();
	}, []);

	return (
		<>
			<Navbar />

			<Hero />

			<section>
				<Card className="m-4 sm:m-6 lg:m-10 shadow-xl border-t-0 pb-10">
					<br />
					<CardContent className="flex flex-col gap-4 px-4 sm:px-10 md:px-30 lg:px-50 pb-20">
						<div className="flex flex-col  mb-5 ">
							<div>
								<h1 className="text-lg sm:text-xl md:text-2xl mb-10 text-left font-bold">
									Kantor Perwakilan Bank Indonesia Sulawesi Tengah Bersama BULOG
									Lakukan Pengecekan Stok Beras untuk Cegah Kenaikan Harga
									Pangan
									<br />
									<span className='text-xs text-graydark opacity-50'>
										2024-02-02 | Oleh Admin
									</span>
								</h1>


								<div className="h-1 rounded-lg my-10 bg-black z-0"></div>
							</div>
							<Image
								src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${berita.image}`}
								alt={berita.title}
								width={550}
								height={300}
								className="rounded-2xl mr-15"
							/>
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
								harga tetap stabil dan terjangkau bagi konsumen.Jika stok beras
								cukup, kami sebagai pedagang juga tidak khawatir dengan
								fluktuasi harga yang bisa merugikan,katanya.
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

			<Footer />
		</>
	);
};

