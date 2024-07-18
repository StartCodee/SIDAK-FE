import Navbar from "@/components/ui/navbar"
import Image from "next/image";
import vector1 from "@/public/vect1.svg";
import vector2 from "@/public/vect2.svg";
import cs from "@/public/cs 1.png";
import bank from '@/public/bank.svg';
import sulaw from '@/public/sulaw.svg';

export default function Kontak(){
    return (
			<>
				<Navbar />
				<div className="relative h-72 flex items-center justify-center bg-no-repeat bg-cover bg-[url('/bgg.png')]">
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

					<div className="flex-col mx-auto z-50 items-center ">
						<p className="text-lg text-center sm:text-2xl md:text-3xl lg:text-3xl  text-white font-semibold">
							Sistem Informasi Komoditas : Harga dan Pasokan
						</p>
					</div>
				</div>
				<div className="relative bg-white">
					<div className="lg:absolute lg:inset-0 lg:left-1/2 left-0 p-10">
						<Image
							src={cs}
							alt="cs"
							width={500}
							height={500}
							objectFit="cover"
							className="mt-40 ml-20"
						/>
					</div>
					<div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
						<div className="px-6 lg:px-8">
							<div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
								<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold border-b border-orange-400">
									Kontak Kami
								</h1>
								<p className="mt-2 text-lg leading-8 text-gray-600">
									Tanyakan hal yang ingin Anda ketahui tentang kami pada kolom
									di bawah ini!
								</p>
								<form action="#" method="POST" className="mt-16">
									<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
										<div className="sm:col-span-2">
											<label
												htmlFor="nama"
												className="block text-sm font-semibold leading-6 text-gray-900">
												Nama
											</label>
											<div className="mt-2.5">
												<input
													id="nama"
													name="nama"
													type="text"
													autoComplete="given-name"
													className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="sm:col-span-2">
											<label
												htmlFor="email"
												className="block text-sm font-semibold leading-6 text-gray-900">
												Email
											</label>
											<div className="mt-2.5">
												<input
													id="email"
													name="email"
													type="email"
													autoComplete="email"
													className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="sm:col-span-2">
											<div className="flex justify-between text-sm leading-6">
												<label
													htmlFor="message"
													className="block text-sm font-semibold leading-6 text-gray-900">
													Apa yang bisa kami bantu?
												</label>
											</div>
											<div className="mt-2.5">
												<textarea
													id="message"
													name="message"
													rows={4}
													aria-describedby="message-description"
													className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													defaultValue={''}
												/>
											</div>
										</div>
									</div>
									<div className="mt-10 flex justify-end border-t border-gray-900/10 pt-8">
										<button
											type="submit"
											className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
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