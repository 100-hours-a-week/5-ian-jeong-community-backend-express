import userDAO from '../models/repository/userDAO.js';
import validationUtil from "../models/validationUtil.js";
import crypto from 'crypto';


const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

const createUser = async (req, res) => {
    const newUser = {
        email : req.body.email,
        password : req.body.password,
        nickname : hashPassword(req.body.nickname),
        profileImage : req.body.profileImage
    }

    try {
        await userDAO.createUser(newUser)
        res.status(201).send('sign_up_create_success');

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const validateDuplicatedEmail = async (req, res) => {
    const email = req.query.email;

    try {
        const users = await userDAO.getUsers();
        const isValid = validationUtil.isDuplicatedEmail(users, email);

        const resultJson = {
            result : `${isValid}`
        }
    
        res.status(200).json(resultJson);

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const validateDuplicatedNickname = async (req, res) => {
    const nickname = req.query.nickname;

    try {
        const users = await userDAO.getUsers();
        const isValid = validationUtil.isDuplicatedNickname(users, nickname);
    
        const resultJson = {
            result : `${isValid}`
        }
    
        res.status(200).json(resultJson);

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const validateUser = async (req, res) => {
    const input = {
        email: req.body.email,
        password: hashPassword(req.body.password),
    }

    try {
        const users = await userDAO.getUsers();
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

    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}



const getUserById = async (req, res) => {
    try {
        const user = await userDAO.getUserById(req.params.userId);

        const resultJson = {
            result : user
        }
    
        res.status(200).json(resultJson);

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const updateUser = async (req, res) => {
    const user = {
        id: parseInt(req.params.userId),
        nickname: req.body.nickname,
        profileImage: req.body.profileImage
    }

    try {
        await userDAO.updateUser(user); 
        res.status(204).send('update_success');

    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const updateUserPassword = async (req, res) => {
    const user = {
        id: parseInt(req.params.userId),
        password: hashPassword(req.body.password)
    }

    try {
        await userDAO.updateUserPassword(user); 
        res.status(204).send('update_success');

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const deleteUser = async (req, res) => {
    try {
        await userDAO.deleteUser(req.params.userId);
        res.status(204).send('delete_success');

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
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
};
