import { View,Image } from "react-native"
import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible"
import { use } from "react"

export const AuthHeader = () => {
    const isKeyboardVisible = useKeyboardVisible()
    if (isKeyboardVisible) {
        return <></>
    }
  return (
   <View className="items-center justify-center w-full min-h-40">
        <Image source={require("@/assets/Logo.png")}
        className="h-[48px] w-[255px]"
        />
   </View>
  )
}