import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';


function BeritaSkeleton() {
    const arr = Array.from({ length: 3 }, (_, i) => i);
  return (  
            <>
            {arr.map((_, index) => (
                <Card key={index} className="md:w-[13rem] lg:w-[23rem]">
                    <CardHeader>
                        <Skeleton className="h-[200px] w-[300px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-[250px]" />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[100px]" />
                    </CardFooter>
                </Card>
            ))}
            </>
	);
}

export default BeritaSkeleton