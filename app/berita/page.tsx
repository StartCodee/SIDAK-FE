import React from 'react';
import Navbar from '@/components/ui/navbar';
import Image from 'next/image';
import Background from '@/public/bgg.png';

const BeritaPage: React.FC = () => {
	return (
		<>
			<Navbar />

			<section className="relative h-72 flex items-center justify-center">
				<h1 className='z-50 text-white text-2xl font-semibold'>Halaman Berita</h1>
				<Image
					src={Background}
					alt="background"
					layout="fill"
					objectFit="cover"
					className="z-0"
				/>
			</section>
			{/* Add your Berita page content here */}
		</>
	);
};

export default BeritaPage;
