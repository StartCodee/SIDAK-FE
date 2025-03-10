"use client";
import dynamic from "next/dynamic";
import React from "react";

import TableOne from"../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import newsImg from "@/public/admin/images/cards/news.png";
import Image from 'next/image'

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="flex gap-10 w-full">
        <div className="  justify-center" style={{ flex: '5' }}>
          <div className="flex justify-between w-full bg-white rounded-lg border border-stroke bg-white px-5  py-10 shadow-default">
            <div>
            <h1 className="text-2xl font-bold">Hello Reksa !</h1>
            <p className="mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, nihil?</p>
            </div>
            <div style={{position:'relative'}}>
            <Image src={'/admin/images/brand/hero.png'} width={150} height={200} alt="hero" />

            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <CardDataStats bg="#6FCEB9" title="Data Tervalidasi" total="1240" rate="0.43%" levelUp>
             <Image src={'/admin/images/icon/approve.png'} width={45} height={45} alt="approve"/>
            </CardDataStats>
            <CardDataStats bg="#F5A851" title="Menunggu Validasi" total="105" rate="4.35%" levelUp>
            <Image src={'/admin/images/icon/sand.png'} width={45} height={45} alt="pending"/>

            </CardDataStats>
            <CardDataStats bg="#DD5C5C" title="Ditolak" total="2.450" rate="2.59%" levelUp>
            <Image src={'/admin/images/icon/reject.png'} width={45} height={45} alt="reject"/>

            </CardDataStats>
          </div>
          <TableOne />
        </div>
        <div className="w-full bg-white rounded-lg border border-stroke bg-white px-5  py-6 shadow-default" style={{ flex: '2' }}>
          <div className="w-full rounded-xl border border-stroke bg-white shadow-default">
            <Image src={newsImg} className="rounded-t-xl" alt="news" />
            <div className="p-4">
              <h1 className="text-2xl text-black font-bold ">Lorem</h1>
              <p className="text-[10px]">10-12-2004</p>
              <p className="mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, nihil?</p>
            </div>
          </div>
          <div className="w-full rounded-xl border mt-7 border-stroke bg-white shadow-default">
            <Image src={newsImg} className="rounded-t-xl" alt="news" />
            <div className="p-4">
              <h1 className="text-2xl text-black font-bold ">Lorem</h1>
              <p className="text-[10px]">10-12-2004</p>
              <p className="mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, nihil?</p>
            </div>
          </div>
          <div className="mt-4  flex justify-end">
            <a className="hover:text-[#37B5FE]" href="">Selengkapnya</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ECommerce;
