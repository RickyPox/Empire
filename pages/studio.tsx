import Navbar from "@/components/Navbar";
import StudioDesktop from "@/components/StudioDesktop";
import StudioMobile from "@/components/StudioMobile";
import StudioForm from "@/components/StudioForm";
import Head from "next/head";

export default function Studio() {

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="max-w-[1920px]">
                <Head>
                    <title>Empire</title>
                    <link rel="icon" sizes="16x16" href="/Logo.png" />
                </Head>
                <Navbar></Navbar>
                <section className="flex flex-col items-center justify-center mt-[50px] lg:mt-[150px]">
                    <div className="relative">
                        <h3 className="uppercase glow text-[190px] font-[Thunder-Bold] lg:block hidden">Find Your Artist</h3>
                        <h3 className="uppercase glow text-[120px] font-[Thunder-Bold] block lg:hidden text-center">Find <span className="block -mt-[30%]">Your</span><span className="block -mt-[30%]">Artist</span></h3>
                    </div>
                </section>
                <section>
                        <StudioForm></StudioForm>
                    </section>
                <section className="hidden lg:block mb-[100px]">
                    <StudioDesktop></StudioDesktop>
                </section>
                <section className="lg:hidden block">
                    <StudioMobile></StudioMobile>
                </section>
            </div>
        </div>
    );
}
