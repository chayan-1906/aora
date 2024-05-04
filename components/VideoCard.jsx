import {Image, Text, TouchableOpacity, View} from "react-native";
import {icons} from "../constants";
import {useState} from 'react';
import {ResizeMode, Video} from "expo-av";

export function VideoCard({video: {title, thumbnail, video, creator: {username, avatar}}}) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <View className={'flex-col items-center mb-14'}>
            <View className={'flex-row gap-3 items-start px-8'}>
                <View className={'flex-row justify-center items-center'}>
                    {/* creator image */}
                    <View className={'w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'}>
                        <Image source={{uri: avatar}} className={'w-full h-full rounded-md'} resizeMode={'cover'}/>
                    </View>

                    {/* title & creator */}
                    <View className={'justify-center flex-1 ml-3 gap-y-1'}>
                        <Text className={'text-sm text-white font-psemibold'} numberOfLines={1}>{title}</Text>
                        <Text className={'text-xs text-gray-100 font-pregular'} numberOfLines={1}>{username}</Text>
                    </View>
                </View>

                {/* menu icon */}
                <View className={'pt-2'}>
                    <Image source={icons.menu} className={'w-5 h-5'} resizeMode={'contain'}/>
                </View>
            </View>

            {
                isPlaying ? (
                    <Video
                        source={{uri: video}}
                        className={'w-full h-60 rounded-xl mt-3'}
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
                    <TouchableOpacity className={'w-full h-60 rounded-xl mt-3 px-4 relative justify-center items-center'} activeOpacity={0.7} onPress={() => setIsPlaying(true)}>
                        <Image source={{uri: thumbnail}} className={'w-full h-full rounded-xl mt-3'} resizeMode={'cover'}/>
                        <Image source={icons.play} className={'w-12 h-12 absolute'} resizeMode={'cover'}/>
                    </TouchableOpacity>
                )
            }
        </View>
    );
}
