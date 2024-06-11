const { GoogleGenerativeAI } = require("@google/generative-ai");

const api_key = 'AIzaSyBpJHsVunBgt37UkEYKpWXbvw2VJCPQ8J8';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI({ apiKey: api_key });

// ...

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


// test the ai
const test = async (req, res) => {
    try {
        const prompt = "Once upon a time";
        const response = await model.generateText({ prompt });
        console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
};

test();