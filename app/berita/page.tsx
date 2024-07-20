'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
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
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from '@/components/ui/button';
import bank from '@/public/bank.svg';
import sulaw from '@/public/sulaw.svg';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Link from "next/link";

import berita2 from '@/public/berita 2.png';
import berita3 from '@/public/berita 3.png';

interface News {
	id: number;
	title: string;
	content: string;
	author_id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	image: string | null;
}

interface PaginationInfo {
	current_page: number;
	from: number;
	last_page: number;
	first_page_url: string;
	next_page_url: string | null;
	prev_page_url: string | null;
	last_page_url: string;
	path: string;
	per_page: number;
	to: number;
	total: number;
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
}

const BeritaPage: React.FC = () => {
	const [berita, setBerita] = useState<News[]>([]);
	const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

	const getBerita = async (page: number = 1, limit: number = 2) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news?page=${page}&limit=${limit}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				setBerita(response.data.data);
				setPaginationInfo(response.data.paginationInfo);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: error.response.data.message,
					showConfirmButton: false,
					timer: 1500
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'error terjadi',
					text: 'mohon coba lagi nanti.',
					showConfirmButton: false,
					timer: 1500
				});
			}
		}
	};

	const searchBerita = async () => {
		const search = document.getElementById('search') as HTMLInputElement;
		if (search.value) {
			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news?search=${search.value}`, {
					headers: {
						'content-type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`,
					},
				});
				if (response.data.data) {
					setBerita(response.data.data);
					setPaginationInfo(response.data.paginationInfo);
				}
			} catch (error: any) {
				if (error.response && error.response.status === 401) {
					Swal.fire({
						icon: 'error',
						title: error.response.data.message,
						showConfirmButton: false,
						timer: 1500
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'error terjadi',
						text: 'mohon coba lagi nanti.',
						showConfirmButton: false,
						timer: 1500
					});
				}
			}
		} else {
			getBerita();
		}
	};

	useEffect(() => {
		getBerita();
	}, []);

	const handlePageChange = (url: string | null) => {
		if (url) {
			const urlParams = new URLSearchParams(url.split('?')[1]);
			const page = urlParams.get('page');
			if (page) {
				getBerita(Number(page));
			}
		}
	};

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
						id='search'
						className="w-full outline-none rounded-full"
					/>
					<Button onClick={searchBerita} className="ml-2 bg-blue-600">
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
						{berita.map((item) => (
							<Card
								key={item.id}
								className="w-full flex flex-col lg:flex-row items-center mb-4">
								<CardHeader className="w-full lg:w-1/3">
									<Image
										src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${item.image}`}
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
									<Link href={`/berita/${item.id}`}>
										<Button className="mt-4">Baca Selengkapnya</Button>
									</Link>

								</CardContent>
							</Card>
						))}

						<div className="flex justify-end">
							<Pagination>
								<PaginationContent>
									{paginationInfo?.links.map((link, index) => {
										if (link.label == 'Next &raquo;') {
											return (
												<PaginationItem key={index}>
													<PaginationNext
														href="#"
														onClick={() => handlePageChange(paginationInfo?.next_page_url as string)}
													/>
												</PaginationItem>
											);
										} else if (link.label == '&laquo; Previous') {
											return (
												<PaginationItem key={index}>
													<PaginationPrevious
														href="#"
														onClick={() => handlePageChange(paginationInfo?.prev_page_url as string)}
													/>
												</PaginationItem>
											);
										} else {
											return (
												<PaginationItem key={index}>
													<PaginationLink
														href="#"
														isActive={link.active}
														onClick={() => handlePageChange(link.url)}
													>
														{link.label}
													</PaginationLink>
												</PaginationItem>
											);
										}
									})}
								</PaginationContent>
							</Pagination>
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
