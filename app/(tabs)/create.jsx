import { View, Text, TouchableOpacity, Image } from 'react-native'
import { icons } from '../../constants'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Create = () => {
  return (
    <SafeAreaView className="bg-primary border-2 h-full">
      <Text className="text-3xl">create</Text>
      <TouchableOpacity>
        <Image source={icons.upload} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Create