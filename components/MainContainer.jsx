"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Box, Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import {toast} from "react-hot-toast"

const MainContainer = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const fileGenerativePart = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        const base64Content = base64Data.split(",")[1];
        resolve({
          inlineData: {
            data: base64Content,
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const identifyImage = async (additionalPrompt = "") => {
    if (!image) return;
    setIsLoading(true);
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    try {
      const imageParts = await fileGenerativePart(image);
      const result = await model.generateContent([
        `Identify this image and provide its name and important information including a brief explanation about that image. ${additionalPrompt}`,
        imageParts,
      ]);
      const response = result.response;
      const text = response
        .text()
        .trim()
        .replace(/```/g, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/-\s*/g, "")
        .replace(/\n\s*\n/g, "\n");
      //   setKeywords(keysText);
      setResult(text);
      generateKeywords(text);
      generateRelatedQuestions(text);
    } catch (error) {
      toast.error("The model is overloaded. Please try again later.");
      console.log(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateKeywords = async (text) => {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    console.log("here we ARE::: ", text);
    try {
      const result = await model.generateContent([
        `Given the following description of an image, provide exactly 5 concise keywords related to the subject.
        Only return the keywords, one per line, without any introductory or explanatory text:
        ${text}`,
      ]);

      const response = result.response;
      const keyword = response.text().trim().split("\n");
      //   console.log(keyword);
      setKeywords(keyword);
    } catch (error) {}
  };

  const generateRelatedQuestions = async (text) => {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    try {
      const result = await model.generateContent([
        `Based on the following description of an image, generate exactly 5 concise questions that someone might ask to learn more about the subject.
  Only return the questions, one per line, without any introductory or explanatory text:
  ${text}`,
      ]);

      const response = result.response;
      const questions = response.text().trim().split("\n");
      console.log(questions);
      setRelatedQuestions(questions);
    } catch (error) {
      console.log(error?.message);
    }
  };

  const regenerateContent = (text) => {
    identifyImage(`Focus more on aspects related to ${text}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        // textAlign: "center",
        width: {
          xs: "90%",
          md: "60%",
        },
        margin: "2rem",
        padding: !keywords || keywords.length === 0 ? "0.4rem" : "0",
      }}
    >
      <Typography
        sx={{
          margin: "1rem",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        Identify Your Image
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            margin: "1rem",
            fontFamily: "Segoe UI",
            // fontWeight: "500",
            fontSize: "1.1rem",
          }}
        >
          Upload an Image
        </Typography>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        ></input>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => document.querySelector("input[type='file']").click()}
          sx={{
            display: "flex",
            margin: "1rem",
          }}
        >
          Choose File
        </Button>
        {image && (
          <Box sx={{ margin: "1rem", boxShadow: "2" }}>
            <Image
              src={URL.createObjectURL(image)}
              alt="No file chosen"
              width={300}
              height={300}
              margin={2}
              style={{ objectFit: "contain" }}
            ></Image>
          </Box>
        )}
        {image && (
          <Button
            variant="contained"
            onClick={identifyImage}
            sx={{ margin: "1rem" }}
          >
            {" "}
            {isLoading ? "Identifying..." : "Identify Image"}
          </Button>
        )}
      </Box>

      {result && (
        // <Box></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#e5e5e5",
            alignItems: "center",
            marginTop: "1rem",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              weight: "400",
              fontFamily: "Playfair Display",
              margin: "1rem",
            }}
          >
            Image Information
          </Typography>
          <Typography
            sx={{ fontFamily: "Georgia", margin: "0.8rem", marginTop: "0" }}
          >
            {result}
          </Typography>
          {keywords?.length > 0 && relatedQuestions?.length > 0 && (
            <Box
              sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  weight: "400",
                  fontFamily: "Playfair Display",
                }}
              >
                Related Keywords
              </Typography>
              <Typography>
                {keywords.map((keyword, index) => {
                  return (
                    <Button
                      variant="outlined"
                      key={index}
                      sx={{
                        margin: "0.5rem",
                        color: "rgb(30, 64, 175)",
                        backgroundColor: "rgba(50, 130, 246, .2)",
                        fontSize: "12px",
                        padding: "0.5rem",
                        fontFamily: "Georgia",
                        "&:hover": {
                          backgroundColor: "rgba(50, 130, 246, .6)", // Color on hover
                        },
                      }}
                      onClick={() => regenerateContent(keyword)}
                    >
                      {keyword}
                    </Button>
                  );
                })}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  marginTop: "1rem",
                  fontSize: "1.2rem",
                  weight: "400",
                  fontFamily: "Playfair Display",
                }}
              >
                Related Questions
              </Typography>
              <Typography>
                {relatedQuestions.map((questions, index) => {
                  return (
                    <Button
                      variant="outlined"
                      sx={{
                        margin: "0.5rem 0.7rem",
                        color: "rgb(30, 64, 175)",
                        backgroundColor: "rgba(50, 130, 246, .2)",
                        fontSize: "12px",
                        padding: "0.4rem",
                        fontFamily: "Georgia",
                        "&:hover": {
                          backgroundColor: "rgba(50, 130, 246, .6)", // Color on hover
                          // color: "rgb(31, 64, 175)"
                        },
                      }}
                      key={index}
                      onClick={() => regenerateContent(questions)}
                    >
                      {questions}
                    </Button>
                  );
                })}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Card>
  );
};

export default MainContainer;
