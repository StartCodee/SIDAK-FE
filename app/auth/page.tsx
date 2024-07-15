import Image from 'next/image';
import Logo from '@/public/logo sidak.svg';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function Page() {
	return (
		<>
			<div className="md:hidden">
				<Image
					src="/examples/authentication-light.png"
					width={1280}
					height={843}
					alt="Authentication"
					className="block dark:hidden"
				/>
				<Image
					src="/examples/authentication-dark.png"
					width={1280}
					height={843}
					alt="Authentication"
					className="hidden dark:block"
				/>
			</div>
			<div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-gradient-to-bl from-slate-600 via-teal-600 to-blue-700" />
					<div className="relative z-20 flex items-center text-lg font-medium">
						<Image src={Logo} alt="SIDAK" width={200} height={200} />
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								&ldquo;
								<span className="font-bold">SIDAK</span> adalah sistem yang
								sangat keren untuk memudahkan anda.&rdquo;
							</p>
							<footer className="text-sm">Admin</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<Card className="w-[350px]">
							<CardHeader>
								<CardTitle>SIDAK</CardTitle>
								<CardDescription>LOGIN</CardDescription>
							</CardHeader>
							<CardContent>
								<form>
									<Label htmlFor="name">Name</Label>
									<Input id="name" type="text" placeholder="John Doe" />
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder=" [email protected]"
									/>
									<Label htmlFor="password">Password</Label>
									<Input id="password" type="password" placeholder="********" />
								</form>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button variant="outline">Cancel</Button>
								<Button>Deploy</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
