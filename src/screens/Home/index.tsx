import { useAuthContext } from '@/context/auth.context'
import { AxiosError } from 'axios'
import { Text, TouchableOpacity, View } from 'react-native'

export const Home = () => {

  const {handleLogout} = useAuthContext()



  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity className='bg-slate-600 justify-center w-14' onPress={handleLogout}>
        <Text>logout</Text></TouchableOpacity>
    </View>
  )
}