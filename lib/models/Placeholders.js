"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PlaceholderSchema = new Schema({
  name: String,
  data: String
});
const Placeholder = mongoose.model("placeholders", PlaceholderSchema);
module.exports = Placeholder;