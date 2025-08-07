import { AppButton } from '@/Components/AppButton'
import { AppInput } from '@/Components/AppInput'
import { PublicStackParamsList } from '@/routes/PublicRoutes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, Text, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { useAuthContext } from '@/context/auth.context'
import { AxiosError } from 'axios'
import { FormLoginParams } from '@/screens/Login/LoginForm'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { colors } from '@/shared/colors'

export interface RegisterFormParams {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
      } = useForm<RegisterFormParams>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
      })

      const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>()

      const {handleRegister} = useAuthContext()// Acessando o contexto de registro.

      const {handleError} = useErrorHandler()


        const onSubmit = async (userData:RegisterFormParams) => {
            try {
              await handleRegister(userData)
            } catch (error) {
              handleError(error,"Falha ao realizar cadastro")
            }
        }

    return (
        <>
                <AppInput
                    control={control}
                    name="name"
                    label="NOME"
                    placeholder="Seu nome completo"
                    leftIconName='person'
                />
            
                <AppInput
                    control={control}
                    name="email"
                    label="EMAIL"
                    placeholder="Digite seu email"
                    leftIconName='email'
                />

                 <AppInput
                    control={control}
                    name="password"
                    label="SENHA"
                    placeholder="Digite sua senha"
                    leftIconName='lock'
                    secureTextEntry
                />

                 <AppInput
                    control={control}
                    name="confirmPassword"
                    label="CONFIRMAR SENHA"
                    placeholder="Confirme sua senha"
                    leftIconName='lock'
                    secureTextEntry
                />



                <View className="flex-1 justify-between mt-8 mb-6 min-h-[230px]">
                        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
                           {isSubmitting ? <ActivityIndicator color={colors.white}/> : "Login"}
                        </AppButton>
                
                        <View>
                          <Text className="mb-6 text-gray-300 text-base">
                            Já tem uma conta?
                          </Text>
                          <AppButton iconName="arrow-forward" mode="outline" 
                          onPress={() =>navigation.navigate('Login')}>
                            Acessar
                          </AppButton>
                        </View>
                      </View>
        </>
    )
}