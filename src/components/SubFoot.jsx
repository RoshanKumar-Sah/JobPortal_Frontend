
import { Exo_2, Work_Sans } from 'next/font/google'
import Link from 'next/link';
const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

export default function SubFoot() {
  return <>
    <section>
      <div className='bg-tertiary'>
        <div className='container flex justify-center'>

          <div className='pt-14 pb-14 flex items-center justify-between w-full'>
            <div>
              <h2 className={`${exo2.className} mb-4 font-bold text-lg text-header`}>Are You Looking For A Dream Job?</h2>
              <p className={`${workSans.className} text-base text-primary-tint`}>Top recruiter are available for you.</p>
            </div>
            <div className='flex w-fit h-fit justify-center items-center border border-black bg-primary-dark group hover:bg-white'>
              <Link href={"/jobs"} className="py-2 px-7 text-white group-hover:text-primary-dark">Find Now</Link></div>
          </div>
        </div>
      </div>
    </section>
  </>
}