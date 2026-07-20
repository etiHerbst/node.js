import express from 'express';
import { enrollStudent } from '../controllers/enrollmentController.js';

const router = express.Router();

// הגדרת ה-Endpoint של נתיב ה-enrollment
router.post('/', enrollStudent);

export default router;