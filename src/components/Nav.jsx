import { BiUserCircle } from "react-icons/bi";
import { FaBriefcase } from "react-icons/fa";
import {AiOutlineLogout} from "react-icons/ai"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice/userSlice";

export default function Nav(){

    const dispatch = useDispatch()

   let user = useSelector((redux_store)=>{
      return redux_store.user.value
    })

    let logged_in = user
   
    return<>
    <ul className='gap-4 py-8 text-base flex flex-col  md:flex-row md:mt-0 md:py-0 select-none'>
                        <li className="hover:text-primary-tint"><Link href={"/"}>HOME</Link></li>
                        <li className="hover:text-primary-tint"><Link href={"/jobs"}>FIND JOBS</Link></li>
                        <li className="hover:text-primary-tint"><Link href={"/contact"}>CONTACT</Link></li>
                        {
                            logged_in?.role == "client" && <>
                        
                            <li className="hover:text-primary-tint"><Link href={"/candidates/appliedJobs"}>APPLIED JOBS</Link></li>
                            </>
                            
                        }
                        {
                            logged_in?.role == "employer" &&<>
                            <li className="hover:text-primary-tint">DASHBOARD</li>
                            <li className="hover:text-primary-tint"><Link href={"/employers/jobs"}>MY JOBS</Link></li>
                            <li className="hover:text-primary-tint"><Link href={"/employers/appliedCandidates"}>APPLIED CANDIDATES</Link></li>
                            </> 
                        }
                    </ul>
                    <ul className='gap-4 flex flex-col md:flex-row'>
                        
                        {
                            !logged_in ?<> <li>
                            <div className='flex justify-center items-center border border-black group hover:bg-primary-dark'>
                                <Link href={"/candidates/login"} className="py-2 px-7 group-hover:text-white"><BiUserCircle className="inline-block h-5 w-5 mr-1 mb-1" /> Job Seeker</Link></div>
                        </li> 
                        
                        <li>
                            <div className='flex justify-center items-center border border-black bg-primary-dark group hover:bg-white'>
                                <Link href={"/employers/login"} className="py-2 px-7 text-white group-hover:text-primary-dark">Recruiter <FaBriefcase className="inline-block h-4 w-4 ml-1 mb-1" /></Link></div>
                        </li>
                        </>
                        :<>
                        <li className="flex items-center hover:text-primary-tint"><Link href={"/profile"}>{user.name}</Link></li>
                         <li>
                            <div className='flex justify-center items-center border border-black bg-primary-dark group hover:bg-white' onClick={()=>{
                                dispatch(logout())
                            }} >
                                <span className="py-2 px-7 text-white group-hover:text-primary-dark cursor-pointer">Logout <AiOutlineLogout className="inline-block h-4 w-4 ml-1 mb-1" /></span></div>
                        </li>
                         </>
                        }
                       
                        
                       

                    </ul> 
                    </>

}