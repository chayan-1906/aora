import {Text, TouchableOpacity} from "react-native";

function CustomButton({title, handlePress, containerStyle, textStyles, isLoading}) {
    return (
        <TouchableOpacity
            className={`bg-secondary rounded-xl min-h-[50px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
            onPress={handlePress} activeOpacity={0.7}>
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton