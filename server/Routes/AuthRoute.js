const { Signup, saveFacePhoto, checkAttendance } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/save-face-photo", saveFacePhoto);
router.post("/check-attendance", checkAttendance);

module.exports = router;