"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordFormSchema } from "@/lib/types";

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
import { reset_password, signup } from "@/api/auth";
import { decrypt, encrypt } from "@/lib/utils";

import { useRouter, useSearchParams } from 'next/navigation'

type Props = {};

export default function ResetPasswordPage({ }: Props) {
	const [isView, setIsView] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const searchParams = useSearchParams()

	const userId = decrypt("f", searchParams.get('u0') || '');


	const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
		resolver: zodResolver(ResetPasswordFormSchema),
		mode: 'onChange',
		defaultValues: {
			userId: `${userId}`,
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof ResetPasswordFormSchema>) => {
		try {
			const { userId, password } = values;
			const response = await reset_password(userId, password);
			if (!response.success) {
				toast({
					variant: 'destructive',
					title: 'Oppse!',
					description: `${response.message}`,
				})
				return
			}

			router.push(`/login`);
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
				<h2 className="text-lg font-bold">Changer de mot de passe</h2>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>

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
						{form.formState.isSubmitting ? <Loading /> : 'Continuer'}
					</Button>
				</form>
			</Form>

			<div className="w-[300px] my-5">
				<span className="text-sm">
					Vous avez deja un compte ?
					<Link href={`/login`}>
						<b> connectez-vous</b>
					</Link>
				</span>
			</div>
		</div>
	);
}
