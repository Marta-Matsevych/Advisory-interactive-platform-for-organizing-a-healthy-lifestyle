exports.allAccess = (req, res) => {
    res.render('public');
};

exports.userBoard = (req, res) => {
    res.render('user');
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
