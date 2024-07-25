'use client'

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';
import { Textarea } from '@/components/ui/textarea';

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
	onBeritaDataUpdate: (data: News[]) => void;
}


export function BeritaForm({ onBeritaDataUpdate }: BeritaFormProps) {
	const { toast } = useToast();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [beritaData, setBeritaData] = useState<News[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			content: '',
			image: '',
		},
	});

	const getBerita = async (page: number = 1, limit: number = 20) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news?page=${page}&limit=${limit}`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					withCredentials: true,
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
					title: 'error terjadi',
					text: 'mohon coba lagi nanti.',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
	};

	function onsubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData();
		formData.append('title', values.title);
		formData.append('content', values.content);
		 
    if (values.image && values.image.length > 0) {
			formData.append('image', values.image[0]); // Ensure the image file is valid
		}

		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news`, formData)
			.then((res) => {
				if (res.status === 200) {
					toast({
						title: 'Berita Berhasil Ditambahkan',
						description: 'Berita berhasil ditambahkan',
						variant: 'success',
					});
					getBerita();
					setIsDialogOpen(false);
                    form.reset();
				}
			})
			.catch((err) => {
				toast({
					variant: 'destructive',
					title: 'Berita Gagal Ditambahkan',
					description: 'Berita gagal ditambahkan',
				});
			});
	}

	return (
		<>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">Add Berita</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] ">
					<DialogHeader>
						<DialogTitle>Add Berita</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
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
											<Input type="file" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit">Save changes</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>

			{/* <form action="" method="dialog" onSubmit={createBerita}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input
								id="title"
								name="title"
								value={berita.title}
								onChange={handleInputChange}
								defaultValue="Title Berita"
								className="col-span-3"
							/>
						</div>
					</div>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Content
							</Label>
							<Input
								id="content"
								name="content"
								value={berita.content}
								onChange={handleInputChange}
								defaultValue="content Berita"
								className="col-span-3"
							/>
						</div>
					</div>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right mb-3">
								Image
							</Label>
							<Input
								type="file"
								onChange={handleFileSelect}
								id="name"
								placeholder="Jahe"
								className="col-span-3 mt-1"
							/>
						</div>
					</div>

					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form> */}
		</>
	);
}

