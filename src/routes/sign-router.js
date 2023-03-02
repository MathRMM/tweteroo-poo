import { Router } from "express";
import { sign } from "../controller/sign-controller.js";

export class signRouter extends Router {
  constructor() {
    super();

    this.post("/", new sign);
  }
}
