'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	FormDescription,
} from '@/components/ui/form';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthHeader } from '@/lib/authHeader';
import Cookies from 'js-cookie';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parse } from 'path';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
	kabupaten: z.string().nonempty({
		message: 'Kabupaten Masuk harus diisi',
	}),
	kecamatan: z.string().nonempty({
		message: 'Kabupaten Keluar harus diisi',
	}),
	komoditas: z.number().min(1, {
		message: 'Komoditas harus diisi',
	}),

	pasar: z.number().min(1, {
		message: 'Pasar harus diisi',
	}),
	jumlah_kebutuhan: z.string().nonempty({
		message: 'Jumlah Kebutuhan harus diisi',
	}),
	jumlah_ketersediaan: z.string().nonempty({
		message: 'Jumlah Ketersediaan harus diisi',
	}),
});

interface Kabupaten {
	id: string;
	name: string;
}


interface Kecamatan {
	id: string;
	code: string;
	name: string;
}

interface Komoditas {
	id: number;
	name: string;
}

interface Pasar {
	id: number;
	name: string;
}


export default function InputDataForm() {
	const { toast } = useToast();
	const router = useRouter();
	const [kabupatenData, setKabupatenData] = useState<Kabupaten[]>([]);
	const [komoditasData, setKomoditasData] = useState<Komoditas[]>([]);
	const [kecamatanData, setKecamatanData] = useState<Kecamatan[]>([]);
	const [pasarData, setPasarData] = useState<Pasar[]>([]);
	const [open, setOpen] = useState(false);
	const [openKecamatan, setOpenKecamatan] = useState(false);
	const [openKomoditas, setOpenKomoditas] = useState(false);
	const [openPasar, setOpenPasar] = useState(false);
	const [role, setRole] = useState('');
	const [userKabupaten, setUserKabupaten] = useState<number>();

	const [selectedDate, setSelectedDate] = useState<any>();


	const getRole = () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/me`, {
				headers: { Authorization: `Bearer ${Cookies.get('token')}` },
			})
			.then((res) => {
				setRole(res.data.role);
				setUserKabupaten(res.data.kabupaten_id);
			})
			.catch((err) => {
				if (err.response && err.response.status === 401) {
					toast({
						variant: 'destructive',
						title: 'Unauthorized',
						description: 'You are not authorized to perform this action',
					});
					logout();
				} else {
					toast({
						title: 'Gagal input data',
						description: 'Data gagal diinput ke dalam database',
						variant: 'destructive',
					});
				}
			});
	};

	const getKabupaten = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kabupaten`,
				{
					headers: AuthHeader(),
				},
			);
			if (response.data.data) {
				setKabupatenData(response.data.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: 'Unauthorized',
					text: 'Please login first',
				});
			}
		}
	};

	const getKecamatan = async (kabupaten_id: any) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kecamatan?kabupaten_id=${kabupaten_id}`,
				{
					headers: AuthHeader(),
				},
			);
			if (response.data.data) {
				setKecamatanData(response.data.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: 'Unauthorized',
					text: 'Please login first',
				});
			}
		}
	};

	const getPasar = async (kecamatan_id: any) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/pasar?kecamatan_id=${kecamatan_id}`,
				{
					headers: AuthHeader(),
				},
			);
			if (response.data.data) {
				setPasarData(response.data.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: 'Unauthorized',
					text: 'Please login first',
				});
			}
		}
	}

	const getKomoditas = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/commodities`,
				{
					headers: AuthHeader(),
				},
			);
			if (response.data.data) {
				setKomoditasData(response.data.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: 'Unauthorized',
					text: 'Please login first',
				});
			}
		}
	};

	useEffect(() => {
		getKabupaten();
		getKomoditas();
		getRole();
	}, []);

	useEffect(() => {
		if (userKabupaten) {
			form.setValue('kabupaten', userKabupaten as unknown as string);
			getKecamatan(userKabupaten as unknown as string);
		}
	}, [userKabupaten]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			kabupaten: '',
			kecamatan: '',
			komoditas: 0,
			jumlah_kebutuhan: '',
			jumlah_ketersediaan: '',
		},
	});

	const logout = () => {
		Cookies.remove('token');
		Cookies.remove('userEmail');
		Cookies.remove('userName');
		Cookies.remove('userId');
		window.location.href = '/auth';
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		let val = selectedDate.format('YYYY-MM');

		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/supply-neraca`,
				{
					kabupaten_kota_id: values.kabupaten,
					kecamatan_id: values.kecamatan,
					komoditas_id: values.komoditas,
					pasar_id: values.pasar,
					jumlah_kebutuhan: parseInt(values.jumlah_kebutuhan),
					jumlah_ketersediaan: parseInt(values.jumlah_ketersediaan),
					tanggal: val,
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					toast({
						title: 'Berhasil input data',
						description: 'Data berhasil diinput ke dalam database',
						variant: 'success',
					});
					form.reset();
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
					toast({
						variant: 'destructive',
						title: 'Unauthorized',
						description: 'You are not authorized to perform this action',
					});
					logout();
				}
				toast({
					title: 'Gagal input data',
					description: 'Data gagal diinput ke dalam database',
					variant: 'destructive',
				});
			});
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4">
					<div className="mt-10 flex flex-wrap justify-between gap-4 px-8">
						<FormControl>
							<FormField
								control={form.control}
								name="kabupaten"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Kabupaten </FormLabel>
										<Popover open={open} onOpenChange={setOpen}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														disabled={role == 'KABUPATEN' ? true : false}
														className={cn(
															'w-[22rem] justify-between',
															!field.value && 'text-muted-foreground',
														)}>
														{field.value
															? kabupatenData.find(
																(x: Kabupaten) => x.id === field.value,
															)?.name
															: 'Pilih Kabupaten Masuk'}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[15rem] p-0">
												<Command>
													<CommandInput placeholder="Pilih Kabupaten Masuk" />
													<CommandList>
														<CommandEmpty>Kabupaten Tidak ada</CommandEmpty>
														<CommandGroup>
															{kabupatenData.map((kab) => (
																<CommandItem
																	value={kab.id.toString()}
																	key={kab.id}
																	onSelect={() => {
																		form.setValue('kabupaten', kab.id);
																		getKecamatan(kab.id);
																		setOpen(false);
																	}}>
																	<Check
																		className={cn(
																			'mr-2 h-4 w-4',
																			kab.id === field.value
																				? 'opacity-100'
																				: 'opacity-0',
																		)}
																	/>
																	{kab.name}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
						<FormControl>
							<FormField
								control={form.control}
								name="kecamatan"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Kecamatan </FormLabel>
										<Popover
											open={openKecamatan}
											onOpenChange={setOpenKecamatan}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															'w-[22rem] justify-between',
															!field.value && 'text-muted-foreground',
														)}>
														{field.value
															? kecamatanData.find(
																(x: Kecamatan) => x.code === field.value,
															)?.name
															: 'Pilih Kecamatan'}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[15rem] p-0">
												<Command>
													<CommandInput placeholder="Pilih Kecamatan" />
													<CommandList>
														<CommandEmpty>Kecamatan Tidak ada</CommandEmpty>
														<CommandGroup>
															{kecamatanData.map((kec) => (
																<CommandItem
																	value={kec.code.toString()}
																	key={kec.code}
																	onSelect={() => {
																		form.setValue('kecamatan', kec.code);
																		getPasar(kec.code);
																		setOpenKecamatan(false);
																	}}>
																	<Check
																		className={cn(
																			'mr-2 h-4 w-4',
																			kec.code === field.value
																				? 'opacity-100'
																				: 'opacity-0',
																		)}
																	/>
																	{kec.name}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
						<FormControl>
							<FormField
								control={form.control}
								name="pasar"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Pasar </FormLabel>
										<Popover
											open={openPasar}
											onOpenChange={setOpenPasar}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															'w-[22rem] justify-between',
															!field.value && 'text-muted-foreground',
														)}>
														{field.value
															? pasarData.find(
																(x: Pasar) => x.id === field.value,
															)?.name
															: 'Pilih Pasar'}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[15rem] p-0">
												<Command>
													<CommandInput placeholder="Pilih Pasar" />
													<CommandList>
														<CommandEmpty>Pasar Tidak ada</CommandEmpty>
														<CommandGroup>
															{pasarData.map((kec) => (
																<CommandItem
																	value={kec.id.toString()}
																	key={kec.id}
																	onSelect={() => {
																		form.setValue('pasar', kec.id);
																		setOpenPasar(false);
																	}}>
																	<Check
																		className={cn(
																			'mr-2 h-4 w-4',
																			kec.id === field.value
																				? 'opacity-100'
																				: 'opacity-0',
																		)}
																	/>
																	{kec.name}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
						<FormControl>
							<FormField
								control={form.control}
								name="komoditas"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Komoditas </FormLabel>
										<Popover
											open={openKomoditas}
											onOpenChange={setOpenKomoditas}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															'w-[22rem] justify-between',
															!field.value && 'text-muted-foreground',
														)}>
														{field.value
															? komoditasData.find(
																(x: Komoditas) => x.id === field.value,
															)?.name
															: 'Pilih Komoditas'}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[15rem] p-0">
												<Command>
													<CommandInput placeholder="Pilih Komoditas" />
													<CommandList>
														<CommandEmpty>Komoditas Tidak ada</CommandEmpty>
														<CommandGroup>
															{komoditasData.map((komod) => (
																<CommandItem
																	value={komod.id.toString()}
																	key={komod.id}
																	onSelect={() => {
																		form.setValue('komoditas', komod.id);
																		setOpenKomoditas(false);
																	}}>
																	<Check
																		className={cn(
																			'mr-2 h-4 w-4',
																			komod.id === field.value
																				? 'opacity-100'
																				: 'opacity-0',
																		)}
																	/>
																	{komod.name}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
					</div>
					<div className="flex flex-wrap justify-between gap-4 px-8">
						<FormControl>
							<FormItem>
								<h1 className="font-bold text-sm ">Bulan</h1>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker value={selectedDate} onChange={(newValue) => setSelectedDate(newValue as any)} views={['month', 'year']} />
								</LocalizationProvider>
							</FormItem>
						</FormControl>
						<FormControl>
							<FormField
								control={form.control}
								name="jumlah_kebutuhan"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Jumlah Kebutuhan</FormLabel>
										<Input
											{...field}
											type="number"
											className="w-[22rem]"
											placeholder="Jumlah Kebutuhan"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
						<FormControl>
							<FormField
								control={form.control}
								name="jumlah_ketersediaan"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Jumlah Ketersediaan</FormLabel>
										<Input
											{...field}
											type="number"
											className="w-[22rem]"
											placeholder="Jumlah Ketersediaan"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
					</div>
					<FormControl>
						<FormItem>
							<Button className="ml-8" type="submit">
								Submit
							</Button>
						</FormItem>
					</FormControl>
				</form>
			</Form>
		</>
	);
}
