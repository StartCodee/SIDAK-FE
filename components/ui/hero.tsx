

export default function Hero () {
    return (
			<>
				<div className="relative h-[23rem] flex items-center bg-blend-multiply bg-[#1B8BB673] justify-center bg-no-repeat bg-cover bg-[url('/bgg.png')]">
					<div className="flex-col mx-auto z-1 items-center ">
						<h1 className="text-lg text-center sm:text-2xl md:text-3xl lg:text-6xl mb-10  text-white font-semibold">
							Selamat Datang di SIDAK
						</h1>
						<p className="text-md text-center sm:text-lg md:text-xl lg:text-xl  text-white font-semibold">
							Sistem Informasi Pengendalian Harga dan Pasokan
						</p>
					</div>
				</div>
			</>
		);
}