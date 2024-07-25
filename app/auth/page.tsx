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
import { LoginForm } from './login-form';

import background from '@/public/bgg.png';

export default function Page() {
	return (
		<>
			<div className="lg:hidden">
				<Image
					src={background}
					width={1280}
					height={843}
					alt="Authentication"
					className="object-cover w-full h-screen"
				/>
				<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-full max-w-sm px-4">
						<Card>
							<CardHeader>
								<CardTitle>SIDAK</CardTitle>
								<CardDescription>LOGIN</CardDescription>
							</CardHeader>
							<CardContent>
								<LoginForm />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<div className="container relative hidden h-screen flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-slate-50">
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
								<LoginForm />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
