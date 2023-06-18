import Image from "next/image"
import Link from "next/link"
import HeaderLogo from "@/assets/header_logo.svg"
import { Exo_2 } from 'next/font/google'
import Hamburger from 'hamburger-react';
import { useState } from "react";
import Nav from "./Nav";

const exo2 = Exo_2({ subsets: ['latin'] })

export default function Header() {


    const [isOpen, setOpen] = useState(false)



    return (
        <>
            <nav className={`text-lg ${exo2.className} border border-b-["0.5px"] border-primary-dark border-t-0 border-l-0 border-r-0 sticky top-0 bg-white z-50`}>
                <div className='container flex justify-between items-center'>
                    <Link href={"/"}><Image src={HeaderLogo} className="py-5" priority alt="headerLogo" /></Link>
                    <div className="md:hidden">
                        <Hamburger toggled={isOpen} toggle={setOpen} className="cursor-pointer absolute top-0 right-0" />
                    </div>
                    

                    {isOpen && <div className="absolute top-0 left-0 w-1/2  h-screen bg-[#E4E6E9] px-2 md:hidden">
                    <Link href={"/"}><Image src={HeaderLogo} className="pt-5" priority alt="headerLogo" /></Link>
                        <Nav />
                    </div>}

                    <div className="hidden md:flex md:gap-4 items-center justify-between w-2/3"><Nav /></div>
                </div>
            </nav>
        </>
    )
}