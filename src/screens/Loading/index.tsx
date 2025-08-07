import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator , Image} from "react-native";
import { useAuthContext } from "@/context/auth.context";
import { FC, useEffect } from "react";


interface Props{
    setLoading: (value: boolean) => void;
}

export const Loading:FC<Props> = ({setLoading}) => {
    const {restoreUserSession,handleLogout} = useAuthContext()

    useEffect(()=>{
       (async()=>{
        try {
            const user = await restoreUserSession()//Tentando restaurar a sessão do usuário.

            if (!user) {
              await  handleLogout()//Se não houver usuário, efetua logout.
            }
        } catch (error) {
            await handleLogout()//Em caso de erro, efetua logout.
        } finally{
            setLoading(false)
        }
       })()
    },[])

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-gray-900">
            <>
                <Image />
                <ActivityIndicator color="#00b94a" size="large"/>
            </>
        </SafeAreaView>
    )
}