import mongoose from "mongoose";

const puppySchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        photoUrl: {
            type: String,
            required: true
        },
        breed: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        traits: {
            type: [String],
            require: true
        },
        isVaccinated: {
            type: Boolean,
            required: true
        },
        isNeutered: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Puppy = mongoose.model('Puppy', puppySchema);
export default Puppy;