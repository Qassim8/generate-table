import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const departmentSchema = yup.object({
  name: yup.string().required("Department name is required"),
  code: yup.string().required("Department code is required"),
});

export const teacherSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  courseId: yup.string().required("Course is required"),
  departmentId: yup.string().required("Department is required"),
  qualification: yup.string().required("Qualification is required"),
  schedules: yup.array().of(
    yup.object().shape({
      day: yup.string().required("Day is required"),
      timeSlots: yup.array().of(
        yup.object().shape({
          start: yup.string().required("Start hour is required"),
          end: yup.string().required("End hour is required"),
        })
      ),
    })
  ),
});

export const courseSchema = yup.object({
  title: yup.string().required("Course title is required"),
  code: yup.string().required("Course code is required"),
  departmentId: yup.string().required("Department is required"),
});

export const classroomSchema = yup.object({
  name: yup.string().required("Classroom name is required"),
  capacity: yup.number().positive().integer().required("Capacity is required"),
  availability: yup.array().of(
    yup.object().shape({
      day: yup.string().required("Day is required"),
      timeSlots: yup.array().of(
        yup.object().shape({
          start: yup.string().required("Start hour is required"),
          end: yup.string().required("End hour is required"),
        })
      ),
    })
  ),
});

export const tableSchema = yup.object({
  courseIds: yup
    .array()
    .of(yup.string())
    .min(1, "You must select one course at least")
    .required("You must select one course at least"),
  classroomIds: yup
    .array()
    .of(yup.string())
    .min(1, "You must select one classroom at least")
    .required("You must select one classroom at least"),
  teacherIds: yup
    .array()
    .of(yup.string())
    .min(1, "You must select one teacher at least")
    .required("You must select one teacher at least"),
});
