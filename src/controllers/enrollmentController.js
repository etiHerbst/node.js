import * as enrollmentService from '../services/enrollmentService.js';

/**
 * טיפול בבקשת POST לרישום תלמיד לקורס
 */
export const enrollStudent = (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        if (!studentId || !courseId) {
            return res.status(400).json({
                status: "error",
                message: "חובה לספק studentId ו-courseId"
            });
        }
        const updatedStudent = enrollmentService.enrollStudentToCourse(studentId, courseId);
        res.status(200).json({
            status: "success",
            message: "התלמיד נרשם לקורס בהצלחה",
            data: updatedStudent
        });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};