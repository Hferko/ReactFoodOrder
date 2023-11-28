import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Valami hiba történt, nem sikerült elküldeni a kérést');
    }
    return resData;
}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const keresKuldese = useCallback(
        async function keresKuldese(data) {
            setLoading(true);
            try {
                const resData = await sendHttpRequest(url, {...config, body: data});
                setData(resData);
            }
            catch (error) {
                setError(error.message || 'Valami hiba történt');
            }
            setLoading(false);
        }, [url, config]);

    useEffect(() => {
        if ((config && config.method === 'GET' || !config.method) || !config) {
            keresKuldese();
        }

    }, [keresKuldese, config]);

    return {
        data,
        loading,
        error,
        keresKuldese,
        clearData
    }
}