import http from 'http';
import chalk from 'chalk';

// הגדרת משתנה קבוע עבור הפורט
const PORT = 3000;

// 1. הגדרת מערך הקורסים
const courses = [
    {
        id: 101,
        name: 'מבוא ל-Node.js צד שרת',
        description: 'קורס בסיסי ללימוד הקמת שרתים וניהול חבילות באמצעות npm.'
    },
    {
        id: 102,
        name: 'בסיסי נתונים ושאילתות SQL',
        description: 'קורס מקיף על עיצוב טבלאות, כתיבת פרוצדורות וניהול מידע.'
    },
    {
        id: 103,
        name: 'אלגוריתמים ומבני נתונים ב-Java',
        description: 'פיתוח חשיבה אלגוריתמית, פתרון בעיות מורכבות, רקורסיה ובקטראקינג.'
    }
]; 

// 2. יצירת השרת
const server = http.createServer((req, res) => {
    
    // סינון הבקשות: נטפל בלוגיקה רק אם המשתמש ניגש לנתיב הראשי
    if (req.url === '/' || req.url === '/courses') {
        
        // א. הדפסת רשימת הקורסים בצורה צבעונית לטרמינל
        console.log(chalk.bgBlue.white.bold('\n --- התקבלה בקשה! מציג את רשימת הקורסים בלוגים --- '));
        
        courses.forEach(course => {
            console.log(chalk.green.bold(`מזהה: [${course.id}]`));
            console.log(chalk.cyan(`שם: ${course.name}`));
            console.log(chalk.white(`תיאור: ${course.description}`));
            console.log(chalk.gray('--------------------------------------------------'));
        });

        // ב. שליחת רשימת הקורסים כ-JSON חזרה לדפדפן
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return res.end(JSON.stringify(courses, null, 2));
    }
    
    // טיפול בבקשות רקע או נתיבים שאינם קיימים (כמו favicon.ico)
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('הנתיב המבוקש לא נמצא במערכת');
});

// 3. הפעלת השרת
server.listen(PORT, () => {
    console.log(chalk.bgGreen.black.bold(' SUCCESS ') + chalk.green(` השרת רץ ומאזין בכתובת: http://localhost:${PORT}`));
});