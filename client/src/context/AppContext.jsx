import axios from "axios";
import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState('')

    // Here to get the user data everywhere in the app
    const getUserData = async () => {
        try {
            // const response = await axios.get(url); => const data = response.data;
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(data.message)
        }
    }


    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}