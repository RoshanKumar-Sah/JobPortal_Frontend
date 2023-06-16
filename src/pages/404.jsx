import Header from "@/components/Header";
import Image from "next/image";
import NotFoundImage from "@/assets/404.svg"
import Link from "next/link";
import Footer from "@/components/Footer";
import { Exo_2, Work_Sans } from 'next/font/google'

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

export default function NotFound(){
    return<>
        <Header />
        
        <section className="bg-tertiary">

        <div className="container py-28 flex flex-col items-center gap-7">

      
        <div>
        <Image src={NotFoundImage} />
        </div>
        <div className={`text-center ${workSans.className}`}>
            <h2 className={`font-medium text-4xl mb-5 text-header`}>Opps... Page Not Found</h2>
            <p className="font-normal text-xl text-secondary">Something went wrong, the page you're looking for doesn't seem to exist</p>
        </div>
        <div className='flex w-fit h-fit justify-center items-center border border-black bg-primary-dark group hover:bg-white mt-5'>
              <Link href={"/"} className="py-2 px-7 text-white group-hover:text-primary-dark">Go to Home</Link></div>
          
        </div>

        </section>

        <Footer />
    </>
}