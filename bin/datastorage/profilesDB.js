import { Database } from 'sqlite-async';
const log = console.log;

export class ProfilesDB {
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
        this.db = null;
    }

    async start() {
        try {
            this.db = await Database.open(this.dbConfig.file);
            await this.createTable();
        } catch (error) {
            console.error("Ошибка при запуске базы данных профилей:", error);
        }
    }

    async stop() {
        try {
            await this.db.close();
        } catch (error) {
            console.error("Ошибка при остановке базы данных профилей:", error);
        }
    }

    async createTable() {
        let query = `CREATE TABLE IF NOT EXISTS Profiles (
            id              integer primary key autoincrement,
            user_id         integer not null,
            first_name      text not null,
            last_name       text,
            avatar          text,
            state           text,
            birth_date      text,
            address         text
        )`;
        try {
            await this.db.exec(query);
        } catch (error) {
            console.error("Ошибка при создании таблицы Profiles:", error);
        }
    }

    async addProfile(userId, firstName, lastName = '', avatar = '', state = '', birthDate = '', address = '') {
        let query = `INSERT INTO Profiles (user_id, first_name, last_name, avatar, state, birth_date, address) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        try {
            const result = await this.db.run(query, userId, firstName, lastName, avatar, state, birthDate, address);
        } catch (error) {
            console.error("Ошибка при добавлении профиля:", error);
            throw error;
        }
    }

    async updateProfile(userId, firstName='', lastName = '', avatar = '', state = '', birthDate = '', address = '') {
        try {
            let query = `UPDATE Profiles SET first_name = ?, last_name = ?, avatar = ? , state =?, birth_date = ?, address = ?  WHERE user_id = ?`;
            await db.run(query, firstName, lastName, avatar, state, birthDate, address,  userId);

            console.log('Данные успешно обновлены.');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
        }
    }

    async getProfile(userId) {
        let query = `SELECT * FROM Profiles WHERE user_id=?`;
        try {
            return await this.db.get(query, userId);
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return false;
        }
    }
}
