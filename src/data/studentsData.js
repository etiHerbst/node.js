let students = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        enrolledCourses: [1, 3]
    },
    {
        id: 2,
        name: "Emma Smith",
        email: "emma.smith@example.com",
        enrolledCourses: [1, 2]
    },
    {
        id: 3,
        name: "Michael Brown",
        email: "michael.brown@example.com",
        enrolledCourses: [2, 3]
    }
];

export const getAllStudentsFromDb = () => students;

export const getStudentByIdFromDb = (id) => students.find(s => s.id === id);

export const addStudentToDb = (studentData) => {
    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name: studentData.name,
        email: studentData.email,
        enrolledCourses: studentData.enrolledCourses || []
    };
    students.push(newStudent);
    return newStudent;
};

export const updateStudentInDb = (id, updatedFields) => {
    const student = students.find(s => s.id === id);
    if (!student) return null;

    if (updatedFields.name !== undefined) student.name = updatedFields.name;
    if (updatedFields.email !== undefined) student.email = updatedFields.email;
    if (updatedFields.enrolledCourses !== undefined) student.enrolledCourses = updatedFields.enrolledCourses;

    return student;
};

export const deleteStudentFromDb = (id) => {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    return students.splice(index, 1)[0];
};