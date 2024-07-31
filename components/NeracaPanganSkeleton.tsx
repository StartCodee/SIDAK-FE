import { Skeleton } from "./ui/skeleton";
function NeracaPanganSkeleton() {
    const arr = Array.from({ length: 13 }, (_, i) => i);
  return (
		<>
			{arr.map((_, index) => (
				<div
					key={index}
					className="border border-gray-200  rounded-lg p-2 shadow-md flex items-center">
					<div
						className={` w-10 rounded-r-none rounded-md  text-white mr-4 flex-shrink-0 bg-muted`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="size-10 mx-auto my-5">
							<path
								fillRule="evenodd"
								d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="flex-1">
						<Skeleton className="h-4 w-24 " />
						<table className="w-full mt-2">
							<tbody className="text-xs">
								<tr>
									<td className="pr-2">Ketersediaan:</td>
									<td className="text-right">
										<Skeleton className="h-2 w-24 " />
									</td>
								</tr>
								<tr>
									<td className="pr-2">Kebutuhan:</td>
									<td className="text-right">
										<Skeleton className="h-2 w-24 " />
									</td>
								</tr>
								<tr>
									<td colSpan={2}>
										<hr className="my-1" />
									</td>
								</tr>
								<tr className="font-bold">
									<td className="pr-2">Neraca Pangan:</td>
									<td className="text-right">
										<Skeleton className="h-2 w-24 " />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			))}
		</>
	);
}

export default NeracaPanganSkeleton