"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
//import AWS from "aws-sdk";
var database_1 = __importDefault(require("../database"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.loginCognito = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.editProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, newpassword, password, name, email, imgbase64, img_url, nuevaP, final_url, sql, SQLresult, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, newpassword = _a.newpassword, password = _a.password, name = _a.name, email = _a.email, imgbase64 = _a.imgbase64, img_url = _a.img_url;
                        nuevaP = "";
                        if (newpassword.length > 0) {
                            nuevaP = newpassword;
                        }
                        else {
                            nuevaP = password;
                        }
                        final_url = "";
                        if (img_url.length === 0) {
                            //Convert imgbase64 to imgurl (post to s3)
                            final_url = "https://source.unsplash.com/random/200x200?sig=1";
                        }
                        else {
                            final_url = img_url;
                        }
                        sql = "UPDATE Usuario SET nombre = ?, pass = ?, img_url = ?\n                WHERE username=? and pass = ?";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [name, nuevaP, final_url, username, password])];
                    case 2:
                        SQLresult = _b.sent();
                        res.json(SQLresult);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        res.status(200).json({ status: false, result: "Ocurrio un error" });
                        console.log("ERROR: " + err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, img_url, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "INSERT INTO Usuario(username,img_url, email, nombre, pass)\n          VALUES(?, ?, ?, ?, ?)";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        img_url = "https://source.unsplash.com/random/200x200?sig=1";
                        return [4 /*yield*/, database_1.default.query(sql, [
                                req.body.nickname,
                                img_url,
                                req.body.email,
                                req.body.name,
                                req.body.pass,
                            ])];
                    case 2:
                        result = _a.sent();
                        res.status(200).json({
                            status: true,
                            result: "Registrado Satisfactoriamente",
                            data: result
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        res.status(200).json({ status: false, result: "Ocurrio un error" });
                        console.log("ERROR: " + err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.userController = new UserController();
