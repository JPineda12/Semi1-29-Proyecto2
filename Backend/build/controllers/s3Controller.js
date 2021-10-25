"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Controller = void 0;
var uuid_1 = require("uuid");
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var creds_1 = __importDefault(require("../creds"));
var s3 = new aws_sdk_1.default.S3(creds_1.default.s3);
var S3Controller = /** @class */ (function () {
    function S3Controller() {
    }
    S3Controller.prototype.uploadFoto = function (req, res) {
        var _a = req.body, nombre = _a.nombre, base64Foto = _a.base64Foto;
        var nombrei = "imagenes/" + nombre + "-" + uuid_1.v4() + ".jpg";
        var buff = Buffer.from(base64Foto, "base64");
        var params = {
            Bucket: "archivos-29-p1",
            Key: nombrei,
            Body: buff,
            ContentType: "image",
            ACL: "public-read",
        };
        var putResult = s3.putObject(params).promise();
        res.json({ mensaje: putResult, nombre: nombrei });
    };
    S3Controller.prototype.uploadPdf = function (req, res) {
        var nombre = req.body.nombre;
        var pdf = req.body.pdf; //base 64
        //carpeta y nombre que quieran darle al pdf
        var nombrei = "archivos/" + nombre + "-" + uuid_1.v4() + ".pdf";
        //se convierte la base64 a bytes
        var buff = Buffer.from(pdf, "base64");
        var params = {
            Bucket: "archivos-29-p1",
            Key: nombrei,
            Body: buff,
            ACL: "public-read",
        };
        var putResult = s3.putObject(params).promise();
        res.json({ mensaje: putResult, nombre: nombrei });
    };
    return S3Controller;
}());
exports.s3Controller = new S3Controller();
