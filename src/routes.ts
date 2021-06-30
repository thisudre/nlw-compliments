import { Router } from "express";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import AuthenticateUserController from "./controllers/AuthenticateUserController";
import CreateComplimentController from "./controllers/CreateComplimentController";
import CreateTagController from "./controllers/CreateTagController";
import CreateUserController from "./controllers/CreateUserController";
import ListUserReceivedComplimentsController from "./controllers/ListUserReceivedComplimentsController";
import ListUsersController from "./controllers/ListUsersController";
import ListUserSentComplimentsController from "./controllers/ListUserSentComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthentication } from "./middlewares/ensureAuthentication";

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController()
const listUserSentComplimentsController = new ListUserSentComplimentsController()
const listUsersController = new ListUsersController()

router.post('/users', createUserController.handle);
router.get('/users', ensureAuthentication, listUsersController.handle);
router.post('/tags', ensureAuthentication, ensureAdmin, createTagController.handle);
router.post('/login', authenticateUserController.handle);
router.get('/user/received/compliments', ensureAuthentication, listUserReceivedComplimentsController.handle)
router.get('/user/sent/compliments', ensureAuthentication, listUserSentComplimentsController.handle)
router.post('/compliments', ensureAuthentication, createComplimentController.handle);

export { router };