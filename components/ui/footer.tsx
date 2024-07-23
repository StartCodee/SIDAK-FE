import Image from 'next/image';
import bank from '@/public/bank.svg';
import sulaw from '@/public/sulaw.svg';


export default function Footer() {
    return (
			<>
				<footer className="mt-10 px-4 sm:px-10 py-6 bg-no-repeat bg-cover bg-[url('/footer.png')] text-white">
					<div className="flex flex-col md:flex-row justify-between items-center gap-6">
						<div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full lg:w-8/12">
							<div className="flex items-center gap-4 ">
								<Image src={bank} alt="bank" width={45} height={45} />
								<div className="flex flex-col ">
									<p className="sm:text-xs text-[10px]">Kantor Perwakilan</p>
									<h1 className="text-xs sm:text-lg">Bank Indonesia</h1>
									<p className="sm:text-xs text-[10px]">
										Provinsi Sulawesi Tengah
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4 ">
								<Image src={sulaw} alt="sulaw" width={30} height={30} />
								<div>
									<h1 className="text-md sm:text-lg">Pemerintahan</h1>
									<p className="sm:text-xs text-[10px]">
										Provinsi Sulawesi Tengah
									</p>
								</div>
							</div>
						</div>
						<div className="text-center md:text-right w-full md:w-1000">
							<span className="font-bold text-[10px]">
								<p className="mb-1">SEKRETARIAT TPID SULAWESI TENGAH</p>
								<p className="mb-1">
									KANTOR PERWAKILAN BANK INDONESIA PROVINSI SULAWESI TENGAH
								</p>
							</span>
							<p className="text-[10px]">
								Jl. Sam Ratulangi <br /> No.23 <br /> Besusu Barat, Kec. Palu
								Timur, <br /> Kota Palu, Sulawesi Tengah <br /> 94118
							</p>
						</div>
					</div>
				</footer>
			</>
		);
}