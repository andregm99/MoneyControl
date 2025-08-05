import { DismissKeyboardView } from "@/Components/DismissKeyBoard/";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View} from "react-native";
import { LoginForm } from "./LoginForm";
import { AuthHeader } from "@/Components/AuthHeader";


export const Login = () => {

  const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>();
  return (
   <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center mt-6" >
        <AuthHeader/>
        <LoginForm  />
      </View>
    </DismissKeyboardView>
  );
}