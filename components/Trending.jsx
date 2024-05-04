import {FlatList, Image, ImageBackground, Text, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import {useState} from 'react';
import {icons} from "../constants";
import {ResizeMode, Video} from "expo-av";

const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1,
    },
};

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
};

const TrendingItem = ({activeItem, item}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <Animatable.View className={'mr-5'} animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
            {
                isPlaying ? (
                    // <Text>{item.video}</Text>
                    <Video
                        source={{uri: item.video}}
                        // source={{uri: 'https://videos.pexels.com/video-files/20770858/20770858-sd_540_960_30fps.mp4'}}
                        // source={{uri: 'https://media.istockphoto.com/id/497375361/video/super-mother-and-daughter-running-to-the-sun.mp4?s=mp4-640x640-is&k=20&c=7RwPyzlurnRxyriCTKqzFMqgT6XrqIHNScD9C9esT38='}}
                        className={'w-52 h-72 rounded-[35px] mt-3 bg-white/10'}
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        shouldPlay
                        isMuted={false}
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                setIsPlaying(false);
                            }
                        }}
                    />
                ) : (
                    <TouchableOpacity className={'relative justify-center items-center'} activeOpacity={0.7} onPress={() => setIsPlaying(true)}>
                        <ImageBackground
                            source={{uri: item.thumbnail}} className={'w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'}
                            resizeMode={'cover'}
                        />
                        <Image source={icons.play} className={'w-12 h-12 absolute'} resizeMode={'contain'}/>
                    </TouchableOpacity>
                )
            }
        </Animatable.View>
    );
}

export function Trending({posts}) {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = ({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
            // console.log('item to play', viewableItems[0].item.video);
        }
    }

    return (
        <FlatList
            data={posts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => <TrendingItem activeItem={activeItem} item={item}/>}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            // contentOffset={{x: 170}}
        />
    );
}
