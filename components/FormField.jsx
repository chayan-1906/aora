import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from 'react';
import {icons} from '../constants';

export function FormField({title, placeholder, value, handleChangeText, otherStyles, keyboardType, ...props}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className={'text-base text-gray-100 font-pmedium'}>{title}</Text>
            <View className={'w-full h-16 flex-row px-4 bg-black-100 border-2 rounded-2xl border-black-200 focus:border-secondary items-center'}>
                <TextInput
                    className={'flex-1 text-white font-pregular text-base'}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={'#7B7B8B'}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    keyboardType={keyboardType}
                    returnKeyType={title === 'Password' ? 'done' : 'next'}
                />

                {
                    title === 'Password' && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image source={!showPassword ? icons.eye : icons.eyeHide} className={'w-6 h-6'} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    );
}
