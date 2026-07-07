import express from 'express';
import chalk from 'chalk';

import coursesRouter from './coursesRoutes.js';
import studentsRouter from './studentsRoutes.js';

const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "The server is running successfully!",
        description: "School management API for tracking courses and students."
    });
});

app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);

// טיפול בנתיב לא קיים - מחזיר JSON תקני
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "הנתיב המבוקש לא נמצא במערכת"
    });
});

app.listen(PORT, () => {
    console.log(chalk.bgGreen.black.bold(' SUCCESS ') + chalk.green(` השרת רץ ומאזין בכתובת: http://localhost:${PORT}`));
});