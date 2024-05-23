import * as Animatable from 'react-native-animatable'
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const tempUrl = "https://media.licdn.com/dms/image/D4D12AQHCdAYNU9TRsg/article-cover_image-shrink_720_1280/0/1695983654178?e=1721865600&v=beta&t=NOyYc-XCTlM0TumSUx_KxX0JtPBAVXvlKIEwnVI8UnM"


const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false)

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (<Text className="text-white"> Playing!</Text>) : (
                <TouchableOpacity
                    className="relative justify-center items-center"
                    activeOpacity={0.1}
                    onPress={() => setPlay(true)}>
                    <ImageBackground source={{ uri: tempUrl}}
                    className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"/>
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />

                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0])

    return (
        <FlatList
            horizontal
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
        />
    )
}

export default Trending