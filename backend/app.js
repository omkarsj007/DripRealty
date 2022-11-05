
const express = require("express");
const monk = require("monk");

var db = monk('localhost:27017/vidzy');
// console.log(db.listCollections())
var collection = db.get('mycollection');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello World 👋🇵🇹" });
});

app.get("/posts", async (req, res) => {
  try {
    console.log(await db.listCollections())
    const data = await collection.find();
    return res.json(data);
  } catch (error) {
    throw boomify(error);
  }
});

app.get("/insert", async (req, res) => {
  try {
    // console.log(await db.listCollections())
    await collection.insert({item: 'canvas'});
    // let results = await collection.insertOne({
    //   _id: 1000,
    //   user_id: 23452345,
    //   listing_id: 10081847350,
    //   start_date: new Date(2022, 09, 09, 13, 12),
    //   end_date: new Date(2022, 09, 19, 13, 12),
    //   created_date: new Date(2022, 08, 19, 13, 12),
    //   last_updated_date: new Date(2022, 08, 19, 13, 12),
    //   cost: 300
    // })
    const data = await collection.find();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});


module.exports = app;