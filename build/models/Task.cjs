"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// We start by defining a schema
const TaskSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Must provide a name!"],
        trim: true,
        maxLength: [20, "Name cannot be longer than 20 characters!"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});
// Then we compile the schema into a model (which is a class) that
// is going to be used to create documents
exports.default = mongoose_1.default.model("Task", TaskSchema);
