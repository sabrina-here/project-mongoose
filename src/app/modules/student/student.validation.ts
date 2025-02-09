import Joi from "joi";

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/)
    .required()
    .messages({
      "string.empty": "bhai first name lagbei lagbe",
      "string.max": "name cannot be more than 20 characters",
      "string.pattern.base": "{#value} is not in capitalize format",
    }),
  middleName: Joi.string().required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required()
    .messages({
      "string.pattern.base": "{#value} is not valid",
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only":
      "The gender can only be one of the following: 'male','female', or 'other'",
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    "string.email": "{#value} is not a valid email type",
  }),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only": "{#value} is not valid",
    }),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid("active", "inActive").default("active"),
});

export default studentSchema;
