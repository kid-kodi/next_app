"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupFormSchema } from "@/lib/types";

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
import { signup } from "@/api/auth";
import { encrypt } from "@/lib/utils";

import { useRouter } from 'next/navigation'

type Props = {};

export default function RegisterPage({ }: Props) {
	const [isView, setIsView] = useState(false);
	const { toast } = useToast();
	const router = useRouter();


	const form = useForm<z.infer<typeof SignupFormSchema>>({
		resolver: zodResolver(SignupFormSchema),
		mode: 'onChange',
		defaultValues: {
			name: "",
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
		try {
			const { name, email, password } = values;
			const response = await signup(name, email, password);
			if (!response.success) {
				toast({
					variant: 'destructive',
					title: 'Oppse!',
					description: `${response.message}`,
				})
				return
			}

			router.push(
				`/otp?activation_token=${response.activationToken}&e0=${encrypt(
					"f",
					email
				)}&n1=${encrypt("f", name)}&p2=${encrypt("f", password)}`
			);
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
				<h2 className="text-lg font-bold">Créez votre compte</h2>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nom</FormLabel>
								<FormControl>
									<Input placeholder="Nom complet" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
								<FormLabel>Mot de passe</FormLabel>
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
						{form.formState.isSubmitting ? <Loading /> : 'Creer un compte'}
					</Button>
				</form>
			</Form>

			<div className="w-[300px]">
				<span className="text-sm">
					Vous avez deja un compte ?
					<Link href={`/login`}>
						<b>connectez-vous</b>
					</Link>
				</span>
			</div>
		</div>
	);
}
