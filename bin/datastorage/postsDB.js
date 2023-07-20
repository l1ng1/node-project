import { Database } from 'sqlite-async';
const log = console.log;

export class PostsDB {
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
        this.db = null;
    }

    async start() {
        try {
            this.db = await Database.open(this.dbConfig.file);
            await this.createTable();
        } catch (error) {
            console.error("Ошибка при запуске базы данных постов:", error);
        }
    }

    async stop() {
        try {
            await this.db.close();
        } catch (error) {
            console.error("Ошибка при остановке базы данных постов:", error);
        }
    }

    async createTable() {
        let query = `CREATE TABLE IF NOT EXISTS Posts (
            id              integer primary key autoincrement,
            user_id         integer not null,
            description     text,
            avatar          text,
            likes           integer
        )`;
        try {
            await this.db.exec(query);
        } catch (error) {
            console.error("Ошибка при создании таблицы Posts:", error);
        }
    }

    async addPost( userId, description='', avatar='', likes = 0) {
        let query = `INSERT INTO Posts (user_id, description, avatar) VALUES (?, ?, ?)`;
        try {
            const result = await this.db.run(query,  userId, description, avatar, likes);
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
            throw error;
        }
    }

    async updatePost(userId, description='', avatar = '', likes = '') {
        try {
            let query = `UPDATE Posts SET description = ?, avatar = ?, likes = ''  WHERE user_id = ?`;
            await db.run(query, description, avatar, likes, userId);

            console.log('Данные успешно обновлены.');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
        }
    }

    async getPostsList(userId) {
        let query = `SELECT * FROM Posts WHERE user_id=?`;
        try {
            return await this.db.get(query, userId);
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return false;
        }
    }
}
