"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from "next/link";

import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { OtpFormSchema } from "@/lib/types";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import Loading from "@/components/global/loading";
import { useSearchParams } from "next/navigation";
import { signup } from "@/api/auth";
import { decrypt } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { handleOtpValidation } from "./actions";

type Props = {};

export default function OtpPage({ }: Props) {
	const [timer, setTimer] = useState(60);

	const { toast } = useToast();
	const router = useRouter();
	const searchParams = useSearchParams()

	const activation_token = searchParams.get('activation_token');
	const email = decrypt("f", searchParams.get('e0') || '');
	const name = decrypt("f", searchParams.get('n1') || '');
	const password = decrypt("f", searchParams.get('p2') || '');

	const form = useForm<z.infer<typeof OtpFormSchema>>({
		resolver: zodResolver(OtpFormSchema),
		mode: 'onChange',
		defaultValues: {
			activation_token: `${activation_token}`,
			activation_code: '',
		},
	});

	const handlResendCode = async () => {
		if (name && email && password) {
			await signup(name, email, password)
			setTimer(60)
		}
	}

		// console.log("routeroute", data)
		useEffect(() => {
			const timeout = setTimeout(() => {
				if (timer > 0) setTimer(timer - 1)
			}, 1000);
			return () => {
				if (timeout) {
					clearTimeout(timeout)
				}
			}
		}, [timer])

	return (
		<div className="w-[300px] space-y-3">
			<div className="w-[300px] space-y-3">
				<h2 className="text-lg font-bold">Nous vous avons envoyé un MAIL</h2>
			</div>

			<div className="w-[300px] space-y-3">
				<p className="text-sm">Pour continuer, saisissez le code de vérification à 4 chiffres envoyé à votre adresse email <b>{email}</b></p>
			</div>

			<div className="w-[300px] space-y-3">
				<p className="text-sm">Vous n'avez pas reçu de code ? {timer >0 ? <span>Renvoyer. ({timer})</span> :<Button onClick={handlResendCode} className="text-blue-600" variant={"ghost"}> Renvoyer.</Button>}</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleOtpValidation)}
					className="flex flex-col gap-6"
				>
					<FormField
						control={form.control}
						name="activation_code"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputOTP maxLength={4} {...field}>
										<InputOTPGroup className="w-full">
											<InputOTPSlot className="w-full" index={0} />
											<InputOTPSlot className="w-full" index={1} />
											<InputOTPSlot className="w-full" index={2} />
											<InputOTPSlot className="w-full" index={3} />
										</InputOTPGroup>
									</InputOTP>
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

			<div className="w-[300px]">
				<span className="text-sm">
					<Link href={`/register`}>
						<b>Retour</b>
					</Link>
				</span>
			</div>
		</div>
	);
}
