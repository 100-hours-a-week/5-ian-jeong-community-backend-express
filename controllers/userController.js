import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import userDAO from '../models/repository/userDAO.js';
import validationUtil from "../models/validationUtil.js";





const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

const createUser = async (req, res) => {
    const {email, password, nickname, image} = req.body;

    const filePath = path.join('uploads/user', nickname);
    fs.writeFileSync(filePath, image);

    const newUser = {
        email : email,
        password : hashPassword(password),
        nickname : nickname,
        image : filePath
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
        const isValid = validationUtil.validateDuplicatedEmail(users, email);

        const resultJson = {
            result : isValid
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
        const isValid = validationUtil.validateDuplicatedNickname(users, nickname);
    
        const resultJson = {
            result : isValid
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
        const isValid = validationUtil.validateAccount(users, input)
        const resultJson = {
            result : isValid
        }
        
        if (resultJson.result) {
            let id;
    
            users.forEach(user => {
                if (user.email === input.email) {
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
        if (user.length === 0) {
            res.status(404).send('User Not found');
            return;
        }

        const filePath = user[0].image;

        const data = fs.readFileSync(filePath, 'utf8');
        user[0].image = data;
        
        const resultJson = {
            result : user[0]
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
        image: req.body.image
    }

    const filePath = path.join('uploads/user', nickname);
    fs.writeFileSync(filePath, user.image);
    user.image = filePath;


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
