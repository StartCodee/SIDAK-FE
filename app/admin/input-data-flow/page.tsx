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
                <Breadcrumb pageName="Input Data" />

                <div className="w-full bg-white rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                    <form action="">
                        <div className="flex flex-wrap justify-between gap-10">
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Kabupaten/Kota
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Kecamatan
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Komoditas
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="flex flex-wrap justify-between gap-10">
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Kabupaten/Kota
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Kecamatan
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Komoditas
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                            <div className="w-[22rem]">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Komoditas
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                        </div>

                        <br />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
