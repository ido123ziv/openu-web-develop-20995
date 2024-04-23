import { Router } from 'express';

const router = Router();

router.get("/", () => {
    console.log("in index route")
})

router.get('/hello', (request, response) => {
    console.log("api will respond to hello")
    response.send('Hello world!');
  });
router.get('/db', (request, response) => {
    console.log("api will query db")
    response.send('Hello world!');
  });
export default router