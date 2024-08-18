import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
function HargaSkeleton() {
    const arr = Array.from({ length: 5 }, (_, i) => i);
  return (
		<>
			{arr.map((_, index) => (
				<Card key={index} className="flex rounded-2xl px-6 py-4 space-x-4 w-[350px]  justify-between placeholder-sky-400 ">
					<div style={{ flex: 2 }}>
						<Skeleton className="h-8 w-8 rounded-full" />
					</div>
					<div style={{ flex: 1 }} className="flex justify-end">
						<div
							className={`rounded-md p-0 px-2 m-0 font-bold text-[12px] items-center flex text-white`}>
							<Skeleton className="h-8 w-[50px]" />
						</div>
					</div>
				</Card>
			))}
		</>
	);
}

export default HargaSkeleton