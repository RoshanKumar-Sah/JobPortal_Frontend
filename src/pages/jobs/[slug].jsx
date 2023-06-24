import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import DefaultProfile from "@/assets/default_profile_avatar.jpg"
import DefaultCover from "@/assets/default_cover.jpg"
import Image from "next/image";
import { Exo_2, Work_Sans } from 'next/font/google'
import { TailSpin } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import ProtectedComponent from "@/components/ProtectedComponent";
import { EMPLOYER } from "@/const/role";

import {FiGlobe} from "react-icons/fi"
import {AiOutlineContacts, AiOutlineEdit, AiOutlineDelete} from "react-icons/ai"
import {BsBodyText} from "react-icons/bs"


const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })


export default function SingleJob({ job }) {


    const router = useRouter()

    let user = useSelector((redux_store) => {
        return redux_store.user.value
    })

    // console.log(user);

    // console.log(job);

    let { _id, title, number_of_vacancy, type, job_level, location, offered_salary, deadline, EmpName, EmpWebsite, EmpContact, EmpDescription, createdAt, description, category, profile_image, cover_image } = job;


    const deadlineDate = new Date(deadline)
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const deadline_formatted = deadlineDate.toLocaleDateString("en-US", options);
    const createdAtDate = new Date(createdAt)
    const createdAt_formatted = createdAtDate.toLocaleDateString("en-US", options);

    let [submitting, setSubmitting] = useState(false)
    let [delSubmit, setDelSubmit] = useState(false)

    // const router = useRouter()

    // const [job, setJob] = useState({})

    // useEffect(()=>{


    //     axios.get(`${URL_Domain}/jobs/${router.query.slug}`).then(res=>{
    //         console.log(res.data[0]);
    //         setJob(res.data[0])
    //     }).catch(err =>{

    //     })

    // },[])



    function handleClick() {
        // console.log("apply");

        if (localStorage.getItem("client_token")) {
            setSubmitting(true)
            axios.post(`${URL_Domain}/apply_job/${_id}`, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("client_token")
                }
            }).then(res => {
                // console.log(res.data);

                if (res.data?.msg) {
                    toast.error(res.data.msg, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }

                if (res.data?.job) {
                    toast.success("Applied", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }



                setSubmitting(false)
            }).catch(err => {
                // console.log(err);
                setSubmitting(false)
            })

        } else {
            toast.error("Login to Apply", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

    }

    function handleDelete(){
        if (localStorage.getItem("employer_token")) {
            setDelSubmit(true)
            axios.delete(`${URL_Domain}/jobs/${_id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("employer_token")
                }
            }).then(res=>{
                // console.log(res.status , res.statusText);
                // toast.success("Deleted", {
                //     position: toast.POSITION.TOP_RIGHT
                // });
                router.push("/employers/myJobs")
                setDelSubmit(false)
            }).catch(err =>{
                console.log(err.response.data.msg);
                toast.error(err.response.data.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setDelSubmit(false)
            })
    }}

    return <>
        <Header />

        <section>
            <div className="bg-tertiary">
                <div className="container  pt-28 pb-14">
                    <div className="grid md:grid-cols-4 gap-8 justify-center">

                        <div className="relative border border-primary-tint/50 rounded-md bg-white">
                            <div className="w-full h-full p-4">
                                {cover_image ? <Image src={cover_image} height={200} width={200} className='w-full h-full  rounded-md' alt='cover_image' /> :

                                    <Image src={DefaultCover} height={200} width={200} className='w-full h-full rounded-md object-fill' alt='default_cover' />
                                }
                            </div>
                            <div className="w-28 h-28 absolute bottom-0 left-0">
                                {
                                    profile_image ? <Image src={profile_image} height={200} width={200} className='w-full h-full  rounded-full' alt='profile_image' /> :

                                        <Image src={DefaultProfile} className='w-full h-full rounded-full object-fill' alt='default_profile' />
                                }
                            </div>
                        </div>

                        <div>
                            <h5 className={`text-lg font-semibold text-primary-dark ${exo2.className} capitalize`}>{title}</h5>
                            <div className={`${workSans.className} text-sm text-primary-tint font-normal capitalize mt-4`}>
                                <p>{EmpName}</p>

                                <p><AiOutlineContacts className="inline-block" /> {EmpContact}</p>
                                <p className="lowercase"><FiGlobe className="inline-block" /> {EmpWebsite}</p>
                                <p><BsBodyText className="inline-block" /> {EmpDescription}</p>
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


                        <div className="flex justify-center gap-8 items-center">

                            {
                                user?.role != "employer" ? <button type="button" onClick={handleClick} disabled={submitting} className='disabled:bg-black/70 flex gap-2 w-fit h-fit py-2 px-7 justify-center items-center border border-black bg-primary-dark group hover:bg-white text-white hover:text-primary-dark'>
                                    Apply Now {submitting && <TailSpin
                                        height="20"
                                        width="20"
                                        color="#ffffff"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />}
                                </button>
                                    :
                                    <button type="button"  disabled={submitting} onClick={()=>{
                                       
                                        router.push(`/employers/myJobs/edit/${router.query.slug}`)
                                        
                                    }} className='disabled:bg-black/70 flex gap-2 w-fit h-fit py-2 px-7 justify-center items-center border border-black bg-primary-dark group hover:bg-white text-white hover:text-primary-dark'>
                                     <AiOutlineEdit className='inline-block' />   Edit
                                      {/* {submitting && <TailSpin
                                            height="20"
                                            width="20"
                                            color="#ffffff"
                                            ariaLabel="tail-spin-loading"
                                            radius="1"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                        />} */}
                                    </button>

                            }

                            <ProtectedComponent role={EMPLOYER}>
                            <button type="button" disabled={delSubmit} onClick={handleDelete} className='disabled:bg-black/70 flex gap-2 w-fit h-fit py-2 px-7 justify-center items-center border border-black bg-primary-dark group hover:bg-white text-white hover:text-primary-dark'>
                                     <AiOutlineDelete className="inline-block" />   Delete {delSubmit && <TailSpin
                                            height="20"
                                            width="20"
                                            color="#ffffff"
                                            ariaLabel="tail-spin-loading"
                                            radius="1"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                        />}
                                    </button>
                            </ProtectedComponent>


                        </div>
                    </div>


                    <hr className="h-1 w-full bg-black/50 mt-4" />
                </div>
                <div className="container pt-14 pb-28">
                    <h2 className={`text-lg font-semibold text-primary-dark ${exo2.className} mb-4`}>Job Description</h2>
                    <div dangerouslySetInnerHTML={{ __html: description }}>
                    </div>
                </div>
            </div>

        </section>

        <Footer />
        <ToastContainer />
    </>
}


export async function getServerSideProps(ctx) {

    let job = null
    try {

        let res = await axios.get(`${URL_Domain}/jobs/${ctx.query.slug}`)
        job = res.data[0]
    } catch (err) {
        return {
            notFound: true,
            props: {

            }
        }
    }


    return {
        props: {
            job
        }
    }
}