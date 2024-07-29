'use client';

import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import { useState, useEffect } from "react";


export default function Home() {

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  } else {

    return (
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    )
  }

}
