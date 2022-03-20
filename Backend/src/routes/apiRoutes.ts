import { Router } from "express";
import { apiController } from "../controllers/apiController";
import { userController } from "../controllers/userController";
import { chatController } from "../controllers/chatController";
class ApiRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/user", apiController.getUserByName); //Login
    this.router.post("/signup", userController.signup); //Registro
    this.router.put("/edit-profile", userController.editProfile); 

    this.router.get("/tags", apiController.getAllTags);
    this.router.get("/testusers", apiController.getTestUsers); //Get all Users
    this.router.get("/posts", apiController.getAllPosts); //Get all posts
    this.router.post("/new-post", apiController.newPost); //Post a new publicacion
    this.router.post("/new-tag", apiController.newTag); 
    this.router.post("/post-tags", apiController.publicacionesNTags);
    this.router.post("/translate/", apiController.translatePost);
    
    this.router.get("/friends/:iduser", apiController.getAllFriends); //Get all friends of X user
    this.router.get("/requests/:iduser", apiController.getAllFriendRequests); // Get friend requests of X user
    this.router.get("/users/:iduser", apiController.getAllExceptFriends);
    this.router.put("/reject", apiController.rejectRequest);
    this.router.put("/confirm", apiController.confirmRequest);
    this.router.put("/send-again", apiController.sendRequest_Again);
    this.router.post("/send-request", apiController.sendRequest);


    //CHAT QUERIES.
    this.router.post("/room", chatController.getAllMessagesFromRoom);
  }
}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
