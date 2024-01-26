import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const navigation = [
        {
            name: "DAO",
            href: "#",
            disabled: false 
        },
        {
            name: "SYNDICATE",
            href: "#",
            disabled: false 
        },
        {
            name: "STUDIO",
            href: "#",
            disabled: false 
        },
        {
            name: "IP",
            href: "#",
            disabled: true 
        },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <div className={`${isMenuOpen ? "pt-[30px]": "pt-[0px]"}`}>
            <div className="flex lg:justify-evenly justify-between items-center px-[30px] lg:px-0 absolute w-screen h-[150px]">
                <div>
                    <img className="lg:w-auto w-[28px]" src="/Logo.png" alt="Logo" />
                </div>
                <div onClick={handleMenuOpen} className="lg:hidden col-start-4">
                    <img src="/Menu.png"></img>
                </div>
                    {navigation.map((item, index) => (
                        <div className={`navbarItem lg:block hidden`} key={index}>
                            {item.disabled ? (
                                <div className="flex">
                                    <div className="flex items-center justify-center relative">
                                        <Link href={item.href}>
                                            <h3>{item.name}</h3>
                                        </Link>
                                        <div className="absolute">
                                            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="34" cy="34" r="33" stroke="#FDFDFD" stroke-width="2"/>
                                                <path d="M9.37939 11.1379L56.8622 58.6207" stroke="#FDFDFD" stroke-width="2"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link href={item.href}>
                                    <h3>{item.name}</h3>
                                </Link>
                            )}
                        </div>
                    ))}
            </div>

            {/* MOBILE MENU */}
            <div className="lg:hidden fixed z-20">
            <div onClick={handleMenuOpen} className={`${isMenuOpen ? "flex":"hidden"} z-10 fixed  w-screen justify-end px-[50px]`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L18.5 18.5" stroke="#FDFDFD" stroke-width="2"/>
                        <path d="M18.5 1L0.999999 18.5" stroke="#FDFDFD" stroke-width="2"/>
                    </svg>
                </div>
                <div className={`${isMenuOpen ? "flex":"hidden"} flex-col gap-[100px] justify-center items-center bg-black h-screen w-screen fixed top-0`}>
                    {navigation.map((item, index) => (
                        <div className={`navbarItem`} key={index}>
                            {item.disabled ? (
                                <div className="flex">
                                    <div className="flex items-center justify-center relative">
                                        <Link href={item.href}>
                                            <h3>{item.name}</h3>
                                        </Link>
                                        <div className="absolute">
                                            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="34" cy="34" r="33" stroke="#FDFDFD" stroke-width="2"/>
                                                <path d="M9.37939 11.1379L56.8622 58.6207" stroke="#FDFDFD" stroke-width="2"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link href={item.href}>
                                    <h3>{item.name}</h3>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>    
            </div>
        </div>
    );
}
