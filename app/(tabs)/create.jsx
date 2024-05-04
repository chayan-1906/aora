import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from 'react';
import {FormField} from "../../components/FormField";
import {ResizeMode, Video} from "expo-av";
import {icons} from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import {router} from "expo-router";
import {createVideo} from "../../lib/appwrite";
import {useGlobalContext} from "../../contexts/GlobalProvider";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function Create() {
    let {user} = useGlobalContext();
    const [isUploading, setIsUploading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
    });

    const openPicker = async (selectType) => {
        /*const result = await DocumentPicker.getDocumentAsync({
            type: selectType === 'image' ? ['image/png', 'image/jpeg', 'image/jpg'] : ['video/mp4', 'video/gif', 'video/mov'],
        });*/

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            if (selectType === 'image') {
                setForm({...form, thumbnail: result.assets[0]})
            }
            if (selectType === 'video') {
                setForm({...form, video: result.assets[0]})
            }
        } else {
            setTimeout(() => {
                Alert.alert('Document Picked', JSON.stringify(result, null, 2));
            }, 100);
        }
    }

    const submit = async () => {
        if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
            return Alert.alert('Please fill all the fields');
        }
        try {
            await createVideo({...form, userId: user.$id});

            Alert.alert('Success', 'Post uploaded successfully');
            router.push('/home');
        } catch (e) {
            Alert.alert('Error', e.message);
        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: '',
            });
            setIsUploading(false);
        }
    }

    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <KeyboardAwareScrollView
                className={'px-4 mt-6'}
                extraScrollHeight={-70}
                // enableOnAndroid={false}
            >
                <Text className={'text-2xl text-white font-psemibold'}>Upload Video</Text>
                <FormField
                    title={'Video Title'}
                    value={form.title}
                    placeholder={'Give your video a catch title...'}
                    handleChangeText={(e) => setForm({...form, title: e})}
                />

                <View className={'mt-7 space-y-2'}>
                    <Text className={'text-base text-gray-100 font-medium'}>Upload Video</Text>
                    <TouchableOpacity onPress={() => openPicker('video')}>
                        {form.video ? (
                            <Video source={{uri: form.video.uri}} className={'w-full h-64 rounded-2xl'} resizeMode={ResizeMode.COVER}/>
                        ) : (
                            <View className={'w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'}>
                                <View className={'w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'}>
                                    <Image source={icons.upload} resizeMode={'contain'} className={'w-1/2 h-1/2'}/>
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className={'mt-7 space-y-2'}>
                    <Text className={'text-base text-gray-100 font-pmedium'}>Thumbnail Image</Text>
                    <TouchableOpacity onPress={() => openPicker('image')}>
                        {form.thumbnail ? (
                            <Image source={{uri: form.thumbnail.uri}} resizeMode={'cover'} className={'w-full h-64 rounded-2xl'}/>
                        ) : (
                            <View className={'w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'}>
                                <Image source={icons.upload} resizeMode={'contain'} className={'w-5 h-5'}/>
                                <Text className={'text-sm text-gray-100 font-pmedium'}>Choose a file</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <FormField
                    title={'AI Prompt'}
                    value={form.prompt}
                    placeholder={'The prompt you used to create this video'}
                    handleChangeText={(e) => setForm({...form, prompt: e})}
                    otherStyles={'mt-7'}
                />

                <CustomButton
                    title={'Submit & Publish'}
                    handlePress={submit}
                    containerStyle={'mt-7 mb-4'}
                    isLoading={isUploading}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
