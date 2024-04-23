import { Router } from 'express';

const router = Router();

router.get("/", () => {
    console.log("in index route")
})

router.get('/hello', (request, response) => {
    console.log("api will respond to hello")
    response.send('Hello world!');
  });
router.get('/hello/:username', (request, response) => {
    console.log(request.params);
    let username = request.params.username
    let response_message = "hello" + username + "!"
    response.send(response_message);
  });
router.get('/db', (request, response) => {
    console.log("api will query db!")
    response.send('Hello world!');
  });
export default router