
'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';

import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

const formSchema = z.object({
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    new_password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    password_confirmation: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
});



export default function ResetForm()  {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            new_password: '',
            password_confirmation: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/reset-password`,
                data,
                {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                },
            );
            if (response.data) {
                toast({
                    title: 'Success',
                    description: 'Password changed successfully',
                    variant: 'success',
                });
                form.reset();
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast({
                    title: 'Error',
                    description: 'Unauthorized',
                    variant: 'destructive',
                });
            }
            toast({
                title: 'Error',
                description: error.response.data.error,
                variant: 'destructive',
            })
        }
    };

    return (
			<>
				<div className="py-2 w-10/12 mx-auto">
					<Form {...form}>
						<form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Current Password</FormLabel>
										<FormControl>
											<Input placeholder="Isi Current Password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="new_password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input placeholder="Isi New Password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password_confirmation"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input placeholder="Isi Confirm Password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end mt-4">
								<Button type="submit">Submit</Button>
							</div>
						</form>
					</Form>
				</div>
			</>
		);
}