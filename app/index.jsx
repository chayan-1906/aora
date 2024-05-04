import {Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from "../constants";
import CustomButton from "../components/CustomButton.jsx";
import {StatusBar} from "expo-status-bar"; // imp to import from expo-status-bar
import {Redirect, router} from "expo-router";
import {useGlobalContext} from "../contexts/GlobalProvider";

function App() {
    let {isLoading, isLoggedIn} = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href={'/home'}/>

    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <ScrollView contentContainerStyle={{height: '100%'}} showsVerticalScrollIndicator={false}>
                <View className={'h-full w-full px-4 items-center justify-center'}>
                    <Image source={images.logo} className={'w-[130px] h-[84px]'} resizeMode={'contain'}/>
                    <Image source={images.cards} className={'w-[380px] h-[300px]'} resizeMode={'contain'}/>
                    <View className={'relative mt-5'}>
                        <Text className={'text-3xl text-white font-bold text-center'}>Discover Endless{'\n'}Possibilities with{' '}
                            <Text className={'text-secondary-200'}>Aora</Text>
                        </Text>
                        <Image source={images.path} className={'w-[136px] h-[15px] absolute -bottom-2 -right-8'} resizeMode={'contain'}/>
                    </View>

                    <Text className={'font-pregular text-gray-100 mt-7 text-center'}>Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

                    <CustomButton title={'Continue with Email'} handlePress={() => {
                        router.push('/sign-in')
                    }} containerStyle={'w-full mt-7'}/>
                </View>
            </ScrollView>

            <StatusBar backgroundColor={'#161622'} style={'light'}/>
        </SafeAreaView>
    );
}

export default App