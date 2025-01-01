"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordFormSchema } from "@/lib/types";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import Loading from "@/components/global/loading";

import { useRouter } from 'next/navigation'
import { handleForgotPassword } from "./actions";
import { encrypt } from "@/lib/utils";

type Props = {};

export default function ForgotPasswordPage({ }: Props) {
	const { toast } = useToast();
	const router = useRouter();


	const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
		resolver: zodResolver(ForgotPasswordFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: ''
		},
	});

	const onSubmit = async (values: z.infer<typeof ForgotPasswordFormSchema>) => {
		try {
			const response = await handleForgotPassword(values);
			if (!response.success) {
				toast({
					variant: 'destructive',
					title: 'Oppse!',
					description: `${response.message}`,
				})
				return
			}

			router.push(`/reset-code?e0=${encrypt(
				"f",
				form?.getValues('email')
			)}`);


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
			<div className="w-[300px] space-y-3 mb-5">
				<h2 className="text-lg font-bold">Réinitialisation du mot de passe</h2>
				<p className="text-sm">Saisissez l'adresse e-mail associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
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

					<Button
						disabled={form.formState.isSubmitting}
						type="submit"
					>
						{form.formState.isSubmitting ? <Loading /> : 'Continuer'}
					</Button>
				</form>
			</Form>

			<div className="w-[300px] my-5">

				<Link className="text-sm" href={`/login`}>
					Revenir à la page de connexion
				</Link>
			</div>


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
