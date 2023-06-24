import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { useEffect, useState } from "react";
import JobListing from "@/components/JobListing";
import Footer from "@/components/Footer";
import ProtectedPage from "@/components/ProtectedPage";
import { useRouter } from "next/router";
import { Bars } from 'react-loader-spinner'

function EmployerJobs() {

    let [jobs, setJobs] = useState([])
    let [metadata, setMetadata] = useState([])
    let [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    // console.log(router.query);

    let url = `${URL_Domain}/empJobs?`
    let temp = Object.entries(router.query)
    // console.log(temp);
    temp.forEach(el => {
        url += `${el[0]}=${el[1]}&`
    })

    useEffect(() => {

        if (localStorage.getItem("employer_token"))
        setIsLoading(true)
            axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("employer_token")
                }
            }).then(res => {
                // console.log(res.data[0].jobs);
                setJobs(res.data[0].jobs)
                // console.log(res.data[0].meta_data);
                setMetadata(res.data[0].meta_data)
                setIsLoading(false)
            }).catch(err => {
                // console.log(err);
                setIsLoading(false)
            })
    }, [url])

    return <>
        <Header />

{/* {
    isLoading && <div className="flex justify-center items-center  h-screen"><Bars
                height="80"
                width="80"
                color="#000000"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /></div>
} */}

        <JobListing jobs={...jobs} metadata={...metadata} isLoading ={isLoading} />

        <Footer />
    </>
}


export default ProtectedPage(EmployerJobs, "employer")