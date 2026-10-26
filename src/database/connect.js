import mysql from 'mysql2/promise';

const connect = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Edu$200888',
    database: 'teste'
});

export default connect;