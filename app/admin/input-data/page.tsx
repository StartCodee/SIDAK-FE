'use client';

import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/admin/FormElements/DatePicker/DatePickerOne";



export default function Home() {
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Data Pangan" />

                <div className="w-full bg-white rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                    <h1 className="text-2xl font-bold">Informasi Umum</h1>
                    <form action="">
                        <div className="mt-10 flex flex-wrap justify-start gap-15">
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Kabupaten/Kota
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option selected>Kabupaten/Kota</option>
                                </select>
                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Kecamatan
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    className="mt-2 block w-full  h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option selected>Kecamatan</option>
                                </select>
                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Komoditas
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option selected>Komoditas</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <br />
                        <h1 className="text-2xl font-bold">Detail Transaksi </h1>

                        <br />
                        <div className="flex flex-wrap justify-start gap-15">
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tanggal
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="date"
                                    className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Harga
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Jumlah Kebutuhan
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Jumlah Ketersediaan
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
                        <div className="flex justify-start">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-4 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#37B5FE] text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

            </DefaultLayout>
        </>
    );
}
