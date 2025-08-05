import { DismissKeyboardView } from '@/Components/DismissKeyBoard'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, TouchableOpacity, View } from 'react-native'
import { RegisterForm } from './RegisterForm'
import { AuthHeader } from '@/Components/AuthHeader'

export const Register = () => {
    const navigation = useNavigation()

  return (
    <DismissKeyboardView>
      <View className='flex-1 w-[82%] self-center mt-6'>
        <AuthHeader/>
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  )
}