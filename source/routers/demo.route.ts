import express from 'express';
import controller from '../controllers/demo.controler'

const router = express.Router();

router.get('/hello-world', controller.getHelloWorld)
router.get('/timeout', controller.getWithTimeout)

export = router;