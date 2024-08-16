import React, { createContext, useContext, useState, useEffect } from 'react';
import { OpenAI } from 'openai';

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const [ API, setAPI ] = useState(null);

    useEffect(() => {
        const openAIInstance = new OpenAI({
            organization: "org-IeNG9OKxN1QKicEY89eso7sn",
            project: "proj_vfzVdnagUhHybW0Kxgq0GnJt",
            apiKey: "sk-proj-ADjI2aXTROcdTiBwZlCx_f1rY30bREbuJ-19CbQOKAJR0gtErOEbr0nVHvPKC40JqFD5TNOmuk" + 
            "T3BlbkFJ9GYzOz273M7pnA4pElrTmHKFCBQYCyZFNMYnFnZ7KzMjEXF3FB0LlZZn0Tn7GY-D5-3oqiaqsA",
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