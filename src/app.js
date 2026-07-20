import express from 'express';
import chalk from 'chalk';

// ייבוא הנתבים מכל שכבת ה-Routes
import coursesRouter from './routes/coursesRoutes.js';
import studentsRouter from './routes/studentsRoutes.js';
import enrollmentRouter from './routes/enrollmentRoutes.js';

const app = express();
app.use(express.json()); // תמיכה בקבלת JSON ב-req.body

const PORT = 3000;

// נתיב ראשי לבדיקת תקינות השרת
app.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "The server is running successfully!",
        description: "School management API for tracking courses and students."
    });
});

// חיבור ה-Routers לנתיבים הראשיים
app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);
app.use('/enrollment', enrollmentRouter);

// טיפול בנתיב שאינו קיים (404)
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "הנתיב המבוקש לא נמצא במערכת"
    });
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(chalk.bgGreen.black.bold(' SUCCESS ') + chalk.green(` השרת רץ ומאזין בכתובת: http://localhost:${PORT}`));
});