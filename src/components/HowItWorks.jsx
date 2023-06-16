import { AiOutlineFileSearch, AiOutlineUserAdd, AiOutlineFileDone } from "react-icons/ai";
import { Exo_2, Work_Sans } from 'next/font/google';
const exo2 = Exo_2({ subsets: ['latin'] });
const workSans = Work_Sans({ subsets: ['latin'] });



export default function HowItWorks() {
  return <>

    <section>
      <div className='bg-white mt-28 '>
        <div className='container  flex flex-col items-center'>
          <h2 className={`text-5xl font-semibold text-header ${exo2.className} text-center`}>How It Works</h2>
          <p className={`text-lg text-secondary font-normal ${workSans.className} text-center mt-5`}>To choose your dream job & to make future bright.</p>



          <div className="grid pb-28  mt-14 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-9  w-full md:gap-9 md:w-2/3">

            <div className='flex items-center gap-4 group w-full'>
              <div className='bg-tertiary rounded-full flex justify-center items-center group-hover:bg-secondary group-hover:text-white'>
                <AiOutlineUserAdd className='inline-block p-2 h-12 w-12' />
              </div>
              <div>
                <p className={`${exo2.className} font-semibold text-xl text-header group-hover:text-secondary`}>Create Account</p>
                <p className={`${workSans.className} text-secondary`}>Create your account confidently.</p>
              </div>
            </div>

            <div className='flex items-center gap-4 group  w-full'>
              <div className='bg-tertiary rounded-full flex justify-center items-center group-hover:bg-secondary group-hover:text-white'>
                <AiOutlineFileSearch className='inline-block p-2 h-12 w-12' />
              </div>
              <div>
                <p className={`${exo2.className} font-semibold text-xl text-header group-hover:text-secondary`}>Find Jobs</p>
                <p className={`${workSans.className} text-secondary`}>Find your dream job.</p>
              </div>
            </div>

            <div className='flex items-center gap-4 group  w-full sm:col-span-full sm:justify-center md:col-span-1'>
              <div className='bg-tertiary rounded-full flex justify-center items-center group-hover:bg-secondary group-hover:text-white'>
                <AiOutlineFileDone className='inline-block p-2 h-12 w-12' />
              </div>
              <div>
                <p className={`${exo2.className} font-semibold text-xl text-header group-hover:text-secondary`}>Apply Jobs</p>
                <p className={`${workSans.className} text-secondary`}>Apply to your dream job.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </>
}