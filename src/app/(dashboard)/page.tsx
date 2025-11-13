import { HomeView } from "@/modules/home/ui/views/home-view";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

//import { HomeView } from "@/modules/home/ui/views/home-view";
import {caller} from "@/trpc/server";

// http://localhost:3000

const Page = async () => {
  //const data = await caller.hello({text: "Suprit Server"});
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session) {
    redirect("/sign-in");
  }

  //return <p>{data.greeting}</p>
  return <HomeView />;
};

export default Page;