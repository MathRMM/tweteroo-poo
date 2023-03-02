import db from "../config/mongo/index.js";

export class postTweet {
  constructor() {
    return this.post;
  }
  post = async (req, res) => {
    try {
      const body = this.validateBody(req, res);
      body.avatar = (
        await (await db())
          .collection("users")
          .findOne({ username: body.username })
      ).avatar;
      await (await db()).collection("tweets").insertOne(body);
      return res.status(201).send("OK, seu tweet foi criado");
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  validateBody(req, res) {
    const { tweet, username } = req.body;
    if (!username || !tweet) {
      return res.status(400).send("Todos os campos são obrigatórios!");
    }
    return { tweet, username };
  }
}

export class getTweet {
  constructor() {
    this.getEveryTweet = this.getEveryTweet.bind(this);
  }
  async getEveryTweet(req, res) {
    const { page } = req.query;

    if (page && page < 1) {
      res.status(400).send("Informe uma página válida!");
      return;
    }
    const limit = 10;
    const start = (page - 1) * limit;

    const tweets = await (await db())
      .collection("tweets")
      .find({})
      .skip(start)
      .limit(limit)
      .toArray();

    return res.send(this.reverseTweets(tweets));
  }

  async getUserTweet(req, res) {
    const { username } = req.params;
    const tweetsDoUsuario = await (await db())
      .collection("tweets")
      .find({ username })
      .toArray();
    return res.status(200).send(tweetsDoUsuario);
  }

  reverseTweets(tweets) {
    return [...tweets].reverse();
  }
}
