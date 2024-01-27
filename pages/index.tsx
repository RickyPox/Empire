import LandingPage from "@/components/Landing";
import Navbar from "@/components/Navbar";
import Head from "next/head";



export default function Home() {
  return (
    <div className="max-w-[1920px]">
      <Head><title>Empire</title></Head>
      <section>
        <Navbar></Navbar>
      </section>
      <section className="lg:px-[50px]">
      <LandingPage></LandingPage>
      </section>
    </div>
  );
}
