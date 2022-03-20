import { Request, Response } from "express";
import aws_keys from "../creds";
//import AWS from "aws-sdk";
import pool from "../database";
class UserController {
  public async loginCognito(req: Request, res: Response) {
   /* req.body.password;
    req.body.username;

    res.json("result");
    */
  }
  public async editProfile(req: Request, res: Response) {
    const { username, newpassword, password, name, email, imgbase64, img_url } =
      req.body;
    let nuevaP = ""
    if(newpassword.length > 0){
      nuevaP = newpassword;
    }else{
      nuevaP = password;
    }
    let final_url = ""
    if(img_url.length === 0){
      //Convert imgbase64 to imgurl (post to s3)
      final_url = "https://source.unsplash.com/random/200x200?sig=1"
    }else{
      final_url = img_url
    }
    let sql = `UPDATE Usuario SET nombre = ?, pass = ?, img_url = ?
                WHERE username=? and pass = ?`;
    try {
      const SQLresult = await pool.query(sql, [name, nuevaP, final_url, username, password]);
      res.json(SQLresult);
    } catch (err) {
      res.status(200).json({ status: false, result: "Ocurrio un error" });
      console.log("ERROR: " + err);
    }
  }

  public async signup(req: Request, res: Response) {
    //INgresar usuario a la base de datos.
    let sql = `INSERT INTO Usuario(username,img_url, email, nombre, pass)
          VALUES(?, ?, ?, ?, ?)`;
    try {
      //URL IMAGEN: (Enviar base64 a S3) 
      //BASE 64: req.body.imagen64
      let img_url = "https://source.unsplash.com/random/200x200?sig=1"
      const result = await pool.query(sql, [
        req.body.nickname,
        img_url,
        req.body.email,
        req.body.name,
        req.body.pass,
      ]);
      res.status(200).json({
        status: true,
        result: "Registrado Satisfactoriamente",
        data: result
      });
    } catch (err) {
      res.status(200).json({ status: false, result: "Ocurrio un error" });
      console.log("ERROR: " + err);
    }
  }
}

export const userController = new UserController();
