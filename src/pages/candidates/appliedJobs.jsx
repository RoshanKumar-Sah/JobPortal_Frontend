import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Exo_2, Work_Sans } from 'next/font/google'
import Footer from "@/components/Footer";
import ProtectedPage from "@/components/ProtectedPage";
import { useSelector } from "react-redux";
import DefaultProfile from "@/assets/default_profile_avatar.jpg"
import { CountUp } from 'use-count-up'
const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

function AppliedJobs() {


    let [appliedJobs, setAppliedJobs] = useState([])


    let user = useSelector((redux_store) => {
        return redux_store.user.value
    })

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
            <div className="bg-white">

                <div className="container flex justify-center py-28">


                    <div className="flex flex-col-reverse gap-4 bg-white  px-8 w-full   items-start">
                        {
                            appliedJobs.map(el => {
                                let deadline_date = new Date(el.deadline)
                                let applied_date = new Date(el.applied_date)
                                let options = { day: "2-digit", month: "long", year: "numeric" };
                                let deadline_formatted = deadline_date.toLocaleDateString("en-US", options);
                                let applied_formatted = applied_date.toLocaleDateString("en-US", options);
                                return (
                                    <div key={el._id} className="border w-full shadow-sm hover:border-primary-dark hover:bg-tertiary p-2 flex flex-col gap-4  md:flex-row justify-between md:px-8 md:items-center">
                                        <div className="sm:w-1/3">
                                            <div className="flex gap-2 items-center capitalize">
                                                <Image src={el.profileImg} width={200} height={200} className="w-14 h-14 sm:h-20 sm:w-20" alt="jobProfileImage" />

                                                <h2 >{el.applicantName}</h2>
                                                <ul className={`text-primary-tint ${workSans.className}`}>
                                                    <li className={`text-lg font-semibold text-primary-dark ${exo2.className}`}> {el.job}</li>
                                                    <li className={`text-sm font-normal`}>{el.employerName}</li>
                                                </ul>
                                            </div>


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







                                    /* <div className="flex items-center gap-4">
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

                                    </div> */
                                    /* </div> */
                                )

                            })
                        }
                        <h2 className={`${exo2.className} font-semibold text-header text-lg my-8`}>New Applied List:</h2>
                        <div className="flex flex-col md:flex-row gap-8 justify-center md:items-center md:justify-between h-fit w-full border shadow-md py-9 px-4  sm:px-9 sm:py-0 ">
                            <div className="flex items-center gap-8">
                                <div>
                                    <Image src={DefaultProfile} className='w-24 h-24 rounded-full' alt='default_profile' />
                                </div>
                                <div>
                                    <h2 className={`${workSans.className} font-semibold text-primary-tint text-lg mb-1`}>Hello,</h2>
                                    <h2 className={`${exo2.className} font-bold text-2xl text-primary-tint`}>{user.name}</h2>
                                </div>
                            </div>
                            <div className={`${exo2.className} font-bold text-2xl text-primary-tint flex gap-8`}>
                                <h2 className="">Total Applied</h2>

                                <CountUp isCounting start={0} end={appliedJobs.length} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        <Footer />
    </>
}


export default ProtectedPage(AppliedJobs, "client")