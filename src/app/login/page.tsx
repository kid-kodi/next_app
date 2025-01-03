"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema } from "@/lib/types";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import Loading from "@/components/global/loading";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/api/auth";

import { useRouter } from 'next/navigation'
import { handleLogin } from "./actions";

type Props = {};

export default function LoginPage({ }: Props) {
	const [isView, setIsView] = useState(false);
	const { toast } = useToast();
	const router = useRouter();


	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
		try {
			const response = await handleLogin(values);
			if (!response.success) {
				toast({
					variant: 'destructive',
					title: 'Oppse!',
					description: `${response.message}`,
				})
				return
			}

			router.push(`/dashboard`);
		} catch (error: any) {

			toast({
				variant: 'destructive',
				title: 'Oppse!',
				description: `${error.message}`,
			})
		}
	}

	return (
		<div className="w-[300px]">
			<div className="w-[300px] space-y-3">
				<h2 className="text-lg font-bold">Connectez-vous à votre compte</h2>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Adresse Email</FormLabel>
								<FormControl>
									<Input placeholder="Adresse Email" {...field} />
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
								<FormLabel>
								<div className="flex items-center">
                  <div>Password</div>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
								</FormLabel>
								<FormControl>
									<div className="relative">
										<Input type={isView ? "text" : "password"} {...field} />
										{isView ? (
											<Eye
												className="absolute right-4 top-2 z-10 cursor-pointer text-gray-500"
												onClick={() => {
													setIsView(!isView), console.log(isView)
												}}
											/>
										) : (
											<EyeOff
												className="absolute right-4 top-2 z-10 cursor-pointer text-gray-500"
												onClick={() => setIsView(!isView)}
											/>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						disabled={form.formState.isSubmitting}
						type="submit"
					>
						{form.formState.isSubmitting ? <Loading /> : 'Connexion'}
					</Button>
				</form>
			</Form>

			<div className="w-[300px] my-5">
				<span className="text-sm">
					Vous n'avez pas de compte ?
					<Link href={`/register`}>
						<b> enregistrez vous</b>
					</Link>
				</span>
			</div>
		</div>
	);
}
