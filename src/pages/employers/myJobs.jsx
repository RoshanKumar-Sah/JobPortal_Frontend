import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { useEffect, useState } from "react";
import JobListing from "@/components/JobListing";
import Footer from "@/components/Footer";

export default function EmployerJobs(){

let[jobs, setJobs] = useState([])
let[metadata, setMetadata] = useState([])

    useEffect(()=>{

        if(localStorage.getItem("employer_token"))
        axios.get(`${URL_Domain}/empJobs`, {
            headers:{
                Authorization: "Bearer "+localStorage.getItem("employer_token")
            }
        }).then(res =>{
            // console.log(res.data[0].jobs);
            setJobs(res.data[0].jobs)
            // console.log(res.data[0].meta_data);
            setMetadata(res.data[0].meta_data)
        }).catch(err =>{
            // console.log(err);
        })
    },[])

return<>
    <Header />

    
        
        <JobListing jobs={...jobs} metadata={...metadata} />
     
    <Footer />
    </>
}