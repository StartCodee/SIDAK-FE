'use client'

import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import user from '@/public/userr.png';
import Background from '@/public/bgg.png';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import axios from "axios";
export default function Home() {
	const [username, setUsername] = useState('');
	const [userEmail, setUserEmail] = useState('');

	const [input, setInput] = useState({
		password: '',
		new_password: '',
		password_confirmation: '',
	});


	const resetPassword = async (e: any) => {
		e.preventDefault();
		Swal.fire({
			title: 'Loading...',
			target: document.getElementById('modal-dialog'),
			text: 'Mohon tunggu sebentar...',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			}
		});

		var res = await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/reset-password`,
			{
				password: input.password,
				new_password: input.new_password,
				password_confirmation: input.password_confirmation,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Cookies.get('token')}`
				},
			}
		)
			.then(function (response) {
				Swal.fire({
					icon: 'success',
					target: document.getElementById('modal-dialog'),
					title: 'Password berhasil diubah',
					showConfirmButton: false,
					timer: 10000
				});

				setInput({
					password: '',
					new_password: '',
					password_confirmation: '',
				});
			}).catch(function (error) {
				console.log(error)
				if (error.response && error.response.status === 401) {
					Swal.fire({
						icon: 'error',
						target: document.getElementById('modal-dialog'),
						title: error.response.data.message,
						showConfirmButton: false,
						timer: 10000
					})
				} else {
					Swal.fire({
						icon: 'error',
						target: document.getElementById('modal-dialog'),
						title: 'error terjadi',
						text: 'mohon coba lagi nanti.',
						showConfirmButton: false,
						timer: 10000
					});
				}
			})
	}


	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setInput({
			...input,
			[name]: value,
		});
	};
	useEffect(() => {
		const username = Cookies.get('userName');
		const userEmail = Cookies.get('userEmail');

		if (username) {
			setUsername(username);
		}
		if (userEmail) {
			setUserEmail(userEmail);
		}
	}, []);
	return (
		<>
			<DefaultLayout>
				<div className="mx-auto max-w-full">
					<Breadcrumb pageName="Profile" />

					<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
						<div className="relative z-20 h-35 md:h-65">
							<Image
								src={Background}
								alt="profile cover"
								className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
								layout="fill"
							/>
						</div>
						<div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
							<div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
								<div className="relative drop-shadow-2">
									<Image
										src={user}
										width={160}
										height={160}
										style={{
											width: 'auto',
											height: 'auto',
										}}
										alt="profile"
										className="rounded-full"
									/>
									{/* <label
										htmlFor="profile"
										className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
										<svg
											className="fill-current"
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
												fill=""
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
												fill=""
											/>
										</svg>
										<input
											type="file"
											name="profile"
											id="profile"
											className="sr-only"
										/>
									</label> */}
								</div>
							</div>

							<div className="flex flex-col sm:flex-row gap-9 mt-8">
								<div className="rounded-sm border border-stroke w-2/3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
									<div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
										<h2 className="text-lg font-semibold text-black dark:text-white">
											User Information
										</h2>
									</div>
									<div className="p-6.5">
										<div className="mb-4.5">
											<p className="mb-1 text-sm font-medium text-black dark:text-white">
												Email
											</p>
											<p className="text-base text-gray-600 dark:text-gray-300">
												{userEmail}
											</p>
										</div>
										<div className="mb-4.5">
											<p className="mb-1 text-sm font-medium text-black dark:text-white">
												Username
											</p>
											<p className="text-base text-gray-600 dark:text-gray-300">
												{username ? username : 'Username'}
											</p>
										</div>
										<div>
											<p className="mb-1 text-sm font-medium text-black dark:text-white">
												Password
											</p>
											<p className="text-base text-gray-600 dark:text-gray-300">
												********
											</p>
										</div>
									</div>
								</div>
								<div className="rounded-sm border border-stroke w-full bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
									<div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
										<h2 className="text-lg font-semibold text-black dark:text-white">
											Change Password
										</h2>
									</div>
									<div className="p-6.5 w-10/12 mx-auto">
										<form onSubmit={resetPassword}>
											<div className="mb-4.5 text-left">
												<label className="mb-1 text-sm  font-medium text-black dark:text-white">
													Current Password
												</label>
												<input
													type="password"
													name="password"
													id="password"
													value={input.password}

													onChange={handleChange}
													className="text-base mt-3  text-gray-600 dark:text-gray-300 w-full"
												/>
											</div>
											<div className="mb-4.5 text-left">
												<label className="mb-1 text-sm  font-medium text-black dark:text-white">
													New Password
												</label>
												<input
													type="password"
													name="new_password"
													id="new_password"
													onChange={handleChange}
													value={input.new_password}

													className="text-base mt-3 text-gray-600 dark:text-gray-300 w-full"
												/>
											</div>
											<div className="mb-4.5 text-left">
												<label className="mb-1 text-sm  font-medium text-black dark:text-white">
													Confirm New Password
												</label>
												<input
													name="password_confirmation"
													value={input.password_confirmation}
													id="password_confirmation"
													onChange={handleChange}

													type="password"
													className="text-base mt-3 text-gray-600 dark:text-gray-300 w-full"
												/>
											</div>
											<button
												type="submit"
												className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
												Change Password
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DefaultLayout>
		</>
	);
}