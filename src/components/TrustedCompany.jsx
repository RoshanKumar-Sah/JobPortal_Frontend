import Slider from "react-slick";
import Image from 'next/image'
import { Exo_2} from 'next/font/google'
import Trusted_01 from "@/assets/trusted-company-01.svg"
import Trusted_02 from "@/assets/trusted-company-02.svg"
import Trusted_03 from "@/assets/trusted-company-03.svg"
import Trusted_04 from "@/assets/trusted-company-04.svg"
import Trusted_05 from "@/assets/trusted-company-05.svg"
import Trusted_06 from "@/assets/trusted-company-06.svg"

const exo2 = Exo_2({ subsets: ['latin'] })

export default function TrustedCompany() {

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
        slidesToShow: 4,
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
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return <>
        <section>
            <div className='container'>
                <div className='flex items-center gap-5 mt-28 mb-3'>
                    <p className={`text-lg ${exo2.className} font-medium text-header`}>Our Trusted Company</p>
                    <hr className='h-1 bg-secondary/50 w-1/6 rounded-lg' />
                </div>

                <div className='w-full'>

                    <Slider {...settings}>
                        <div className='mr-2'>
                            <Image src={Trusted_01} alt="trusted_company" />
                        </div>
                        <div className=''>
                            <Image src={Trusted_02} alt="trusted_company" />
                        </div>
                        <div className=''>
                            <Image src={Trusted_03} alt="trusted_company" />
                        </div>
                        <div className=''>
                            <Image src={Trusted_04} alt="trusted_company" />
                        </div>
                        <div className=''>
                            <Image src={Trusted_05} alt="trusted_company" />
                        </div>
                        <div className=''>
                            <Image src={Trusted_06} alt="trusted_company" />
                        </div>
                    </Slider>
                </div>
            </div>
        </section>
    </>
}