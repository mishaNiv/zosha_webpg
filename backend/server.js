import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';

dotenv.config();

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
});

export const getSearchResults = async (req, res) => {
    const { preferences } = req.body;

    const message = `Take the following preferences and return a long semicolon separated list of
        colleges that fit them (ordered by best fit), include absolutely no introduction or descriptions. 
        Do NOT number the colleges (including the first one), I want a semi-color list of text. If the 
        preferences entered are not understandable words, ask again for preferences. If you asked for
        specialized colleges, like medical or engineering colleges, simply provide the name of the
        university that that has that specialized college, not the name of the medical or engineering 
        college within the university. If location preferences aren't included, assume the location 
        is the United States of America. Prefernences: 
        ${preferences} `;

    try {
        const response = await cohere.generate({
            model: 'command-r-plus-08-2024',
            prompt: message,
            max_tokens: 200,
            temperature: 0.7,
        });

        const content = response.generations[0].text.trim();
        res.json({ result: content });
    } catch (error) {
        console.error("Error calling Cohere Command API: ", error);
        res.status(500).send("Error generating response");
    }
}

export const getCollegeDesc = async (req, res) => {
    const { col_name } = req.body;

    const message = `Provide a short description, no more than 50 words, of the following college that
          would be suited for a student deciding whether to apply for said college: ${col_name}`;

    try {
        const response = await cohere.generate({
            model: 'command-r-plus-08-2024',
            prompt: message,
            max_tokens: 200,
            temperature: 0.7,
        });

        const content = response.generations[0].text.trim();
        res.json({ result: content });
    } catch (error) {
        console.error("Error calling Cohere Command API: ", error);
        res.status(500).send("Error generating response");
    }
}