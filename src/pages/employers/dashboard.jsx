import Header from "@/components/Header";
import { URL_Domain } from "@/const/api_domain";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { CountUp } from 'use-count-up'
import { Exo_2, Work_Sans } from 'next/font/google'
import Footer from "@/components/Footer";
import ProtectedPage from "@/components/ProtectedPage";



const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);


function Dashboard() {



    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedCurrentDate = `${year}-${month}-${day}`;

    // console.log(formattedCurrentDate);


    let [jobs, setJobs] = useState([])
    let [apply, setApply] = useState([])








    useEffect(() => {



        if (localStorage.getItem("employer_token")) {
            axios.get(`${URL_Domain}/empJobs?per_page=1000`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("employer_token")
                }
            }).then(res => {
                setJobs(res.data[0].jobs)



            }).catch(err => {
                console.log(err);
            })

            axios.get(`${URL_Domain}/emp/apply_job`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("employer_token")
                }
            }).then(res => {
                // console.log(res.data);
                setApply(res.data)

            }).catch(err => {
                console.log(err);
            })
        }





    }, [])



    let temp = [...jobs]
    let active = 0
    let inactive = 0
    if (temp) {
        temp.map((job, index) => {
            // console.log("hello");


            let date = new Date(job.deadline)
            // console.log(date);
            const deadline_formatted = date.toISOString().split('T')[0];
            // console.log(deadline_formatted);

            return job.deadline = deadline_formatted

        })

        jobs.forEach((job, index) => {
            if (job?.deadline < formattedCurrentDate) {
                inactive++;
            }
        })

        // console.log(inactive);

        active = jobs.length - inactive

        // console.log(active);

    }

    // setJobs([...temp])
    // let inactive = 0
    // jobs.forEach((job, index)=>{
    //     if(job.deadline < formattedCurrentDate){
    //         inactive++;
    //     }
    // })

    // console.log(inactive);

    // let active = jobs.length - inactive

    // console.log(active);


    let arr = [...apply]
    let cat = []
    let unique = []
    let repeatedCat = []

    let num = []

    if (arr) {

        arr.forEach((el, index) => {
            cat.push(el.category[0])


            cat.forEach(element => {
                if (!unique.includes(element)) {
                    unique.push(element);
                }
            });


            repeatedCat = unique.map((el, index) => {
                let catFilter = cat.filter(element => element == el).length
                return catFilter
            })

        })




    }

    console.log(cat);
    console.log(unique);
    console.log(repeatedCat);



    const pieData = {
        labels: ['Inactive', 'Active'],
        datasets: [
            {
                label: '# of Votes',
                data: [inactive, active],
                backgroundColor: [
                    "rgba(255, 0, 51,0.4)",
                    "rgba(0, 255, 110, 0.4)"


                ],
                borderColor: [
                    "rgba(255, 0, 51,0.4)",
                    "rgba(0, 255, 110, 0.4)"
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Applied Candidates With Respect to Category',
            },
        },
    };

    const labels = [...unique]

    const Bardata = {
        labels,
        datasets: [
            {
                label: 'Candidates',
                data: repeatedCat,
                backgroundColor: "rgba(0, 255, 110, 0.4)",
            }
        ],
    };

    return (<>
        <Header />
        <section>
            <div className="bg-tertiary pt-28 pb-28">
                <div className="container">
                    <div className="flex gap-20 items-center justify-center md:justify-between sm:px-8 w-full bg-white py-8 border border-primary-dark flex-wrap">
                        <div className={`text-4xl font-semibold text-primary-dark ${exo2.className}`}>
                            <div className="flex gap-12 justify-between">
                                <h2 >Active Jobs</h2>
                                <CountUp isCounting start={0} end={active} />
                            </div>

                            <div className="flex gap-12 justify-between">
                                <h2>Inactive Jobs</h2>
                                <CountUp isCounting start={0} end={inactive} />
                            </div>
                        </div>

                        <div className=" pt-2 md:pl-2">
                            <Pie data={pieData} />
                        </div>

                        <div className="">
                            <Bar options={options} data={Bardata} />
                        </div>
                    </div>







                </div>
                {/* <p>{active}</p>
                <p>{inactive}</p> */}
            </div>




        </section>
        <Footer />
    </>
    )
}

export default ProtectedPage(Dashboard, "employer")