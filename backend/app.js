var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const express = require("express");
const monk = require("monk");
var ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
var db = monk("localhost:27017/driprealty");
const bp = require("body-parser");

var indexRouter = require("./routes/index");

// console.log(db.listCollections())
var cors = require("cors");
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(cors());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST");
  res.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-auth-token"
  );
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get("/", (req, res) => {
  return res.json({ message: "Hello World 👋🇵🇹" });
});

var properties = db.get("properties");

// Method used to retreive one or all properties
app.get("/properties", async (req, res) => {
  try {
    let data;
    console.log(req.query);
    if (Object.keys(req.query).length === 0) {
      data = await properties.find();
    } else {
      data = await properties.find({ id: req.query.id });
    }
    console.log(req.body);

    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Method used to update existing property or create a new property
app.put("/properties", async (req, res) => {
  try {
    const data = await properties.update(
      { id: req.query.id.toString() },
      { $set: req.body },
      { upsert: true }
    );
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Method used to delete a property listing
app.delete("/properties", async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      data = [];
    } else {
      data = await properties.remove({ id: req.query.id });
    }
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

var reservations = db.get("reservations");

// Method to retrieve one or all reservations.
app.get("/reservations", async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      data = await reservations.find();
    } else {
      data = await reservations.find({ id: req.query.id });
    }
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Method to update a reservation or create a new reservation
app.put("/reservations", async (req, res) => {
  try {
    const data = await reservations.update(
      { id: req.query.id.toString() },
      { $set: req.body },
      { upsert: true }
    );
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Method to delete a reservation
app.delete("/reservations", async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      data = [];
    } else {
      data = await reservations.remove({ id: req.query.id });
    }
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

var users = db.get("users");
// Method used to retrieve users
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
// Method used to retrieve comments for a property listing
app.get("/comments", async (req, res) => {
  try {
    console.log(await db.listCollections());
    const data = await comments.find();
    return res.json(data);
  } catch (error) {
    throw boomify(error);
  }
});
// Method used to update existing comment or create a new comment
app.put("/comments", async (req, res) => {
  try {
    const data = await comments.update(
      { id: req.query.id.toString() },
      { $set: req.body },
      { upsert: true }
    );
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});
// Get the join of a the reservation and its corresponding property
app.get("/reservationsProperty", async (req, res) => {
  try {
    let data = await reservations.aggregate([
      {
        $lookup: {
          from: "properties",
          localField: "listing_id",
          foreignField: "id",
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

app.put("/insert", async (req, res) => {
  try {
    // console.log(await db.listCollections())
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

    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
