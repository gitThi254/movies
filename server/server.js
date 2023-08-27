const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log("DB connection Successful");
  })
  .catch((error) => {
    console.log("Some eror has occured");
  });

app.listen(port, () => {
  console.log("server has started...");
});
