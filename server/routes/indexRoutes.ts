import { Router } from 'express';

const router = Router();

router.get("/", () => {
    console.log("in index route")
})

export default router