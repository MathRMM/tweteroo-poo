import db from "../config/mongo/index.js";

export class sign {
  constructor() {
    return this.postSignUp;
  }

  postSignUp = async (req, res) => {
    try {
      await (await db())
        .collection("users")
        .insertOne(this.validateBody(req, res));

      res.status(200).send("OK deu tudo certo");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

  validateBody(req, res) {
    const { username, avatar } = req.body;
    if (!username || !avatar) {
      return res.status(400).send("Todos os campos são obrigatórios!");
    }
    return {
      username,
      avatar,
    };
  }
}
