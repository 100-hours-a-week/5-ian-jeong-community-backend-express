import userDAO from '../models/repository/userDAO.js';
import duplicationUtil from "../duplicationUtil.js";


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

    const isValid = duplicationUtil.isDuplicatedEmail(users, email);

    const resultJson = {
        result : `${isValid}`
    }

    res.status(200).json(resultJson);
}



function validateDuplicatedNickname(req, res) {
    const nickname = req.query.nickname;
    const isValid = model.validateDuplicatedNickname(nickname);

    const resultJson = {
        result : `${isValid}`
    }

    res.status(200).json(resultJson);
}


function validateUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const isValid = model.validateUser(email, password)
    const resultJson = {
        result : `${isValid}`
    }
    
    if (resultJson.result) {
        req.session.user = {
            id: `${userModel.getUserId(email)}`,
            authorized: true,
        }
 
    }

    res.status(200).json(resultJson);
}




function getUser(req, res) {
    const user = model.getUser(req.params.userId);

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
    getUser,
    updateUser,
    deleteUser,
    updateUserPassword,
    initData
};
