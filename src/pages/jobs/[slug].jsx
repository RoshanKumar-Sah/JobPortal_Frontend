import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import DefaultProfile from "@/assets/default_profile_avatar.jpg"
import DefaultCover from "@/assets/default_cover.jpg"
import Image from "next/image";
import { Exo_2, Work_Sans } from 'next/font/google'
import Footer from "@/components/Footer";

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })


export default function SingleJob({ job }) {

    // console.log(job);

    let { _id, title, number_of_vacancy, type, job_level, location, offered_salary, deadline, EmpName, EmpWebsite, EmpContact, EmpDescription, createdAt, description, category, profile_image, cover_image } = job;


    const deadlineDate = new Date(deadline)
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const deadline_formatted = deadlineDate.toLocaleDateString("en-US", options);
    const createdAtDate = new Date(createdAt)
    const createdAt_formatted = createdAtDate.toLocaleDateString("en-US", options);

    // const router = useRouter()

    // const [job, setJob] = useState({})

    // useEffect(()=>{


    //     axios.get(`${URL_Domain}/jobs/${router.query.slug}`).then(res=>{
    //         console.log(res.data[0]);
    //         setJob(res.data[0])
    //     }).catch(err =>{

    //     })

    // },[])
    return <>
        <Header />

        <section>
            <div className="bg-tertiary">
                <div className="container mt-28 pt-14 pb-14">
                    <div className="grid md:grid-cols-4 gap-8 justify-center">

                        <div className="relative border border-primary-tint/50 rounded-md">
                            <div className="w-full h-full p-4">
                                {cover_image ? <Image src={cover_image} height={200} width={200} className='w-full h-full object-fill rounded-md' alt='cover_image' /> :

                                    <Image src={DefaultCover} height={200} width={200} className='w-full h-full object-cover rounded-md' alt='default_cover' />
                                }
                            </div>
                            <div className="w-28 h-28 absolute bottom-0 left-0">
                                {
                                    profile_image ? <Image src={profile_image} height={200} width={200} className='w-full h-full object-fill rounded-full' alt='profile_image' /> :

                                        <Image src={DefaultProfile} className='w-full h-full rounded-full' alt='default_profile' />
                                }
                            </div>
                        </div>

                        <div>
                            <h5 className={`text-lg font-semibold text-primary-dark ${exo2.className} capitalize`}>{title}</h5>
                            <div className={`${workSans.className} text-sm text-primary-tint font-normal capitalize mt-4`}>
                                <p>{EmpName}</p>

                                <p>{EmpContact}</p>
                                <p className="lowercase">{EmpWebsite}</p>
                                <p>{EmpDescription}</p>
                            </div>

                        </div>


                        <div>
                            <h2 className={`text-lg font-semibold text-primary-dark ${exo2.className} capitalize`}>Job Summary</h2>
                            <div className="border-t-2 border-primary-dark mt-4 pt-4">
                                <ul className={`text-primary-tint font-medium text-base ${exo2.className} `}>
                                    <li>Category: <span className={`text-primary-dark capitalize ${workSans.className}`}>{category[0]}</span></li>
                                    <li>Salary: <span className={`text-primary-dark ${workSans.className}`}>Rs. {offered_salary}</span> <span className='font-normal'>/ Per Month</span></li>
                                    <li>Location: <span className={`text-primary-dark capitalize ${workSans.className}`}>{location}</span></li>
                                    <li>Vacancy: <span className={`text-primary-dark ${workSans.className}`}>{number_of_vacancy}</span></li>
                                    <li>Deadline: <span className={`text-primary-dark ${workSans.className}`}>{deadline_formatted}</span></li>
                                    <li>Posted On: <span className={`text-primary-dark ${workSans.className}`}>{createdAt_formatted} </span></li>
                                    <li>Job Level: <span className={`text-primary-dark capitalize ${workSans.className}`}>{job_level}</span></li>
                                    <li>Type: <span className={`text-primary-dark capitalize ${workSans.className}`}>{type}</span></li>
                                </ul>
                            </div>
                        </div>


                        <div className="flex justify-center items-center">
                            <button type="button" className='flex w-fit h-fit py-2 px-7 justify-center items-center border border-black bg-primary-dark group hover:bg-white text-white hover:text-primary-dark'>
                                Apply Now
                            </button>
                        </div>
                    </div>



                </div>
            </div>
            <div className="container pt-14 pb-28">
                <p>{description}</p>
            </div>
        </section>

        <Footer />
    </>
}


export async function getServerSideProps(ctx) {

    let res = await axios.get(`${URL_Domain}/jobs/${ctx.query.slug}`)

    return {
        props: {
            job: res.data[0]
        }
    }
}