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
import { 
    getStudents, 
    getStudentById, 
    createStudent, 
    updateStudent, 
    deleteStudent 
} from '../controllers/studentsController.js';

const router = express.Router();

// הגדרת ה-Endpoints של נתיב ה-students
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;