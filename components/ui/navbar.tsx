'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import logo from '@/public/Group.png';
import Link from 'next/link';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

const navigation = [
	{ name: 'Home', path: '/' },
	{ name: 'Harga Pangan', path: '/harga-pangan' },
	{ name: 'Neraca Pangan', path: '/neraca-pangan' },
	{ name: 'Pola Perdagangan', path: '/pola-perdagangan' },
	{ name: 'Berita', path: '/berita' },
	{ name: 'Kontak Kami', path: '/kontak' },
];

export default function Navbar() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			<header className={openSans.className}>
				<nav
					aria-label="Global"
					className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
					<a href="#" className=" ">
						<span className="sr-only">SIDAK</span>
						<Image src={logo} alt="" width={160} height={36} />
					</a>
					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="h-6 w-6" />
						</button>
					</div>
					<div className="hidden lg:flex gap-4 justify-between lg:gap-7">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.path}
								className={`md:text-[16px] text-[10px] font-bold leading-6 ${
									pathname === item.path ? 'text-[#3AC1DF]' : 'text-gray-900'
								}`}>
								{item.name}
							</Link>
						))}
					</div>
						<Link
							href="/auth"
							className={`text-[16px] font-bold leading-6 px-4 py-1 hover:opacity-55 rounded-full bg-[#3AC1DF] text-white`}>
							Log in
						</Link>
				</nav>
				<Dialog
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
					className="lg:hidden">
					<div className="fixed inset-0 z-10" />
					<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<a href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">SIDAK</span>
								<Image src={logo} alt="" width={120} height={40} />
							</a>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-700">
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="h-6 w-6" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.path}
											className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 ${
												pathname === item.path
													? 'text-[#3AC1DF]'
													: 'text-gray-900'
											}`}>
											{item.name}
										</Link>
									))}
								</div>
								<div className="py-6">
									<Link
										href="/auth"
										className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50 ${
											pathname === '/auth' ? 'text-[#3AC1DF]' : 'text-gray-900'
										}`}>
										Log in
									</Link>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>
		</>
	);
}
