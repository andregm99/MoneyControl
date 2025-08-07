import { FormLoginParams } from "@/screens/Login/LoginForm";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";
import { dtMoneyApi } from "@/shared/api/dt-money";
import { IauthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

//acessando rotas da API.

export const Authenticate = async (userData:FormLoginParams):Promise<IauthenticateResponse>=>{
    const {data} = await dtMoneyApi.post<IauthenticateResponse>("/auth/login",userData)
    return data //resposta da Api.
}

export const registerUser = async(userData:RegisterFormParams):Promise<IauthenticateResponse>=>{
    const {data} = await dtMoneyApi.post<IauthenticateResponse>("/auth/register", userData)
    return data
}