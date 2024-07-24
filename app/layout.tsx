import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Navbar from '@/components/ui/navbar';
import './globals.css';
import { cn } from '@/lib/utils';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SIDAK ',
	description: 'Sistem Informasi Data Kebutuhan Pangan',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					
					'min-h-screen bg-background font-sans antialiased overflow-x-hidden',
					montserrat.className,
				)}>
				{children}
			</body>
		</html>
	);
}
