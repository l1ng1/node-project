import express from "express";
import bodyParser from "body-parser";
// var bodyParser = require('body-parser')
import path from 'path';

export class Router {
    constructor(controller, config) {
        this.controller = controller;
        this.config = config;
        this.app = express();
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
    }

    async start() {
        this.server = this.app.listen(this.config.port, () => {
            console.log("Server started at", this.config.port);
        });
        await this.createRoutes();
        this.app.use(express.static(path.join(process.cwd(), '/public')));
    }

    stop() {
        this.server.close();
    }

    async createRoutes() {
        this.app.get("/", this.controller.mainUserPage,
                          this.controller.mainGeneralPage);

        this.app.get("/register", this.controller.mainUserPage,
                                  await this.controller.registrationPage);

        this.app.get("/login", this.controller.mainUserPage,
                               this.controller.loginPage);

        this.app.post("/log",   this.controller.mainUserPage,
                               await this.controller.checkloginData,
                               this.controller.redirToUserPage);

        this.app.post("/confirmed", this.controller.mainUserPage,
                                  await this.controller.checkCaptcha,
                                    this.controller.redirToUserPage);

        this.app.get("/logout",    this.controller.logOutUser,
                                    this.controller.redirToGeneralPage);
        
        this.app.post("/updateProfile",    await this.controller.updateProfile);

        this.app.get("/getUserProfile",    await this.controller.getUserProfile);

        this.app.post("/addUserPost",    await this.controller.addUserPost);

        this.app.get("/getUserPosts",    await this.controller.getUserPosts);

        this.app.post("/updateUserPost",    await this.controller.updateUserPost);
    }
}
