import { Request, response, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import aws_keys from "../creds";
const s3 = new AWS.S3(aws_keys.s3);
class S3Controller {
  public uploadFoto(req: Request, res: Response) {
    const { nombre, base64Foto } = req.body;
    /* WORKING VERSION WITH S3
    const { nombre, base64Foto } = req.body;
    var nombrei = "imagenes/" + nombre + "-" + uuidv4() + ".jpg";
    let buff = Buffer.from(base64Foto, "base64");

    const params = {
      Bucket: "archivos-29-p1",
      Key: nombrei,
      Body: buff,
      ContentType: "image",
      ACL: "public-read",
    };
    const putResult = s3.putObject(params).promise();
    res.json({ mensaje: putResult, nombre: nombrei });
    */
    // RANDOM RESPONSE (Local Tests)
    res.json({ mensaje: "-", nombre: "prueba" });
  }

  public uploadPdf(req: Request, res: Response) {
    var nombre = req.body.nombre;
    var pdf = req.body.pdf; //base 64
    /* WORKING VERSION WITH S3
    //carpeta y nombre que quieran darle al pdf
    var nombrei = "archivos/" + nombre + "-"+uuidv4() + ".pdf";
    //se convierte la base64 a bytes
    let buff = Buffer.from(pdf, "base64");
    const params = {
      Bucket: "archivos-29-p1",
      Key: nombrei,
      Body: buff,
      ACL: "public-read",
    };

    const putResult = s3.putObject(params).promise();
    */
   
    // RANDOM RESPONSE (Local Tests)
    res.json({ mensaje: "", nombre: "prueba" });
  }
}

export const s3Controller = new S3Controller();
