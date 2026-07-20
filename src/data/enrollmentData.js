import { getStudentByIdFromDb } from './studentsData.js';

export const addCourseToStudentDb = (studentId, courseId) => {
    const student = getStudentByIdFromDb(studentId);
    if (!student) return null;

    if (!student.enrolledCourses.includes(courseId)) {
        student.enrolledCourses.push(courseId);
    }
    return student;
};