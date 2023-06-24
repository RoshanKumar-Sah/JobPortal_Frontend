import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { Exo_2, Work_Sans } from 'next/font/google'
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";
import ProtectedPageLoginSignup from "@/components/ProtectedPageLoginSignup";


const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })


function EmployerLogin() {

    const dispatch = useDispatch()
    const router = useRouter()
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [error, setError] = useState({})
    let [submitting, setSubmitting] = useState(false)

    function handleSubmit(event) {

        event.preventDefault()



        let validation = true

        let temp = {}

        if (!email) {
            temp.email = "Email field required"
            validation = false
        }

        if (!password) {
            temp.password = "Password field required"
            validation = false
        }

        setError(temp)

        if (validation) {
            setSubmitting(true)

            axios.post(`${URL_Domain}/loginEmployer`
                , {
                    email: email,
                    password: password
                }
            ).then(res => {
                // console.log(res.data.temp);
                // console.log(res.data.token);
                setSubmitting(false)
                let temp = { ...res.data.temp, role: "employer" }
                localStorage.setItem("employer_token", res.data.token)
                // console.log(temp);
                router.push(`/`)
                dispatch(setUser(temp))

            }).catch(err => {
                console.log(err.response.data.msg);
                toast.error(err.response.data.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
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
                        <h2 className={`text-center font-bold ${exo2.className} text-3xl text-header  px-2`}>Log In As Recruiter</h2>
                        <hr className="mt-2 border border-primary-dark" />
                    </div>

                    <div className="bg-white w-full md:w-2/5 rounded-md">
                        <form className="px-8 py-16" onSubmit={handleSubmit}>
                            <label className={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2 ${exo2.className}`}>Email</label>
                            <input type="email" placeholder="info@example.com" className="outline-none border rounded-md px-5 py-2 w-full" value={email} onChange={(event) => {
                                setEmail(event.target.value)

                                if (event.target.value) {
                                    setError({ ...error, email: "" })
                                } else {
                                    setError({ ...error, email: "Email field required" })
                                }
                            }} />

                            {error.email && <small className="text-red-500">{error.email}</small>}

                            <label className={`${exo2.className} after:content-['*'] after:ml-0.5 after:text-red-500 block text-header font-medium text-base mb-2 mt-8`}>Password</label>
                            <input type="password" placeholder="Password" className="outline-none border rounded-md px-5 py-2 w-full" value={password} onChange={(event) => {
                                setPassword(event.target.value)

                                if (event.target.value) {
                                    setError({ ...error, password: "" })
                                } else {
                                    setError({ ...error, password: "Password field required" })
                                }
                            }} />

                            {error.password && <small className="text-red-500">{error.password}</small>}
                            <button type="submit" disabled={submitting} className="disabled:bg-black/70 flex gap-2 w-full h-fit justify-center items-center border border-black bg-primary-dark py-2 px-7 text-white hover:text-primary-dark hover:bg-white mt-8 rounded-md">Log In {submitting && <TailSpin
                                height="20"
                                width="20"
                                color="#ffffff"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />}</button>

                            <p className={`pt-6 ${workSans.className} font-medium text-lg text-primary-tint`}>Don't have an account? <Link href={"/employers/signup"} className={`${exo2.className} text-primary-dark`}>Signup</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
        <ToastContainer />

    </>
}


export default ProtectedPageLoginSignup(EmployerLogin)