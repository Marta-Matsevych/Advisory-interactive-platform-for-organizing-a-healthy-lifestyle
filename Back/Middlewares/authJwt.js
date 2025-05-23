const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../Models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.session.token;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};

isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });

        if (!next) { // Check if 'next' exists (optional)
            return res.status(403).send({ message: "Require Moderator Role!" });
        }

        for (const role of roles) {
            if (role.name === "moderator") {
                next();
                return;
            }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
};
module.exports = authJwt;
