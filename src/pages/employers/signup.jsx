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

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })


export default function EmployerSignup() {

    const router = useRouter()

    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [website, setWebsite] = useState("")
    let [contact, setContact] = useState("")
    let [description, setDescription] = useState("")
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
        if (!contact) {
            temp.contact = "Contact field required"
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
            axios.post(`${URL_Domain}/signupEmployer`, {

                "name": name,
                "email": email,
                "password": password,
                "website": website,
                "contact": contact,
                "description": description

            }).then(res => {
                // console.log(res);
                setSubmitting(false)
                router.push("/employers/login")

            })
                .catch(err => {
                    let arr = err.response.data.errors
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
                        <h2 className={`text-center font-bold ${exo2.className} text-3xl text-header  px-2`}>Register As Recruiter</h2>
                        <hr className="mt-2 border border-primary-dark" />
                    </div>

                    <div className="bg-white w-full md:w-2/5 rounded-md">
                        <form className="px-8 py-16" onSubmit={handleSubmit}>

                            <label htmlFor="name" className={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2 ${exo2.className}`}>Name</label>
                            <input type="text" name="name" placeholder="Recruiter Name" className="outline-none border rounded-md px-5 py-2 w-full" value={name} onChange={(event) => {
                                setName(event.target.value)
                                if (event.target.value) {
                                    setError({ ...error, name: "" })
                                } else {
                                    setError({ ...error, name: "Name field is required" })
                                }
                            }} />

                            {error.name && <small className="text-red-500">{error.name}</small>}

                            <label htmlFor="contact" className={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2 ${exo2.className} mt-8`}>Contact</label>
                            <input type="text" name="contact" placeholder="Contact Details" className="outline-none border rounded-md px-5 py-2 w-full" value={contact} onChange={(event) => {
                                setContact(event.target.value)
                                if (event.target.value) {
                                    setError({ ...error, contact: "" })
                                } else {
                                    setError({ ...error, contact: "Contact field is required" })
                                }
                            }} />






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

                            <label htmlFor="website" className={`block text-header font-medium text-base mb-2 ${exo2.className} mt-8`}>Website</label>
                            <input type="url" name="website" placeholder="https://example.com" className="outline-none border rounded-md px-5 py-2 w-full" value={website} onChange={(event) => {
                                setWebsite(event.target.value)
                            }} />

                            <label htmlFor="description" className={`block text-header font-medium text-base mb-2 ${exo2.className} mt-8`}>Description</label>
                            <textarea name="description" placeholder="Text goes here..." className="outline-none border rounded-md px-5 py-2 w-full" value={description} onChange={(event) => {
                                setDescription(event.target.value)
                            }} />


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