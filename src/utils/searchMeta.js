import { plainText } from "./content.js";

// Editorial search titles are independent of the original session names and URLs.
const talkTitles = {
  "ML Ascent 3 - A Hands-on Workshop on Representation Learning for Computer Vision Using Keras and TensorFlow":
    "Representation Learning Workshop: Keras & TensorFlow",
  "ML Ascent 2 - Representation Learning Computer Vision":
    "Representation Learning for Computer Vision",
  "MLAscent 1 - Pretraining Deep Learning Models Computer Vision":
    "Pretraining Models for Computer Vision",
  "ML in Depth - Picture-Perfect Phrases Contrastive Learning in AI Visual-Language Alignment":
    "Contrastive Learning for Image–Text Alignment",
  "ML in Depth 7 - Generative AI Fine-tuning LLMs with LoRA":
    "Fine-tuning LLMs with LoRA",
  "ML in Depth - Generative AI A Look into Transformers":
    "Inside the Transformer Architecture",
  "ML in Depth 6 - Generative AI How to train your GAN":
    "How to Train Your GAN",
  "ML In Depth: 3 - Deep Computer Vision - Object Detection":
    "Object Detection with Deep Learning",
  "ML In Depth: 2 - Deep Computer Vision - Segmentation":
    "Image Segmentation with Deep Learning",
  "ML In Depth 1 - Deep Computer Vision - Classification":
    "Image Classification with Deep Learning",
  "BlaBlaConf 22  ML for Production - The Art of MLOps in the TensorFlow Ecosystem":
    "TensorFlow MLOps at BlaBlaConf 2022",
  "Devfest - ML for Production - The Art of MLOps in the TensorFlow Ecosystem":
    "TensorFlow MLOps at DevFest",
  "MENADD - Introduction to Reinforcement Learning":
    "Introduction to Reinforcement Learning",
  "MENADD - Land Cover Classification using Multispectral Sentinel-2 Satellite Imagery, Google Earth Engine, and TensorFlow":
    "Sentinel-2 Land Cover Classification with TensorFlow",
  "30DaysofML - #MLReady WCV1: Image Classification with Dense NN TF":
    "Image Classification with Dense Networks in TensorFlow",
  "30DaysofML - #MLReady WTS2: Time Series Forecasting with TF":
    "Time Series Forecasting with TensorFlow",
  "30DaysofML - #MLReady WTS3: Time Series Annomaly Detection with TF":
    "Time Series Anomaly Detection with TensorFlow",
  "30DaysofML - #MLReady WNLP 1 & WLNP 2 Sentimental Analysis with TF":
    "Sentiment Analysis with TensorFlow",
};

export const talkSearchTitle = (talk) => talkTitles[talk.title] || talk.title;

// Prefer a complete opening sentence. If necessary, excerpt at a word boundary.
// This is an editorial budget, not a Google-imposed character limit.
export function searchExcerpt(value, limit = 170) {
  const text = plainText(value);
  if (text.length <= limit) return text;
  const sentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0];
  if (sentence && sentence.length <= limit && sentence.length >= 50)
    return sentence;
  const excerpt = text.slice(0, limit - 1).replace(/\s+\S*$/, "");
  return excerpt.replace(/[,:;–—-]+$/, "").trim() + "…";
}
