import Header from "@/components/Header";
import { useSelector } from "react-redux";
import { Exo_2, Work_Sans } from 'next/font/google'
import Image from "next/image";
import DefaultAvatar from "@/assets/default_profile_avatar.jpg"
import Footer from "@/components/Footer";

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })


export default function Profile() {

    let user = useSelector((redux_store) => {
        return redux_store.user.value
    })

    let user_arr = []
    if (user) {
        user_arr = Object.entries(user)
        // console.log(user_arr);


    }

    return <>
        <Header />
<section>
<div className="bg-tertiary">
<div className="container py-28 flex justify-center">
        <div className="sm:flex  justify-center w-full md:w-fit  gap-10 bg-white p-8 hover:border hover:border-primary-dark">
            <div className="h-[200px] w-[200px] mb-8 mx-4 sm:mb-0 border-primary-tint/50 border-4 rounded-md">
                <Image src={DefaultAvatar} className="h-full w-full aspect-square"  alt="defaultAvatar"/>

            </div>
            <form className="flex-col items-center">
                {
                    user_arr && user_arr.map((el, index) => {
                        return <div className="flex justify-between px-4 sm:gap-8" key={el[0] + el[1]}>
                            <label className={`after:content-[':'] after:ml-0.5 text-header font-medium text-base ${exo2.className} capitalize py-2`}>{el[0]}</label>
                            <input className="mb-5 outline-none border rounded-md px-5 py-2" disabled value={el[1]} />
                        </div>
                    })
                }
            </form>
        </div>
        </div>
        </div>
        </section>
        <Footer />
    </>
}