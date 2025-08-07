import { AppButton } from '@/Components/AppButton'
import { AppInput } from '@/Components/AppInput'

import { PublicStackParamsList } from '@/routes/PublicRoutes'
import { useNavigation } from '@react-navigation/native'

import { StackNavigationProp } from '@react-navigation/stack'
import { ActivityIndicator, Text, View } from 'react-native'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { useAuthContext } from '@/context/auth.context'
import { AxiosError } from 'axios'
import { SnackbarContext, useSnackbarContext } from '@/context/snackbar.context'
import { AppError } from '@/shared/helpers/AppError'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { colors } from '@/shared/colors'


export interface FormLoginParams {
  email: string
  password: string
}




export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues:{
      email: '',
      password: '',
    },
    resolver:yupResolver(schema)
  })



  const {handleAuthenticate} = useAuthContext()

  const {notify} = useSnackbarContext()

  const {handleError} = useErrorHandler()

  const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>()



  const onSubmit= async (userData:FormLoginParams) =>{
    try {
      await handleAuthenticate(userData)
    } catch (error) {
      if (error ) {
        handleError(error,"Falha ao realizar login")
      }
    }
  }
  
  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@example.br"
        leftIconName='email'
      />

       <AppInput
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName='lock'
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
           {isSubmitting ? <ActivityIndicator color={colors.white}/> : "Login"}
        </AppButton>
        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <AppButton iconName="arrow-forward" mode="outline" onPress={() => navigation.navigate('Register')}>
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  )
}