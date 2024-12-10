'use client';

import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/admin/FormElements/DatePicker/DatePickerOne";
import InputDataForm from "./input-data-form";
import axios from 'axios';

import { AuthHeader } from '@/lib/authHeader';
import Select, { SingleValue } from 'react-select';
import { useEffect,useState } from "react";
import Swal from "sweetalert2";


interface Komoditas {
    id: number;
    name: string;
}


export default function Home() {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);


	const [selectedKabupatenOption, setSelectedKabupatenOption] = useState<any[]>([]);
	const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>([]);

    const [selectedCommodity, setSelectedCommodity] = useState<SingleValue<{ value: string; label: string }> | null>(null);
	const [selectedKabupaten, setSelectedKabupaten] = useState<SingleValue<{ value: string; label: string }> | null>(null);



    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
        setUploadProgress(0); // reset progress saat file diubah
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            Swal.fire("Error", "Please select a file to upload.", "error");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('komoditas_id', selectedCommodity!.value); // Tambahkan tipe sesuai kebutuhan Anda
        formData.append('kabupaten_kota_id', selectedKabupaten!.value); // Tambahkan tipe sesuai kebutuhan Anda

        try {
            setIsUploading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/import-neraca`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to upload");
            }
            // Jika respons sukses
            Swal.fire("Success", "File uploaded successfully.", "success");
        } catch (error) {
            Swal.fire("Error", "Failed to upload file.", "error");
        } finally {
            setIsUploading(false);
        }
    };

    const getKabupatenOption = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/kabupaten`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				const mappedOptions = response.data.data.map((kabupaten: { name: string, id: number }) => ({
					value: kabupaten.id,
					label: kabupaten.name,
				}));
				setSelectedKabupatenOption(mappedOptions);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'Please login first',
                });
			} else {
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
                const options = response.data.data.map((item: Komoditas) => ({
                    value: item.id,
                    label: item.name,
                }));
                setSelectedCommodityOption(options);
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
        getKomoditas();
        getKabupatenOption();

    }, []);


    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Data Neraca" />
                <div className="w-full rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                    <h1 className="text-2xl font-bold">Import Data</h1>
                    <div className="mt-5 ">
                    <div className="flex gap-10">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Komoditas</label>
                                <Select
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                    onChange={(option) => setSelectedCommodity(option)}
                                    className="basic-single w-[170px] border-none"
                                    options={selectedCommodityOption}
                                    value={selectedCommodity}
                                />
                                {selectedFile && (
                                    <div className="mt-3">
                                        <p className="text-sm">File: {selectedFile.name}</p>
                                        <button
                                            onClick={handleFileUpload}
                                            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                            disabled={isUploading}
                                        >
                                            {isUploading ? "Uploading..." : "Upload"}
                                        </button>
                                    </div>
                                )}
                                {isUploading && (
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                        <div
                                            className="bg-blue-500 h-2.5 rounded-full"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>

                            <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Kabupaten</label>
                                <Select
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                    onChange={(option) => setSelectedKabupaten(option)}
                                    className="basic-single w-[170px] border-none"
                                    options={selectedKabupatenOption}
                                    value={selectedKabupaten}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Upload File</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                />
                            </div>
                        </div>


                    </div>
                    <h1 className="text-2xl font-bold mt-10">Input Data</h1>
                    <InputDataForm />
                </div>
            </DefaultLayout>
        </>
    );
}
