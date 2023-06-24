

import { Exo_2, Work_Sans } from 'next/font/google'
import JobCard from "@/components/JobCard";

import { useEffect, useState } from "react";

import { BsGridFill, BsList } from "react-icons/bs"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ProtectedComponent from './ProtectedComponent';
import { EMPLOYER } from "@/const/role"

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })


export default function JobComponent({ jobs, metadata }) {




    let user = useSelector((redux_store) => {
        return redux_store.user.value
    })



    const [cardView, setCardView] = useState("grid")

    const router = useRouter();





    // let queries = {}

    let [queries, setQueries] = useState({})
    let temp = { ...queries }


    function handleListView() {
        setCardView("list")
    }
    function handleGridView() {
        setCardView("grid")
    }


    let queryString = ``
    let arr = []

    // console.log(router.query);

    useEffect(() => {
        if (router.query) {
            setQueries(router.query)
        }
    }, [router.isReady])


    function handleChange(event) {


        temp[event.target.name] = event.target.value
        // console.log(queries);
        setQueries(temp)
        // arr = Object.entries(queries)
        // console.log(arr);

    }

    function handleSubmit(event) {
        event.preventDefault()

        queries["search_term"] = event.target.search_term.value

        console.log(queries);
        //     arr = Object.entries(queries)
        //     // console.log(arr);



        //     arr.forEach(el => {
        //         queryString += `${el[0]}=${el[1]}&`
        //     })
        //     //    console.log(queryString);
        //     router.push(`${router.route}?${queryString}`)



    }




    useEffect(() => {

        arr = Object.entries(queries)
        // console.log(arr);



        arr.forEach(el => {
            queryString += `${el[0]}=${el[1]}&`
        })
        //    console.log(queryString);
        router.push(`${router.route}?${queryString}`)

    }, [queries])

    // let arr = Object.entries(queries)
    // console.log(arr);


    // console.log(router);

    // console.log(metadata);

    let totalJob = 0
    let currentPage = 0
    let perPage = 0
    let totalPage = 0
    if (metadata) {
        totalJob = metadata[0]?.total
        currentPage = metadata[0]?.page
        perPage = metadata[0]?.per_page
        totalPage = Math.ceil(totalJob / perPage)


    }

    // console.log("total: ", totalJob);
    // console.log("page: ", currentPage);
    // console.log("perPage:", perPage);
    // console.log("totalPage", totalPage);


    return <>

        <section>
            <div className="bg-tertiary">
                <div className="container pt-28 pb-28">
                    {/* <form onSubmit={handleSubmit} className='flex justify-center mb-4' >
                        
                    </form> */}

                    <ProtectedComponent role={EMPLOYER}>
                        <div className='flex justify-center my-8 w-fit items-center border border-black bg-primary-dark group hover:bg-white'>
                            <Link href={"/employers/myJobs/postJob"} className="py-2 px-7 text-white group-hover:text-primary-dark">Post Job
                            </Link>
                        </div>
                    </ProtectedComponent>

                    <div className="flex justify-between flex-wrap">

                        <p className={`${workSans.className} font-medium text-base text-secondary`}>Showing results in {metadata[0]?.total} job list</p>
                        <div>



                            <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
                                <input type='text' name='search_term' placeholder='Job Title' className='border border-primary-tint p-1 px-5 outline-none'

                                    value={queries?.search_term}
                                    onChange={handleChange}
                                />

                                <button type='button' className='bg-primary-dark border border-primary-dark text-white p-2 hover:bg-white hover:text-primary-dark' onClick={() => {
                                    setQueries({ search_term: "", sort_by: "", per_page: 10 })
                                    router.push(router.route)
                                }}>Clear Filter</button>
                                <label className={`${exo2.className} font-medium text-xl text-primary-dark`}>Per Page:</label>
                                <select className="border border-primary-tint p-1 px-5 outline-none" name='per_page'
                                    value={queries?.per_page} defaultValue={10}
                                    onChange={
                                        handleChange
                                        // (event) => {
                                        // console.log(router)
                                        // router.push(`${router.route}?per_page=${event.target.value}`)
                                        // }
                                    }>
                                    <option value={3}>3</option>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>

                                <label className={`${exo2.className} font-medium text-xl text-primary-dark`}>Sort By:</label>
                                <select className="border border-primary-tint p-1 px-5 outline-none" name='sort_by'
                                    value={queries?.sort_by}
                                    onChange={
                                        handleChange
                                        //     (event) => {

                                        //     router.push(`${router.route}?sort_by=${event.target.value}`)
                                        // }
                                    } >
                                    <option value={""}>Default</option>
                                    <option value={"latest"}>Latest</option>
                                    <option value={"old"}>Old</option>
                                </select>
                                <p onClick={handleGridView} className="cursor-pointer"><BsGridFill className="inline-block h-8 w-8 text-header" /></p>
                                <p onClick={handleListView} className="cursor-pointer"><BsList className="inline-block h-8 w-8 text-header" /></p>
                            </form>

                        </div>

                    </div>

                    <div className={`flex flex-col gap-40 md:flex-row `}>

                        {/* <div className="mt-28">
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
                        </div> */}


                        <div className={`grid ${cardView != "grid" ? 'grid-cols-1 w-full' : 'sm:grid-cols-2 md:grid-cols-3'}   gap-4 mt-28`}>

                            {
                                jobs.map(job => {
                                    return (
                                        <JobCard key={job._id} job={job} view={cardView} />
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className='mt-8 flex justify-between relative'>

                        {
                            currentPage != 1 && <div className={`${exo2.className} bg-primary-dark border border-primary-dark text-white py-2 px-5 w-fit hover:bg-white hover:text-primary-dark`} onClick={() => {
                                let page = currentPage - 1
                                setQueries({ ...queries, "page": page })
                            }}> Prev <AiOutlineArrowLeft className='inline-block' /></div>
                        }



                        {
                            currentPage != totalPage && <div className={` absolute right-0 ${exo2.className} bg-primary-dark border border-primary-dark text-white py-2 px-5 w-fit hover:bg-white hover:text-primary-dark`} onClick={() => {
                                let page = currentPage + 1
                                setQueries({ ...queries, "page": page })
                            }}>Next <AiOutlineArrowRight className='inline-block' /></div>
                        }
                    </div>
                </div>
            </div>
        </section>

    </>

}