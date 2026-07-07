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

export default router;