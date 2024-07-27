import axios from 'axios';
import Swal from 'sweetalert2';

const getBerita = async (page: number = 1, limit: number = 3) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/news?page=${page}&limit=${limit}`,
			{
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				
			},
		);
		if (response.data.data) {
			return response.data;
		}
	} catch (error: any) {
		if (error.response && error.response.status === 401) {
			Swal.fire({
				icon: 'error',
				title: error.response.data.message,
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'error terjadi',
				text: 'mohon coba lagi nanti.',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	}
};

export default getBerita;