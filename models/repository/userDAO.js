import {executeQuery} from "./dbConnection.js";


const createUser = async (newUser) => {
    const sql = 'INSERT INTO users (email, password, nickname, image) VALUES (?, ?, ?, ?)';
    const args = [newUser.email, newUser.password, newUser.nickname, newUser.image];

    return executeQuery(sql, args);
}


const getUsers = async () => {
    const sql = 'SELECT id, email, password, nickname, convert(image USING UTF8) as image FROM users WHERE deleted_at IS NULL';
    const args = [];

    return executeQuery(sql, args);
}


const getUserById = async (id) => {
    const sql = 'SELECT id, email, password, nickname, convert(image USING UTF8) as image FROM users WHERE id = ? AND deleted_at IS NULL';
    const args = [id];

    return executeQuery(sql, args);
}


const updateUser = async (user) => {
    const sql = "UPDATE users SET nickname = ?, image = ? WHERE id = ? AND deleted_at IS NULL";
    const args = [user.nickname, user.image, user.id];
    
    return executeQuery(sql, args);
}


const updateUserPassword = async (user) => {
    const sql = "UPDATE users SET password = ? WHERE id = ? AND deleted_at IS NULL";   
    const args = [user.password, user.id];

    return executeQuery(sql, args);
}


const deleteUser = async (userId) => {
    const sql = "UPDATE users SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?";
    const args = [userId];

    return executeQuery(sql, args);
}


export default {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserPassword,
};