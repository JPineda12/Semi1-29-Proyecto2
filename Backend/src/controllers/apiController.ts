import { Request, Response } from "express";
import pool from "../database";
import AWS from "aws-sdk";
import aws_keys from "../creds";
const s3 = new AWS.S3(aws_keys.s3);
import { v4 as uuidv4 } from "uuid";

class ApiController {
  public async getAllTags(req: Request, res: Response) {
    let sql = `SELECT idEtiqueta, Etiqueta from Etiqueta`;
    try {
      const result = await pool.query(sql, []);
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json([]);
      }
    } catch (err) {
      res.json([]);
      console.log("ERROR: " + err);
    }
  }
  public async getUserByName(req: Request, res: Response) {
    const username = req.params.username;
    let sql = `SELECT idUsuario, username, img_url From Usuario
    WHERE username = ?`;
    try {
      const result = await pool.query(sql, [username]);
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json([]);
      }
    } catch (err) {
      res.json([]);
      console.log("ERROR: " + err);
    }
  }

  public async getAllPosts(req: Request, res: Response) {
    let sql = `SELECT idPublicacion, url_imagen, texto, u.username as owner
    FROM Publicacion P , Usuario U
    WHERE P.Publicacion_idUsuario = U.idUsuario
    ORDER BY idPublicacion DESC`;
    try {
      const result = await pool.query(sql, []);
      if (result.length > 0) {
        let publicaciones = [];
        for (let i = 0; i < result.length; i++) {
          let sqlTag = `SELECT e.etiqueta FROM Publicacion P, Etiqueta E, Post_Tags PT
          WHERE P.idPublicacion = PT.Publicacion_idPublicacion
          AND PT.Etiqueta_idEtiqueta = E.idEtiqueta
          AND PT.Publicacion_idPublicacion = ?`;
          const resultTag = await pool.query(sqlTag, [result[i].idPublicacion]);
          publicaciones.push({
            publicacion: result[i],
            etiquetas: resultTag,
          });
        }
        res.json(publicaciones);
      } else {
        res.json([]);
      }
    } catch (err) {
      res.json([]);
      console.log("ERROR: " + err);
    }
  }
  public async newPost(req: Request, res: Response) {
    const { imagen, texto, idUser } = req.body;
    //PLACE img to S3 profile pictures bucket
    let nombrei =
      "profile-pictures/" + req.body.nickname + "-pp" + "-" + uuidv4() + ".jpg";
    let buff = Buffer.from(imagen, "base64");
    const params = {
      Bucket: "p2-bucket-semi1",
      Key: nombrei,
      Body: buff,
      ContentType: "image",
      ACL: "public-read",
    };
    s3.upload(params, async function sync(err: any, data: any) {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(data.Location);
        let sql = `INSERT INTO Publicacion(url_imagen, texto, Publicacion_idUsuario)
        VALUES(?, ?, ?)`;
        try {
          const result = await pool.query(sql, [data.Location, texto, idUser]);
          console.log(result);
          res.status(200).json({
            status: true,
            result: "Publicado Correctamente",
            idPost: result.insertId,
          });
        } catch (err) {
          res.status(200).json({ status: false, result: "Ocurrio un error" });
          console.log("ERROR: " + err);
        }
      }
    });
  }
  public async newTag(req: Request, res: Response) {
    const { tag } = req.body;
    let sql = `INSERT INTO Etiqueta(etiqueta)
    VALUES(?)`;
    try {
      const result = await pool.query(sql, [tag]);
      console.log("TAGID: ", result.insertId);
      res.status(200).json({
        status: true,
        result: "Etiqueta ingresada Correctamente",
        idTag: result.insertId,
      });
    } catch (err) {
      res.status(200).json({ status: false, result: "Ocurrio un error" });
      console.log("ERROR: " + err);
    }
  }
  public async publicacionesNTags(req: Request, res: Response) {
    const { idTag, idPublicacion } = req.body;
    let sql = `INSERT INTO Post_Tags(Publicacion_idPublicacion, Etiqueta_idEtiqueta)
    VALUES(?, ?)`;
    try {
      const result = await pool.query(sql, [idPublicacion, idTag]);
      res
        .status(200)
        .json({ status: true, result: "Relacion Tag-Publicacion ingresada" });
    } catch (err) {
      res.status(200).json({ status: false, result: "Ocurrio un error" });
      console.log("ERROR: " + err);
    }
  }
}

export const apiController = new ApiController();
