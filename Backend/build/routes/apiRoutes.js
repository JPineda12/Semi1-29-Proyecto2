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
        this.router.get('/friends/:iduser', apiController_1.apiController.getAllFriends);
        this.router.get('/requests/:iduser', apiController_1.apiController.getAllFriendRequests);
        this.router.get('/users/:iduser', apiController_1.apiController.getAllExceptFriends);
        this.router.put('/reject', apiController_1.apiController.rejectRequest);
        this.router.put('/confirm', apiController_1.apiController.confirmRequest);
        this.router.put('/send-again', apiController_1.apiController.sendRequest_Again);
        this.router.post('/send-request', apiController_1.apiController.sendRequest);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
