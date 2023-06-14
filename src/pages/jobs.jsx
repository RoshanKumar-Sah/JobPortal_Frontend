import { useRouter } from "next/router";
import Header from "@/components/Header";
import JobListing from "@/components/JobListing";
import Footer from "@/components/Footer";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";



export default function Jobs({ jobs }) {

    const router = useRouter()
    // console.log(router);



    return <>

        <Header />

        <JobListing jobs={...jobs} />


        <Footer />


    </>
}


export async function getServerSideProps(ctx) {

    let url = `${URL_Domain}/jobs`
    let res = await axios.get(url + "?per_page=83")
    // console.log(ctx);
    // console.log(res.data[0].jobs);
    return {
        props: {
            jobs: res.data[0].jobs
        }
    }
}