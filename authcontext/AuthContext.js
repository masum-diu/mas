import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState(null)
    const [businessid,setBusinessid]=useState(null)
   
  useEffect(() => {
    getToken(); 
  }, []);

  const getToken = () => {
    const getTokenToken = localStorage.getItem('token');
    setToken(getTokenToken);
  };


    const signOut = async () => {

        try {
            await localStorage.removeItem('token')
            router.push('/');
        } catch (error) {
            // console.error('Error saving token:', error);
        }

    };


    return (
        <AuthContext.Provider value={{signOut,token,businessid,setBusinessid }}>
            {children}
        </AuthContext.Provider>
    );
};