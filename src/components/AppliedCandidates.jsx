import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Exo_2, Work_Sans } from 'next/font/google'
import Footer from "@/components/Footer";
import ProtectedPage from "@/components/ProtectedPage";
import DefaultProfile from "@/assets/default_profile_avatar.jpg"
import { useSelector } from "react-redux";
import { CountUp } from 'use-count-up'

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })




export default function AppliedCandidates() {

    let [appliedCandidates, setAppliedCandidates] = useState([])

    let user = useSelector((redux_store) => {
        return redux_store.user.value
    })

    useEffect(() => {
        if (localStorage.getItem("employer_token")) {
            axios.get(`${URL_Domain}/emp/apply_job`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("employer_token")
                }
            }).then(res => {
                console.log(res.data);
                setAppliedCandidates(res.data)
            }).catch(err => {
                console.log(err);
            })
        }
    }, [])

    return <>


        <section>
            <div className="bg-white">

                <div className="container flex justify-center py-14">


                    <div className="flex flex-col-reverse gap-4 bg-white  px-8 w-full   items-start">



                        {
                            appliedCandidates.map(el => {
                                let deadline_date = new Date(el.deadline)
                                let applied_date = new Date(el.applied_date)
                                let options = { day: "2-digit", month: "long", year: "numeric" };
                                let deadline_formatted = deadline_date.toLocaleDateString("en-US", options);
                                let applied_formatted = applied_date.toLocaleDateString("en-US", options);
                                return (


                                    <div key={el._id} className="border w-full shadow-sm hover:border-primary-dark hover:bg-tertiary p-2 flex flex-col gap-4  md:flex-row justify-between md:px-8 md:items-center">
                                        <div className="sm:w-1/3">
                                            <h2 className={`text-lg font-semibold text-primary-dark ${exo2.className} capitalize`}>{el.applicantName}</h2>
                                            <ul className={`text-primary-tint font-medium text-base ${workSans.className}`}>
                                                <li> {el.applicantEmail}</li>
                                                <li> {el.applicantPhone}</li>
                                            </ul>

                                        </div>

                                        <div className="sm:w-1/3">
                                            <ul className={`text-primary-tint font-medium text-base ${exo2.className}`}>
                                                <li ><span className={`text-primary-dark`}>Applied On:</span> {applied_formatted}</li>
                                                <li><span className={`text-primary-dark`}>Deadline:</span> {deadline_formatted}</li>

                                            </ul>
                                        </div>

                                        <div className="sm:w-1/3">
                                            <ul className={`text-primary-tint font-medium text-base ${workSans.className} capitalize`}>
                                                <li><span className={`${exo2.className} text-primary-dark text-lg font-semibold`}>{el.job}</span></li>
                                                <li><span className={`${exo2.className}`}>Category:</span> {el.category[0]}</li>
                                                <li><span className={`${exo2.className}`}>Type:</span> {el.type[0]}</li>
                                                <li><span className={`${exo2.className}`}>Level:</span> {el.level[0]}</li>
                                            </ul>

                                        </div>


                                    </div>
                                )

                            })
                        }

                        <h2 className={`${exo2.className} font-semibold text-header text-lg my-8`}>New Applied List:</h2>




                        {/* <h2 className={`text-lg font-semibold text-primary-dark ${exo2.className}`}>Total Applied Candidates : {appliedCandidates.length}</h2> */}

                    </div>
                </div>
            </div>
        </section>



    </>
}



