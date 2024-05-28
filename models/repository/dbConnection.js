import mysql from "mysql2";


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'community-kcs'
});


export default {
    connection,  
};

