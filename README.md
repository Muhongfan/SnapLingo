### SnapLingo

<!-- ABOUT THE PROJECT -->

## Overview

SnapLearn revolutionizes language learning by integrating immersive experiences with AI-engaged techniques to learn the language through our surrounding environment. It empowers users to effortlessly learn the target language through the lens of their surroundings. Whether you're exploring foreign lands, navigating daily life, or even teaching toddlers their first words, SnapLearn makes language acquisition an engaging and enjoyable journey.

## About the project

### UI

- Tablet screen:
  1. Main page, shows most recent pictures/learning:
     ![Main page](images/FireShot/pics.png)
  2. Capture page, take a picture and learn the objects in your surrounding!
  - Enable camera and capture the picture:
    ![Enable camera](images/FireShot/capture_page.png)
  - Loading:
    ![Loading](images/FireShot/loading.png)
  - Detected objects:
    ![Object detection](images/FireShot/object_analysis.png)
  3. Gallery page:
     ![Gallery](images/FireShot/gallery.png)
- Desktop screen (partial):
  1. ![Main](images/FireShot/desktop.png)

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- Front-end

  - React.js
  - Chakra-ui
  - Google cloud version API

- Back-end
  - SQL
  - Express.js
  - Google Gemini API
  - Merriam-webster API

### Database

![Database](images/database.png)

## Quick Start

1. under the `snaplearn` folder
2. `npm install` to install all the dependencies
3. Consider introduce environment variables into `/utils/utils.js` or `.env`, such as `API_URL`, `Client_URL` and `GEMINI_API_KEY`
   - Generate [Gemini API KEY](https://aistudio.google.com/app/prompts/new_chat)
4. `npm start` start the project

## Core code

1. Backend:

- Insert image data and avoid duplicated one:

```js
const newImage = {
  id: imgId,
  content_url: uploadPath,
  object_labels: uniqueLabelsJSON,
  category: dataStructure,
  mood: mood,
  setting: setting,
  isImg: 1,
  user_id: 1,
};
const [newImageData] = await Promise.all([
  knex("image")
    .where({ id: imgId })
    .first()
    .then((existingRecord) => {
      if (existingRecord) {
        return knex("image").where({ id: imgId }).update(newImage);
      } else {
        // If the record doesn't exist, insert a new one
        return knex("image").insert(newImage);
      }
    }),
]);
```

- Label Translation:

```js
const labelTranslation = await Promise.all(
      uniqueLabelsArray.map(async (label) => {
        try {
          let definition = await vocabTranslation(label);

          if (typeof definition === "string") {
            // cons.log("definition", definition);
            definition = await vocabTranslation(label.split(" ")[0]);
          }
          const shortDefs = JSON.stringify(definition.shortdef);

          await knex("label_translation").insert({
            label: label,
            translation: definition.meta.id,
            explanation: shortDefs,
            synonyms: "",
            language: "en",
            image_id: imgId,
          });
          const insertedRecord = await knex("label_translation")
            .where({ label: label, translation: definition.meta.id })
            .first();

```

- Generate Category:

```js
// Accessing the generated text
const generatedText = response;
// Do something with the generated text
// Find the starting and ending indices of the mood and setting information
const moodStartIndex = generatedText.indexOf("**Mood:**") + "**Mood:** ".length;
const moodEndIndex = generatedText.indexOf("**Setting:**");
const settingStartIndex =
  generatedText.indexOf("**Setting:**") + "**Setting:** ".length;

// Extract the mood and setting information from the generated text
const mood = generatedText.substring(moodStartIndex, moodEndIndex).trim();
const setting = generatedText.substring(settingStartIndex).trim();

// Create the data structure
const dataStructure = { Mood: mood, Setting: setting };
```

- Grouped by date:

```js
 const allDate = await knex("image")
      .select(knex.raw("DATE(created_at) as date"))
      .groupBy("date")
      .orderBy("date", "desc");
    const ImgDates = allDate.map((d) => ({
      date: d.date.toISOString().split("T")[0],
    }));
    const imagesByDate = [];
    // Query the images by dates
    for (const dateObj of ImgDates) {
      const images = await knex("image")
        .whereRaw(
          "NOT (JSON_LENGTH(object_labels) = 0 AND JSON_CONTAINS(object_labels, '[]'))"
        )
        .select("id", "content_url", "updated_at")
        .whereRaw("DATE(created_at) = ?", dateObj.date)
        .orderBy("created_at", "desc");

      imagesByDate.push({
        date: dateObj.date,
        images: images,
      });
    }
    ```

2. Frontend:
- Enable camera, capture image, stop camera, sent the image to the backedn:

``javascript
  const sendImageToBackend = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(POST_API, {
        id: imgId,
        image: capturedImage,
      });

      onImgIdChange(response.data);
      // console.log("capturedImage",capturedImage);
      setTimeout(() => {
        setIsLoading(false);
      }, 0);

    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading image:", error);
    }
  };
```


<!-- CONTACT -->

## Contact

Hongfan(Amber) Mu - [@linkedin](www.linkedin.com/in/hongfan-mu) - hmu026@icloud.com


