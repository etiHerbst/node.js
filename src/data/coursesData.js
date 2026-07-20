let courses = [
    {
        id: 1,
        title: "Introduction to JavaScript",
        duration: "4 weeks",
        level: "Beginner"
    },
    {
        id: 2,
        title: "Advanced Node.js and Express",
        duration: "6 weeks",
        level: "Advanced"
    },
    {
        id: 3,
        title: "Database Management with SQL",
        duration: "5 weeks",
        level: "Intermediate"
    }
];

export const getAllCoursesFromDb = () => courses;

export const getCourseByIdFromDb = (id) => courses.find(c => c.id === id);

export const addCourseToDb = (courseData) => {
    const newCourse = {
        id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
        ...courseData
    };
    courses.push(newCourse);
    return newCourse;
};

export const updateCourseInDb = (id, updatedFields) => {
    const course = courses.find(c => c.id === id);
    if (!course) return null;

    if (updatedFields.title !== undefined) course.title = updatedFields.title;
    if (updatedFields.duration !== undefined) course.duration = updatedFields.duration;
    if (updatedFields.level !== undefined) course.level = updatedFields.level;

    return course;
};

export const deleteCourseFromDb = (id) => {
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return null;
    return courses.splice(index, 1)[0];
};