import '@/styles/globals.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';

import store from '@/redux/store'
import { Provider, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import axios from 'axios';
import { URL_Domain } from '@/const/api_domain';
import { setUser, stopLoading } from '@/redux/slice/userSlice';



function App({ Component, pageProps }) {

  const dispatch = useDispatch()

  useEffect(() => {



    if (localStorage.getItem("client_token")) {
      axios.get(`${URL_Domain}/getClient`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("client_token")
        }
      }).then(res => {
        // console.log(res.data);
        dispatch(setUser({ ...res.data, role: "client" }))
      }).catch(err => {
        // console.log(err);
      })
    } else if (localStorage.getItem("employer_token")) {
      axios.get(`${URL_Domain}/getEmployer`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("employer_token")
        }
      }).then(res => {
        // console.log(res.data);
        dispatch(setUser({ ...res.data, role: "employer" }))
      }).catch(err => {
        // console.log(err);
      })
    } else {
      dispatch(stopLoading())
    }



  }, [])


  return <Component {...pageProps} />

}



const WithReduxProvider = (App) => {
  function Wrapper(props) {

    return <Provider store={store}>
      <App {...props} />
    </Provider>

  }

  return Wrapper
}

export default WithReduxProvider(App)