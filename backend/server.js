const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://gudicharan73:fancystore7386@ac-g2gu6od-shard-00-00.ezinw3m.mongodb.net:27017,ac-g2gu6od-shard-00-01.ezinw3m.mongodb.net:27017,ac-g2gu6od-shard-00-02.ezinw3m.mongodb.net:27017/?ssl=true&replicaSet=atlas-oicj50-shard-0&authSource=admin&appName=fancystorecluster";
const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Create Mongo Client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:");
        console.error(error);
        console.error("Message:", error.message);
        console.error("Code:", error.code);
    }
}
connectDB();

// Test Route
app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});
app.get('/collections', async(req, res) => {
    try {
        const collections = await client
            .db("@fancyDB")
            .listCollections()
            .toArray();

        res.json(collections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/databases', async(req, res) => {
    try {
        const dbs = await client.db().admin().listDatabases();
        res.json(dbs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Add Product
app.get("/products", async(req, res) => {
    try {
        const products = await client
            .db("@fancyDB")
            .collection("sarees and fancy items")
            .find({})
            .toArray();

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//order root
app.post("/orders", async(req, res) => {
    try {
        const order = req.body;

        const result = await client
            .db("Fancydb")
            .collection("orders")
            .insertOne(order);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Start Server
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});