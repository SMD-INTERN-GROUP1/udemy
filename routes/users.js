const express = require('express');
const multer = require('multer');

const profileController = require('../controller/profile.controller');
const authMiddleware = require("../middlerwares/auth.middleware");
const { toggleWish } = require("../controller/user.controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/profile/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  //reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  } ,
  fileFilter: fileFilter
});

/* GET users listing. */
router.get('/', (req, res, next) => {
});

router.get('/edit-profile', profileController.renderEditProfilePage);
router.patch('/edit-profile', profileController.editProfile);
router.get('/edit-account', profileController.renderEditAccountPage);
router.patch('/edit-account', profileController.editAccount);
router.get('/edit-photo', profileController.renderEditPhotoPage);
router.patch('/edit-photo', upload.single('avatar'), profileController.editPhoto);
router.get('/close-account', profileController.renderCloseAccountPage);
router.delete('/close-account', profileController.closeAccount);
router.patch("/wish/:id", authMiddleware, toggleWish);

module.exports = router;
