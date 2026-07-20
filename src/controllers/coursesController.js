import * as coursesService from '../services/coursesService.js';

/**
 * טיפול בבקשת GET לקבלת כל הקורסים
 */
export const getCourses = (req, res) => {
    const courses = coursesService.fetchAllCourses();
    res.json(courses);
};

/**
 * טיפול בבקשת GET לקבלת קורס בודד לפי מזהה
 */
export const getCourseById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const course = coursesService.fetchCourseById(id);
        res.status(200).json(course);
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
};

/**
 * טיפול בבקשת POST ליצירת קורס חדש
 */
export const createCourse = (req, res) => {
    try {
        const newCourse = coursesService.createNewCourse(req.body);
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

/**
 * טיפול בבקשת PUT לעדכון קורס
 */
export const updateCourse = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedCourse = coursesService.modifyCourse(id, req.body);
        res.status(200).json({
            status: "success",
            message: "הקורס עודכן בהצלחה",
            data: updatedCourse
        });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
};

/**
 * טיפול בבקשת DELETE למחיקת קורס
 */
export const deleteCourse = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedCourse = coursesService.removeCourse(id);
        res.status(200).json({
            status: "success",
            message: "הקורס נמחק בהצלחה",
            data: deletedCourse
        });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
};