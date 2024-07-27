'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
    FormField,
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

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Title must be at least 2 characters.',
	}),
	content: z.string().min(8, {
		message: 'Content must be at least 8 characters.',
	}),
	image: z.any(),
});

interface News {
	id: number;
	title: string;
	content: string;
	author_id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	image: string | null;
}

interface BeritaFormProps {
	news?: News; // Optional news prop for editing
	onBeritaDataUpdate: (data: News[]) => void;
}

export function BeritaForm({ news, onBeritaDataUpdate }: BeritaFormProps) {
	const { toast } = useToast();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [beritaData, setBeritaData] = useState<News[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: news?.title || '',
			content: news?.content || '',
			image: '',
		},
	});

	useEffect(() => {
		if (news) {
			form.setValue('title', news.title);
			form.setValue('content', news.content);
		}
	}, [news, form]);

	const getBerita = async (page: number = 1, limit: number = 20) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news?page=${page}&limit=${limit}`,
				{
					headers: AuthHeader(),
					
				},
			);
			if (response.data.data) {
				setBeritaData(response.data.data);
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
		formData.append('title', values.title);
		formData.append('content', values.content);

		if (selectedFile) {
            formData.append('image', selectedFile);
        }

        console.log(formData);

		const request = news
			? axios.put(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news/${news.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${Cookies.get('token')}`,
						},
					},
			  )
			: axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news`,
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
						title: `Berita ${news ? 'Updated' : 'Added'} Successfully`,
						description: `Berita has been ${
							news ? 'updated' : 'added'
						} successfully`,
						variant: 'success',
					});
					getBerita();
					setIsDialogOpen(false);
					form.reset();
				}
			})
			.catch((err) => {
				if(err.response.status === 401) {
					toast({
						variant: 'destructive',
						title: 'Unauthorized',
						description: 'You are not authorized to perform this action',
					});
					Logout();
				}
				toast({
					variant: 'destructive',
					title: `Berita ${news ? 'Update' : 'Addition'} Failed`,
					description: `Berita failed to ${news ? 'update' : 'add'}`,
				});
			});
	}

	return (
		<>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">
						{news ? 'Edit Berita' : 'Add Berita'}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] ">
					<DialogHeader>
						<DialogTitle>{news ? 'Edit Berita' : 'Add Berita'}</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder="Isi Title" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Content</FormLabel>
										<FormControl>
											<Textarea placeholder="Isi Content" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
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
