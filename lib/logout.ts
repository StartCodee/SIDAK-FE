'use client'

import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';


export function Logout() {
    const router = useRouter();

    Cookies.remove('token');
	Cookies.remove('userEmail');
    Cookies.remove('userId');
    Cookies.remove('userName');

    return router.push('/auth');
		
}