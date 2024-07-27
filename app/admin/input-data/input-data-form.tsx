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
	kabupaten: z.number().min(2, {
		message: 'Kabupaten Masuk harus diisi',
	}),
	kecamatan: z.number().min(2, {
		message: 'Kabupaten Keluar harus diisi',
	}),
	komoditas: z.number().min(2, {
		message: 'Komoditas harus diisi',
	}),
    harga: z.string().min(2, {
        message: 'Harga harus diisi',
    }),
    jumlah_kebutuhan: z.string().min(2, {
        message: 'Jumlah Kebutuhan harus diisi',
    }),
    jumlah_ketersediaan: z.string().min(2, {
        message: 'Jumlah Ketersediaan harus diisi',
    }),
	tanggal: z.string().min(2, {
		message: 'Tanggal harus diisi',
	}),
});

interface Kabupaten {
    id: number;
    name: string;
}


interface Kecamatan {
    id: number;
    name: string;
}

interface Komoditas {
    id: number;
    name: string;
}


export default function InputDataForm() {

        const { toast } = useToast();
        const router = useRouter();
        const [kabupatenData, setKabupatenData] = useState<Kabupaten[]>([]);
    	const [komoditasData, setKomoditasData] = useState<Komoditas[]>([]);
        const [kecamatanData, setKecamatanData] = useState<Kecamatan[]>([]);
        const [open, setOpen] = useState(false);
        const [openKecamatan, setOpenKecamatan] = useState(false);
        const [openKomoditas, setOpenKomoditas] = useState(false);

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

     const getKecamatan = async () => {
				try {
					const response = await axios.get(
						`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kecamatan`,
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
                getKecamatan();
				getKomoditas();
			}, []);

        const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                    kabupaten: 0,
                    kecamatan: 0,
                    komoditas: 0,
                    harga: '',
                    jumlah_kebutuhan: '',
                    jumlah_ketersediaan: '',
                    tanggal: '',
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
            axios
							.post(
								`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/supply`,
								{
									kabupaten_kota_id: values.kabupaten,
                                    kecamatan_id: values.kecamatan,
                                    komoditas_id: values.komoditas,
                                    harga: parseInt(values.harga),
                                    jumlah_kebutuhan: parseInt(values.jumlah_kebutuhan),
                                    jumlah_ketersediaan: parseInt(values.jumlah_ketersediaan),
                                    tanggal: values.tanggal,
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
									// setTimeout(() => {
									// 	router.push('/admin/tabel-data');
									// }, 2000);
								}
							})
							.catch((err) => {
                                if (err.response.status === 401) {
									toast({
											variant: 'destructive',
											title: 'Unauthorized',
											description:
											'You are not authorized to perform this action',
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
														className={cn(
															'w-[22rem] justify-between',
															!field.value && 'text-muted-foreground',
														)}>
														{field.value
															? kabupatenData.find((x:Kabupaten) => x.id === field.value) ?.name
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
                                                                        setOpen(false)
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
										<Popover open={openKecamatan} onOpenChange={setOpenKecamatan}>
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
															? kecamatanData.find((x: Kecamatan) => x.id === field.value)
																	?.name
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
																	value={kec.id.toString()}
																	key={kec.id}
																	onSelect={() => {
																		form.setValue('kecamatan', kec.id);
                                                                        setOpenKecamatan(false)
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
										<Popover open={openKomoditas} onOpenChange={setOpenKomoditas}>
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
															? komoditasData.find((x: Komoditas) => x.id === field.value)
																	?.name
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
                                                                        setOpenKomoditas(false)
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
							<FormField
								control={form.control}
								name="tanggal"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tanggal</FormLabel>
										<Input
											{...field}
											type="date"
											className="w-[22rem]"
											placeholder="Tanggal"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
						<FormControl>
							<FormField
								control={form.control}
								name="harga"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Harga</FormLabel>
										<Input
											{...field}
											type="number"
											className="w-[22rem]"
											placeholder="Harga"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
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
			{/* <form action="">
				<div className="mt-10 flex flex-wrap justify-start gap-15">
					<div className="w-[22rem]">
						<label
							htmlFor="location"
							className="block text-sm font-medium leading-6 text-gray-900">
							Kabupaten/Kota
						</label>
						<select
							id="location"
							name="location"
							className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
							<option selected>Kabupaten/Kota</option>
						</select>
					</div>
					<div className="w-[22rem]">
						<label
							htmlFor="location"
							className="block text-sm font-medium leading-6 text-gray-900">
							Kecamatan
						</label>
						<select
							id="location"
							name="location"
							className="mt-2 block w-full  h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
							<option selected>Kecamatan</option>
						</select>
					</div>
					<div className="w-[22rem]">
						<label
							htmlFor="location"
							className="block text-sm font-medium leading-6 text-gray-900">
							Komoditas
						</label>
						<select
							id="location"
							name="location"
							className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
							<option selected>Komoditas</option>
						</select>
					</div>
				</div>
				<br />
				<br />
				<h1 className="text-2xl font-bold">Detail Transaksi </h1>

				<br />
				<div className="flex flex-wrap justify-start gap-15">
					<div className="w-[22rem]">
						<label
							htmlFor="location"
							className="block text-sm font-medium leading-6 text-gray-900">
							Tanggal
						</label>
						<input
							id="location"
							name="location"
							type="date"
							className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					<div className="w-[22rem]">
						<label
							htmlFor="location"
							className="block text-sm font-medium leading-6 text-gray-900">
							Harga
						</label>
						<input
							id="location"
							name="location"
							type="text"
							className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					<div className="w-[22rem]">
						<label
							htmlFor="location"
							className="block text-sm font-medium leading-6 text-gray-900">
							Jumlah Kebutuhan
						</label>
						<input
							id="location"
							name="location"
							type="text"
							className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					<div className="w-[22rem]">
						<label
							htmlFor="location"
							className="block text-sm font-medium leading-6 text-gray-900">
							Jumlah Ketersediaan
						</label>
						<input
							id="location"
							name="location"
							type="text"
							className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<br />
				<div className="flex justify-start">
					<button
						type="submit"
						className="inline-flex justify-center py-4 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#37B5FE] text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Submit
					</button>
				</div>
			</form> */}
		</>
	);
}
