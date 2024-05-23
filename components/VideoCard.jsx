import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const VideoCard = ({ video: { title, thumbnail, video, users: { username, avatar } } }) => {
    const tempUrl = "https://media.licdn.com/dms/image/D4D12AQHCdAYNU9TRsg/article-cover_image-shrink_720_1280/0/1695983654178?e=1721865600&v=beta&t=NOyYc-XCTlM0TumSUx_KxX0JtPBAVXvlKIEwnVI8UnM"

    const [play, setPlay] = useState(false)

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode='cover' />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-semibold text-sm" numberOfLines={1}> {title} </Text>
                        <Text className="text-xs font-pregular text-gray-100" numberOfLines={1}> {username} </Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} className="h-5 w-5" resizeMode="contain" />
                </View>
            </View>
            {play ? (<Text> Playing </Text>) :
                (<TouchableOpacity
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}>
                    <Image source={{ uri: tempUrl }} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />
                </TouchableOpacity>)}
        </View>
    )
}

export default VideoCard