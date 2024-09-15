import 'dotenv/config';

export default {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_LOCAL_USER || 'root',
    password: process.env.DB_LOCAL_PASSWORD || 'rootroot',
    database: process.env.DB_LOCAL_DBNAME || 'listify_db',
    charset: 'utf8',
  },
};