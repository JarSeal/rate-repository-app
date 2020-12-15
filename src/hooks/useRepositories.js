import { useState, useEffect } from 'react';
import Constants from 'expo-constants';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);

    const fetchRepositories = async () => {
        setLoading(true);

        const response = await fetch(Constants.manifest.extra.FETCH_API);
        const json = await response.json();

        setLoading(false);
        setRepositories(json);
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;