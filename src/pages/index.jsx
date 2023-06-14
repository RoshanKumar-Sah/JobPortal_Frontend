
import { Exo_2, Work_Sans } from 'next/font/google'

import Header from '@/components/Header';
import Banner from '@/components/Banner';
import TrustedCompany from '@/components/TrustedCompany';
import LatestJob from '@/components/LatestJob';
import HowItWorks from '@/components/HowItWorks';
import Feedback from '@/components/Feedback';
import Know from '@/components/Know';
import SubFoot from '@/components/SubFoot';
import Footer from '@/components/Footer';


const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

export default function Home() {






  return (
    <>
      <Header />
      <Banner />
      <TrustedCompany />
      <LatestJob />
      <HowItWorks />
      <Feedback />
      <Know />
      <SubFoot />

      <Footer />







    </>

  )
}
