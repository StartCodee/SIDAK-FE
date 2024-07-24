import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
    title:
        "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Data Flow" />

                <div className="w-full rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                    <h1 className="text-2xl font-bold">Data Flow</h1>

                    <form action="">
                        <div className="mt-10 flex flex-wrap justify-between gap-10">
                            <div className="w-[22rem] flex-1">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Kabupaten/Kota - Masuk
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    className="mt-2 block w-full h-[4rem] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                            </div>
                            <div className="flex-1 flex align-center items-center mt-4">
                                <hr className="bg-black w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                            </div>
                            <div className="w-[22rem] flex-1">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Kabupaten/Kota - Keluar
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
                        <br />
                        <h1 className="text-2xl font-bold">Detail Transaksi</h1>

                        <br />
                        <div className="flex flex-wrap justify-between gap-10">
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
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Jumlah Masuk
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
                                    Jumlah Keluar
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
                        <div className="flex justify-end">
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
