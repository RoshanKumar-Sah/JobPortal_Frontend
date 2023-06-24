import Image from 'next/image'
import { Exo_2, Work_Sans } from 'next/font/google'
import { AiOutlineFacebook, AiOutlineTwitter, AiOutlineLinkedin, AiOutlineInstagram } from "react-icons/ai"
import FooterLogo from "@/assets/footer-logo.svg"
import Link from 'next/link'

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

export default function Footer() {
  return <>

    <section>
      <div className='bg-primary-dark'>
        <div className='container'>
          <div className='pt-28 pb-14 flex justify-around flex-wrap gap-8 md:gap-0'>

            <div>
            <Link href={"/"}><Image src={FooterLogo} alt='footer_logo' /></Link>
            </div>

            <div className='text-white  flex flex-col items-center'>
              <h5 className={`${exo2.className} font-semibold text-xl mb-6`}>About Company</h5>
              <ul className={`${workSans.className} font-medium text-base text-[#b3b3b3]`}>
                <li className='hover:text-white'><Link href={"/contact"}>Contact Us</Link></li>
                <li className='hover:text-white'><Link href={"/terms"}>Terms &amp; Condition</Link></li>
                <li className='hover:text-white'><Link href={"/privacy"}>Privacy Policy</Link></li>
              </ul>
            </div>

            <div className='text-white  flex flex-col items-center'>
              <h5 className={`${exo2.className} font-semibold text-xl mb-6`}>For Candidate&apos;s</h5>
              <ul className={`${workSans.className} font-medium text-base text-[#b3b3b3]`}>
                <li className='hover:text-white'><Link href={"/jobs"}>Browse Jobs</Link></li>
                <li className='hover:text-white'><Link href={"/profile"}>Profile</Link></li>
                <li className='hover:text-white'><Link href={"/candidates/appliedJobs"}>Applied Jobs</Link></li>
              </ul>
            </div>

            <div className='text-white  flex flex-col items-center'>
              <h5 className={`${exo2.className} font-semibold text-xl mb-6`}>For Employer&apos;s</h5>
              <ul className={`${workSans.className} font-medium text-base text-[#b3b3b3]`}>
                <li className='hover:text-white'> <Link href={"/jobs"}>Browse Jobs</Link></li>
                <li className='hover:text-white'> <Link href={"/employers/myJobs"}>My Jobs</Link></li>
                <li className='hover:text-white'><Link href={"/employers/myJobs/postJob"}>Post Job</Link></li>
                <li className='hover:text-white'><Link href={"/employers/dashboard"}>Dashboard</Link></li>
                <li className='hover:text-white'><Link href={"/employers/appliedCandidates"}>Applied Candidates</Link></li>
                <li className='hover:text-white'><Link href={"/profile"}>Profile</Link></li>
              </ul>
            </div>



          </div>

          <div className='flex flex-col text-white pt-10 pb-4 gap-4'>
            <p className={`${workSans.className} font-normal text-sm `}>©Copyright 2023 JOBES</p>
            <div className='flex justify-center gap-1'>
              <h5 className={`${exo2.className} font-semibold text-xl mb-6`}>Follow Us:</h5>
              <AiOutlineFacebook className='h-8 w-8' />
              <AiOutlineTwitter className='h-8 w-8' />
              <AiOutlineLinkedin className='h-8 w-8' />
              <AiOutlineInstagram className='h-8 w-8' />
            </div>
          </div>

        </div>

      </div>
    </section>

  </>
}