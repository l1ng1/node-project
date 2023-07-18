import { Database } from 'sqlite-async';
const log = console.log;

export class DataStorage {
    db = null;

    constructor(config) {
        this.config = config;
    }

    async start() {
        try {
            this.db = await Database.open(this.config.file);
            await this.createUsers();
        } catch (error) {
            console.error("Ошибка при запуске базы данных:", error);
        }
    }

    async stop() {
        try {
            await this.db.close();
        } catch (error) {
            console.error("Ошибка при остановке базы данных:", error);
        }
    }

    async createUsers() {
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

    addUser = async (userName, password) => {
        let query = `INSERT INTO Users (user_name, password) VALUES (
            ?, ?)`;
        try {
            const result = await this.db.run(query, userName, password);
            const userId = result.lastID; 
            return userId;
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
            throw error;
        }
    }

    getUser = async (id) =>{
        let query = `SELECT * FROM Users WHERE id=?`;
        try {
            return await this.db.get(query, id);
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return false;
        }
    }

    getUserId = async (userName, password) =>{
        let query = `SELECT * FROM Users WHERE user_name=? AND password=?`;
        try {
            const data = await this.db.get(query, userName, password);
            return data.id;
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return false;
        }
    }
}
