import { useRouter } from "next/router";
import Header from "@/components/Header";
import JobListing from "@/components/JobListing";
import Footer from "@/components/Footer";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";



export default function Jobs({ jobs, metadata }) {

    const router = useRouter()
    // console.log(router);



    return <>

        <Header />

        <JobListing jobs={...jobs} metadata={...metadata} />


        <Footer />


    </>
}


export async function getServerSideProps(ctx) {

    let url = `${URL_Domain}/jobs?`

    // console.log(ctx.query);
    let temp = Object.entries(ctx.query)
    // console.log(temp);
    temp.forEach(el => {
        url += `${el[0]}=${el[1]}&`
    })

    // console.log(url);
    let res = await axios.get(url)
    
    // console.log(res.data[0].jobs);
    return {
        props: {
            metadata: res.data[0].meta_data,
            jobs: res.data[0].jobs
        }
    }
}