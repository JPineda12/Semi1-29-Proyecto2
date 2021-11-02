import { Request, Response } from "express";
import pool from "../database";
class ChatController {
  public async newMessage(data: any) {
    let sql = `INSERT INTO Mensaje(texto, Usuario_idUsuario, Sala_idChat)
        VALUES(?, ?, ?)`;
    try {
      const result = await pool.query(sql, [
        data.texto,
        data.idUsuario,
        data.idChat,
      ]);
      return {
        status: true,
        result: "Message Inserted in roomChat",
        idMensaje: result.insertId,
      };
    } catch (err) {
      console.log("ERROR)")
      return {
        status: false,
        result: "Ocurrio un error al insertar en el room",
        error: err,
      };
    }
  }

  public async getAllMessagesFromRoom(req: Request, res: Response) {
    const { idUsuario1, idUsuario2 } = req.body;
    let sqlRoom = `SELECT idSala FROM Sala_Chat
    WHERE idUsuario1 = ${idUsuario1}
    AND idUsuario2 = ${idUsuario2}
    UNION
    SELECT idSala FROM Sala_Chat
    WHERE idUsuario1 = ${idUsuario2}
    AND idUsuario2 = ${idUsuario1}`;
    try {
      const result = await pool.query(sqlRoom, []);
      if (result.length > 0) {
        let sql = `SELECT M.idMensaje, M.texto, M.Usuario_idUsuario, M.Sala_idChat as idChat
        FROM Mensaje M
        WHERE M.Sala_idChat = ${result[0].idSala}
        ORDER BY M.idMensaje ASC`;
        try {
          const resultMessages = await pool.query(sql, []);
          if (resultMessages.length > 0) {
            res.json({ idChat: result[0].idSala, messages: resultMessages });
          } else {
            res.json({idChat: result[0].idSala, messages: resultMessages });
          }
        } catch (err) {
          res.json([]);
          console.log("ERROR: " + err);
        }
      } else {
        let sqlCreateRoom = `INSERT INTO Sala_Chat(idUsuario1, idUsuario2)
        VALUES(?, ?);`;
        try {
          const result = await pool.query(sqlCreateRoom, [
            idUsuario1,
            idUsuario2,
          ]);

          res.json({
            status: true,
            created: true,
            result: "Chat Room Created",
            idChat: result.insertId,
          });
        } catch (err) {
          res.json({
            status: false,
            created: false,
            result: "Ocurrio un error al crear la sala.",
            error: err,
          });
        }
      }
    } catch (err) {
      console.log("ERROR: " + err);
      return {
        status: false,
        exists: false,
        idChat: [],
      };
    }
    /*if ((await roomResult).exists) {
     
    } else {
      //No existe el chat, crearlo.
      res.json(this.createRoom(idUsuario1, idUsuario2));
    }*/
  }
}

export const chatController = new ChatController();
