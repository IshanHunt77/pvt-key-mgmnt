"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signup_1 = __importDefault(require("./routes/signup"));
const signin_1 = __importDefault(require("./routes/signin"));
const txn_1 = __importDefault(require("./routes/txn"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/signup', signup_1.default);
app.use('/api/v1/signin', signin_1.default);
app.use('/api/v1/txn', txn_1.default);
// const mongoConnect = async ()=>{
//     try{
//         await mongoose.connect("")
//     }catch(e:any){
//         console.log("Error connecting to mongoDb",e);
//     }
// }
// mongoConnect();
app.listen(3000, () => {
    console.log("Server is running on 3000");
});
