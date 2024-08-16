import React, { createContext, useContext, useState, useEffect } from 'react';
import { OpenAI } from 'openai';

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const [ API, setAPI ] = useState(null);

    useEffect(() => {
        const openAIInstance = new OpenAI({
            organization: "org-IeNG9OKxN1QKicEY89eso7sn",
            project: "proj_vfzVdnagUhHybW0Kxgq0GnJt",
            apiKey: "dummykey",
            dangerouslyAllowBrowser: true,
        });

        setAPI(openAIInstance);
    }, []);

    return (
        <APIContext.Provider value={{ API }}>
            {children}
        </APIContext.Provider>
    );
};

export const useAPI = () => useContext(APIContext);