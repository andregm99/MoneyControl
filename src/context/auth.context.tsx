import { FormLoginParams } from "@/screens/Login/LoginForm"
import { RegisterFormParams } from "@/screens/Register/RegisterForm"
import { createContext, FC, PropsWithChildren, useContext, useState } from "react"
import * as authService from "@/shared/services/dt-money/auth.service"
import { Iuser } from "@/shared/interfaces/user-interface"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { IauthenticateResponse } from "@/shared/interfaces/https/authenticate-response"

type AuthContextType = {//dados que serão compartilhadas no contexto de autenticação.
    user:Iuser|null
    token:string | null
    handleAuthenticate: (params: FormLoginParams) => Promise<void>
    handleRegister: (params: RegisterFormParams) => Promise<void>
    handleLogout: () => void
    restoreUserSession: () => Promise<string| null>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
//Criando contexto de autenticação.

export const AuthContextProvider:FC<PropsWithChildren> = ({children}) =>{
    const [user, setUser] = useState<Iuser|null>(null)
    const [token, setToken] = useState<string|null>(null)


    const handleAuthenticate = async (userData: FormLoginParams) => {
        const {token,user} = await authService.Authenticate(userData)//acessando serviço de autenticação.
        await AsyncStorage.setItem(
            "dt-money-user", JSON.stringify({user,token}))//Usuário e token armazenados no AsyncStorage.
        setUser(user)
        setToken(token)
    }

  const handleRegister = async (formData: RegisterFormParams) => {
    const {token,user} = await authService.registerUser(formData)//acessando serviço de registro.
     await AsyncStorage.setItem(
            "dt-money-user", JSON.stringify({user,token}))
    setUser(user)
    setToken(token)
  }

  const handleLogout = async () => {
    await AsyncStorage.clear()//Limpando o AsyncStorage ao efetuar logout.
    setToken(null)
    setUser(null)
  }

  const restoreUserSession = async () => {
    const userData = await AsyncStorage.getItem("dt-money-user")//Recuperando dados do usuário do AsyncStorage.
    if (userData) {
        const {token,user} = JSON.parse(userData) as IauthenticateResponse
        setUser(user)
        setToken(token)
    }
    return userData 
  } 

 return(
    <AuthContext.Provider value={{ user,
         token,
         handleAuthenticate,
         handleRegister,
         handleLogout,
         restoreUserSession
    }} >

        {children}
        
    </AuthContext.Provider>
 )
}

export const useAuthContext = () => {// Hook para acessar o contexto de autenticação
    const context = useContext(AuthContext)
    return context
}