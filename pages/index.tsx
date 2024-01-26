import LandingPage from "@/components/Landing";
import Navbar from "@/components/Navbar";
import Head from "next/head";



export default function Home() {
  return (
    <div>
      <Head><title>Empire</title></Head>
      <section>
        <Navbar></Navbar>
      </section>
   
    </div>
  );
}
