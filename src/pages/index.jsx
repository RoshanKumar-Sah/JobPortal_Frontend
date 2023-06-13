import Image from 'next/image'
import { Exo_2, Work_Sans } from 'next/font/google'
import Link from 'next/link';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import TrustedCompany from '@/components/TrustedCompany';

import { AiOutlineSecurityScan, AiOutlineFileSearch } from "react-icons/ai"
import { SiAuth0 } from "react-icons/si"
import { IoPricetagsOutline } from "react-icons/io5"
import About1 from "@/assets/about-img1.png"
import About2 from "@/assets/about-img2.png"

import DefaultAvatar from "@/assets/default_profile_avatar.jpg"
import Slider from "react-slick";


import LatestJob from '@/components/LatestJob';

import axios from 'axios';
import { URL_Domain } from '@/const/api_domain';
import { useEffect } from 'react';
import HowItWorks from '@/components/HowItWorks';
import Feedback from '@/components/Feedback';
import Know from '@/components/Know';
import SubFoot from '@/components/SubFoot';





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







    </>

  )
}
