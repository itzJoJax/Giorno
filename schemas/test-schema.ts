import db from "mongoose";

const testSchema = new db.Schema({
    message: {
        type: String,
        required: true
    }
});

export default db.model("testSchema", testSchema);
