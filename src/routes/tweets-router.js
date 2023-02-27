import { Router } from "express";
import { postTweet, getTweet } from "../controller/tweets-controller.js";

export class tweetsRouter extends Router {
  constructor() {
    super();
    this.post("/", new postTweet);
    this.get("/", new getTweet().getEveryTweet)
    this.get("/:username", new getTweet().getUserTweet);
  }
}
