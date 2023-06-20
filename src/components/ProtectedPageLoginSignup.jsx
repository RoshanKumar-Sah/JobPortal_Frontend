import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Bars } from 'react-loader-spinner'


export default function ProtectedPageLoginSignup(PageComponent) {



    function Wrapper() {

        let router = useRouter()

        let { isLoading, value: user } = useSelector((redux_store) => {
            return redux_store.user
        })




        if (isLoading) {
            return <><div className="flex justify-center items-center  h-screen"><Bars
                height="80"
                width="80"
                color="#000000"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /></div></>
        } else if (user) {

            router.push("/")
        }

        else {
            return <>
                <PageComponent />
            </>
        }
    }
    return Wrapper
}