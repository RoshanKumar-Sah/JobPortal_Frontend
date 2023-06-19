import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Exo_2, Work_Sans } from 'next/font/google'
import Footer from "@/components/Footer";
import ProtectedPage from "@/components/ProtectedPage";

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })




function AppliedCandidates() {

    let [appliedCandidates, setAppliedCandidates] = useState([])

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
        <Header />

        <section>
            <div className="bg-tertiary">

                <div className="container flex justify-center py-28">


                    <div className="flex flex-col-reverse gap-4 bg-white py-8 px-8 w-full md:w-2/4 items-center">
                        {
                            appliedCandidates.map(el => {
                                let deadline_date = new Date(el.deadline)
                                let applied_date = new Date(el.applied_date)
                                let options = { day: "2-digit", month: "long", year: "numeric" };
                                let deadline_formatted = deadline_date.toLocaleDateString("en-US", options);
                                let applied_formatted = applied_date.toLocaleDateString("en-US", options);
                                return (


                                    <div key={el._id} className="border w-full  border-primary-dark">


                                        <div className="flex items-center gap-4">

                                            <div className="w-full">
                                                <h2 className={`text-lg font-semibold text-primary-dark ${exo2.className} capitalize`}>Applicant: {el.applicantName}</h2>
                                                <ul className={`text-primary-tint font-medium text-base ${workSans.className}`}>

                                                    <li className="capitalize"><span className={`${exo2.className}`}>Title:</span> {el.job}</li>
                                                    <li className="capitalize"><span className={`${exo2.className}`}>Category:</span> {el.category[0]}</li>
                                                    <li className="capitalize"><span className={`${exo2.className}`}>Type:</span> {el.type[0]}</li>
                                                    <li className="capitalize"><span className={`${exo2.className}`}>Level:</span> {el.level[0]}</li>
                                                    <li className="text-green-400"><span className={`${exo2.className}`}>Applied On:</span> {applied_formatted}</li>
                                                    <li className="text-red-400"><span className={`${exo2.className}`}>Deadline:</span> {deadline_formatted}</li>
                                                    <li><span className={`${exo2.className}`}>Email:</span> {el.applicantEmail}</li>
                                                    <li><span className={`${exo2.className}`}>Phone:</span> {el.applicantPhone}</li>
                                                </ul>

                                            </div>

                                        </div>
                                    </div>
                                )

                            })
                        }

                        <h2 className={`text-lg font-semibold text-primary-dark ${exo2.className}`}>Total Applied Candidates : {appliedCandidates.length}</h2>

                    </div>
                </div>
            </div>
        </section>

    </>
}



export default ProtectedPage(AppliedCandidates, "employer")