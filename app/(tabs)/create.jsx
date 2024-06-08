import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { icons } from '../../constants'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'

const Create = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>
        <FormField placeholder="Qwera"/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create