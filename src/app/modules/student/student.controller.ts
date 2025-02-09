import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation using Joi

    const { student: studentData } = req.body;
    const { error, value } = studentSchema.validate(studentData);

    if (error) {
      res.status(500).json({
        success: true,
        message: "Something went wrong",
        error,
      });
    }

    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(value);
    //send response
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: "Student data retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: "Student data retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
