"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userNameSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .trim()
        .max(20)
        .regex(/^[A-Z][a-zA-Z]*$/)
        .required()
        .messages({
        "string.empty": "bhai first name lagbei lagbe",
        "string.max": "name cannot be more than 20 characters",
        "string.pattern.base": "{#value} is not in capitalize format",
    }),
    middleName: joi_1.default.string().required(),
    lastName: joi_1.default.string()
        .regex(/^[A-Za-z]+$/)
        .required()
        .messages({
        "string.pattern.base": "{#value} is not valid",
    }),
});
const guardianSchema = joi_1.default.object({
    fatherName: joi_1.default.string().required(),
    fatherContactNo: joi_1.default.string().required(),
    fatherOccupation: joi_1.default.string().required(),
    motherName: joi_1.default.string().required(),
    motherContactNo: joi_1.default.string().required(),
    motherOccupation: joi_1.default.string().required(),
});
const localGuardianSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    occupation: joi_1.default.string().required(),
    contactNo: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
});
const studentSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: userNameSchema.required(),
    gender: joi_1.default.string().valid("male", "female", "other").required().messages({
        "any.only": "The gender can only be one of the following: 'male','female', or 'other'",
    }),
    dateOfBirth: joi_1.default.string().optional(),
    email: joi_1.default.string().email().required().messages({
        "string.email": "{#value} is not a valid email type",
    }),
    contactNo: joi_1.default.string().required(),
    emergencyContactNo: joi_1.default.string().required(),
    bloodGroup: joi_1.default.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .messages({
        "any.only": "{#value} is not valid",
    }),
    presentAddress: joi_1.default.string().required(),
    permanentAddress: joi_1.default.string().required(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: joi_1.default.string().optional(),
    isActive: joi_1.default.string().valid("active", "inActive").default("active"),
});
exports.default = studentSchema;
