'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
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

import Footer from '@/components/ui/footer';

import berita2 from '@/public/berita 2.png';
import berita3 from '@/public/berita 3.png';
import Hero from '@/components/ui/hero';
import UserBeritaSkeleton from '@/components/UserBeritaSkeleton';

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
	const [loading, setLoading] = useState(true);
	const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
	const getBerita = async (page: number = 1, limit: number = 2) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				setBerita(response.data.data);
				setLoading(false);
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

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		// Hapus timer sebelumnya
		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		// Set timer baru
		const newTimeout = setTimeout(() => {
			if (value) {
				searchBerita();
			} else {
				getBerita();
			}
		}, 500); // Delay 500ms

		setDebounceTimeout(newTimeout);
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

			<Hero />

			<section className="min-h-screen">
				
				<Card className="m-4 sm:m-6 lg:m-10 border-none">
					<CardHeader>
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
							Berita Terbaru
						</h1>
	
					</CardHeader>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Kolom Kiri: Berita Utama */}
					{berita.length > 0 && (
						<div className="w-full">
							<Card className="w-full flex flex-col">
								<CardHeader className="w-full">
									<Image
										src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${berita[0].image}`}
										className="rounded-2xl w-full"
										alt="berita utama"
										width={700}
										height={400}
										layout="responsive"
									/>
								</CardHeader>
								<CardContent className="w-full p-4 lg:p-6">
									<div>
										<h1 className="text-2xl lg:text-3xl font-semibold text-black">
											{berita[0].title}
										</h1>
										<div className="my-4 border-b border-black w-full" />
										<p className="text-lg lg:text-base line-clamp-3">
											{berita[0].content}
										</p>
									</div>
									<Button asChild className="mt-4">
										<Link href={`/berita/${berita[0].id}`}>Baca Selengkapnya</Link>
									</Button>
								</CardContent>
							</Card>
						</div>
					)}

					{/* Kolom Kanan: Berita Tambahan */}
					<div className="w-full flex flex-col gap-6">
						{berita.slice(1, 4).map((item) => (
							<Card
								key={item.id}
								className="w-full flex flex-col lg:flex-row items-center">
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
								<CardContent className="w-full lg:w-2/3 p-4 lg:p-6">
									<div>
										<h2 className="text-xl lg:text-2xl font-semibold text-black">
											{item.title}
										</h2>
										<div className="my-4 border-b border-black w-full" />
										<p className="text-lg lg:text-base line-clamp-3">
											{item.content}
										</p>
									</div>
									<Button asChild className="mt-4">
										<Link href={`/berita/${item.id}`}>Baca Selengkapnya</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
					<CardContent className="flex flex-col gap-4">
						{loading ? (
							<UserBeritaSkeleton />
						) : (
							berita.map((item) => (
								<Card
									key={item.id}
									className="w-full flex flex-col lg:flex-row items-center mb-4">
									<CardHeader className="w-full lg:w-1/3 ">
										<Image
											src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${item.image}`}
											className="rounded-2xl w-full "
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
											<p className="text-lg lg:text-base line-clamp-3">
												{item.content}
											</p>
										</div>
										<Button asChild className="mt-4">
											<Link href={`/berita/${item.id}`}>Baca Selengkapnya</Link>
										</Button>
									</CardContent>
								</Card>
							))
						)}

						<div className="flex justify-end">
							<Pagination>
								<PaginationContent>
									{paginationInfo?.links.map((link, index) => {
										if (link.label == 'Next &raquo;') {
											return (
												<PaginationItem key={index}>
													<PaginationNext
														href="#"
														onClick={() =>
															handlePageChange(
																paginationInfo?.next_page_url as string,
															)
														}
													/>
												</PaginationItem>
											);
										} else if (link.label == '&laquo; Previous') {
											return (
												<PaginationItem key={index}>
													<PaginationPrevious
														href="#"
														onClick={() =>
															handlePageChange(
																paginationInfo?.prev_page_url as string,
															)
														}
													/>
												</PaginationItem>
											);
										} else {
											return (
												<PaginationItem key={index}>
													<PaginationLink
														href="#"
														isActive={link.active}
														onClick={() => handlePageChange(link.url)}>
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

				<Card className="m-4 sm:m-6 lg:m-10 border-none">
					<CardHeader>
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
							Semua Berita
						</h1>
						<div className="flex ml-auto h-full lg:ml-0 flex-row w-max lg:w-96">
							<div className="w-full mx-auto mt-4">
								<label
									htmlFor="default-search"
									className="mb-2 text-sm font-medium text-gray-900 sr-only :text-white"
								>
									Search
								</label>
								<div className="relative h-full">
									<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
										<MagnifyingGlassIcon className="text-gray-300" width={24} height={24} />
									</div>
									<input
										type="search"
										id="search"
										onChange={handleSearchChange}
										className="block w-full h-full px-2 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-[#047D00]"
										placeholder="Search"
									/>
									{/* <button
									type="submit"
									className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
								>
									Search
								</button> */}
								</div>
							</div>
						</div>
					</CardHeader>

					{/* <div
						style={{ marginTop: '-30px' }}
						className="mx-auto z-1 relative  py-[0.4rem] sm:py-2 px-2 shadow-xl w-[20rem] space-x-2 lg:w-[24rem] rounded-full flex items-center  bg-white ">
						<input
							type="text"
							placeholder="Cari Berita"
							id="search"
							// value={query}
							// onChange={(e) => setQuery(e.target.value)}
							className="w-min sm:w-full outline-none rounded-full active:ring-2 active:ring-blue-300 p-2"
						/>
						<Button onClick={searchBerita} className="bg-blue-300 rounded-full p-2">
							<MagnifyingGlassIcon className="text-white" width={24} height={24} />
						</Button>
					</div> */}
					<CardContent className="flex flex-col gap-4">
						{loading ? (
							<UserBeritaSkeleton />
						) : (
							berita.map((item) => (
								<Card
									key={item.id}
									className="w-full flex flex-col lg:flex-row items-center mb-4">
									<CardHeader className="w-full lg:w-1/3 ">
										<Image
											src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${item.image}`}
											className="rounded-2xl w-full "
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
											<p className="text-lg lg:text-base line-clamp-3">
												{item.content}
											</p>
										</div>
										<Button asChild className="mt-4">
											<Link href={`/berita/${item.id}`}>Baca Selengkapnya</Link>
										</Button>
									</CardContent>
								</Card>
							))
						)}

						<div className="flex justify-end">
							<Pagination>
								<PaginationContent>
									{paginationInfo?.links.map((link, index) => {
										if (link.label == 'Next &raquo;') {
											return (
												<PaginationItem key={index}>
													<PaginationNext
														href="#"
														onClick={() =>
															handlePageChange(
																paginationInfo?.next_page_url as string,
															)
														}
													/>
												</PaginationItem>
											);
										} else if (link.label == '&laquo; Previous') {
											return (
												<PaginationItem key={index}>
													<PaginationPrevious
														href="#"
														onClick={() =>
															handlePageChange(
																paginationInfo?.prev_page_url as string,
															)
														}
													/>
												</PaginationItem>
											);
										} else {
											return (
												<PaginationItem key={index}>
													<PaginationLink
														href="#"
														isActive={link.active}
														onClick={() => handlePageChange(link.url)}>
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

			<Footer />
		</>
	);
};

export default BeritaPage;
