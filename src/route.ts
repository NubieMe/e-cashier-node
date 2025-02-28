import express from 'express';
import RoleRoute from './module/master/role/route';
import UserRoute from './module/master/user/route';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.use("/role", RoleRoute);
router.use("/user", UserRoute);

export default router;