'use client';

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import InputDataForm from "./input-data-form";
import axios from 'axios';
import { AuthHeader } from '@/lib/authHeader';
import Select, { SingleValue } from 'react-select';


interface Komoditas {
    id: number;
    name: string;
}

export default function Home() {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>([]);
    const [selectedCommodity, setSelectedCommodity] = useState<SingleValue<{ value: string; label: string }> | null>(null);


    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
        setUploadProgress(0);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            Swal.fire("Error", "Please select a file to upload.", "error");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('komoditas_id', selectedCommodity!.value); // Tambahkan tipe sesuai kebutuhan Anda
        try {
            setIsUploading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/import-harga`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to upload");
            }
            Swal.fire("Success", "File uploaded successfully.", "success");
        } catch (error) {
            Swal.fire("Error", "Failed to upload file.", "error");
        } finally {
            setIsUploading(false);
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
    }, []);

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Data Pangan" />
                <div className="w-full rounded-lg border border-stroke bg-white px-5 py-10 shadow-default">
                    <h1 className="text-2xl font-bold">Import Data</h1>
                    <div className="mt-5  ">
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
