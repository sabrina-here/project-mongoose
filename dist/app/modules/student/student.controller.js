"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const student_validation_1 = __importDefault(require("./student.validation"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //creating a schema validation using Joi
        const { student: studentData } = req.body;
        const { error, value } = student_validation_1.default.validate(studentData);
        if (error) {
            res.status(500).json({
                success: true,
                message: "Something went wrong",
                error,
            });
        }
        //will call service func to send this data
        const result = yield student_service_1.StudentServices.createStudentIntoDB(value);
        //send response
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDb();
        res.status(200).json({
            success: true,
            message: "Student data retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getSingleStudentFromDb(studentId);
        res.status(200).json({
            success: true,
            message: "Student data retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});
exports.StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
