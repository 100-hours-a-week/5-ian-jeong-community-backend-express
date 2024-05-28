import mysql from "mysql2";


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'community-kcs'
});

// 기본적인 CRUD 구현


export default {
    connection,  
};

