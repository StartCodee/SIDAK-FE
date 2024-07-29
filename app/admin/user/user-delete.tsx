'use client';
import { useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { Logout } from '@/lib/logout';


interface Users {
	id: number;
	kabupaten_id: number;
	password: string;
	username: string;
	email: string;
	role: string;
	thumb: string;
}

interface BeritaDeleteProps {
	id?: Number; // Optional news prop for editing
	onBeritaDataUpdate: (data: Users[]) => void;
}

export default function UserDelete({
	id,
	onBeritaDataUpdate,
}: BeritaDeleteProps) {
	const { toast } = useToast();
	const [beritaData, setBeritaData] = useState<Users[]>([]);

	const getBerita = async (page: number = 1, limit: number = 20) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users?page=${page}&limit=${limit}`,
				{
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
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

	const handleDelete = async () => {
		try {
			await axios
				.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${id}`, {
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
				})
				.then((res) => {
					if (res.status === 200) {
						toast({
							title: 'Berita berhasil dihapus',
							description: 'Berita berhasil dihapus dari database',
							variant: 'success',
						});
						getBerita();
					}
				});
		} catch (err: any) {
			if (err.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Unauthorized',
					description: 'You are not authorized to perform this action',
				});
				Logout();
			}
			toast({
				title: 'Gagal menghapus berita',
				description: 'Gagal menghapus berita dari database',
				variant: 'destructive',
			});
		}
	};

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger>
					<Button variant="destructive">Delete</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak
							dapat dikembalikan.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDelete}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
