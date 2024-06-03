import mysql from "mysql2";


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '1234',
    database: 'community_kcs',
    transactionIsolation: 'SERIALIZABLE'
});

const executeQuery = async (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.execute(sql, params, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};



export { connection, executeQuery };


