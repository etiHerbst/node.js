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

export default router;