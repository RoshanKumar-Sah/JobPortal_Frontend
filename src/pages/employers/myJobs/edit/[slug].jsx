import { useRouter } from "next/router";
import Upsert from "../postJob";
import { useEffect, useState } from "react";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";


import ProtectedPage from "@/components/ProtectedPage";


// export default 
function EditJob() {

    const router = useRouter()




    let [job, setJob] = useState({})

    // console.log(router.query.slug);
    // const dispatch = useDispatch()
    useEffect(() => {

        if (router.isReady) {

            axios.get(`${URL_Domain}/jobs/${router.query.slug}`)
                .then(res => {
                    // console.log(res.data[0]);
                    setJob(res.data[0])
                    // dispatch(setjob(res.data[0]))

                }).catch(err => {
                    console.log(err);

                })
        }

    }, [router.isReady])

    // console.log(job);

    return (
        <Upsert job={job} />
    )
    {/* <p>Hello</p> */ }

}


export default ProtectedPage(EditJob, "employer")