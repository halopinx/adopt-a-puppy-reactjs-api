import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            setData(response.data)
            setIsLoading(false)
        }
        fetchData();
    }, [data, url])

    return {
        data,
        isLoading
    }

}

export default useFetchData;