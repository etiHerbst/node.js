/**
 * משאב: תלמידים (Students API)
 * ---------------------------------------------------------
 * GET    /students     - קבלת רשימת כל התלמידים במערכת
 * GET    /students/:id - קבלת פרטי תלמיד ספציפי לפי מזהה
 * POST   /students     - רישום תלמיד חדש (שם, אימייל)
 * PUT    /students/:id - עדכון פרטי תלמיד קיים
 * DELETE /students/:id - מחיקת תלמיד מהמערכת
 */

import express from 'express';
import chalk from 'chalk';
import students from './students.js'; // ייבוא מערך התלמידים

const router = express.Router();

// ניתוב לקבלת רשימת התלמידים
router.get('/', (req, res) => {
    console.log(chalk.bgMagenta.white.bold('\n --- התקבלה בקשה! מציג את רשימת התלמידים --- '));
    
    students.forEach(student => {
        console.log(chalk.yellow(`תלמיד: ${student.name} (${student.email})`));
    });

    // החזרת הנתונים בפורמט JSON
    res.json(students);
});
//////

// 1. פונקציית GET לקבלת תלמיד אחד לפי מזהה ייחודי (ID)
router.get('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const foundStudent = students.find(s => s.id === studentId);

    if (!foundStudent) {
        return res.status(404).json({ 
            status: "error", 
            message: `לא נמצא תלמיד עם מזהה ${studentId}` 
        });
    }

    res.status(200).json(foundStudent);
});

// 2. פונקציית POST לרישום תלמיד חדש
router.post('/', (req, res) => {
    const { name, email, enrolledCourses } = req.body;

    // הגנה בסיסית: בדיקה ששדות החובה (שם ואימייל) נשלחו
    if (!name || !email) {
        return res.status(400).json({
            status: "error",
            message: "חובה לספק שם (name) ואימייל (email)"
        });
    }

    // יצירת אובייקט התלמיד החדש עם מזהה רץ
    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name: name,
        email: email,
        enrolledCourses: enrolledCourses || [] // אם לא נשלחו קורסים, נגדיר מערך ריק
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// 3. פונקציית PUT לעדכון פרטי תלמיד קיים
router.put('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            status: "error",
            message: `לא נמצא תלמיד עם מזהה ${studentId}, לא ניתן לעדכן`
        });
    }

    const { name, email, enrolledCourses } = req.body;

    // עדכון שדות במידה ונשלחו ערכים חדשים
    if (name !== undefined) student.name = name;
    if (email !== undefined) student.email = email;
    if (enrolledCourses !== undefined) student.enrolledCourses = enrolledCourses;

    res.status(200).json({
        status: "success",
        message: "פרטי התלמיד עודכנו בהצלחה",
        data: student
    });
});

// 4. פונקציית DELETE למחיקת תלמיד מהמערכת
router.delete('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({
            status: "error",
            message: `לא נמצא תלמיד עם מזהה ${studentId}, לא ניתן למחוק`
        });
    }

    // הסרת התלמיד מהמערך
    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        status: "success",
        message: "התלמיד נמחק בהצלחה",
        data: deletedStudent[0]
    });
});
export default router;