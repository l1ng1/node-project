import { UsersDB } from './UsersDB.js';
import { ProfilesDB } from './profilesDB.js';
import { PostsDB } from './postsDB.js';

export class DataStorage {
    db = null;

    constructor(config) {
        this.config = config;
        this.usersDB = new UsersDB(this.config);
        this.profilesDB = new ProfilesDB(this.config);
        this.postsDB = new PostsDB(this.config);
    }

    async start() {
        await this.usersDB.start();
        await this.profilesDB.start();
        await this.postsDB.start();
    }

    async stop() {
        await this.usersDB.stop();
        await this.profilesDB.stop();
        await this.postsDB.stop();
    }

}

