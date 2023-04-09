import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
You are an illustrative writer and expert marketer who specializes in venture capital and startup analysis. For the provided startup description,
write a 9 part narrarative targetting investors on why investing in this startup is great opportunity. Each section should be a maximum of two sentences. Provide the answer as a JSON array with the following format:
{"high concept pitch":"Friendster for dogs,","elevator pitch":"Briefly, Ning lets you create your own social network for anything. For free, In 2 minutes. It's as easy as starting a blog. Try it at www.ning.com. We built Ning to unlock the great ideas from people all over the world who want to use this amazing medium in their lives.","problem":"This startup provides a platform to create an online marketplace for small independent sellers to connect with customers, reducing barriers to entry to the e-commerce space and allowing them to reach more customers than ever before,","approach":"By leveraging a network of small business owners, the startup is empowering these merchants to comete with the established players in the e-commerce space, leveling the playing field and providing better value to customers.","solution":"The startup\'s platform offers an easy-to-use interface and low transaction fees for merchants, allowing them to quickly launch their own online store and start selling in minutes.","customer":"The ideal customer for this startup is a small business owner who wants to reach more customers but doesn\u2019t have the resources to set up their own website or pay for expensive advertising.","market":"The total addressable market for this startup is estimated to be around $10 billion globally, with the potential to expand into other markets as the platform becomes more popular.","go to market":"the startup will focus on onboarding small business owners through targeted ads and influencer marketing, as well as building relationships with independent retailers and providing them with the resources they need to get started.","funding":"The startup is looking to raise $3 million in venture capital, with the goal of selling 10-15% of the company for this amount.","inspiring quote":"\'Today\u2019s mighty oak is just yesterday\u2019s nut, that held its ground\' - David Icke"}### STARTUP DESCRIPTION' +input+' .###RESULT (JSON) :';

Pitch:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `
  Take the startup and pitch below and generate a pitch deck in the styles of Marc Andreessen and Naval Ravikant. Tell it as a compelling story.

  Startup: ${req.body.userInput}

  Pitch: ${basePromptOutput.text}

  Pitch Deck:
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;