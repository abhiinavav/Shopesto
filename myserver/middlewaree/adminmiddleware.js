

const adminmiddleware = (req, res, next) => {
    try {

        if (req.accountType !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied! Admin only."
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Admin authorization failed!",
            error: error.message
        });
    }
};

export default adminmiddleware;
