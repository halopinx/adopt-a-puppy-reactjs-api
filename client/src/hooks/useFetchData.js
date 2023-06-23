import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get(url)
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
      
    }, [url])

    const refetch = (url) => {
        setIsLoading(true);
        axios.get(url)
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
    }
    
    return {
        data,
        isLoading,
        error,
        refetch
    }

}

export default useFetchData;