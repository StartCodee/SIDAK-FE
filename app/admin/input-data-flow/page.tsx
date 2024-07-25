import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import FLowForm from "./flow-form";

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
                    <h1 className="text-2xl font-bold mb-2">Input Data Flow</h1>

                    <FLowForm />
                </div>

            </DefaultLayout>
        </>
    );
}
