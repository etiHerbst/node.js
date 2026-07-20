// middleware/authMiddleware.js
export const authMiddleware = (req, res, next) => {
    // 1. הדפסה ל-console של ה-Middleware כדי לוודא שנקרא בכל קריאה
    console.log(`[Middleware] התקבלה בקשה מסוג: ${req.method} לנתיב: ${req.url}`);

    // 2. שליפת ה-header בשם 'auth-key'
    // הערה: Express המיר אוטומטית את שמות ה-Headers לאותיות קטנות (lowercase)
    const authKey = req.headers['auth-key'];

    // 3. הגדרת המפתח שנקבע לאימות (ניתן לשנות לכל ערך שתרצי)
    const SECRET_KEY = "mySecretKey123";

    // 4. בדיקה האם ה-header קיים והאם הערך שלו תואם
    if (!authKey || authKey !== SECRET_KEY) {
        // אם ה-header חסר או שגוי - החזרת סטטוס 401
        return res.status(401).json({
            status: "error",
            message: "401 Unauthorized: מפתח אימות (auth-key) חסר או שגוי"
        });
    }

    // 5. אם האימות הצליח - ממשיכים לקריאה הבאה (Controller / Routes)
    next();
};