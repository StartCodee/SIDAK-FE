'use client';


import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';

import '../../globals.css';

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
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
    FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Check } from 'lucide-react';
import Cookies from 'js-cookie';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';
import { Textarea } from '@/components/ui/textarea';
import { AuthHeader } from '@/lib/authHeader';
import { useRouter } from 'next/navigation';
import { set } from 'date-fns';
import { Logout } from '@/lib/logout';

interface Kabupaten {
	id: number;
	name: string;
}

interface Komoditas {
	id: number;
	name: string;
}


const formSchema = z.object({
    kabupatenMasuk: z.number().min(2, {
        message: 'Kabupaten Masuk harus diisi',
    }),
    kabupatenKeluar: z.number().min(2, {
        message: 'Kabupaten Keluar harus diisi',
    }),
    komoditas: z.string().min(2, {
        message: 'Komoditas harus diisi',
    }),
    jumlahMasuk: z.string().min(2, {
        message: 'Jumlah Masuk harus diisi',
    }),
    jumlahKeluar: z.string().min(2, {
        message: 'Jumlah Keluar harus diisi',
    }),
    tanggal: z.string().min(2, {
        message: 'Tanggal harus diisi',
    }),
});

export default function FLowForm(){
	const router = useRouter();
    const [kabupatenData, setKabupatenData] = useState<Kabupaten []>([]);
    const [komoditasData, setKomoditasData] = useState<Komoditas []>([]);
	const [open, setOpen] = useState(false);
	const [openKeluar, setOpenKeluar] = useState(false);

    const getKabupaten = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kabupaten`,
                {
                    headers: AuthHeader(),
                    withCredentials: true,
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
    }

    const getKomoditas = async () => {
        try {
            const response = await axios.get(
							`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/commodities`,
							{
								headers: AuthHeader(),
								withCredentials: true,
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
    }

    useEffect(() => {
        getKabupaten();
        getKomoditas();
    }, []);


    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            kabupatenMasuk: 0,
            kabupatenKeluar: 0,
            komoditas: '',
            jumlahMasuk: '',
            jumlahKeluar: '',
            tanggal : '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        axios
					.post(
						`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/flow`,
						{
							kabupaten_kota_masuk_id: values.kabupatenMasuk,
							kabupaten_kota_keluar_id: values.kabupatenKeluar,
							komoditas_id: parseInt(values.komoditas),
							jumlah_masuk_ton: values.jumlahMasuk,
							jumlah_keluar_ton: values.jumlahKeluar,
                            tanggal : values.tanggal
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
								description: 'You are not authorized to perform this action',
							});
							Logout();
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
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="flex justify-between items-center">
							<FormControl>
								<FormField
									control={form.control}
									name="kabupatenMasuk"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Kabupaten Masuk</FormLabel>
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
																? kabupatenData.find(
																		(x) => x.id === field.value,
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
																{kabupatenData.map((language) => (
																	<CommandItem
																		value={language.id.toString()}
																		key={language.id}
																		onSelect={() => {
																			form.setValue(
																				'kabupatenMasuk',
																				language.id,
																			);
																			setOpen(false);
																		}}>
																		<Check
																			className={cn(
																				'mr-2 h-4 w-4',
																				language.id === field.value
																					? 'opacity-100'
																					: 'opacity-0',
																			)}
																		/>
																		{language.name}
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
							{/* line  */}
							<div className="bg-black h-2 w-[40%] rounded-full"></div>
							<FormControl>
								<FormField
									control={form.control}
									name="kabupatenKeluar"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Kabupaten Keluar</FormLabel>
											<Popover open={openKeluar} onOpenChange={setOpenKeluar}>
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
																? kabupatenData.find(
																		(x) => x.id === field.value,
																  )?.name
																: 'Pilih Kabupaten Keluar'}
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-[15rem] p-0">
													<Command>
														<CommandInput placeholder="Pilih Kabupaten Keluar" />
														<CommandList>
															<CommandEmpty>Kabupaten Tidak ada</CommandEmpty>
															<CommandGroup>
																{kabupatenData.map((language) => (
																	<CommandItem
																		value={language.id.toString()}
																		key={language.id}
																		onSelect={() => {
																			form.setValue(
																				'kabupatenKeluar',
																				language.id,
																			);
																			setOpenKeluar(false);
																		}}>
																		<Check
																			className={cn(
																				'mr-2 h-4 w-4',
																				language.id === field.value
																					? 'opacity-100'
																					: 'opacity-0',
																			)}
																		/>
																		{language.name}
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
						<FormControl>
							<FormField
								control={form.control}
								name="komoditas"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Komoditas</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Pilih Komoditas" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{komoditasData.map((item) => (
													<SelectItem
														key={item.id}
														value={item.id.toString()}
														onClick={() => {
															field.onChange(item.id);
														}}>
														{item.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Pilih Komoditas yang akan diinput
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
						<FormControl>
							<FormField
								control={form.control}
								name="jumlahMasuk"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="jumlahMasuk">Jumlah Masuk</FormLabel>
										<Input
											{...field}
											type="number"
											id="jumlahMasuk"
											name="jumlahMasuk"
											placeholder="Jumlah Masuk"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
						<FormControl>
							<FormField
								control={form.control}
								name="jumlahKeluar"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="jumlahKeluar">Jumlah Keluar</FormLabel>
										<Input
											{...field}
											type="number"
											id="jumlahKeluar"
											name="jumlahKeluar"
											placeholder="Jumlah Keluar"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormControl>
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
                                                placeholder="Tanggal"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                        </FormControl>
						<FormControl>
							<FormItem>
								<Button type="submit">Submit</Button>
							</FormItem>
						</FormControl>
					</form>
				</Form>

				{/* <form action="">
					<div className="mt-10 flex flex-wrap justify-between gap-10">
						<div className="w-[22rem] flex-1">
							<label
								htmlFor="location"
								className="block text-sm font-medium leading-6 text-gray-900">
								Kabupaten/Kota - Masuk
							</label>
							<input
								id="location"
								name="location"
								type="text"
								className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
						<div className="flex-1 flex align-center items-center mt-4">
							<hr className="bg-black w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
						</div>
						<div className="w-[22rem] flex-1">
							<label
								htmlFor="location"
								className="block text-sm font-medium leading-6 text-gray-900">
								Kabupaten/Kota - Keluar
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
					<br />
					<h1 className="text-2xl font-bold">Detail Transaksi</h1>

					<br />
					<div className="flex flex-wrap justify-between gap-10">
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
						<div className="w-[22rem]">
							<label
								htmlFor="location"
								className="block text-sm font-medium leading-6 text-gray-900">
								Jumlah Masuk
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
								Jumlah Keluar
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
					<div className="flex justify-end">
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


