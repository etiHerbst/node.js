import { getCourseByIdFromDb } from '../data/coursesData.js';
import { addCourseToStudentDb } from '../data/enrollmentData.js';

/**
 * מנהל לוגיקת רישום תלמיד לקורס – כולל בדיקת קיום התלמיד והקורס
 */
export const enrollStudentToCourse = (studentId, courseId) => {
    const course = getCourseByIdFromDb(courseId);
    if (!course) {
        throw new Error(`הקורס עם מזהה ${courseId} לא קיים במערכת`);
    }

    const student = addCourseToStudentDb(studentId, courseId);
    if (!student) {
        throw new Error(`התלמיד עם מזהה ${studentId} לא קיים במערכת`);
    }

    return student;
};