import { BiUserCircle } from "react-icons/bi";
import { FaBriefcase } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice/userSlice";
import ProtectedComponent from "./ProtectedComponent";
import { CLIENT, EMPLOYER } from "@/const/role";
import { useRouter } from "next/router";

export default function Nav() {

    const dispatch = useDispatch()
    const router = useRouter()
    // console.log(router);

    let user = useSelector((redux_store) => {
        return redux_store.user.value
    })

    let arr = []
    let name = ""
    if (user) {
        arr = user.name.split(" ")
        name = arr[0]
    }

    let logged_in = user

    return <>
        <ul className='gap-4 py-8 text-base flex flex-col  md:flex-row md:mt-0 md:py-0 select-none'>
            <li className={`hover:text-primary-tint transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110`}><Link href={"/"}>HOME</Link></li>
            <li className="hover:text-primary-tint transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110"><Link href={"/jobs"}>FIND&nbsp;JOBS</Link></li>


            <ProtectedComponent role={CLIENT}>
                <li className="hover:text-primary-tint transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110"><Link href={"/candidates/appliedJobs"}>APPLIED&nbsp;JOBS</Link></li>

            </ProtectedComponent>

            <ProtectedComponent role={EMPLOYER}>
                <li className="hover:text-primary-tint transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110"><Link href={"/employers/myJobs"}>MY&nbsp;JOBS</Link></li>

                <li className="hover:text-primary-tint transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110"><Link href={"/employers/dashboard"}>DASHBOARD</Link></li>
            </ProtectedComponent>
        </ul>
        <ul className='gap-4 flex flex-col md:flex-row'>

            {
                !logged_in ? <> <li>
                    <div className='flex  justify-center items-center border border-black group hover:bg-primary-dark'>
                        <Link href={"/candidates/login"} className="xl:py-2 xl:px-7 py-1 px-3 group-hover:text-white"><BiUserCircle className="inline-block h-5 w-5 mr-1 mb-1" /> Job Seeker</Link></div>
                </li>

                    <li>
                        <div className='flex justify-center items-center border border-black bg-primary-dark group hover:bg-white'>
                            <Link href={"/employers/login"} className="xl:py-2 xl:px-7 py-1 px-3 text-white group-hover:text-primary-dark">Recruiter <FaBriefcase className="inline-block h-4 w-4 ml-1 mb-1" /></Link></div>
                    </li>
                </>
                    : <>
                        <li className="flex items-center hover:text-primary-tint transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110"><Link href={"/profile"}>{name}</Link></li>
                        <li>
                            <div className='flex justify-center items-center border border-black bg-primary-dark group hover:bg-white' onClick={() => {
                                dispatch(logout())
                            }} >
                                <span className="xl:py-2 xl:px-7 py-1 px-3  text-white group-hover:text-primary-dark cursor-pointer">Logout&nbsp;<AiOutlineLogout className="inline-block h-4 w-4 ml-1 mb-1" /></span></div>
                        </li>
                    </>
            }




        </ul>
    </>

}