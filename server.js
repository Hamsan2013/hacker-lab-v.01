const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let projects = [];

app.get("/projects", (req, res) => {
    res.json(projects);
});

app.post("/projects", (req, res) => {
    const { name } = req.body;
    const project = { id: Date.now(), name, files: [] };
    projects.push(project);
    res.json(project);
});

app.post("/file", (req, res) => {
    const { projectId, filename, content } = req.body;
    const project = projects.find(p => p.id == projectId);
    if (!project) return res.status(404).send("Project not found");

    project.files.push({ filename, content });
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log("Hacker Lab running on http://localhost:3000");
});
