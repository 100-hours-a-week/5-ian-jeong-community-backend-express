import mysql from "mysql2";


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '1234',
    database: 'community_kcs'
});



export default connection;


