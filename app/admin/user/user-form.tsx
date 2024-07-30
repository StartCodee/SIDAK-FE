'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import '../../globals.css';
import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
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
import { Logout } from '@/lib/logout';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';


const formSchema = z.object({
	// username, email, role, thumb
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(2, {
        message: 'Password must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Email must be a valid email address.',
    }),
    role: z.string().min(2, {
        message: 'Role must be at least 2 characters.',
    }),
    kabupaten_id: z.any().optional(),
    image: z.string().min(2, {
        message: 'Thumb must be at least 2 characters.',
    }),
});

interface Users {
    id: number;
    password: string;
    kabupaten_id: number;
    username: string;
    email: string;
    role: string;
    thumb: string;
}

interface Kabupaten {
	id: number;
	name: string;
	cityIds: string;
}

interface BeritaFormProps {
	news?: Users; // Optional news prop for editing
	onBeritaDataUpdate: (data: Users[]) => void;
}

export function UserForm({ news, onBeritaDataUpdate }: BeritaFormProps) {
	const { toast } = useToast();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [kabupatenData, setKabupatenData] = useState<Kabupaten[]>([]);
	const [userData, setUserData] = useState<Users[]>([]);
	const [selectedFile, setSelectedFile] = useState<File>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: news?.username || '',
            password: news?.password || '',
            kabupaten_id: news?.kabupaten_id || '',
			email: news?.email || '',
            role: news?.role || '',
            image: '',
		},
	});

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
            
    

	useEffect(() => {
		if (news) {
			form.setValue('username', news.username);
            form.setValue('email', news.email);
            form.setValue('role', news.role);
          if(news.kabupaten_id) {
            form.setValue('kabupaten_id', news.kabupaten_id.toString());
          }
		}
	}, [news, form]);



    useEffect(() => {
			getKabupaten();
		}, []);

	const getBerita = async (page: number = 1, limit: number = 20) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users?page=${page}&limit=${limit}`,
				{
					headers: AuthHeader(),
				},
			);
			if (response.data.data) {
				setUserData(response.data.data);
				onBeritaDataUpdate(response.data.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: error.response.data.message,
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Error occurred',
					text: 'Please try again later.',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(event.target.files?.[0]);
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		
		const formData = new FormData();
		formData.append('username', values.username);
		formData.append('password', values.password);
		formData.append('email', values.email);
		formData.append('role', values.role);
		
        if(values.kabupaten_id) {
            formData.append('kabupaten_id', values.kabupaten_id);
        } 


		if (selectedFile) {
			formData.append('image', selectedFile);
		}

		console.log(formData);

		const request = news
			? axios.put(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${news.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${Cookies.get('token')}`,
						},
					},
			  )
			: axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${Cookies.get('token')}`,
						},
					},
			  );

		request
			.then((res) => {
				if (res.status === 200) {
                    
					toast({
						title: `User ${news ? 'Updated' : 'Added'} Successfully`,
						description: `User has been ${
							news ? 'updated' : 'added'
						} successfully`,
						variant: 'success',
					});
					getBerita();
					setIsDialogOpen(false);
                    
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
					variant: 'destructive',
					title: `User ${news ? 'Update' : 'Addition'} Failed`,
					description: `User failed to ${news ? 'update' : 'add'}`,
				});
			});
	}

    const roles = [
        { id: 1, name: 'ADMIN' },
        { id: 2, name: 'KABUPATEN' },
        { id: 3, name: 'PROVINSI' },
        { id: 4, name: 'BANK INDONESIA' },
    ];
    

	return (
		<>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">{news ? 'Edit User' : 'Add User'}</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] ">
					<DialogHeader>
						<DialogTitle>{news ? 'Edit User' : 'Add User'}</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Isi Username" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input placeholder="Isi Password" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Isi Email" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormControl>
								<FormField
									control={form.control}
									name="role"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Role</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Pilih Role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roles.map((item) => (
														<SelectItem
															key={item.id}
															value={item.name}
															onClick={() => {
																field.onChange(item.name);
															}}>
															{item.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>

											<FormMessage />
										</FormItem>
									)}
								/>
							</FormControl>

							{form.watch('role') === 'KABUPATEN' && (
								<FormControl>
									<FormField
										control={form.control}
										name="kabupaten_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Kabupaten</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Pilih Kabupaten" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{kabupatenData.map((item) => (
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

												<FormMessage />
											</FormItem>
										)}
									/>
								</FormControl>
							)}

							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Image</FormLabel>
										<FormControl>
											<Input
												type="file"
												accept="image/*"
												{...field}
												onChange={(e) => {
													field.onChange(e);
													handleFileSelect(e);
												}}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit">
									{news ? 'Update' : 'Save'} changes
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
}
