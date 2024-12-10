import { Skeleton } from "./ui/skeleton";

function HargaPanganSkeleton() {
    const arr = Array.from({ length: 13 }, (_, i) => i);
  return (
		<>
			{arr.map((_, index) => (
				<div
                key={index}
					style={{ alignContent: 'center' }}
					className="border border-gray-200 p-4 flex flex-col justify-between rounded-lg shadow-md">
					<div
						className="flex flex-col items-center justify-between space-y-2"
						style={{ flex: 1 }}>
						<div className="flex flex-col items-center space-y-2">
							<Skeleton className="h-4 w-24 " />
							<Skeleton className="h-4 w-12 " />
						</div>
						<div
							className={`rounded-md p-2 flex items-center justify-center text-white`}
							>
							<Skeleton className="h-8 w-24" />
						</div>
					</div>
					<div className="flex flex-col mt-6">
						<Skeleton className="h-4 w-[100px]" />
						<p className="text-xs font-thin">DAY IN HIGH VOLATILITY</p>
					</div>
				</div>
			))}
		</>
	);
}

export default HargaPanganSkeleton