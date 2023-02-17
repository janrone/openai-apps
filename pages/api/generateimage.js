import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    const animal = req.body.animal || '';
    if (animal.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid animal",
            }
        });
        return;
    }

    try {
        console.log("promt:" + animal)

        const completion = await openai.createImage({
            prompt: animal,
            //n: 2,
            n: 2,
            size: "1024x1024",
        });

        console.log("promt:" + generatePrompt(animal))

        console.log("completion" + completion["data"].data)

        const image_url = completion["data"].data[0].url;

        console.log(JSON.stringify(completion["data"].data))

        res.status(200).json({
            success: true,
            url: image_url,
            result: image_url
        });

    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}
