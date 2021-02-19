import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "f2e3b322e46e4bdbac55c8c4caf58527",
});

const handleClarifaiAPI = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("API error"));
};

export default handleClarifaiAPI;
