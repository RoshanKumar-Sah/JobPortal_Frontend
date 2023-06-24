import Image from 'next/image'
import Slider from "react-slick";
import { Exo_2, Work_Sans } from 'next/font/google'
import DefaultAvatar from "@/assets/default_profile_avatar.jpg"
import { AiFillStar } from "react-icons/ai"

const exo2 = Exo_2({ subsets: ['latin'] })
const workSans = Work_Sans({ subsets: ['latin'] })

export default function Feedback() {

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return <>
    <section>
      <div className='bg-tertiary'>
        <div className='container pt-28 pb-28'>
          <h2 className={`text-5xl text-header ${exo2.className} mb-6 font-semibold`}>Clients Feedback</h2>


          <div className='md:w-4/5 mr-auto ml-auto'>
            <Slider {...settings}>
              <div>
                <div className='border border-secondary m-4'>
                  <div className='m-3 bg-white pb-8 hover:border border-black'>
                    <div className='flex items-center justify-between p-4'>
                      <div className='flex gap-4 items-center'>
                        <Image src={DefaultAvatar} className='w-10 h-10 rounded-full' alt='default_avatar' />
                        <div>
                          <p className={`${exo2.className} font-bold text-lg mb-1 text-header`}>Harley Quinn</p>
                          <p className={`${workSans.className} font-normal text-base text-primary-tint`}>UI/UX Engineer</p>
                        </div>
                      </div>
                      <p><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /></p>
                    </div>
                    <p className={`${workSans.className} font-normal text-2xl text-primary-tint p-4`}>On the other hand, denounce with righteous to indignation and dislike men who are so the beguiled and demoralized.</p>

                  </div>
                </div>
              </div>

              <div>
                <div className='border border-secondary m-4'>
                  <div className='m-3 bg-white pb-8 hover:border border-black'>
                    <div className='flex items-center justify-between p-4'>
                      <div className='flex gap-4 items-center'>
                        <Image src={DefaultAvatar} className='w-10 h-10 rounded-full' alt='default_avatar' />
                        <div>
                          <p className={`${exo2.className} font-bold text-lg mb-1 text-header`}>Barry Allen</p>
                          <p className={`${workSans.className} font-normal text-base text-primary-tint`}>UI/UX Engineer</p>
                        </div>
                      </div>
                      <p><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /></p>
                    </div>
                    <p className={`${workSans.className} font-normal text-2xl text-primary-tint p-4`}>On the other hand, denounce with righteous to indignation and dislike men who are so the beguiled and demoralized.</p>

                  </div>
                </div>
              </div>

              <div>
                <div className='border border-secondary m-4'>
                  <div className='m-3 bg-white pb-8 hover:border border-black'>
                    <div className='flex items-center justify-between p-4'>
                      <div className='flex gap-4 items-center'>
                        <Image src={DefaultAvatar} className='w-10 h-10 rounded-full' alt='default_avatar' />
                        <div>
                          <p className={`${exo2.className} font-bold text-lg mb-1 text-header`}>Domnic Toretto</p>
                          <p className={`${workSans.className} font-normal text-base text-primary-tint`}>Frontend Engineer</p>
                        </div>
                      </div>
                      <p><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /><AiFillStar className='inline-block h-6 w-6' /></p>
                    </div>
                    <p className={`${workSans.className} font-normal text-2xl text-primary-tint p-4`}>On the other hand, denounce with righteous to indignation and dislike men who are so the beguiled and demoralized.</p>

                  </div>
                </div>
              </div>

            </Slider>

          </div>

        </div>
      </div>
    </section>
  </>
}