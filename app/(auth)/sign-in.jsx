import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, Redirect, router } from 'expo-router'
import { signIn } from '../../lib/appwrite'
import { Alert } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getCurrentUser } from '../../lib/appwrite'

const SignIn = () => {
  const { setUser, setIsLoggedIn, isLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const submit = async () => {
    if (!form.email || !form.password) { Alert.alert('Error', 'Please fill all the fields') }

    setIsSubmitting(true)
    try {

      await signIn(form.email, form.password)
      const user =await getCurrentUser()
      setIsLoggedIn(true)
      setUser(user)
      //Set to global state later on
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
      console.log(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoggedIn) return (<Redirect  href='home'/>)
  return (

    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]' />
          <Text className='text-2xl text-white text-semibold mt-10 font-semibold'>Log In to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default SignIn

const styles = StyleSheet.create({})