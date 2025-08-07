import { FormLoginParams } from "@/screens/Login/LoginForm"
import { RegisterFormParams } from "@/screens/Register/RegisterForm"
import { createContext, FC, PropsWithChildren, useContext, useState } from "react"
import * as authService from "@/shared/services/dt-money/auth.service"
import { Iuser } from "@/shared/interfaces/user-interface"


type AuthContextType = {//dados que serão compartilhadas no contexto de autenticação.
    user:Iuser|null
    token:string | null
    handleAuthenticate: (params: FormLoginParams) => Promise<void>
    handleRegister: (params: RegisterFormParams) => Promise<void>
    handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
//Criando contexto de autenticação.

export const AuthContextProvider:FC<PropsWithChildren> = ({children}) =>{
    const [user, setUser] = useState<Iuser|null>(null)
    const [token, setToken] = useState<string|null>(null)


    const handleAuthenticate = async (userData: FormLoginParams) => {
        const {token,user} = await authService.Authenticate(userData)//acessando serviço de autenticação.
        setUser(user)
        setToken(token)
    }

  const handleRegister = async (formData: RegisterFormParams) => {}



  const handleLogout = () => {}
 return(
    <AuthContext.Provider value={{ user,
         token,
         handleAuthenticate,
         handleRegister,
         handleLogout
    }} >

        {children}
        
    </AuthContext.Provider>
 )
}

export const useAuthContext = () => {// Hook para acessar o contexto de autenticação
    const context = useContext(AuthContext)
    return context
}