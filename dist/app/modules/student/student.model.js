"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "bhai first name lagbei lagbe"],
        max: [20, "name cannot be more than 20 characters"],
        trim: true,
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: "{VALUE} is not in capitalize format",
        },
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: "{VALUE is not valid}",
        },
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherContactNo: { type: String, required: true },
    motherOccupation: { type: String, required: true },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: userNameSchema, required: true },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "The gender can only be one of the following: 'male','female',or 'other'", /// ----------error message
        },
        required: true,
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "{VALUE} is not a valid email type",
        },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: {
            values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            message: "{VALUE} is not valid", //---------------------------- error message
        },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ["active", "inActive"],
        default: "active",
    },
});
exports.StudentModel = (0, mongoose_1.model)("Student", studentSchema);
