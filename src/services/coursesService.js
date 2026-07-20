import chalk from 'chalk';
import { 
    getAllCoursesFromDb, 
    getCourseByIdFromDb, 
    addCourseToDb, 
    updateCourseInDb, 
    deleteCourseFromDb 
} from '../data/coursesData.js';

/**
 * שולף את רשימת הקורסים ומדפיס לוגים צבעוניים לטרמינל
 */
export const fetchAllCourses = () => {
    const courses = getAllCoursesFromDb();
    
    console.log(chalk.bgBlue.white.bold('\n --- התקבלה בקשה! מציג את רשימת הקורסים בלוגים --- '));
    courses.forEach(course => {
        console.log(chalk.green.bold(`מזהה: [${course.id}]`));
        console.log(chalk.cyan(`שם הקורס: ${course.title}`));
        console.log(chalk.white(`משך זמן: ${course.duration} | רמה: ${course.level}`));
        console.log(chalk.gray('--------------------------------------------------'));
    });

    return courses;
};

/**
 * שולף קורס לפי ID וזורק שגיאה אם הוא לא נמצא
 */
export const fetchCourseById = (id) => {
    const course = getCourseByIdFromDb(id);
    if (!course) {
        throw new Error(`לא נמצא קורס עם מזהה ${id}`);
    }
    return course;
};

/**
 * מנהל את לוגיקת יצירת קורס חדש ואימות שדות החובה
 */
export const createNewCourse = (data) => {
    const { title, duration, level } = data;
    if (!title || !duration || !level) {
        throw new Error("חובה לספק את כל השדות: title, duration, ו-level");
    }
    return addCourseToDb({ title, duration, level });
};

/**
 * מנהל את עדכון הקורס וזריקת שגיאה אם הקורס לא קיים
 */
export const modifyCourse = (id, data) => {
    const updated = updateCourseInDb(id, data);
    if (!updated) {
        throw new Error(`לא נמצא קורס עם מזהה ${id}, לא ניתן לעדכן`);
    }
    return updated;
};

/**
 * מנהל את מחיקת הקורס וזריקת שגיאה אם הקורס לא קיים
 */
export const removeCourse = (id) => {
    const deleted = deleteCourseFromDb(id);
    if (!deleted) {
        throw new Error(`לא נמצא קורס עם מזהה ${id}, לא ניתן למחוק`);
    }
    return deleted;
};