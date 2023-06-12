import Image from 'next/image'
import { Exo_2, Work_Sans } from 'next/font/google'
import Link from 'next/link';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import TrustedCompany from '@/components/TrustedCompany';



import LatestJob from '@/components/LatestJob';

import axios from 'axios';
import { URL_Domain } from '@/const/api_domain';
import { useEffect } from 'react';





const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

export default function Home() {

//  




  return (
    <>
      <Header />
      <Banner />
      <TrustedCompany />

      <LatestJob />


    </>

  )
}
