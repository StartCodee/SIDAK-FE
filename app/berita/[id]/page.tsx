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



export default function Page({ params }: { params: { id: string } }) {
	const router = useRouter();

	const [berita, setBerita] = useState<any>({});


	const getBerita = async () => {
		try {
		  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news/${params.id}`, {
			headers: {
			  'content-type': 'application/json',
			  'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		  });
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
                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${berita.image}`}
                alt={berita.title}
                width={1000}
                height={300}
                className="rounded-2xl mr-15"
            />
            <div>
                <h1 className="text-lg sm:text-xl md:text-2xl mb-10 text-left font-bold">
                    {berita.title}
                </h1>
                <div className="h-1 rounded-lg mt-10 bg-black z-0"></div>
            </div>
        </div>
        <div>
            <p className="text-justify text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
                {berita.content}
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

