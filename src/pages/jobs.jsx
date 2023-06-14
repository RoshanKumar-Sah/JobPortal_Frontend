import Header from "@/components/Header";
import { useRouter } from "next/router";
import { Exo_2, Work_Sans } from 'next/font/google'
import JobCard from "@/components/JobCard";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { useState } from "react";
import Footer from "@/components/Footer";
import {BsGridFill, BsList} from "react-icons/bs"

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

export default function Jobs({jobs}) {

    const router = useRouter()
    // console.log(router);

    const[cardView, setCardView] = useState("grid")


    function handleListView(){
        setCardView("list")
    }
    function handleGridView(){
        setCardView("grid")
    }

    return <>

        <Header />


        <section>
        <div className="bg-tertiary">
        <div className="container pt-28 pb-28">
            <div className="flex justify-between flex-wrap">
                <p className={`${workSans.className} font-medium text-base text-secondary`}>Showing results in 200 job list</p>
                <div>
                <form className="flex gap-4 flex-wrap">
                    <label className={`${exo2.className} font-medium text-xl text-primary-dark`}>Per Page:</label>
                    <select className="border border-primary-tint p-1 px-5 outline-none">
                        <option>3</option>
                        <option>5</option>
                        <option>10</option>
                    </select>

                    <label className={`${exo2.className} font-medium text-xl text-primary-dark`}>Sort By:</label>
                    <select className="border border-primary-tint p-1 px-5 outline-none">
                        <option>Default</option>
                        <option>Latest</option>
                        <option>Old</option>
                    </select>
                    <p onClick={handleGridView} className="cursor-pointer"><BsGridFill className="inline-block h-8 w-8 text-header" /></p>
                <p onClick={handleListView} className="cursor-pointer"><BsList className="inline-block h-8 w-8 text-header" /></p>
                </form>
                
                </div>

            </div>

            <div className="flex flex-col gap-40 md:flex-row">

<div className="mt-28">
    <h2>Category</h2>
    <form className="mt-4">
    <div>
    <input type="checkbox" /><label> Frontend</label>
    </div>
    <div>
    <input type="checkbox" /><label> Backend</label>
    </div>
    <div>
    <input type="checkbox" /><label> Full Stack</label>
    </div>
    <div>
    <input type="checkbox" /><label> Graphics Desinger</label>
    </div>
    <div>
    <input type="checkbox" /><label> UI/UX Designer</label>
    </div>
        
        
       
        
        
    </form>
</div>


<div className={`grid ${cardView != "grid" ? 'grid-cols-1' : 'sm:grid-cols-2 md:grid-cols-2'}   gap-4 mt-28`}>

    {
        jobs.map(job=>{
           return(
            <JobCard key={job._id} job={job} view={cardView} />
           ) 
        })
    }

</div>
</div>



            </div>
            </div>
        </section>

        <Footer />


    </>
}


export async function getServerSideProps(){

    let url = `${URL_Domain}/jobs`
    let res = await axios.get(url +"?per_page=83")
    
// console.log(res.data[0].jobs);
    return{
        props:{
        jobs : res.data[0].jobs
        }
    }
}