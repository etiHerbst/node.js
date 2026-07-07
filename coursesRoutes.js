/**
 * משאב: קורסים (Courses API)
 * ---------------------------------------------------------
 * GET    /courses     - קבלת רשימת כל הקורסים במערכת
 * GET    /courses/:id - קבלת פרטי קורס ספציפי לפי מזהה
 * POST   /courses     - יצירת קורס חדש והוספתו למערכת
 * PUT    /courses/:id - עדכון פרטי קורס קיים (שם, משך זמן, רמה)
 * DELETE /courses/:id - מחיקת קורס מהמערכת לפי מזהה
 */

import express from 'express';
import chalk from 'chalk';
import courses from './courses.js'; // ייבוא מערך הקורסים

const router = express.Router();

// ניתוב לקבלת רשימת הקורסים
router.get('/', (req, res) => {
    // הדפסת רשימת הקורסים בצורה צבעונית לטרמינל
    console.log(chalk.bgBlue.white.bold('\n --- התקבלה בקשה! מציג את רשימת הקורסים בלוגים --- '));
    
    courses.forEach(course => {
        console.log(chalk.green.bold(`מזהה: [${course.id}]`));
        console.log(chalk.cyan(`שם הקורס: ${course.title}`));
        console.log(chalk.white(`משך זמן: ${course.duration} | רמה: ${course.level}`));
        console.log(chalk.gray('--------------------------------------------------'));
    });

    // החזרת הנתונים בפורמט JSON
    res.json(courses);
});
// נתיב לקבלת קורס בודד לפי מזהה ייחודי (ID)
router.get('/:id', (req, res) => {
    // 1. חילוץ המזהה מתוך כתובת ה-URL והמרתו למספר (מכיוון שהוא מגיע כטקסט)
    const courseId = parseInt(req.params.id);

    // 2. חיפוש הקורס המתאים בתוך מערך הקורסים
    const foundCourse = courses.find(course => course.id === courseId);

    // 3. הגנה: אם הקורס לא נמצא, נחזיר שגיאה 404 עם הודעה מתאימה
    if (!foundCourse) {
        return res.status(404).json({ 
            status: "error", 
            message: `לא נמצא קורס עם מזהה ${courseId}` 
        });
    }

    // 4. אם הקורס נמצא, נחזיר אותו עם סטטוס 200 (הצלחה)
    res.status(200).json(foundCourse);
});

//////////
// נתיב ליצירת קורס חדש והוספתו למערכת
router.post('/', (req, res) => {
    // 1. חילוץ הנתונים שנשלחו מגוף הבקשה (req.body)
    const { title, duration, level } = req.body;

    // הגנה בסיסית: בדיקה שכל השדות הנחוצים אכן נשלחו
    if (!title || !duration || !level) {
        return res.status(400).json({
            status: "error",
            message: "חובה לספק את כל השדות: title, duration, ו-level"
        });
    }

    // 2. יצירת אובייקט הקורס החדש עם מזהה (id) ייחודי רץ
    const newCourse = {
        id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
        title: title,
        duration: duration,
        level: level
    };

    // 3. הוספת הקורס החדש למערך הקיים
    courses.push(newCourse);

    // 4. החזרת תשובה עם סטטוס 201 (Created) יחד עם האובייקט החדש שנוצר
    res.status(201).json(newCourse);
});

////////
// נתיב לעדכון קורס קיים לפי מזהה (ID)
router.put('/:id', (req, res) => {
    // 1. חילוץ המזהה מתוך כתובת ה-URL והמרתו למספר
    const courseId = parseInt(req.params.id);

    // 2. חיפוש הקורס המבוקש בתוך המערך
    const course = courses.find(c => c.id === courseId);

    // 3. הגנה: אם הקורס לא נמצא, נחזיר שגיאה 404
    if (!course) {
        return res.status(404).json({
            status: "error",
            message: `לא נמצא קורס עם מזהה ${courseId}, לא ניתן לעדכן`
        });
    }

    // 4. קבלת הנתונים החדשים מגוף הבקשה (req.body)
    const { title, duration, level } = req.body;

    // 5. עדכון השדות במידה ונשלחו ערכים חדשים (אם לא נשלחו, נשמור על הערך הקיים)
    if (title !== undefined) course.title = title;
    if (duration !== undefined) course.duration = duration;
    if (level !== undefined) course.level = level;

    // 6. החזרת סטטוס 200 (OK) יחד עם האובייקט המעודכן
    res.status(200).json({
        status: "success",
        message: "הקורס עודכן בהצלחה",
        data: course
    });
});
/////////
// נתיב למחיקת קורס לפי מזהה (ID)
router.delete('/:id', (req, res) => {
    // 1. חילוץ המזהה מתוך כתובת ה-URL והמרתו למספר
    const courseId = parseInt(req.params.id);

    // 2. מציאת האינדקס (המיקום) של הקורס בתוך המערך
    const courseIndex = courses.findIndex(c => c.id === courseId);

    // 3. הגנה: אם הקורס לא נמצא (findIndex מחזירה 1-), נחזיר שגיאה 404
    if (courseIndex === -1) {
        return res.status(404).json({
            status: "error",
            message: `לא נמצא קורס עם מזהה ${courseId}, לא ניתן למחוק`
        });
    }

    // 4. הסרת הקורס מהמערך באמצעות splice (הפרמטר השני מציין מחיקה של איבר אחד)
    const deletedCourse = courses.splice(courseIndex, 1);

    // 5. החזרת סטטוס 200 (OK) יחד עם פרטי הקורס שנמחק
    res.status(200).json({
        status: "success",
        message: "הקורס נמחק בהצלחה",
        data: deletedCourse[0] // splice מחזירה מערך, אנו לוקחים את האיבר הראשון
    });
});


export default router;