import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const connection = new Connection("https://api.devnet.solana.com"); 
  const fromPubKey = new PublicKey("CEuenvaAJFDaH6huqpn7C62d9KB2ssBemWQsAFKDL4Fb"); 

  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');

  const transfer = async () => {
    try {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPubKey,
          toPubkey: new PublicKey(toAddress),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = fromPubKey;

      const serializedTxn = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      });
      console.log(serializedTxn)
      const base64Txn = Buffer.from(serializedTxn).toString('base64');
      console.log(base64Txn);

      await axios.post('http://localhost:3000/api/v1/txn/sign', {
        message: base64Txn,
      });

      alert("Transaction sent to backend for signing.");
    } catch (err:any) {
      console.error("Transfer error:", err);
      alert("Transaction failed: " + err.message);
    }
  };

  return (
    <>
      <div>
        <input placeholder='Amount in SOL' onChange={(e) => setAmount(e.target.value)} />
        <input placeholder='Recipient Address' onChange={(e) => setToAddress(e.target.value)} />
        <button onClick={transfer}>Submit</button>
      </div>
    </>
  );
}

export default App;
