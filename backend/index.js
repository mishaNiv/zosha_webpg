import cors from 'cors';
import express from 'express';
import { getCollegeList, addSelectedCollege, deleteSelectedCollege,  clearCollegeList } from './database.js';
import { swapColleges } from './database.js';
import { getSearchResults } from './server.js';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log("Connected to backend!");
})

app.post("/api/generate_results", getSearchResults);
app.get("/selected_colleges", getCollegeList);
app.post("/selected_colleges", addSelectedCollege);
app.delete("/selected_colleges/:college_name", deleteSelectedCollege);
app.delete("/selected_colleges", clearCollegeList);
app.post("/swap_colleges", swapColleges);