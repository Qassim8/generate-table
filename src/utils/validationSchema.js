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
  phone: yup
    .string()
    .min(10, "Phone must be at least 10 numbers")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup.string().required("Role is required"),

  courseId: yup
    .array()
    .transform((value, originalValue) =>
      typeof originalValue === "string" ? [originalValue] : originalValue
    )
    .when("role", {
      is: "teacher",
      then: (schema) => schema.min(1, "Course is required"), // تأكد من وجود عنصر واحد على الأقل
      otherwise: (schema) => schema.nullable().notRequired(),
    }),

  departmentId: yup
    .array()
    .transform((value, originalValue) =>
      typeof originalValue === "string" ? [originalValue] : originalValue
    )
    .when("role", {
      is: "teacher",
      then: (schema) => schema.min(1, "Department is required"), // تأكد من وجود عنصر واحد على الأقل
      otherwise: (schema) => schema.nullable().notRequired(),
    }),

  qualification: yup.string().when("role", {
    is: "teacher",
    then: (schema) => schema.required("Qualification is required"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  schedules: yup.array().when("role", {
    is: "teacher",
    then: (schema) =>
      schema
        .of(
          yup.object().shape({
            day: yup.string().required("Day is required"),
            timeSlots: yup.array().of(
              yup.object().shape({
                start: yup.string().required("Start time is required"),
                end: yup.string().required("End time is required"),
              })
            ),
          })
        )
        .min(1, "At least one schedule is required"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
});

export const departmentSchema = yup.object({
  departmentName: yup.string().required("Department name is required"),
  batch: yup.string().required("Batch is required"),
});


export const courseSchema = yup.object({
  title: yup.string().required("Course title is required"),
  hours: yup.string().required("Course hours is required"),
  batch: yup.string().required("Course batch is required"),
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
    .transform((value, originalValue) =>
      typeof originalValue === "string" ? [originalValue] : originalValue
    )
    .of(yup.string())
    .min(1, "You must select one course at least")
    .required("You must select one course at least"),
  classroomIds: yup
    .array()
    .transform((value, originalValue) =>
      typeof originalValue === "string" ? [originalValue] : originalValue
    )
    .of(yup.string())
    .min(1, "You must select one classroom at least")
    .required("You must select one classroom at least"),
  teacherIds: yup
    .array()
    .transform((value, originalValue) =>
      typeof originalValue === "string" ? [originalValue] : originalValue
    )
    .of(yup.string())
    .min(1, "You must select one teacher at least")
    .required("You must select one teacher at least"),
});
