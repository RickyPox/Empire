import SyndicateForm from "@/components/SyndicateForm";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Syndicate () {
    return(
        
        <div className="max-w-[1920px]">
            <Head>
                <title>Empire</title>
                <link rel="icon" sizes="16x16" href="/Logo.png" />
            </Head>
            <Navbar></Navbar>
            <section className="flex flex-col items-center justify-center w-screen mt-[50px] lg:mt-[150px]">
                <div className="relative">
                    <h3 className="uppercase glow text-[190px] font-[Thunder-Bold] lg:block hidden">Secure Funding</h3>
                    <h3 className="uppercase glow text-[120px] font-[Thunder-Bold] block lg:hidden mb-[20px]">Secure <span className="block -mt-[30%]" >Funding</span></h3>
                </div>
                <SyndicateForm></SyndicateForm>
            </section>
        </div>
    )
}