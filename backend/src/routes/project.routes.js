const express = require("express");
const Project = require("../models/project.model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { projectName, projectPriority, projectCreatedDate, projectCreatedBy, 
        // projectAssignedTo
    } = req.body;

    const newProject = await Project.create({
      projectName,
      projectPriority,
      projectCreatedDate,
      projectCreatedBy,
    //   projectAssignedTo: projectAssignedTo || projectCreatedBy, 
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

module.exports = router;
