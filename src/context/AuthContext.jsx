import {createContext, useContext, useState} from "react";
import {useCookies} from "react-cookie";

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [cookies, setCookies ,removeCookie] = useCookies(['user'])
    const [user, setUser] = useState(cookies.user || null)

    const login = (userData ) => {
        setCookies("user",userData,{path:"/"})
        setUser(userData)
    }

    const logout = () => {
        removeCookie("user",{path:"/"})
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth = () => useContext(AuthContext)
