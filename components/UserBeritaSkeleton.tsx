import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function UserBeritaSkeleton() {
    const arr = Array.from({ length: 3 }, (_, i) => i);
  return (
		<>
			{arr.map((_, index) => (
				<Card
					key={index}
					className="w-full flex flex-col lg:flex-row items-center mb-4">
					<CardHeader className="w-full lg:w-1/3 ">
						<Skeleton className="h-[200px] w-[350px]" />
					</CardHeader>
					<CardContent className="w-full space-y-2 lg:w-2/3 p-4 lg:p-6 ">
						<div>
							<Skeleton className="h-4 w-10/12" />
							<div className="my-4 border-b border-black w-full" />
							<Skeleton className="h-4 w-9/12" />
						</div>
						<Skeleton className="h-8 w-[250px]" />
					</CardContent>
				</Card>
			))}
		</>
	);
}

export default UserBeritaSkeleton