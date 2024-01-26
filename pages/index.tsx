import LandingPage from "@/components/Landing";
import Navbar from "@/components/Navbar";
import Head from "next/head";



export default function Home() {
  return (
    <div>
      <Head><title>Empire</title></Head>
      <section className="mt-[100px]">
        <Navbar></Navbar>
      </section>
      <LandingPage></LandingPage>
    </div>
  );
}
