import userDAO from '../models/repository/userDAO.js';
import validationUtil from "../validationUtil.js";


const createUser = (req, res) => {
    const newUser = {
        email : req.body.email,
        password : req.body.password,
        nickname : req.body.nickname,
        profileImage : req.body.profileImage
    }
    
    if(userDAO.createUser(newUser)) {
        res.status(201).send('sign_up_create_success');
        return;
    } 

    res.status(500).send('Internal Server Error');
}

const validateDuplicatedEmail = (req, res) => {
    const email = req.query.email;
    const users = userDAO.getUsers();
    
    if (users === false) {
        res.status(500).send('Internal Server Error');
        return;
    } 

    const isValid = validationUtil.isDuplicatedEmail(users, email);

    const resultJson = {
        result : `${isValid}`
    }

    res.status(200).json(resultJson);
}



const validateDuplicatedNickname = (req, res) => {
    const nickname = req.query.nickname;
    const users = userDAO.getUsers();

    if (users === false) {
        res.status(500).send('Internal Server Error');
        return;
    } 

    const isValid = validationUtil.isDuplicatedNickname(users, nickname);

    const resultJson = {
        result : `${isValid}`
    }

    res.status(200).json(resultJson);
}


const validateUser = (req, res) => {
    const input = {
        email: req.body.email,
        password: req.body.password,
    }
    const users = userDAO.getUsers();

    if (users === false) {
        res.status(500).send('Internal Server Error');
        return;
    }

    const isValid = validationUtil.validateUser(users, input)
    const resultJson = {
        result : `${isValid}`
    }
    
    if (resultJson.result) {
        let id;

        users.forEach(user => {
            if (user.email === email) {
                id = user.id;
            }
        });

        req.session.user = {
            id: id,
            authorized: true,
        }
    }

    res.status(200).json(resultJson);
}




const getUserById = (req, res) => {
    const user = userDAO.getUserById(req.params.userId);

    if (user === false) {
        res.status(500).send('Internal Server Error');
        return;
    }

    const resultJson = {
        result : user
    }

    res.status(200).json(resultJson);
}



function updateUser(req, res) {

    const user = {
        id: parseInt(req.params.userId),
        nickname: req.body.nickname,
        profileImage: req.body.profileImage
    }

    model.updateUser(user); 
    
    res.status(204).send('update_success');
}

function deleteUser(req, res) {
    model.deleteUser(req.params.userId);

    res.status(204).send('delete_success');
}



function updateUserPassword(req, res) {
    const user = {
        id: parseInt(req.params.userId),
        password: req.body.password
    }
    
    model.updateUserPassword(user); 
    
    res.status(204).send('update_success');
}

function initData(req, res, next) {
    userModel.initData(req, res, next);
}




export default {
    validateUser,
    validateDuplicatedEmail,
    validateDuplicatedNickname,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    updateUserPassword,
    initData
};
