import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PlaceholderSchema = new Schema({
    name: String,
    data: String,
});
const Placeholder = mongoose.model("placeholders", PlaceholderSchema);
export default Placeholder;