const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Create a new project
router.post("/", async (req, res) => {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find().populate("teamMembers milestones");
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a project
router.put("/:id", async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a project
router.delete("/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
