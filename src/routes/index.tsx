
import { useState,useCallback } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { SystemBars } from "react-native-edge-to-edge";
import { useAuthContext } from "@/context/auth.context";
import { Loading } from "@/screens/Loading";

//Rotas de navegação da aplicação.

const NavigationRoutes=() => {
    const [loading,setLoading] = useState(true)
    
    const {user,token} = useAuthContext();//Acessando o contexto de autenticação para verificar o estado do usuário.

    const Routes = useCallback(()=>{// Define as rotas com base no estado do usuário.

      if (loading) {
        return <Loading setLoading={setLoading} /> ;
      }
      if (!user || !token) {
        return <PublicRoutes />;
      }
      else{
        return <PrivateRoutes />;
      }
    },[user,token,loading]);  


    return (
        <NavigationContainer >
            <SystemBars style="light"/>
 
            <Routes/>
        </NavigationContainer>
    );
}

export default NavigationRoutes;