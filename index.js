    require("./db");
const express = require("express");
const {
  User
} = require("./model");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const key = "jobduniya";

//
app.use(cors());
app.use(express.json());


app.post("/fileupload", async (req, res) => {
  try {
      const ImgUrl = req.body.ImgUrl;
      const userId = req.body.userId;
      try {
          const newUpdate = await User.findOneAndUpdate(
              { _id: userId },
              { $set: {"profileImage": ImgUrl} }
          );

          if (newUpdate) {
              res.status(200).json({
                  res: "ok",
                  msg: "Updated data successfully",
                  update: newUpdate
              });
          } else {
              res.status(404).json({
                  res: "ok",
                  msg: "No data found to be updated"
              })
          }
      } catch (error) {
          res.status(411).json({
              res: "Error",
              msg: "Error While Updating User Profile Images",
              error: error,
          });
      }
  } catch (error) {
      res.status(411).json({
          res: "Error",
          msg: "Invalid Input Types",
          type: {
              update: {
                  field: "value",
              },
          },
          error: error,
      });
  }
});
app.listen(5600, () => console.log("server started..."))


