import Image from 'next/image';
import bank from '@/public/bank.svg';
import sulaw from '@/public/sulaw.svg';


export default function Footer() {
    return (
			<>
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
								SEKRETARIAT TPID SULAWESI TENGAH KANTOR PERWAKILAN BANK
								INDONESIA PROVINSI SULAWESI TENGAH
							</p>
							<p>
								Jl. Sam Ratulangi No.23 Besusu Barat, Kec. Palu Timur, Kota
								Palu, Sulawesi Tengah 94118
							</p>
						</div>
					</div>
				</footer>
			</>
		);
}