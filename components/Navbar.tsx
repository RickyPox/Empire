import Link from "next/link";

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

    return (
        <div>
            <div className="grid grid-cols-9 items-center">
                <div className="col-start-2 col-span-2">
                    <img src="/Logo.png" alt="Logo" />
                </div>
                <div className="col-span-4 grid grid-cols-4">
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
