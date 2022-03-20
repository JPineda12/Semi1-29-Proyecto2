import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/indexRoutes";
import apiRoutes from "./routes/apiRoutes";
import s3Routes from "./routes/s3Routes";
import * as socketio from "socket.io";
import http = require("http");
import { chatController } from "./controllers/chatController";
import { createServer, Server } from "http";
import https = require("https");
import fs = require("fs");

class IndexServer {
  public app: Application;
  public static readonly PORT: number = 3000;
  private server: Server;
  private io: socketio.Server;
  private port: string | number;
  private options: any;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || IndexServer.PORT;
    this.config();
    this.routes();
    this.server = new http.Server(this.app);
    this.io = new socketio.Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
        //        transports: ["websocket", "polling"]
      },
    });
  }

  listen() {
    this.start();

    this.io.on("connection", (socket: socketio.Socket) => {
      console.log("A user with ID: " + socket.id + " connected");

      socket.on("disconnect", () => {
        console.log("A user with ID: " + socket.id + " disconnected");
      });

      socket.on("chat-message", async (message) => {
        const data = {
          texto: message.texto,
          idUsuario: message.idUsuario,
          idChat: message.idChat,
        };
        const messageData = await chatController.newMessage(data);
        socket.broadcast.emit("chat-message", message);
      });

      socket.on("prueba", async (mensaje) => {
        socket.broadcast.emit("PRUEBA EMIT");
      });
    });
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: false }));
  }

  routes(): void {
    this.app.use("/", indexRoutes);
    this.app.use("/api", apiRoutes);
    this.app.use("/aws", s3Routes);
  }

  start(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });
  }
}

export const indexServer = new IndexServer();
indexServer.listen();
