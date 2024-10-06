
"use client";

import { AuthHeader } from '@/lib/authHeader';

import Swal from "sweetalert2";
import axios from "axios";
import React, { useEffect, useState } from 'react';


import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";




interface Contact {
	id: number;
	name: string;
	email: string;
	message: string;
}


export default function Home() {




	return (
		<>
			<DefaultLayout>
				<Breadcrumb pageName="Landing Page Text" />
				<div className="col-span-3 rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
					<div className={`w-full `}>
						<h1 className="text-2xl font-bold">Landing Page Text</h1>
						<form id="adminRegisterForm" className="p-4 space-y-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900">
								Landing Page Text
							</label>
							<div className="grid grid-cols-3 gap-4 items-center">
								<div className="col-span-3">
									<textarea
										id="landingPageText"
										name="landingPageText"
										
										placeholder="Landing Page Text"
										className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
								<button
									type="submit"
									className="col-span-1 rounded-sm bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									Change Landing Page Text
								</button>
						</form>
						
					</div>
				</div>
			</DefaultLayout>
		</>
	);
}
