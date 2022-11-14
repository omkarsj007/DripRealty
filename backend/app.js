const express = require("express");
const monk = require("monk");

var db = monk("localhost:27017/driprealty");
// console.log(db.listCollections())
var cors = require("cors");
const app = express();

// app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ message: "Hello World 👋🇵🇹" });
});

var properties = db.get("properties");
app.get("/properties", async (req, res) => {
  try {
    console.log(await db.listCollections());
    const data = await properties.find();
    return res.json(data);
  } catch (error) {
    throw boomify(error);
  }
});

app.put("/properties", async (req, res) => {
  try {
    body = req.body;
    console;
    const data = await properties.update({});
    return res.json(data);
  } catch (error) {
    throw boomify(error);
  }
});

var users = db.get("users");
app.get("/users", async (req, res) => {
  try {
    console.log(await db.listCollections());
    const data = await users.find();
    return res.json(data);
  } catch (error) {
    throw boomify(error);
  }
});

var comments = db.get("comments");
app.get("/comments", async (req, res) => {
  try {
    console.log(await db.listCollections());
    const data = await comments.find();
    return res.json(data);
  } catch (error) {
    throw boomify(error);
  }
});

var reservations = db.get("reservations");

app.get("/reservations", async (req, res) => {
  try {
    let data = await reservations.find();
    // console.log(sample)
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/reservationsProperty", async (req, res) => {
  try {
    let data = await reservations.aggregate([
      {
        $lookup: {
          from: "properties",
          localField: "listing_id",
          foreignField: "_id",
          as: "propertyDetails",
        },
      },
      {
        $match: { customer_id: "U2" },
      },
    ]);
    // console.log(sample)
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/userReservation", async (req, res) => {
  try {
    let data = await reservations.find({ customer_id: req.query.userID });
    console.log(req.query.userID);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.put("");

app.get("/insert", async (req, res) => {
  try {
    // console.log(await db.listCollections())
    await collection.insert({ item: "canvas" });
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
