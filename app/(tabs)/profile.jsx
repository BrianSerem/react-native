import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from '../../lib/appwrite'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Redirect } from 'expo-router'

const Profile =  () => {
  const { user, setIsLoggedIn } = useGlobalContext()

  const submit = () => {
    console.log('Log out attempted')
    // setIsLoggedIn(false)
  }
  return (
    <SafeAreaView>
      <Text className='font-semibold'>
        {user.email}
      </Text>
      <Text>
        {user.username}
      </Text>
      <CustomButton title='Sign Out' handlePress={submit}/>
    </SafeAreaView>
  )
}

export default Profile