const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getGPT(){
  const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "My cryptocurrency portfolio holds bitcoin, ethereum, solana. As of the year 2023, give me predictions for the coins in my portfolio and recent news for each coin. Finally, suggest one cryptocurrency that is worth researching more about.",
  temperature: 1.2,
  max_tokens: 2048,
  // top_p: 1.0,
  n: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ["\"\"\""],
});
// const data = await response.json();
console.log(response.data.choices[0].text);
res.render('homepage', {...response.data.choices[0].text})
}

getGPT();


