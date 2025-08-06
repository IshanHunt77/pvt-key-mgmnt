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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = void 0;
const web3_js_1 = require("@solana/web3.js");
const schema_1 = require("../schema");
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userExist = yield schema_1.User.find({
            username
        });
        if (userExist) {
            return res.status(400).json({ msg: "User with this name already exist" });
        }
        const keypair = web3_js_1.Keypair.generate();
        const response = yield schema_1.User.create({
            username,
            password,
            publickey: keypair.publicKey.toString(),
            privatekey: keypair.secretKey
        });
        return res.status(201).json({ response });
    }
    catch (e) {
        return res.status(201).json({ error: e });
    }
});
exports.userSignup = userSignup;
