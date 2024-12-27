const yup = require("yup");
const StatusCodes = require("http-status-codes")

const signUpValidation = (req, res, next) => {
    const schema = yup.object({
        name: yup.string().required('user_name is required!'),
        email: yup
            .string()
            .email('Enter a valid Email')
            .required('user email is required!'),
        password: yup.string().required('password is required!')
    })
    try {
        schema.validateSync(req.body, { abortEarly: false })
        console.log('validation passed!')
        next()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors })
    }
}

const loginUserValidation = (req, res, next) => {
    const schema = yup.object({
        email: yup
            .string()
            .email('Enter a valid Email')
            .required('user email is required!'),
        password: yup.string().required('password is required!')
    })
    try {
        schema.validateSync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors })
    }
}

const addMovieValidation = (req, res, next) => {
    const schema = yup.object({
        title: yup
            .string()
            .trim()
            .required("Movie title is required")
            .min(2, "Title must be at least 2 characters")
            .max(100, "Title must not exceed 100 characters"),
        description: yup
            .string()
            .required("Movie description is required")
            .min(10, "Description must be at least 10 characters"),
        releaseDate: yup
            .date()
            .required("Release date is required")
            .typeError("Release date must be a valid date"),
        genre: yup
            .array()
            .of(yup.string().trim().required("Genre is required"))
            .min(1, "At least one genre is required")
            .required("Genre is required"),
        director: yup
            .string()
            .trim()
            .required("Director name is required")
            .min(2, "Director name must be at least 2 characters"),
        cast: yup
            .array()
            .of(
                yup.object({
                    name: yup
                        .string()
                        .trim()
                        .required("Cast member name is required"),
                    role: yup
                        .string()
                        .trim()
                        .optional(),
                })
            )
            .min(1, "At least one cast member is required")
            .required("Cast is required"),
        rating: yup
            .number()
            .min(0, "Rating must be at least 0")
            .max(10, "Rating must not exceed 10")
            .required("Rating is required"),
        duration: yup
            .number()
            .min(1, "Duration must be at least 1 minute")
            .required("Duration is required"),
        posterUrl: yup
            .string()
            .url("Poster URL must be a valid URL")
            .optional(),
        trailerUrl: yup
            .string()
            .url("Trailer URL must be a valid URL")
            .optional(),
    });

    try {
        schema.validateSync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};

module.exports = {
    signUpValidation,
    loginUserValidation,
    addMovieValidation
};
