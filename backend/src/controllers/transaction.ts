import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";

export const TransactionFun = async (req: any, res: any) => {
  const connection = new Connection("https://api.devnet.solana.com"); 

  try {
    const serializedTxnBase64 = req.body.message;
    const serializedTxn = Buffer.from(serializedTxnBase64, "base64");

    console.log("Received txn from frontend:", serializedTxnBase64);

    
    const txn = Transaction.from(serializedTxn);

    const { blockhash } = await connection.getLatestBlockhash();
    txn.recentBlockhash = blockhash;

    
    const secret = Uint8Array.from([172,171,212,31,7,21,255,198,213,248,152,213,37,197,107,38,59,237,173,129,198,104,154,247,15,209,204,157,154,155,218,187,167,0,163,217,203,57,61,242,105,39,27,210,134,106,239,192,21,123,64,63,210,119,68,111,17,170,170,120,46,125,159,178]); // <-- put secret key array here
    const feePayer = Keypair.fromSecretKey(secret);

    txn.feePayer = feePayer.publicKey;

    
    txn.sign(feePayer);

    
    const txid = await connection.sendTransaction(txn,[feePayer])

    res.status(200).send({ txid });

  } catch (err: any) {
    console.error("Transaction error:", err);
    res.status(500).send({ error: err.message });
  }
};


