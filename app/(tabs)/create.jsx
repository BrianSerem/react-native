import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { icons } from '../../constants'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Video, ResizeMode } from 'expo-av'

const Create = () => {

  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: ''
  })

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>
        <FormField
        title="Video Title"
        value={ form.title}
        placeholder="Give your video a catchy title..."
        handleChangeText={(e) => setForm({...form, title:e})}
        otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity>
            {form.video ? (<Video/> ):( <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center"></View>) }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create