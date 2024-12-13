"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import TableOne from "../Tables/TableOne";
import TableThree from "../Tables/TableThree";
import CardDataStats from "../CardDataStats";
import newsImg from "@/public/admin/images/cards/news.png";
import Image from 'next/image'
import Cookies from 'js-cookie';
import getDashboard from "@/lib/getDashboard";
import getBerita from "@/lib/getBerita";
import {
	UserIcon,
	ScaleIcon,
	BuildingLibraryIcon,

} from '@heroicons/react/24/outline';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TableTwo from "../Tables/TableTwo";
import Link from "next/link";
import heroAdmin from '@/public/admin/images/brand/hero.png';
import { SkeletonCard } from "@/components/SkeletonCard";

interface Dashboard {
	totalCommodities: number;
	totalPasar: number;
	totalUser: number;
}

const ECommerce: React.FC = () => {
	const username = Cookies.get('userName');
	const [dashboard, setDashboard] = useState<Dashboard>();
	const [berita, setBerita] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getDashboard().then((data) => {
			setDashboard(data);
		})
		getBerita(1, 2).then((data) => {
			setBerita(data.data);
			setLoading(false);
		}
		)
	}, []);


	return (
		<>
			<div className="flex gap-10 w-full">
				<div className=" h-full justify-center" style={{ flex: '5' }}>
					<div className="flex justify-between w-full  rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
						<div>
							<h1 className="text-2xl font-bold">Hello {username} !</h1>
							<p className="mt-4">
								Selamat Datang di Tampilan Dashboard Admin SIDAK
							</p>
						</div>
						<div style={{ position: 'relative' }}>
							<Image src={heroAdmin} width={150} height={200} alt="hero" />
						</div>
					</div>
					<div className="flex gap-3 my-5">
						<CardDataStats
							bg="#6FCEB9"
							title="Total Komoditas"
							total={dashboard?.totalCommodities}
							rate="0.43%"
							levelUp>
							<BuildingLibraryIcon
								width={45}
								height={45}
								className="text-white"
							/>
						</CardDataStats>
						<CardDataStats
							bg="#F5A851"
							title="Total Pasar"
							total={dashboard?.totalPasar}
							rate="4.35%"
							levelUp>
							<ScaleIcon width={45} height={45} className="text-white" />
						</CardDataStats>
						<CardDataStats
							bg="#DD5C5C"
							title="Total User"
							total={dashboard?.totalUser}
							rate="2.59%"
							levelUp>
							<UserIcon width={45} height={45} className="text-white" />
						</CardDataStats>
					</div>
					<Tabs defaultValue="harga-pangan">
						<TabsList className="rounded-full text-black">
							<TabsTrigger className="rounded-full" value="harga-pangan">
								Harga Pangan
							</TabsTrigger>
							<TabsTrigger className="rounded-full" value="neraca-pangan">
								Neraca Pangan
							</TabsTrigger>
							<TabsTrigger className="rounded-full" value="flow">
								Flow
							</TabsTrigger>
						</TabsList>
						<TabsContent value="harga-pangan">
							<TableOne />
						</TabsContent>
						<TabsContent value="neraca-pangan">
							<TableThree />
						</TabsContent>
						<TabsContent value="flow">
							<TableTwo />
						</TabsContent>
					</Tabs>
				</div>
				<div
					className="w-full rounded-lg border border-stroke bg-white px-5  py-6 shadow-default"
					style={{ flex: '2' }}>
					{/* {berita.map((item) => (
						<div
							key={item.id}
							className="w-full mb-7 rounded-xl border border-stroke bg-white shadow-default">
							<div className="aspect-video relative bg-white/50  backdrop-blur-md rounded-lg ">
								<Image
									src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${item.image}`}
									className="rounded-t-xl object-contain"
									alt="news"
									fill
								/>
							</div>
							<div className="p-4">
								<h1 className="text-2xl text-black font-bold line-clamp-2">
									{item.title}
								</h1>
								<p className="text-[10px]">{item.date}</p>
								<p className="mt-2 line-clamp-3">{item.content}</p>
							</div>
						</div>
					))} */}
					{loading ? (
						<SkeletonCard />)
						: (
							berita.map((item) => (
								<div
									key={item.id}
									className="w-full mb-7 rounded-xl border border-stroke bg-white shadow-default">
									<div className="aspect-video relative bg-white/50  backdrop-blur-md rounded-lg ">
										<Image
											src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/image/${item.image}`}
											className="rounded-t-xl object-contain"
											alt="news"
											fill
										/>
									</div>
									<div className="p-4">
										<h1 className="text-2xl text-black font-bold line-clamp-2">
											{item.title}
										</h1>
										<p className="text-[10px]">{item.date}</p>
										<p className="mt-2 line-clamp-3">{item.content}</p>
									</div>
								</div>
							))
						)
					}
					<div className="mt-4  flex justify-end">
						<Link href="/admin/berita">
							<span className="text-primary">Lihat Semua</span>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ECommerce;
