import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[{ id: 1 }, { id: 2 }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (<Text> {item.id} </Text>)}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text>
                  Welcome Back
                </Text>
                <Text>
                  Brian Serem
                </Text>
              </View>
            </View>
          </View>
  )}>
      </FlatList>
    </SafeAreaView>
  )
}

export default Home