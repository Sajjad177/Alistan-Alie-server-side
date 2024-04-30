const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
require("dotenv").config();
//Middleware:
app.use(cors())
app.use(express.json())


// const uri = "mongodb+srv://assignment-10:WlvOyb8In6cT6Plq@cluster0.uchbkzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uchbkzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const artCraftCollection = client.db("artAndCraftDB").collection("artAndCraft")
    const subCategoryCollection = client.db("artAndCraftDB").collection("categories")

    // Post to database:
    app.post('/artAndCraft', async(req, res) => {
      const newArtAndCraft = req.body
      const result = await artCraftCollection.insertOne(newArtAndCraft)
      res.send(result)
    })

    // get all art and craft:
    app.get('/artAndCraft', async(req, res) => {
      const cursor = artCraftCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // get spacific one data 
    app.get('/artAndCraft/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await artCraftCollection.findOne(query)
        res.send(result)
    })

    // get singleData :
    app.get('/singleData/:id', async(req, res) => {
      const id = req.params.id
      console.log('single id', id)
      const query = {_id : new ObjectId(id)}
      const result = await artCraftCollection.findOne(query)
      res.send(result)
    })

    // get my add items :
    app.get('/myCraftItem/:email', async(req, res) => {
        const result = await artCraftCollection.find({ email : req.params.email}).toArray()
        res.send(result);
    })

    // update item :
    app.put('/artAndCraft/:id', async(req, res) => {
      const id = req.params.id;
      const filter = { _id : new ObjectId(id)}
      const options = { upsert : true}
      const updateArtAndCraft = req.body
      const item = {
        $set : {
          itemName: updateArtAndCraft.itemName,
          subcategory: updateArtAndCraft.subcategory, 
          customization: updateArtAndCraft.customization,
          stockStatus: updateArtAndCraft.stockStatus,
          photo: updateArtAndCraft.photo,
          time: updateArtAndCraft.time, 
          price: updateArtAndCraft.price,
          rating: updateArtAndCraft.rating,
          description: updateArtAndCraft.description
        }
      }
      const result = await artCraftCollection.updateOne(filter, item, options)
      res.send(result)
    })

    // Delete item: 
    app.delete('/artAndCraft/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await artCraftCollection.deleteOne(query)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Assignment-10 server site is working')
})

app.listen(port, () => {
  console.log(`Example port ${port}`)
})