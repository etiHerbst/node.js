import * as studentsService from '../services/studentsService.js';

/**
 * טיפול בבקשת GET לקבלת כל התלמידים
 */
export const getStudents = (req, res) => {
    const students = studentsService.fetchAllStudents();
    res.json(students);
};

/**
 * טיפול בבקשת GET לקבלת תלמיד בודד לפי מזהה
 */
export const getStudentById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const student = studentsService.fetchStudentById(id);
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
};

/**
 * טיפול בבקשת POST ליצירת תלמיד חדש
 */
export const createStudent = (req, res) => {
    try {
        const newStudent = studentsService.createNewStudent(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

/**
 * טיפול בבקשת PUT לעדכון פרטי תלמיד
 */
export const updateStudent = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedStudent = studentsService.modifyStudent(id, req.body);
        res.status(200).json({
            status: "success",
            message: "פרטי התלמיד עודכנו בהצלחה",
            data: updatedStudent
        });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
};

/**
 * טיפול בבקשת DELETE למחיקת תלמיד
 */
export const deleteStudent = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedStudent = studentsService.removeStudent(id);
        res.status(200).json({
            status: "success",
            message: "התלמיד נמחק בהצלחה",
            data: deletedStudent
        });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
};