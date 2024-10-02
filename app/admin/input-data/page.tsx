'use client';

import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/admin/FormElements/DatePicker/DatePickerOne";
import InputDataForm from "./input-data-form";



export default function Home() {
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Data Pangan" />

                <div className="w-full rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
                    <h1 className="text-2xl font-bold">Informasi Umum</h1>
                    <InputDataForm />
                </div>

            </DefaultLayout>
        </>
    );
}
