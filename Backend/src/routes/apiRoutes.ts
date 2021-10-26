import { Router } from 'express';
import { apiController } from '../controllers/apiController';
import { userController } from '../controllers/userController';
class ApiRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', userController.loginCognito);
        this.router.post('/login-face', userController.loginFace);        
        this.router.post('/signup', userController.signup);

        this.router.get('/tags', apiController.getAllTags);
        this.router.get('/user/:username', apiController.getUserByName);
        this.router.get('/posts', apiController.getAllPosts);
        this.router.post('/new-post', apiController.newPost);
        this.router.post('/new-tag', apiController.newTag);
        this.router.post('/post-tags', apiController.publicacionesNTags);        

        this.router.get('/friends/:iduser', apiController.getAllFriends);
        this.router.get('/requests/:iduser', apiController.getAllFriendRequests);
        this.router.get('/users/:iduser', apiController.getAllExceptFriends);
        this.router.put('/reject', apiController.rejectRequest);
        this.router.put('/confirm', apiController.confirmRequest);
        this.router.put('/send-again', apiController.sendRequest_Again);
        this.router.post('/send-request', apiController.sendRequest);

    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;