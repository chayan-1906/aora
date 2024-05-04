import {SplashScreen, Stack} from "expo-router";
import {useFonts} from 'expo-font';
import {useEffect} from 'react';
import GlobalProvider from '../contexts/GlobalProvider.jsx';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    let [fontsLoaded, error] = useFonts({
        "Kanit-Black": require("../assets/fonts/Kanit-Black.ttf"),
        "Kanit-Bold": require("../assets/fonts/Kanit-Bold.ttf"),
        "Kanit-ExtraBold": require("../assets/fonts/Kanit-ExtraBold.ttf"),
        "Kanit-ExtraLight": require("../assets/fonts/Kanit-ExtraLight.ttf"),
        "Kanit-Light": require("../assets/fonts/Kanit-Light.ttf"),
        "Kanit-Medium": require("../assets/fonts/Kanit-Medium.ttf"),
        "Kanit-Regular": require("../assets/fonts/Kanit-Regular.ttf"),
        "Kanit-SemiBold": require("../assets/fonts/Kanit-SemiBold.ttf"),
        "Kanit-Thin": require("../assets/fonts/Kanit-Thin.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) return null;

    return (
        <GlobalProvider>
            <Stack>
                <Stack.Screen name={'index'} options={{headerShown: false}}/>
                <Stack.Screen name={'(auth)'} options={{headerShown: false}}/>
                <Stack.Screen name={'(tabs)'} options={{headerShown: false}}/>
                <Stack.Screen name={'search/[query]'} options={{headerShown: false}}/>
            </Stack>
        </GlobalProvider>
    );
}
