import { Image, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react';
import { icons } from '../constants'
import { router, usePathname } from 'expo-router';

const SearchInput = ({ initialQuery }) => {

  const pathName = usePathname()
  const [query, setQuery] = useState(initialQuery || '')
  console.log(query)

  return (
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={query}
          placeholder='Search videos by topic'
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setQuery(e)}
        />

          <TouchableOpacity onPress={() => {
            if(!query) {
              return Alert.alert('Missing search term!', 'Please input a search term to search videos')
            }
            if(pathName.startsWith('/search')) router.setParams({ query })
            else router.push(`/search/${query}`)
          }}>
            <Image source={icons.search} className="h-5 w-5" resizeMode='contain'/>
          </TouchableOpacity>

      </View>
  )
}

export default SearchInput