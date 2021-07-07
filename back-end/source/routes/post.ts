import express from 'express';
import controller from '../controllers/post';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.patch('/id/:id', extractJWT, controller.savePost);
router.patch('/delete/id/:id', extractJWT, controller.deletePost);
router.post('/all', extractJWT, controller.getUserPosts);
/*router.post('/register', controller.register);*/

export = router;
