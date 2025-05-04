exports.allAccess = (req, res) => {
    res.status(200).send('public');
};

exports.userBoard = (req, res) => {
    res.status(200).send('user');
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
