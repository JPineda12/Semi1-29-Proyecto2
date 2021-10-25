"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var userController_1 = require("../controllers/userController");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes.prototype.config = function () {
        this.router.post('/login', userController_1.userController.loginCognito);
        this.router.post('/login-face', userController_1.userController.loginFace);
        this.router.post('/signup', userController_1.userController.signup);
        this.router.get('/tags', apiController_1.apiController.getAllTags);
        this.router.get('/user/:username', apiController_1.apiController.getUserByName);
        this.router.get('/posts', apiController_1.apiController.getAllPosts);
        this.router.post('/new-post', apiController_1.apiController.newPost);
        this.router.post('/new-tag', apiController_1.apiController.newTag);
        this.router.post('/post-tags', apiController_1.apiController.publicacionesNTags);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
