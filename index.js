const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
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

    const artCraftCollection = client.db("artAndCraftDB").collection("artAndCraft")

    // Post
    app.post('/artAndCraft', async(req, res) => {
      const newArtAndCraft = req.body
      // console.log(newArtAndCraft)
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
      // console.log(req.params.id)
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
      // console.log(req.params.email)
        const result = await artCraftCollection.find({ email : req.params.email}).toArray()
        // console.log(result)
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
      // console.log(result)
      res.send(result)
    })

    // Delete item: 
    
    app.delete('/artAndCraft/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await artCraftCollection.deleteOne(query)
      res.send(result)
    })

    // get sub category data : 
    // LandsCapes: 

    app.get('/landCapes/:subcategory', async(req, res) => {
      console.log('checking',req.params.subcategory)
      const result = await artCraftCollection.find({subcategory : req.params.subcategory}).toArray()
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
  console.log(`Example app listening on port ${port}`)
})