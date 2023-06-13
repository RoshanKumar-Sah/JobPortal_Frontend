import Image from 'next/image'
import { Exo_2, Work_Sans } from 'next/font/google'
import { AiOutlineSecurityScan, AiOutlineFileSearch } from "react-icons/ai"
import { SiAuth0 } from "react-icons/si"
import { IoPricetagsOutline } from "react-icons/io5"
import About1 from "@/assets/about-img1.png"
import About2 from "@/assets/about-img2.png"

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

export default function Know() {

    return <>
        <section>
            <div className='container'>
                <div className='bg-white'>
                    <div className='pt-28'>
                        <div>
                            <h2 className={`text-4xl font-bold text-header ${exo2.className} mb-5`}>To Know About JOBES</h2>
                            <p className={`${workSans.className} text-lg text-primary-tint font-normal`}>To much valuable feed from our trusted users in world-wide.</p>


                            <div className='md:flex'>
                                <div className='w-full md:w-1/2'>
                                    <ul className='mt-14 flex flex-col gap-6'>
                                        <li className='flex gap-6'>
                                            <div>
                                                <AiOutlineSecurityScan className='h-9 w-9' />
                                            </div>
                                            <div>
                                                <h5 className={`${exo2.className} font-semibold text-xl text-header mb-2`}>Highly Secured</h5>
                                                <p className={`${workSans.className} font-normal text-base text-primary-tint`}>Firstly, your account and data are secured with us.</p>
                                            </div>
                                        </li>

                                        <li className='flex gap-6'>
                                            <div>
                                                <SiAuth0 className='h-8 w-8' />
                                            </div>
                                            <div>
                                                <h5 className={`${exo2.className} font-semibold text-xl text-header mb-2`}>Authentic Source</h5>
                                                <p className={`${workSans.className} font-normal text-base text-primary-tint`}>Secondly, Every job is posted bu authenticated source.</p>
                                            </div>
                                        </li>

                                        <li className='flex gap-6'>
                                            <div>
                                                <IoPricetagsOutline className='h-8 w-8' />
                                            </div>
                                            <div>
                                                <h5 className={`${exo2.className} font-semibold text-xl text-header mb-2`}>Cost Effective</h5>
                                                <p className={`${workSans.className} font-normal text-base text-primary-tint`}>Thirdly, Our service is pocket friendly.</p>
                                            </div>
                                        </li>

                                    </ul>
                                </div>


                                <div className='w-full mt-14 md:mt-0 md:w-1/2 grid grid-cols-2 grid-rows-2 relative z-20'>

                                    <div className='h-1/5 w-1/4 bg-white  border-2 border-primary-tint absolute -z-10 right-1/3 bottom-1/3'>

                                    </div>

                                    <div className='w-fit row-start-1 row-end-3 '>
                                        <Image src={About1} alt='about1' className='rounded-lg' />
                                    </div>

                                    <div className='w-fit -ml-12 mt-9'>
                                        <Image src={About2} alt='about2' className='rounded-lg h' />
                                    </div>

                                    <div className='flex w-fit h-fit gap-4 border-l-4 rounded-sm border-primary-dark bg-white col-start-2 mt-10'>
                                        <div className='flex justify-center items-center'>
                                            <AiOutlineFileSearch className='w-9 h-9' />
                                        </div>
                                        <div>
                                            <h5>Best Quality For Jobs Site</h5>
                                            <p>To make sure your job opportunity.</p>
                                        </div>
                                    </div>


                                </div>



                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>

}