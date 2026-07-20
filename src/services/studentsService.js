import chalk from 'chalk';
import { 
    getAllStudentsFromDb, 
    getStudentByIdFromDb, 
    addStudentToDb, 
    updateStudentInDb, 
    deleteStudentFromDb 
} from '../data/studentsData.js';

/**
 * שולף את רשימת התלמידים ומדפיס לוגים צבעוניים לטרמינל
 */
export const fetchAllStudents = () => {
    const students = getAllStudentsFromDb();
    console.log(chalk.bgMagenta.white.bold('\n --- התקבלה בקשה! מציג את רשימת התלמידים --- '));
    students.forEach(student => {
        console.log(chalk.yellow(`תלמיד: ${student.name} (${student.email})`));
    });
    return students;
};

/**
 * שולף תלמיד לפי ID וזורק שגיאה אם לא נמצא
 */
export const fetchStudentById = (id) => {
    const student = getStudentByIdFromDb(id);
    if (!student) {
        throw new Error(`לא נמצא תלמיד עם מזהה ${id}`);
    }
    return student;
};

/**
 * מנהל יצירת תלמיד חדש כולל בדיקת שדות חובה (שם ואימייל)
 */
export const createNewStudent = (data) => {
    const { name, email, enrolledCourses } = data;
    if (!name || !email) {
        throw new Error("חובה לספק שם (name) ואימייל (email)");
    }
    return addStudentToDb({ name, email, enrolledCourses });
};

/**
 * מנהל עדכון תלמיד קיים
 */
export const modifyStudent = (id, data) => {
    const updated = updateStudentInDb(id, data);
    if (!updated) {
        throw new Error(`לא נמצא תלמיד עם מזהה ${id}, לא ניתן לעדכן`);
    }
    return updated;
};

/**
 * מנהל מחיקת תלמיד מהמערכת
 */
export const removeStudent = (id) => {
    const deleted = deleteStudentFromDb(id);
    if (!deleted) {
        throw new Error(`לא נמצא תלמיד עם מזהה ${id}, לא ניתן למחוק`);
    }
    return deleted;
};