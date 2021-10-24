import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { Server } from "socket.io";

const app = express();

app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
});

app.use(express.json());

app.use(router);

app.get("/github", (request, response) => {
  response.redirect(
    `https://www.github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { serverHttp, io };
