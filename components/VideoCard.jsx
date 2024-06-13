import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'

const VideoCard = ({ video: { title, thumbnail, video, users: { username, avatar } } }) => {

    console.log(thumbnail)
    // const tempUrl = "https://media.licdn.com/dms/image/D4D12AQHCdAYNU9TRsg/article-cover_image-shrink_720_1280/0/1695983654178?e=1721865600&v=beta&t=NOyYc-XCTlM0TumSUx_KxX0JtPBAVXvlKIEwnVI8UnM"
    // const vidUrl = "https://videos.pexels.com/video-files/8087321/8087321-uhd_2160_3840_25fps.mp4"



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
            {play ? (
                <Video
                    source={{ uri: video }}
                    className="w-full h-60 rounded-xl mt-3"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) :
                (<TouchableOpacity
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}>
                    <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />
                </TouchableOpacity>)}
        </View>
    )
}

export default VideoCard