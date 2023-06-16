import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Exo_2, Work_Sans } from 'next/font/google'
import Link from "next/link";

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })
export default function ClientLogin(){
return<>
    <Header />

    <section>
    <div className="bg-tertiary">
        <div className="container pt-24 pb-24 flex flex-col items-center gap-20">

            <div>
            <h2 className={`text-center font-bold ${exo2.className} text-3xl text-header  px-2`}>Log In As Job Seeker!</h2>
            <hr className="mt-2 border border-primary-dark" />
            </div>

            <div className="bg-white w-full md:w-2/5 rounded-md">
<form className="px-8 py-16">
<label className={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2 ${exo2.className}`}>Email</label>
    <input type="email" placeholder="info@example.com" className="outline-none border rounded-md px-5 py-2 w-full mb-8" />

    <label className={`${exo2.className} after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2`}>Password</label>
    <input type="password" placeholder="Password" className="outline-none border rounded-md px-5 py-2 w-full mb-8" />

    <button type="submit" className="flex w-full h-fit justify-center items-center border border-black bg-primary-dark py-2 px-7 text-white hover:text-primary-dark hover:bg-white mt-5 rounded-md">Log In</button>

    <p className={`pt-6 ${workSans.className} font-medium text-lg text-primary-tint`}>Don't have an account? <Link href={"/candidates/signup"} className={`${exo2.className} text-primary-dark`}>Signup</Link></p>
</form>
            </div>
        </div>
        </div>
    </section>
    
<Footer />

</>
}