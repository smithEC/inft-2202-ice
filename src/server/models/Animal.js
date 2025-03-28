import { Schema, model } from "mongoose";

const fields = {
    name:{
        type: String,
        required: true
    },
    breed:{
        type: String,
        required: true
    },
    legs:{
        type: Number,
        required: true
    },
    eyes:{
        type: Number,
        required: true
    },
    sound:{
        type: String,
        required: true
    }
}

const options = {
    timestamp: true
}

const schema = new Schema(fields,options);
export default model('Animal',schema);
