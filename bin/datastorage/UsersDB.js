import { Database } from 'sqlite-async';
const log = console.log;

export class UsersDB {
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
        this.db = null;
    }

    async start() {
        try {
            this.db = await Database.open(this.dbConfig.file);
            await this.createTable();
        } catch (error) {
            console.error("Ошибка при запуске базы данных пользователей:", error);
        }
    }

    async stop() {
        try {
            await this.db.close();
        } catch (error) {
            console.error("Ошибка при остановке базы данных пользователей:", error);
        }
    }

    async createTable() {
        let query = `CREATE TABLE IF NOT EXISTS Users (
            id              integer primary key autoincrement,
            user_name       text not null,
            password        text not null
        )`;
        try {
            await this.db.exec(query);
        } catch (error) {
            console.error("Ошибка при создании таблицы Users:", error);
        }
    }

    async addUser(userName, password) {
        let query = `INSERT INTO Users (user_name, password) VALUES (?, ?)`;
        try {
            const result = await this.db.run(query, userName, password);
            console.log(result.lastID);
            return result.lastID;
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
            throw error;
        }
    }

    async getUser(id) {
        let query = `SELECT * FROM Users WHERE id=?`;
        try {
            return await this.db.get(query, id);
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return false;
        }
    }

    async getUserId(userName, password) {
        let query = `SELECT * FROM Users WHERE user_name=? AND password=?`;
        try {
            const data = await this.db.get(query, userName, password);
            console.log(data);
            return data.id;
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return false;
        }
    }
}
