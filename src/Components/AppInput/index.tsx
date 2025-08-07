import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useRef, useState } from 'react'
import { clsx } from 'clsx'
import { ErrorMessage } from '../ErrorMessage'

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>
  name: Path<T>//nome da propriedade do input.
  leftIconName?: keyof typeof MaterialIcons.glyphMap 
  label?: string
}

export const AppInput = <T extends FieldValues>({
  control,
  name,
  label,
  leftIconName,
  secureTextEntry,
  ...rest
}: AppInputParams<T>) => {
    const [showText, setShowText] = useState(secureTextEntry)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<TextInput>(null)

    const checkFocus = () => {
    if (inputRef.current) {//verifica se o input esta focado.
      setIsFocused(inputRef.current.isFocused())
    }
  }
//fildstate é um objeto que contém o estado do campo, incluindo erros de validação.
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value,},fieldState:{error} }) => {
       
        return (
          <View className="w-full mt-5">
            {label && 
            <Text className={clsx( 'mb-2 mt-3 text-base',
                isFocused ? 'text-accent-brand' : 'text-gray-600'
                )}>{label}
             </Text>}

            <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-600 px-3 py-2 h-16">
               {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  size={24}
                  color={isFocused ? colors['accent-brand'] : colors.gray[600]}
                  className="mr-2"
                />
              )}

              <TextInput
                value={value}
                onChangeText={onChange}
                {...rest}
                onFocus={checkFocus}
                onEndEditing={checkFocus}
                placeholderTextColor={colors.gray[400]}
                className='flex-1 text-base text-gray-500 '
                ref={inputRef}
                secureTextEntry={showText}
              />

              {secureTextEntry && (// Exibe o ícone de visibilidade apenas se secureTextEntry for true
                <TouchableOpacity
                  onPress={() => setShowText((value) => !value)}// alterna a visibilidade do texto
                >
                  <MaterialIcons
                    name={showText ? 'visibility' : 'visibility-off'}
                    color={colors.gray[600]}
                    size={24}
                  />
                </TouchableOpacity>
              )}

            </TouchableOpacity>

              {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </View>
        )
      }}
    />
  )
}
//No error estou passando os erros de validação do input caso exista.