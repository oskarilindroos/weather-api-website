import express from "express";
import cors from "cors";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
app.use(cors(), bodyParser.json());
const PORT = 5000;
const pool = new pg.Pool({
    database: "collectors",
    user: "user",
    host: "localhost",
    password: "pass"
});

app.get("/api/health", (req, res) => {
    res.status(200).send("BACKEND IS UP!");
});

app.get("/api/collectors/", async (req, res) => {

    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM collectors");
        client.release();
        res.status(200).json({ data: result.rows });
    } catch (error) {
        console.error("Error occured:", error);
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/collectors/:cid", async (req, res) => {
    const collectorId = parseInt(req.params.cid);

    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM collectors WHERE id=$1", [collectorId]);
        client.release();
        if (result.rowCount !== 1) {
            return res.status(404).json({ message: "Collector not found" });
        }
        res.status(200).json({ data: result.rows[0] });
    } catch (error) {
        console.error("Error occured:", error);
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/collectors/", async (req, res) => {
    const {
        name,
        email,
        cars,
        slogan,
        trading
    } = req.body;

    try {
        const client = await pool.connect();
        const result = await pool.query(`
            INSERT INTO collectors (name, email, cars, slogan, trading) 
            VALUES ($1, $2, $3, $4, $5)`, [name, email, cars, slogan, trading]
        );
        client.release();
        if (result.rowCount === 1) {
            return res.status(200).json({ message: "Collector added" });
        } else {
            throw Error("Collector not added");
        }
    } catch (error) {
        console.error("Error occured:", error);
        res.status(500).json({ message: error.message });
    }
});

app.delete("/api/collectors/:cid", async (req, res) => {
    const collectorId = parseInt(req.params.cid);

    try {
        const client = await pool.connect();
        const result = await client.query("DELETE FROM collectors WHERE id=$1", [collectorId]);
        await client.query("SELECT SETVAL('collectors_id_seq', (SELECT MAX(id) FROM collectors))");
        client.release();
        if (result.rowCount === 1) {
            return res.status(200).json({ message: `Collector with id ${collectorId} succesfully deleted` });
        } else {
            return res.status(500).json({ message: "Collector not deleted" });
        }

    } catch (error) {
        console.error("Error occured:", error);
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend API listening on port ${PORT}`);
});