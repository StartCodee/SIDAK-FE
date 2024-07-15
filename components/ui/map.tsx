import Tolitoli from '@/public/map/Tolitoli.svg';
import Donggala from '@/public/map/Donggala.svg';
import Parigi from '@/public/map/Parigi.svg';
import Poso from '@/public/map/Poso.svg';
import Sigi from '@/public/map/Sigi.svg';
import Banggai from '@/public/map/Banggai.svg';
import Morowali from '@/public/map/Morowali.svg';
import MorowaliUtara from '@/public/map/Morowali Utara.svg';
import Palu from '@/public/map/Palu.svg';
import BanggaiKepulauan from '@/public/map/Banggai Kepulauan.svg';
import BanggaiLaut from '@/public/map/Banggai Laut.svg';
import Buol from '@/public/map/Buol.svg';
import Touna from '@/public/map/Touna.svg';

import Image from 'next/image';

export default function Map() {
	return (
		<div className="relative h-[800px] w-[800px]">
			<div className="absolute top-[5.79px] left-[191.49px] w-[186.12px] h-[85.8px] ">
				<Image src={Buol} alt="Buol" layout="fill" />
			</div>
			<div className="absolute  left-[89.82px] w-[145.46px] h-[102.29px]">
				<Image src={Tolitoli} alt="Tolitoli" layout="fill" />
			</div>
			<div className="absolute top-[87.81px] left-[49.16px] w-[219.86px] h-[272.11px]">
				<Image src={Parigi} alt="Parigi" layout="fill" />
			</div>
			<div className="absolute top-[499.87px] left-[255.84px] w-[175.84px] h-[167.37px]">
				<Image src={Morowali} alt="Morowali" layout="fill" />
			</div>
			<div className="absolute top-[285.48px] left-[332.47px] w-[222.1px] h-[141.07px]">
				<Image src={Banggai} alt="Banggai" layout="fill" />
			</div>
			<div className="absolute top-[377.97px] left-[183.22px] w-[178.08px] h-[158.01px]">
				<Image src={MorowaliUtara} alt="Morowali Utara" layout="fill" />
			</div>

			<div className="absolute top-[319.36px] left-[192.6px] w-[173.39px] h-[104.08px]">
				<Image src={Touna} alt="Touna" layout="fill" />
			</div>

			<div className="absolute top-[352.56px] left-[76.42px] w-[123.71px] h-[162.66px]">
				<Image src={Poso} alt="Poso" layout="fill" />
			</div>

			<div className="absolute top-[315.35px] left-[8.71px] w-[104.12px] h-[173.83px]">
				<Image src={Sigi} alt="Sigi" layout="fill" />
			</div>

			<div className="absolute top-[84.91px] w-[94.74px] h-[224.2px]">
				<Image src={Donggala} alt="Donggala" layout="fill" />
			</div>

			<div className="absolute top-[274.96px] left-[23.19px] w-[51.48px] h-[55.34px] rotate-[-2deg]">
				<Image src={Palu} alt="Palu" layout="fill" />
			</div>

			<div className="absolute top-[367.27px] left-[475.7px] w-[202.38px] h-[116.33px]">
				<Image src={BanggaiKepulauan} alt="Banggai Kepulauan" layout="fill" />
			</div>
			<div className="absolute top-[486.55px] left-[559.06px] w-[202.56px] h-[164.63px]">
				<Image src={BanggaiLaut} alt="Banggai Laut" layout="fill" />
			</div>
		</div>
	);
}
