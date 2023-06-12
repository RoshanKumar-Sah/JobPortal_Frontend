
import Image from 'next/image'
import { Exo_2, Work_Sans } from 'next/font/google'
import Link from 'next/link';

import DefaultProfile from "@/assets/default_profile_avatar.jpg"
import DefaultCover from "@/assets/default_cover.jpg"
import { BsArrowBarRight } from "react-icons/bs"

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })


export default function JobCard({job}){
    let {title, number_of_vacancy} = job
    return<>
      <div className='bg-white w-fit rounded-md hover:border hover:border-primary-dark'>
              <div className='w-fit h-fit p-4 relative'>
                <div className={`p-1 bg-white absolute right-6 top-6 rounded-md ${exo2.className}`}>
                  <p>Normal</p>
                </div>
                <Image src={DefaultCover} className='w-full h-full rounded-md' alt='default_cover' />
              </div>
              <div className='p-4 flex gap-4'>
                <Image src={DefaultProfile} className='w-10 h-10 rounded-full' alt='default_profile' />
                <div>
                  <h5 className={`text-lg font-semibold text-primary-dark ${exo2.className} capitalize`}>{title}</h5>
                  <p className={`${workSans.className}`}><span className='text-sm text-primary-tint font-normal'>Bistro Tech Ltd.</span> <span className='text-primary-dark font-medium'>| Deadline:</span> <span className='text-primary-tint text-sm font-normal'>2023 Aug 12</span></p>
                </div>
              </div>
              <div className='flex justify-center'>
                <hr className='h-[1px] bg-primary-tint/10 w-11/12' />
              </div>


              <div className='p-4'>
                <ul className={`text-primary-tint font-medium text-base ${workSans.className}`}>
                  <li><span className={`${exo2.className}`}>Salary:</span> <span className='text-primary-dark'>Rs. 20000</span> <span className='font-normal'>/ Per Month</span></li>
                  <li><span className={`${exo2.className}`}>Location:</span> <span className='text-primary-dark'>Kathmandu</span></li>
                  <li><span className={`${exo2.className}`}>Vacancy:</span> <span className='text-primary-dark'>{number_of_vacancy}</span></li>
                </ul>
                <div className='flex justify-between'>
                  <div className='bg-primary-dark text-white w-fit  rounded-md mt-4'>
                    <p className={`py-1 px-3 ${exo2.className}`}>Fresher</p>
                  </div>
                  <div className='w-fit  rounded-md mt-4 border border-primary-dark flex justify-center items-center group hover:bg-black hover:text-white'>
                    <Link href={"#"} className={`py-1 px-3 ${exo2.className}`}>Browse Job <BsArrowBarRight className='inline-block' /></Link>
                  </div>
                </div>

              </div>

           
            </div>
    </>
}