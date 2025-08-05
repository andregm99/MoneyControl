
import { useState,useCallback } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { SystemBars } from "react-native-edge-to-edge";

//Rotas de navegação da aplicação.

const NavigationRoutes=() => {
    const [user,setUser] = useState(undefined);

    const Routes = useCallback(()=>{// Define as rotas com base no estado do usuário.
        return user ? <PrivateRoutes/> : <PublicRoutes/>;
    },[user]);  


    return (
        <NavigationContainer >
            <SystemBars style="light"/>
            {/* Componente que define as barras de sistema, como status bar e navigation bar */}
            <Routes/>
        </NavigationContainer>
    );
}

export default NavigationRoutes;