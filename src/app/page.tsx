"use server";


import { getUser } from "@/api/auth";
import Loading from "@/components/global/loading";
import { redirect } from "next/navigation";


export default async function Home() {

  const response = await getUser();

  if(!response.success) {
    redirect('/login');
  }


  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <Loading />
    </div>
  );
}
