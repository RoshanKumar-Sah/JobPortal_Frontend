import Header from "@/components/Header"
import ProtectedPage from "@/components/ProtectedPage"
import { Exo_2, Work_Sans } from 'next/font/google'
import { useState, useMemo, useEffect } from "react"
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

// export default 
function Upsert({ job }) {


    const router = useRouter()
    const [value, setValue] = useState('');


    let [minDate, setMinDate] = useState("")

    let [submitting, setSubmitting] = useState(false)

    let [error, setError] = useState({})

    let [stringProfile, setStringProfile] = useState(false)
    let [stringCover, setStringCover] = useState(false)

    // let [data, setData] = useState({
    //     title: "",
    //     location: "",
    //     category: "",
    //     job_level: "",
    //     number_of_vacancy: 0,
    //     offered_salary: 0,
    //     type: "",
    //     deadline: "",
    //     profile_image: "",
    //     cover_image: ""


    // })

    let [data, setData] = useState({})


    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);


    // let job = useSelector((redux_store) => {
    //     return redux_store.job.value
    // })



    useEffect(() => {

        // let temp = {...job}
        // console.log(temp);
        // if(job){
        //     // console.log(job);
        //     const date = new Date(job.deadline)
        //     console.log(date);

        //     const deadline_formatted = date?.toISOString().split('T')[0];
        //     //   console.log(deadline_formatted);

        //     job = {...job, deadline : deadline_formatted}
        // }



        let temp = { ...job }
        // console.log(temp);

        if (temp.description) {
            setValue(temp.description)
        }

        if (temp.deadline) {
            // console.log(job);
            const date = new Date(temp?.deadline)
            // console.log(date);
            const deadline_formatted = date.toISOString().split('T')[0];
            //   console.log(deadline_formatted);
            temp = { ...temp, deadline: deadline_formatted, description: "" }
        }

        if (temp.profile_image) {
            setStringProfile(true)
        }
        if (temp.cover_image) {
            setStringCover(true)
        }
        // console.log(temp);

        setData(temp)
        // console.log(job);
    }, [job])

    useEffect(() => {

        const currentDate = new Date();


        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;


        setMinDate(formattedDate);
    }, []);


    function handleSubmit(event) {
        event.preventDefault()


        let validation = true
        let temp = {}
        if (!data?.title) {
            temp.title = "Required field"
            validation = false
        }
        if (!data?.category) {
            temp.category = "Required field"
            validation = false
        }
        if (!data?.location) {
            temp.location = "Required field"
            validation = false
        }
        if (!data?.job_level) {
            temp.job_level = "Required field"
            validation = false
        }
        if (!data?.type) {
            temp.type = "Required field"
            validation = false
        }
        if (!data?.deadline) {
            temp.deadline = "Required field"
            validation = false
        }

        setError(temp)

        if (validation) {


            setSubmitting(true)

            let form_data = new FormData()
            form_data.append("title", data.title)
            form_data.append("location", data.location)
            form_data.append("category", data.category)
            form_data.append("job_level", data.job_level)
            form_data.append("number_of_vacancy", data.number_of_vacancy)
            form_data.append("offered_salary", data.offered_salary)
            form_data.append("type", data.type)
            form_data.append("deadline", data.deadline)


            // console.log(data.profile_image);

            if (stringProfile) {
                // if(typeof(profile_image) == "object"){
                form_data.append("profile_image", data.profile_image)
                // }

            } else {

                let temp_profile = [...data.profile_image]
                temp_profile.forEach(img => {

                    form_data.append("profile_image", img)
                })
            }

            // form_data.append("profile_image", data.profile_image)
            // form_data.append("cover_image", data.cover_image)


            if (stringCover) {
                // if(typeof(profile_image) == "object"){
                form_data.append("cover_image", data.cover_image)
                // }

            } else {

                let temp_cover = [...data.cover_image]
                temp_cover.forEach(img => {

                    form_data.append("cover_image", img)
                })
            }





            form_data.append("description", value)

            // console.log(form_data);

            let url = `${URL_Domain}/jobs`

            if (router.query.slug) {

                url = `${URL_Domain}/jobs/${router.query.slug}`

                axios.put(url, form_data, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("employer_token")
                    }

                }).then(res => {
                    // console.log(res);
                    setSubmitting(false)
                    router.push(`/jobs/${data._id}`)
                }).catch(err => {
                    // console.log(err);
                    setSubmitting(false)
                    toast.error(err.response.data.msg, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
                return;
            }

            axios.post(`${URL_Domain}/jobs`, form_data, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("employer_token")
                }
            }).then(res => {
                // console.log(res);
                toast.success("Job Posted", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setSubmitting(false)
            }).catch(err => {
                // console.log(err.response.data.msg);
                // console.log(err.response.data.errors);
                if (err.response.data.errors && err.response.data.errors.length) {
                    err.response.data.errors.forEach(el => {
                        toast.error(el.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });

                    })



                }


                setSubmitting(false)
            })
        }
    }


    function handleChange(event) {
        setData({ ...data, [event.target.name]: event.target.type == "file" ? event.target.files : event.target.value })

        if (!event.target.value)
            setError({ ...error, [event.target.name]: `Required field` })
        else {
            setError({ ...error, [event.target.name]: `` })
        }

        if (event.target.files) {
            if (event.target.name == "profile_image") {
                setStringProfile(false)
            }

            if (event.target.name == "cover_image") {
                setStringCover(false)
            }
        }
    }


    return <>
        <Header />


        <section>
            <div className="">
                <div className="container py-28">



                    <div className="flex flex-col items-center">

                        <div className="w-full">
                            <h2 className={`${exo2.className} font-semibold text-xl text-primary-dark`}>Job Information:</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-8 w-full mt-8">

                            <div>
                                <label className={`after:content-['*'] after:ml-0.5 after:text-red-500 ${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Job Title:</label>
                                <input type="text" name="title" placeholder="Job Title" className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    value={data?.title} onChange={handleChange}
                                />

                                {error.title && <small className="text-red-500">{error.title}</small>}
                            </div>
                            <div>
                                <label className={`after:content-['*'] after:ml-0.5 after:text-red-500 ${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Location:</label>
                                <input type="text" name="location" placeholder="Location" className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    value={data?.location} onChange={handleChange}
                                />
                                {error.location && <small className="text-red-500">{error.location}</small>}
                            </div>

                            <div>
                                <label className={`after:content-['*'] after:ml-0.5 after:text-red-500 ${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Job Category:</label>
                                <select name="category" className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    value={data?.category} onChange={handleChange}
                                >
                                    <option value={""}>Category</option>
                                    <option value={"frontend"}>Frontend Developer</option>
                                    <option value={"backend"}>Backend Developer</option>
                                    <option value={"full-stack"}>FullStack Developer</option>
                                    <option value={"graphics-designer"}>Graphics Designer</option>
                                    <option value={"uiux-designer"}>UI/UX Designer</option>
                                </select>
                                {error.category && <small className="text-red-500">{error.category}</small>}
                            </div>

                            <div>
                                <label className={`after:content-['*'] after:ml-0.5 after:text-red-500 ${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Job Level:</label>
                                <select name="job_level" className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    value={data?.job_level} onChange={handleChange}
                                >
                                    <option value={""}>Level</option>
                                    <option value={"fresher"}>Fresher</option>
                                    <option value={"junior"}>Junior</option>
                                    <option value={"mid"}>Mid</option>
                                    <option value={"senior"}>Senior</option>
                                </select>
                                {error.job_level && <small className="text-red-500">{error.job_level}</small>}
                            </div>

                            <div>
                                <label className={`${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Vacancies:</label>
                                <input type="number" name="number_of_vacancy" placeholder="Number" min={0} className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    value={data?.number_of_vacancy} onChange={handleChange}
                                />

                            </div>

                            <div>
                                <label className={`${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Salary:</label>
                                <input type="number" name="offered_salary" placeholder="Number" min={0} className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    value={data?.offered_salary} onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className={`after:content-['*'] after:ml-0.5 after:text-red-500 ${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Type:</label>
                                <select name="type" className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    value={data?.type} onChange={handleChange}>
                                    <option value={""}>Type</option>
                                    <option value={"top"}>Top</option>
                                    <option value={"hot"}>Hot</option>
                                    <option value={"featured"}>Featured</option>
                                    <option value={"normal"}>Normal</option>
                                </select>
                                {error.type && <small className="text-red-500">{error.type}</small>}
                            </div>

                            <div>
                                <label className={`after:content-['*'] after:ml-0.5 after:text-red-500 ${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Deadline:</label>
                                <input type="date" name="deadline" placeholder="YYYY-MM-DD" className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    value={data?.deadline} min={minDate} onChange={handleChange}
                                />
                                {error.deadline && <small className="text-red-500">{error.deadline}</small>}
                            </div>

                            <div>

                                <label className={`${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Profile Image:</label>
                                <input type="file" name="profile_image" placeholder="" className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    onChange={handleChange}

                                />

                            </div>
                            <div>
                                <label className={`${exo2.className} font-medium text-base text-primary-dark block mb-1`}>Cover Image:</label>
                                <input type="file" name="cover_image" placeholder="" className={`outline-none border ${workSans.className} text-base py-1 px-4 rounded-md w-full`}
                                    onChange={handleChange}
                                />
                            </div>

                            {
                                typeof (data.profile_image) == "string" ? <div className="relative">
                                    <Image src={data.profile_image} alt="profile_image" height={200} width={200} className="aspect_square" />
                                    <span className="bg-red-200 text-3xl text-red-500 absolute top-0" onClick={() => {
                                        setData({ ...data, profile_image: "" })
                                        setStringProfile(false)
                                    }}>X</span>
                                </div>
                                    :
                                    <div className="w-full">

                                    </div>

                            }
                            {
                                typeof (data.cover_image) == "string" ? <div className="relative">
                                    <Image src={data.cover_image} alt="cover_image" height={200} width={200} className="aspect-square" />
                                    <span className="bg-red-200 text-3xl text-red-500 absolute top-0" onClick={() => {
                                        setData({ ...data, cover_image: "" })
                                        setStringCover(false)
                                    }}>X</span>
                                </div>
                                    :
                                    <div className="w-full">

                                    </div>
                            }

                            {/* {
                                data?.profile_image && <Image src={data.profile_image} height={200} width={200} />
                            } */}

                            {/* {
                                data?.cover_image && <Image src={data.cover_image} height={200} width={200} />
                            } */}
                            <div className="sm:col-span-2 mb-4">
                                <ReactQuill theme="snow" value={value} onChange={setValue} style={{ height: '400px' }} />



                            </div>

                            <div>
                                <button type="submit" disabled={submitting} className={`disabled:bg-black/70 w-fit py-2 px-10 ${exo2.className} rounded-md mt-5 border border-primary-dark flex gap-2 justify-center items-center bg-primary-dark text-white hover:bg-white hover:text-primary-dark`}>Post
                                    {submitting && <TailSpin
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
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
        <ToastContainer />
    </>
}

export default ProtectedPage(Upsert, "employer")