import DaoForm from "@/components/DaoForm";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function DAO () {
    return(
        
        <div className="max-w-[1920px]">
            <Head>
                <title>Empire</title>
                <link rel="icon" sizes="16x16" href="/Logo.png" />
            </Head>
            <Navbar></Navbar>
            <section className="flex flex-col items-center justify-center w-screen mt-[50px] lg:mt-[150px]">
                <div className="relative">
                    <h3 className="uppercase glow text-[190px] font-[Thunder-Bold] lg:block hidden">Become an Icon</h3>
                    <h3 className="uppercase glow text-[120px] font-[Thunder-Bold] block lg:hidden mb-[20px]">Become <span className="block -mt-[30%]" >an Icon</span></h3>
                </div>
                <DaoForm></DaoForm>
            </section>
        </div>
    )
}