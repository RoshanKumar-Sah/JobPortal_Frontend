import { Employer } from "@/const/role"
import { useSelector } from "react-redux"


export default function ProtectedComponent({ children, role }) {

    

    let user = useSelector((redux_store) => {
        return redux_store.user.value
    })


    // console.log(role);
    

    if (user?.role == role) {
        return <>
            {children}
        </>
    } else {
        return null
    }





}