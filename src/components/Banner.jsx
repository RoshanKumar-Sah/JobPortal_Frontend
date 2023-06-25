import Image from 'next/image'
import { Exo_2, Work_Sans } from 'next/font/google'
import BannerImg1 from "@/assets/banner-img1.png"
import BannerImg2 from "@/assets/banner-img2.png"
import BannerImg3 from "@/assets/banner-img3.png"
import { useRouter } from 'next/router'


const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

export default function Banner() {

  const router = useRouter()


  function handleSearch(event) {
    event.preventDefault()
    // console.log(router);
    router.push("/jobs?search_term=" + event.target.search_term.value)
  }

  return <>
    <section className='bg-tertiary'>
      <div className='container relative pb-28'>
        <div className='flex flex-wrap justify-between'>
          <div className=' w-full md:w-1/2 mt-28'>
            <h1 className={`${exo2.className} text-6xl font-semibold text-header mb-5`}>Find Your <span className='font-extrabold text-7xl'>Dream Jobs</span> With Based On Your Skills</h1>
            <p className={`font-normal text-xl leading-5 mb-12 text-primary-tint ${workSans.className}`}>Jobs are available on your skills, perfect jobs to make bright future & get your choose jobs become a strong.</p>
         
            <div className={`container mt-14 md:mt-0  w-full `}>
            <div className='p-5  bg-secondary-tint border border-secondary-tint rounded-2xl w-full md:rounded-full'>
              <form onSubmit={handleSearch} className='flex flex-col gap-5 md:flex-row md:justify-between'>
                <input type='text' placeholder='Job Title' name='search_term' className='outline-none border border-primary-dark rounded-full py-3 px-4 w-full md:w-full' />
                {/* <select placeholder='Job Category' className='outline-none text-primary-tint border border-primary-dark rounded-full py-3 px-4 w-full md:w-1/3'>
                  <option className='hidden'>Select Category</option>
                  <option>FrontEnd</option>
                  <option>BackEnd</option>
                  <option>Full Stack</option>
                  <option>UI/UX</option>
                </select> */}
                <button type='submit' className='flex justify-center items-center border border-black bg-primary-dark text-white hover:bg-white hover:text-primary-dark px-10 py-3 w-fit  rounded-full md:px-12'>Search</button>
              </form>
            </div>
          </div>
          </div>
          <div className='w-full md:w-2/5 mt-28'>
            <div className='grid grid-cols-2 gap-10 grid-rows-2'>
              <div className=' row-span-2'>
                <div className='h-32  w-28 border-2 border-secondary/50  absolute -ml-4 '></div>
                <Image src={BannerImg1} alt='banner_img1' className='object-cover  pt-5 pb-4 drop-shadow-md' />
              </div>
              <div className=''>

                <Image src={BannerImg2} alt='banner_img2' className='object-contain h-full w-full drop-shadow-md' />
              </div>
              <div className=''>
                <div className='h-32  w-28 border-2 border-secondary/50  absolute -ml-4 -mt-5 '></div>
                <Image src={BannerImg3} alt='banner_img3' className='object-contain h-full w-full drop-shadow-md' />
              </div>

            </div>
          </div>

          {/* <div className={`container mt-14 md:mt-0 md:absolute bottom-[50%] w-full md:-ml-3 md:w-4/6`}> */}
            {/* <div className='p-5  bg-secondary-tint border border-secondary-tint rounded-2xl w-full md:rounded-full'> */}
              {/* <form onSubmit={handleSearch} className='flex flex-col gap-5 md:flex-row md:justify-between'> */}
                {/* <input type='text' placeholder='Job Title' name='search_term' className='outline-none border border-primary-dark rounded-full py-3 px-4 w-full md:w-full' /> */}
                {/* <select placeholder='Job Category' className='outline-none text-primary-tint border border-primary-dark rounded-full py-3 px-4 w-full md:w-1/3'>
                  <option className='hidden'>Select Category</option>
                  <option>FrontEnd</option>
                  <option>BackEnd</option>
                  <option>Full Stack</option>
                  <option>UI/UX</option>
                </select> */}
                {/* <button type='submit' className='flex justify-center items-center border border-black bg-primary-dark text-white hover:bg-white hover:text-primary-dark px-10 py-3 w-fit  rounded-full md:px-12'>Search</button> */}
              {/* </form> */}
            {/* </div> */}
          {/* </div> */}

        </div>
      </div>
    </section>
  </>
}