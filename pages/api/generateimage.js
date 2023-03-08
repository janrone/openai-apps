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

    const input = req.body.input || '';
    if (input.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid input",
            }
        });
        return;
    }

    try {
        console.log("promt:" + input)

        const completion = await openai.createImage({
            prompt: input,
            //n: 2,
            n: 1,
            size: "512x512",
        });

    
        console.log("completion" + completion["data"].data)
        console.log(JSON.stringify(completion["data"].data[0].url))

        const image_url = completion["data"].data[0].url;
        res.status(200).json({
            success: true,
            image_url: image_url,
            result: input
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
