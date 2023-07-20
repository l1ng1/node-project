import { SessionService } from './session.js';
import { CaptchaService  } from './captcha.js';
import path from "path";
const log = console.log;

export class Service {
    sessions = {};

    constructor(dataStorage) {
        this.dataStorage = dataStorage;
        this.captcha = new CaptchaService(this.session);
    }

    isLogged = (sid) => {
        let session = this.sessions[sid];
        return session?.step === 'logged';
    }

    getUserData = async (sid) => {
        let session = this.sessions[sid];
        let data = await this.dataStorage.usersDB.getUser(session.userId);
        return data;
    }

    newSid = (expireSeconds) => {
        let session = new SessionService(expireSeconds);
        let sid = session.newSid(Object.keys(this.sessions).length);
        this.sessions[sid] = session;
        return sid;
    }

    updateSession = (sid, step) => {
        let expireSeconds = 120;
        let session = this.sessions[sid];
        if(!session){
            session = new SessionService(expireSeconds);
            this.sessions[sid] = session;
        }
        this.sessions[sid].step = step;
    }

    newCaptcha = async (sid) => {
        let session =this.sessions[sid];
        let captchaUrl = `tmp/captcha/${sid}.png`;
        session.captcha.file = path.join(process.cwd(), 'public','tmp', 'captcha', `${sid}.png`);
        session.captcha.value = await this.captcha.create(captchaUrl);
        return captchaUrl;
    }

    checkCaptcha = async (sid, userName, password, captcha) => {
        let session = this.sessions[sid]
        if (session.captcha.value === captcha) {
            session.userId = await this.dataStorage.usersDB.addUser(userName, password);
            this.captcha.remove(session.captcha.file);
            session.captcha.value = null;
            return true;
        }
        return false;
    }

    sendConfirmCode(sid) {
        let session = this.sessions[sid];
        session.confirmCode = getRandomInt();
        log(`Код для подтверждения регистрации: ${session.confirmCode}`);
    }

    checkConfirmCode(sid, code) {
        let session = this.sessions[sid];
        if(session.confirmCode == code){
            session.confirmCode = null;
            return true;
        } 
        return false;
    }

    loginUser = async (sid , userName, password) => {
        let session = this.sessions[sid];
        session.userId = await this.dataStorage.usersDB.getUserId(userName, password);
        if(session.userId) return true;
        return false;
    }

    logOut(sid) {
        let session = this.sessions[sid];
        session.userId = null;
    }

    updateProfile = async (sid, firstName, lastName, avatar, state, birthDate, address) => {
        let session = this.sessions[sid];
        let userId = session.userId;

        const userProfile = await this.dataStorage.profilesDB.getProfile(userId);
        if(userProfile) await this.dataStorage.profilesDB.updateProfile(userId, firstName, lastName, avatar, state, birthDate, address);
        else await this.dataStorage.profilesDB.addProfile(userId, firstName, lastName, avatar, state, birthDate, address);
    }

    getUserProfile = async (sid) => {
        let session = this.sessions[sid];
        let userId = session.userId;

        return await this.dataStorage.profilesDB.getProfile(userId);
    }

    addPost = async(sid, description, avatar) => {
        let session = this.sessions[sid];
        let userId = session.userId;

        return await this.dataStorage.postsDB.addPost(userId, description, avatar);
    }

    getPosts = async (sid) => {
        let session = this.sessions[sid];
        let userId = session.userId;

        return await this.dataStorage.postsDB.getPostsList(userId);
    }

    updatePosts = async (sid, description, avatar, likes) => {
        let session = this.sessions[sid];
        let userId = session.userId;

        return await this.dataStorage.postsDB.updatePost(userId, description, avatar, likes);
    }
}

function getRandomInt() {
    return Math.floor(Math.random() * 1000000);
}