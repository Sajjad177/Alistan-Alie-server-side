const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
//Middleware:
app.use(cors())
app.use(express.json())

//pass: WlvOyb8In6cT6Plq

const uri = "mongodb+srv://assignment-10:WlvOyb8In6cT6Plq@cluster0.uchbkzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = `mongodb+srv://${process.env.DB_USER}:WlvOyb8In6cT6Plq@cluster0.uchbkzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Assignment-10 server site is working')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})