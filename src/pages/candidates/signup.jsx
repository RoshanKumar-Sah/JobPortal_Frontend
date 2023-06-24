import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { Exo_2, Work_Sans } from 'next/font/google'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import ProtectedPageLoginSignup from "@/components/ProtectedPageLoginSignup";

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })


function ClientSignup() {

    const router = useRouter()

    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [phone, setPhone] = useState("")
    let [error, setError] = useState({})
    let [submitting, setSubmitting] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()


        let temp = {}

        let validation = true

        if (!name) {
            temp.name = "Name field required"
            validation = false

        }
        if (!phone) {
            temp.phone = "Phone field required"
            validation = false
        }
        if (!password) {
            temp.password = "Password field required"
            validation = false
        }
        if (!email) {
            temp.email = "Email field required"
            validation = false
        }

        setError(temp)


        if (validation) {
            setSubmitting(true)
            axios.post(`${URL_Domain}/signupClient`, {

                "name": name,
                "email": email,
                "password": password,
                "phone": phone

            }).then(res => {
                // console.log(res);
                setSubmitting(false)
                router.push("/candidates/login")

            })
                .catch(err => {
                    let arr = err.response.data.errors
                    // console.log(arr);
                    let temp = {}

                    if (err.response.data.errors && err.response.data.errors.length) {
                        err.response.data.errors.forEach(el => {
                            temp[el.parameter] = el.message


                            toast.error(el.message, {
                                position: toast.POSITION.TOP_RIGHT
                            });

                        })
                        setError(temp)


                    }




                    setSubmitting(false)
                })

        }





    }



    return <>
        <Header />

        <section>
            <div className="bg-tertiary">
                <div className="container pt-24 pb-24 flex flex-col items-center gap-20">

                    <div>
                        <h2 className={`text-center font-bold ${exo2.className} text-3xl text-header  px-2`}>Register As Job Seeker</h2>
                        <hr className="mt-2 border border-primary-dark" />
                    </div>

                    <div className="bg-white w-full md:w-2/5 rounded-md">
                        <form className="px-8 py-16" onSubmit={handleSubmit}>

                            <label htmlFor="name" className={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2 ${exo2.className}`}>Name</label>
                            <input type="text" name="name" placeholder="Full Name" className="outline-none border rounded-md px-5 py-2 w-full" value={name} onChange={(event) => {
                                setName(event.target.value)
                                if (event.target.value) {
                                    setError({ ...error, name: "" })
                                } else {
                                    setError({ ...error, name: "Name field is required" })
                                }
                            }} />

                            {error.name && <small className="text-red-500">{error.name}</small>}


                            <label htmlFor="phone" className={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2 ${exo2.className} mt-8`}>Phone</label>
                            <input type="tel" name="phone" minLength={10} maxLength={10} placeholder="Phone Number" className="outline-none border rounded-md px-5 py-2 w-full" value={phone} onChange={(event) => {
                                setPhone(event.target.value)
                                if (event.target.value) {
                                    setError({ ...error, phone: "" })
                                } else {
                                    setError({ ...error, phone: "Phone field is required" })
                                }
                            }} />

                            {error.phone && <small className="text-red-500">{error.phone}</small>}

                            <label htmlFor="email" className={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2 ${exo2.className} mt-8`}>Email</label>
                            <input type="email" name="email" placeholder="info@example.com" className="outline-none border rounded-md px-5 py-2 w-full" value={email} onChange={(event) => {
                                setEmail(event.target.value)
                                if (event.target.value) {
                                    setError({ ...error, email: "" })
                                } else {
                                    setError({ ...error, email: "Email field is required" })
                                }
                            }} />

                            {error.email && <small className="text-red-500">{error.email}</small>}

                            <label htmlFor="password" className={`${exo2.className} after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2  mt-8`}>Password</label>
                            <input type="password" name="password" placeholder="Password" className="outline-none border rounded-md px-5 py-2 w-full" value={password} onChange={(event) => {
                                setPassword(event.target.value)
                                if (event.target.value) {
                                    setError({ ...error, password: "" })
                                } else {
                                    setError({ ...error, password: "Password field is required" })
                                }
                            }} />

                            {error.password && <small className="text-red-500">{error.password}</small>}

                            <button type="submit" disabled={submitting} className="flex gap-2 disabled:bg-black/70 w-full h-fit justify-center items-center border border-black bg-primary-dark py-2 px-7 text-white hover:text-primary-dark hover:bg-white mt-8 rounded-md">Register {submitting && <TailSpin
                                height="20"
                                width="20"
                                color="#ffffff"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />}</button>

                            <p className={`pt-6 ${workSans.className} font-medium text-lg text-primary-tint`}>Already have an account? <Link href={"/candidates/login"} className={`${exo2.className} text-primary-dark`}>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>


        </section>

        <Footer />
        <ToastContainer />
    </>
}


export default ProtectedPageLoginSignup(ClientSignup)