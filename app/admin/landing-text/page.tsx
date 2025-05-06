
"use client";

import { AuthHeader } from '@/lib/authHeader';

import Swal from "sweetalert2";
import axios from "axios";
import React, { useEffect, useState } from 'react';


import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import { useToast } from '@/components/ui/use-toast';




interface Contact {
	id: number;
	name: string;
	email: string;
	message: string;
}


export default function Home() {
	const { toast } = useToast();

	const [description, setDescription] = useState('');

	const handleUpdate = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/description`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ description }),
			});

			if (!response.ok) {
				throw new Error('Failed to update description');
			}

			const data = await response.json();
			console.log(data.message); // Menampilkan pesan sukses
			toast({
				variant: 'success',
				title: 'Success',
				description: 'Data berhasil diupdate.',
			});
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'mohon coba lagi nanti.',
			});
		}
	};

	const fetchDescription = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/description`);
			if (!response.ok) {
				throw new Error('Failed to fetch description');
			}
			const data = await response.json();
			setDescription(data.description);
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'mohon coba lagi nanti.',
			});
		}
	};

	useEffect(() => {
		fetchDescription();
	}, []);


	return (
		<>
			<DefaultLayout>
				<Breadcrumb pageName="Landing Page Text" />
				<div className="col-span-3 rounded-lg border border-stroke bg-white px-7 py-10 shadow-default">
					<div className={`w-full `}>
						<form id="adminRegisterForm" className="space-y-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900">
								Harga Konsumen Description
							</label>
							<div className="grid grid-cols-3 gap-4 items-center">
								<div className="col-span-3">
									<textarea
										id="landingPageText"
										name="landingPageText"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="Landing Page Text"
										className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<button
								type="button"
								onClick={handleUpdate}
								className="col-span-1 rounded-sm bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Change Text
							</button>
						</form>

					</div>
				</div>
			</DefaultLayout>
		</>
	);
}
