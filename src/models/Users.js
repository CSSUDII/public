const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    name: {
        type: String,
        required: 'No Name Provided',
        unique: false
    },
    email: {
        type: String,
        required: 'No Email Provided',
        unique: true
    },
    password: {
        type: String,
        required: 'No Password Provided',
        unique: false
    }
});
const Users = mongoose.model("users", UsersSchema);
export default Users;