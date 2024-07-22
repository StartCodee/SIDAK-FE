import Image from 'next/image';
import vector1 from '@/public/vect1.svg';
import vector2 from '@/public/vect2.svg';

export default function Hero () {
    return (
			<>
				<div className="relative h-56 flex items-center bg-blend-multiply bg-slate-500 justify-center bg-no-repeat bg-cover bg-[url('/bgg.png')]">
					<div className="hidden lg:block">
						<Image
							src={vector1}
							alt="vector1"
							width={340}
							height={340}
							objectFit="cover"
							className="absolute opacity-60 right-0 top-0"
						/>
						<Image
							src={vector2}
							alt="vector2"
							width={340}
							height={340}
							objectFit="cover"
							className="absolute drop-shadow-md opacity-25 right-0 top-0"
						/>
					</div>

					<div className="flex-col mx-auto z-1 items-center ">
						<p className="text-lg text-center sm:text-2xl md:text-3xl lg:text-3xl  text-white font-semibold">
							Sistem Informasi Pengendalian Harga dan Pasokan
						</p>
					</div>
				</div>
			</>
		);
}