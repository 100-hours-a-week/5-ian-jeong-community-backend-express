import express from 'express';
import userController from './../controllers/userController.js';


const router = express.Router();
 
router.get('/session', (req, res) => {
    if (req.session && req.session.user && req.session.user.id) {
        return res.status(200).json({ result: req.session.user.id });
    } else {
        return res.status(200).json({ result: 0 });
    }
})

router.post('/', userController.createUser);
router.post('/sign-in', userController.validateUser);
router.get('/email', userController.validateDuplicatedEmail);
router.get('/nickname', userController.validateDuplicatedNickname);

router.get('/:userId', userController.getUserById);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

router.patch('/:userId/password', userController.updateUserPassword);


export default router;