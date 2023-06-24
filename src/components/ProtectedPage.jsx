import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Bars } from 'react-loader-spinner'


export default function ProtectedPage(PageComponent, role) {



    function Wrapper(props) {

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
        } else if (!user) {
            if (role == "client") {
                router.push("/candidates/login")
            }else if (role == "employer") {
                router.push("/employers/login")
            }else{
                router.push("/")
            }


        } 
        else if (role && user.role !== role) {
            router.push("/forbidden")
        }
         else {

            // console.log(role);
            // console.log(router);
            // console.log(PageComponent );


            return <>

                <PageComponent {...props}/>
            </>
        }
    }
    return Wrapper
}