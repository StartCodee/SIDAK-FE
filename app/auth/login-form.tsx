'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useToast } from '@/components/ui/use-toast';

import { useRouter } from 'next/navigation';


const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
});

export function LoginForm() {
    const { toast } = useToast();
	
      const form = useForm<z.infer<typeof formSchema>>({
				resolver: zodResolver(formSchema),
				defaultValues: {
					username: '',
                    password: '',
				},
			});
    function onSubmit(values: z.infer<typeof formSchema>) {
        
       axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/login`, values).then((res) => {
            if (res.status === 200) {
                const { user, token } = res.data;

                Cookies.set('token', token, { expires: 365 });
				Cookies.set('userEmail', user.email, { expires: 365 });
				Cookies.set('userName', user.username, { expires: 365 });
				Cookies.set('userId', user.id, { expires: 365 });

                toast({
					title: 'Login Berhasil',
					description: 'Anda akan diarahkan ke halaman dashboard',
					variant: 'success',
				});
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            }
        }
        ).catch((err) => {
            toast({
		        variant: 'destructive',
				title: 'Login Gagal',
				description: 'Username atau Password Salah',	
			});
        })
        ;
    }
    

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="Isi username" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Isi Password" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					
					className=" self-end">
					Login
				</Button>
			</form>
		</Form>
	);
}
