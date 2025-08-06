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
exports.TransactionFun = void 0;
const web3_js_1 = require("@solana/web3.js");
const TransactionFun = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("https://api.devnet.solana.com"); // specify network
    try {
        const serializedTxnBase64 = req.body.message;
        const serializedTxn = Buffer.from(serializedTxnBase64, "base64");
        console.log("Received txn from frontend:", serializedTxnBase64);
        // Reconstruct transaction
        const txn = web3_js_1.Transaction.from(serializedTxn);
        // Add recent blockhash
        const { blockhash } = yield connection.getLatestBlockhash();
        txn.recentBlockhash = blockhash;
        // Load a keypair to sign transaction (must have SOL)
        const secret = Uint8Array.from([172, 171, 212, 31, 7, 21, 255, 198, 213, 248, 152, 213, 37, 197, 107, 38, 59, 237, 173, 129, 198, 104, 154, 247, 15, 209, 204, 157, 154, 155, 218, 187, 167, 0, 163, 217, 203, 57, 61, 242, 105, 39, 27, 210, 134, 106, 239, 192, 21, 123, 64, 63, 210, 119, 68, 111, 17, 170, 170, 120, 46, 125, 159, 178]); // <-- put secret key array here
        const feePayer = web3_js_1.Keypair.fromSecretKey(secret);
        txn.feePayer = feePayer.publicKey;
        // Sign with fee payer
        txn.sign(feePayer);
        // Send raw transaction
        const txid = yield connection.sendTransaction(txn, [feePayer]);
        res.status(200).send({ txid });
    }
    catch (err) {
        console.error("Transaction error:", err);
        res.status(500).send({ error: err.message });
    }
});
exports.TransactionFun = TransactionFun;
// CEuenvaAJFDaH6huqpn7C62d9KB2ssBemWQsAFKDL4Fb
