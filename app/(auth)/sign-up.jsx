import {Alert, Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import {FormField} from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import {useState} from 'react';
import {createUser} from "../../lib/appwrite";
import {useGlobalContext} from "../../contexts/GlobalProvider";

function SignUp() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    let {setIsLoggedIn, user, setUser} = useGlobalContext();

    async function submit() {
        if (!form.username || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        setIsSubmitting(true);

        try {
            let result = await createUser(form.username, form.email, form.password);
            console.log(`signed in user - ${JSON.stringify(result)}`);

            setUser(result);
            setIsLoggedIn(true);

            router.replace('/home');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className={'w-full min-h-[85vh] px-4 my-6 justify-center'}>
                    <Image source={images.logo} resizeMode={'contain'} className={'w-[115px] h-[35px]'}/>
                    <Text className={'text-2xl text-white mt-10 font-psemibold'}>Sign up to Aora</Text>
                    <FormField
                        title={'Username'}
                        value={form.username}
                        handleChangeText={(e) => setForm({...form, username: e})}
                        otherStyles={'mt-10'}
                        keyboardType={'name-phone-pad'}
                    />
                    <FormField
                        title={'Email'}
                        value={form.email}
                        handleChangeText={(e) => setForm({...form, email: e})}
                        otherStyles={'mt-7'}
                        keyboardType={'email-address'}
                    />
                    <FormField
                        title={'Password'}
                        value={form.password}
                        handleChangeText={(e) => setForm({...form, password: e})}
                        otherStyles={'mt-7'}
                    />
                    <CustomButton title={'Sign Up'} handlePress={submit} containerStyle={'mt-7'} isLoading={isSubmitting}/>

                    <View className={'justify-center pt-5 flex-row gap-2'}>
                        <Text className={'text-lg text-gray-100 font-pregular'}>Already have an account?</Text>
                        <Link href={'/sign-in'} className={'text-lg font-psemibold text-secondary'}>Sign In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignUp