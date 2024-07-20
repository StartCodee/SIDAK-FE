
export default function ModalHarga(){
    return (
			<>
				<div className="shadow-lg px-10 rounded-lg p-4">
					<div className="flex flex-col space-y-4">
						<h1 className="text-2xl font-bold">Kabupaten Tojo Una-una</h1>
						<div className="flex justify-around">
							<div className="shadow-lg w-[20rem] p-4 text-lg flex flex-col rounded-lg">
								<p>Harga rata - rata kab touna: </p>
								<h1 className="font-bold">12.572/kg</h1>
							</div>
							<div className="shadow-lg w-[20rem] p-4 text-lg flex flex-col rounded-lg">
								<p>Harga Pada kab touna: </p>
								<h1 className="font-bold">12.572/kg</h1>
							</div>
							<div className="shadow-lg w-[20rem] p-4 text-lg flex flex-col rounded-lg">
								<p>Tanggal </p>
								<h1 className="font-bold">20 Juni 2024</h1>
							</div>
							<div className="shadow-lg w-[20rem] p-4 text-lg flex flex-col rounded-lg">
								<p>Komoditas </p>
								<h1 className="font-bold">Beras</h1>
							</div>
						</div>
						<span className="self-end inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
							Export
						</span>
					</div>
					<div className="h-1 rounded-lg my-10 bg-black/10 z-0"></div>
					<div className="flex flex-col ">
						<h1 className="text-2xl font-bold mb-3">Tabel Harga Harian</h1>
						<table className="rounded-lg overflow-hidden border border-gray-300">
							<thead>
								<tr className="bg-blue-200">
									<th className="px-4 py-2">Subjek</th>
									<th className="px-4 py-2">02 April 2024</th>
									<th className="px-4 py-2">03 April 2024</th>
									<th className="px-4 py-2">04 April 2024</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="px-4 py-2">Kab Touna</td>
									<td className="px-4 py-2">Rp. 12.572</td>
									<td className="px-4 py-2">Rp. 12.572</td>
									<td className="px-4 py-2">Rp. 12.572</td>
								</tr>
								<tr className="bg-blue-200">
									<td
										className="border-b-2 border-black px-4 py-2"
										colSpan={4}></td>
								</tr>
								<tr>
									<td className="px-4 py-2">Pasar Wajo</td>
									<td className="px-4 py-2">Rp. 12.572</td>
									<td className="px-4 py-2">Rp. 12.572</td>
									<td className="px-4 py-2">Rp. 12.572</td>
								</tr>
								<tr className="bg-blue-200">
									<td className="px-4 py-2">Pasar Sentral</td>
									<td className="px-4 py-2">Rp. 12.572</td>
									<td className="px-4 py-2">Rp. 12.572</td>
									<td className="px-4 py-2">Rp. 12.572</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</>
		);
}