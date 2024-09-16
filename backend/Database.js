import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import e from 'express';

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

    const { college_name, college_desc } = req.body;

    if (!college_name) {
        return res.status(400).send('College name is required');
    }

    if (!college_desc) {
        return res.status(401).send('College description not received');
    }

    db.query("SELECT MAX(college_rank) as maxIndex from selected_colleges", (error, result) => {
        if (error) {
            console.error("Error accessing highest index in list: ", error);
        }

        const maxIndex = result[0].maxIndex || 0;

        db.query(`INSERT INTO selected_colleges (college_name, college_rank, add_date, college_desc) VALUES (?, ?, NOW(), ?)`, 
          [college_name, (maxIndex+1), college_desc], (err, result) => {
            if (err) {
                console.error('Error adding college to database:', err);
            }
        });
    });
});

app.delete("/selected_colleges/:college_name", (req, res) => {
    const col_name = req.params.college_name;

    db.query(`DELETE FROM selected_colleges WHERE college_name = ?`, [col_name], (error, results) => {
        if (error) {
            console.error('Error removing college from list: ', error);
        }
    });
});

app.delete("/selected_colleges", (req, res) => {
    db.query("TRUNCATE TABLE selected_colleges", (error, results) => {
        if (error) {
            console.error('Error clearing college list: ', error);
        }
    })
})

app.post("/swap_colleges", (req, res) => {
    const { firstCollege, secondCollege } = req.body;

    db.query(`SELECT college_id, college_rank FROM selected_colleges WHERE college_name IN (?, ?)`, [firstCollege, secondCollege], 
      (error, results) => {
        if (error) {
            console.error("Error in accessing college ranks for swapping: ", error);
            return res.status(500).send('Server error');
        }

        if (results.length !== 2) {
            console.error("Error: Could not find both colleges for swapping.");
            return res.status(400).send('Invalid college names');
        }

        const college1 = results[0];
        const college2 = results[1];

        db.query(`UPDATE selected_colleges SET college_rank = CASE college_id WHEN ? THEN ? WHEN ? THEN ? END
          WHERE college_id IN (?, ?)`, [college1.college_id, college2.college_rank, college2.college_id, college1.college_rank, 
           college1.college_id, college2.college_id], (swapError, swapResults) => {
            if (swapError) {
                console.error("Error in swapping colleges: ", swapError);
                return res.status(500).send('Server error');
            }

            res.status(200).send('Colleges swapped successfully');
            });
        });
});

app.get("/selected_colleges", (req, res) => {
    db.query(`SELECT college_name, college_rank FROM selected_colleges`, (err, results) => {
        if (err) {
            console.error('Error fetching college list from database:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});

app.get("/college_description", (req, res) => {
    const college_name = req.query.college_name;

    db.query(`SELECT college_desc FROM selected_colleges WHERE college_name = ?`, [college_name], (error, results) => {
        if (error) {
            console.error("Error retrieving college description from database:", error);
        } 
        res.json(results);
    })
});

app.listen(3001, () => {
    console.log("Connected to backend!");
})