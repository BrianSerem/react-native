import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import { icons } from '../constants'

const SearchInput = ({ title, placeholder, otherStyles, value, handleChangeText, ...props }) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword} />

          <TouchableOpacity>
            <Image source={icons.search} className="h-5 w-5" resizeMode='contain'/>
          </TouchableOpacity>

      </View>
  )
}

export default SearchInput