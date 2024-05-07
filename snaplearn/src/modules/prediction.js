import { AutoProcessor, AutoModel, AutoTokenizer } from '@xenova/transformers';

import {OPAI_API_KEY} from '../utils/utils'
const openai = require("openai");
// import { pipeline } from '@xenova/transformers';

openai.api_key = OPAI_API_KEY; // Your OpenAI key

// Object creation model, tokenizer, and processor from HuggingFace
const processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-base");
const model = AutoModel.from_pretrained("Salesforce/blip-image-captioning-base");
const tokenizer = AutoTokenizer.from_pretrained("Salesforce/blip-image-captioning-base");

const openai_model = "text-davinci-002"; // OpenAI model
// const device = "cuda"; // Assuming "cuda" here, you might want to check availability dynamically
// model.to(device);

async function caption_generator(des) {
  const caption_prompt = `Please generate three unique and creative captions to use for a live photo that shows ${des}. The caption should be descriptive and creative.
  Captions:
  1.
  2.
  3.
`;
  // Caption generation
  const response = await openai.Completion.create({
    engine: openai_model,
    prompt: caption_prompt,
    max_tokens: 175 * 3,
    n: 1,
    stop: null,
    temperature: 0.7,
  });

  const caption = response.choices[0].text.trim().split("\n");
  return caption;
}

async function hashtag_generator(des) {
  // Prompt
  const hashtag_prompt = `Please generate ten relevant and accurate hashtags that will help 
  the user to learn context (such as vibe, environment, objects) in this photo that shows ${des}. 
  The hashtag can be accurate and summarized. Please also provide in this format.
  Hashtags:
  [Hashtag1, Hashtag2,Hashtag3,Hashtag5,Hashtag5]`;

  // Hashtag Generation
  const response = await openai.Completion.create({
    engine: openai_model,
    prompt: hashtag_prompt,
    max_tokens: 20 * 5,
    n: 1,
    stop: null,
    temperature: 0.7,
  });

  const hashtag = response.choices[0].text.trim().split("\n");
  return hashtag;
}

export default async function prediction(image) {
  const max_length = 30;
  const num_beams = 4;
  const gen_kwargs = { max_length, num_beams };

  // Image data to pixel values
  const pixel_val = processor({
    images: image,
    return_tensors: "pt",
  }).pixel_values;
  // pixel_val = pixel_val.to(device);

  // Using model to generate output from the pixel values of Image
  const output = model.generate(pixel_val, gen_kwargs);

  // To convert output to text
  let predict = tokenizer.batch_decode(output, { skip_special_tokens: true });
  predict = predict.map((pred) => pred.trim());

  return predict;
}

