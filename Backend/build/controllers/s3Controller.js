"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Controller = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var creds_1 = __importDefault(require("../creds"));
var s3 = new aws_sdk_1.default.S3(creds_1.default.s3);
var S3Controller = /** @class */ (function () {
    function S3Controller() {
    }
    S3Controller.prototype.uploadFoto = function (req, res) {
        var _a = req.body, nombre = _a.nombre, base64Foto = _a.base64Foto;
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
    };
    S3Controller.prototype.uploadPdf = function (req, res) {
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
    };
    return S3Controller;
}());
exports.s3Controller = new S3Controller();
