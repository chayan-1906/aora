import {Alert} from "react-native";
import {useEffect, useState} from 'react';

const useAppwrite = (fn) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn();
            setData(response);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then(() => {
            console.log(data);
        });
    }, []);

    const refetch = () => fetchData();

    return {data, isLoading, refetch};
}

export default useAppwrite;