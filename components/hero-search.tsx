import Select from 'react-select';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import { format, set,subDays } from 'date-fns';
import axios from 'axios';
import Swal from 'sweetalert2';

function HeroSearch() {
    const [selectedCommodity, setSelectedCommodity] = useState('');
    const [selectedValue, setSelectedValue] = useState<string>('harga-pangan');
    const [selectedCommodityOption, setSelectedCommodityOption] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>();

    const getHargaPangan = async (date: string = '', komoditas: string) => {
		if (!date) {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
			date = `${year}-${month}`;
		}
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/perubahan-harga?date=${date}&komoditas=${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				// setCardContents(response.data.data);
				// setLoadingCard(false);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: error.response.data.message,
					showConfirmButton: false,
					timer: 1500
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'error terjadi',
					text: 'mohon coba lagi nanti.',
					showConfirmButton: false,
					timer: 1500
				});
			}
		}
	};

	const getNeracaPangan = async (date: string = '', komoditas: string) => {
		if (!date) {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
			date = `${year}-${month}`;
		}
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/harga-pasokan?date=${date}&komoditas=${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				// setCardContentsNeraca(response.data.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: error.response.data.message,
					showConfirmButton: false,
					timer: 1500
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'error terjadi',
					text: 'mohon coba lagi nanti.',
					showConfirmButton: false,
					timer: 1500
				});
			}
		}
	};

	const getPolaPerdagangan = async (date: string = '', komoditas: string) => {
		if (!date) {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
			date = `${year}-${month}`;
		}
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/supply/pola-perdagangan?date=${date}&komoditas=${komoditas}`, {
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.data.data) {
				// setFlow(response.data.data);
				// setFilteredFlow(response.data.data);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: error.response.data.message,
					showConfirmButton: false,
					timer: 1500
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'error terjadi',
					text: 'mohon coba lagi nanti.',
					showConfirmButton: false,
					timer: 1500
				});
			}
		}
	};

    const handleValueChange = (e: any) => {
		setSelectedValue(e.value);
		if (e.value === 'neraca-pangan') {
			getNeracaPangan('', '18');
		}
		else if (e.value === 'perdagangan-pangan') {
			getPolaPerdagangan('', '18');
		} else {
			getHargaPangan('', '18');
		}
	};

    const handleChangeMonth = () => {
		console.log('search');
		if (selectedDate) {
			let commodity = selectedCommodity;
			let val = format(selectedDate, 'yyyy-MM');
			if (selectedValue === 'harga-pangan') {
				getHargaPangan(val, commodity);
			} else if (selectedValue == 'neraca-pangan') {
				getNeracaPangan(val, commodity);
			}
			else if (selectedValue == 'perdagangan-pangan') {
				getPolaPerdagangan(val, commodity);
			}
		} else {
			console.log('No date selected');
		}
	}

    const jenisInformasi = [
        { value: 'harga-pangan', label: 'Harga Pangan' },
        { value: 'neraca-pangan', label: 'Neraca Pangan' },
        { value: 'perdagangan-pangan', label: 'Pola Perdagangan Pangan' },
    ];

  return (
   <>
   <div
				style={{ marginTop: '-40px' }}
				className="mx-auto z-1 relative px-4 py-[0.4rem] sm:py-2 sm:px-8 shadow-xl w-[18rem] md:w-[40rem] sm:w-[40rem] rounded-xl md:rounded-full flex flex-col sm:flex-row items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4">
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Jenis Informasi</h1>
					<Select
						styles={{
							control: (provided) => ({
								...provided,
								border: 'none',
								boxShadow: 'none',
							}),
						}}
						components={{
							IndicatorSeparator: () => null
						}}
						onChange={(e) => handleValueChange(e)}
						className=" basic-single w-[170px] border-none"
						options={jenisInformasi}
					/>
				</div>
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1">Komoditas</h1>
					<Select
						styles={{
							control: (provided) => ({
								...provided,
								border: 'none',
								boxShadow: 'none',
							}),
						}}
						components={{
							IndicatorSeparator: () => null
						}}
						className=" basic-single w-[170px] border-none"
						onChange={(option) => setSelectedCommodity(option!.value)}
						options={selectedCommodityOption}
					/>
				</div>
				<div className="mx-4 border-l border-black/15 h-auto self-stretch  sm:block" />
				<div className="flex-col flex-1">
					<h1 className="font-bold text-sm mb-1 ">Bulan</h1>
					{/* <MonthPicker date={selectedDate} setDate={setSelectedDate} /> */}
				</div>
				<Button
					onClick={handleChangeMonth}
					className="bg-blue-300 rounded-full p-2">
					<MagnifyingGlassIcon className="text-white" width={24} height={24} />
				</Button>
			</div>
   </>
  )
}

export default HeroSearch