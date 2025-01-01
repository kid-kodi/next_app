"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpFormSchema, ResetCodeFormSchema } from "@/lib/types";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/global/loading";
import { useSearchParams } from "next/navigation";
import { forgot_password, reset_code } from "@/api/auth";
import { decrypt, encrypt } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {};

export default function ResetCodePage({ }: Props) {
	const [timer, setTimer] = useState(60);

	const { toast } = useToast();
	const router = useRouter();
	const searchParams = useSearchParams();

	const email = decrypt("f", searchParams.get("e0") || "");

	const form = useForm<z.infer<typeof ResetCodeFormSchema>>({
		resolver: zodResolver(ResetCodeFormSchema),
		mode: "onChange",
		defaultValues: {
			activation_code: "",
		},
	});

	const handlResendCode = async () => {
		if (email) {
			await forgot_password(email);
			setTimer(60);
		}
	};

	// console.log("routeroute", data)
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (timer > 0) setTimer(timer - 1);
		}, 1000);
		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [timer]);

	const onSubmit = async (values: z.infer<typeof ResetCodeFormSchema>) => {
		try {
			const { activation_code } = values;
			const response = await reset_code(activation_code);
			if (!response.success) {
				toast({
					variant: 'destructive',
					title: 'Oppse!',
					description: `${response.message}`,
				})
				return
			}

			router.push(
				`/reset-password?u0=${encrypt(
					"f",
					response.user._id
				)}`
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
		<div className="w-[300px] space-y-3">
			<div className="w-[300px] space-y-3">
				<h2 className="text-lg font-bold">Consultez votre messagerie</h2>
			</div>

			<div className="w-[300px] space-y-3">
				<p className="text-sm">
					Pour continuer, saisissez le code de vérification à 4 chiffres envoyé
					à votre adresse email <b>{email}</b>
				</p>
			</div>

			<div className="w-[300px] space-y-3">
				<p className="text-sm">
					Vous n'avez pas reçu de code ?{" "}
					{timer > 0 ? (
						<span>Renvoyer. ({timer})</span>
					) : (
						<Button
							onClick={handlResendCode}
							className="text-blue-600"
							variant={"ghost"}
						>
							{" "}
							Renvoyer.
						</Button>
					)}
				</p>
			</div>

			<div className="w-[300px]">
				<span className="text-sm">
					<Link href={`/forgot-password`}>
						<b>réessayez avec une autre adresse e-mail .</b>
					</Link>
				</span>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
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

					<Button disabled={form.formState.isSubmitting} type="submit">
						{form.formState.isSubmitting ? <Loading /> : "Continuer"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
