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
import { 
    getCourses, 
    getCourseById, 
    createCourse, 
    updateCourse, 
    deleteCourse 
} from '../controllers/coursesController.js';

const router = express.Router();

// הגדרת ה-Endpoints של נתיב ה-courses
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;