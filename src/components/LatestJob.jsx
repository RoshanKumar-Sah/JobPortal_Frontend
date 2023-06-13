import { useEffect, useState } from "react";
import JobCard from "./JobCard";

import { Exo_2 } from 'next/font/google'
import axios from "axios";
import { URL_Domain } from "@/const/api_domain";
const exo2 = Exo_2({ subsets: ['latin'] })

export default function LatestJob() {


    const [jobs, setJob] = useState([])

    useEffect(() => {
        axios.get(URL_Domain + "/jobs/?per_page=6").then(
            res => {
                // console.log(res);
                // console.log(res.data[0].jobs);
                setJob(res.data[0].jobs)
            }
        ).catch(err => {
            console.log(err);
        })
    }, [])

    return <>
        <section className='mt-14'>
            <div className='bg-tertiary'>
                <div className='container pt-28 pb-28'>
                    <h2 className={`text-5xl font-semibold text-header ${exo2.className} text-center`}>Latest Jobs</h2>
                    <div className="flex justify-end">
                        <div className="bg-primary-dark text-white w-fit mt-14 rounded-md"><p className="py-3 px-5">Explore All Jobs</p></div>
                    </div>
                    <div className="grid  mt-14 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4">

                        {
                            jobs.map(job => {
                                return (
                                    <JobCard key={job._id} job={job} />
                                )
                            })
                        }

                    </div>



                </div>



            </div>
        </section>
    </>
}