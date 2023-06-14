import { BiUserCircle } from "react-icons/bi";
import { FaBriefcase } from "react-icons/fa";
import Link from "next/link"

export default function Nav(){
   
    return<>
    <ul className='gap-4 py-8 text-base flex flex-col  md:flex-row md:mt-0 md:py-0 select-none'>
                        <li className="hover:text-primary-tint"><Link href={"/"}>HOME</Link></li>
                        <li className="hover:text-primary-tint"><Link href={"/jobs"}>FIND JOBS</Link></li>
                        <li className="hover:text-primary-tint"><Link href={"/contact"}>CONTACT</Link></li>
                    </ul>
                    <ul className='gap-4 flex flex-col md:flex-row'>
                        <li>
                            <div className='flex justify-center items-center border border-black group hover:bg-primary-dark'>
                                <Link href={"#"} className="py-2 px-7 group-hover:text-white"><BiUserCircle className="inline-block h-5 w-5 mr-1 mb-1" /> Job Seeker</Link></div>
                        </li>
                        <li>
                            <div className='flex justify-center items-center border border-black bg-primary-dark group hover:bg-white'>
                                <Link href={"#"} className="py-2 px-7 text-white group-hover:text-primary-dark">Recruiter <FaBriefcase className="inline-block h-4 w-4 ml-1 mb-1" /></Link></div>
                        </li>

                    </ul> 
                    </>

}