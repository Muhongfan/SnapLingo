import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { Image } from "@google-cloud/vision";

const ImageCaptionGenerator = (imageFile) => {
  const [caption, setCaption] = useState("");

  const handleImageUpload = async (event) => {
    try {
      //   const imageFile = event.target.files[0];
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const prompt = `Please generate three unique and creative captions to use for a live photo that shows ${des}. The caption should be descriptive and creative.
      Captions:
      1.
      2.
      3.
    `;

      const image = {
        inlineData: {
            data:imageFile,
        //   data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
          mimeType: "image/png",
        },
      };

      const result = await model.generateContent([prompt, image]);
      console.log(result.response.text());
      console.log("caption:", result)

    } catch (error) {
      console.error("Error generating caption:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {caption && (
        <Card>
          <CardContent>
            <Typography variant="body1">Generated Caption:</Typography>
            <Typography variant="body2">{caption}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageCaptionGenerator;
