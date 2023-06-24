import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { useEffect, useState } from "react";
import JobListing from "@/components/JobListing";
import Footer from "@/components/Footer";
import ProtectedPage from "@/components/ProtectedPage";
import { useRouter } from "next/router";

function EmployerJobs() {

    let [jobs, setJobs] = useState([])
    let [metadata, setMetadata] = useState([])

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

            axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("employer_token")
                }
            }).then(res => {
                // console.log(res.data[0].jobs);
                setJobs(res.data[0].jobs)
                // console.log(res.data[0].meta_data);
                setMetadata(res.data[0].meta_data)
            }).catch(err => {
                // console.log(err);
            })
    }, [url])

    return <>
        <Header />



        <JobListing jobs={...jobs} metadata={...metadata} />

        <Footer />
    </>
}


export default ProtectedPage(EmployerJobs, "employer")