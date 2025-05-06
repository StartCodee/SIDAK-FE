import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
	return (
		<div className="w-full mb-7 rounded-xl border border-stroke bg-white shadow-default">
			<Skeleton className="aspect-video   backdrop-blur-md rounded-lg" />
			<div className="p-4 space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	);
}
