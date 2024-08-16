import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'emiSat0',
    database: 'zosha_database'
})

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json("hello, this is the backend");
})

app.post("/selected_colleges", (req, res) => {
    const { college_name } = req.body;

    if (!college_name) {
        return res.status(400).send('College name is required');
    }

    const query = `INSERT INTO selected_colleges (college_name, add_date) VALUES (?, NOW())`;
    db.query(query, [college_name], (err, result) => {
        if (err) {
            console.error('Error adding college to database:', err);
            return res.status(500).send('Server error');
        }
        return res.status(201).send('College added successfully');
    });
});

app.get("/selected_colleges", (req, res) => {
    const query = `SELECT college_name FROM selected_colleges`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching college list from database:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});

app.listen(3001, () => {
    console.log("Connected to backend!");
})