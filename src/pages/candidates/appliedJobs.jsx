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

function AppliedJobs() {


    let [appliedJobs, setAppliedJobs] = useState([])

    useEffect(() => {
        if (localStorage.getItem("client_token")) {
            axios.get(`${URL_Domain}/client/apply_job`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("client_token")
                }
            }).then(res => {
                console.log(res.data);
                setAppliedJobs(res.data)
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


                    <div className="flex  flex-col-reverse gap-4 bg-white py-8 px-8 md:w-2/4 items-center">
                        {
                            appliedJobs.map(el => {
                                let deadline_date = new Date(el.deadline)
                                let applied_date = new Date(el.applied_date)
                                let options = { day: "2-digit", month: "long", year: "numeric" };
                                let deadline_formatted = deadline_date.toLocaleDateString("en-US", options);
                                let applied_formatted = applied_date.toLocaleDateString("en-US", options);
                                return (


                                    <div key={el._id} className="border w-full  border-primary-dark">

                                        <div className="flex items-center gap-4">
                                            <div className="flex justify-center items-center">
                                                <Image src={el.profileImg} width={200} height={200} alt="jobProfileImage" />
                                            </div>
                                            <hr className="h-40 bg-primary-dark w-[2px]" />
                                            <div className="w-full">
                                                <h2 className={`text-lg font-semibold text-primary-dark ${exo2.className} capitalize`}>{el.job}</h2>
                                                <ul className={`text-primary-tint font-medium text-base ${workSans.className}`}>
                                                    <li className={`text-sm font-normal capitalize`}>{el.employerName}</li>
                                                    <li className="capitalize"><span className={`${exo2.className}`}>Category:</span> {el.category[0]}</li>
                                                    <li className="capitalize"><span className={`${exo2.className}`}>Type:</span> {el.type[0]}</li>
                                                    <li className="capitalize"><span className={`${exo2.className}`}>Level:</span> {el.level[0]}</li>
                                                    <li className="text-green-400"><span className={`${exo2.className}`}>Applied On:</span> {applied_formatted}</li>
                                                    <li className="text-red-400"><span className={`${exo2.className}`}>Deadline:</span> {deadline_formatted}</li>
                                                </ul>

                                            </div>

                                        </div>
                                    </div>
                                )

                            })
                        }
                        <h2 className={`text-lg font-semibold text-primary-dark ${exo2.className}`}>Total Applied Jobs : {appliedJobs.length}</h2>

                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
}


export default ProtectedPage(AppliedJobs, "client")