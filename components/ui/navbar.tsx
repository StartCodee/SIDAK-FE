'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import user from '@/public/user.svg';
import { Button } from '@/components/ui/button';
export default function Navbar() {
	const pathname = usePathname();
	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Data Produksi Komoditas', path: '/produksi' },
		{ name: 'Berita', path: '/berita' },
		{ name: 'Tentang Kami', path: '/tentang' },
	];
	return (
		<>
			<nav
				className="flex z-30 justify-between items-center h-16 p-8 font-bold text-white relative shadow-sm"
				role="navigation">
				<div className="flex gap-4 bg-white px-2 text-black rounded-full items-center">
					{navItems.map((item) => (
						<Link key={item.path} href={item.path}>
							<p
								className={`px-4 py-2 rounded-full ${
									pathname === item.path
										? 'bg-blue-400 text-white'
										: 'text-black'
								}`}>
								{item.name === 'Home' ? (
									<Button
										className={` p-0 m-0 rounded-full ${
											pathname === item.path
												? 'bg-blue-400 text-white'
												: 'text-black'
										}`}>
										{item.name}
									</Button>
								) : (
									item.name
								)}
							</p>
						</Link>
					))}
				</div>

				<div className="flex text-2xl gap-4">
					<Link
						className={`link ${pathname === '/' ? 'active' : ''}`}
						href="/auth">
						Masuk
					</Link>
					<Image
						src={user}
						alt="user"
						className="shadow-md"
						width={30}
						height={30}
					/>
				</div>
			</nav>
		</>
	);
}
