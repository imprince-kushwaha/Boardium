const express = require("express");
const {Project,Register}=require('../models/commonAssociations.model')
const { Op } = require("sequelize");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { projectName, projectPriority, projectCreatedDate, projectCreatedBy, 
        projectAssignedTo=[],
    } = req.body;

    const newProject = await Project.create({
      projectName,
      projectPriority,
      projectCreatedDate,
      projectCreatedBy,
      // projectAssignedTo: projectAssignedTo || projectCreatedBy, 
    });
       if (Array.isArray(projectAssignedTo) && projectAssignedTo.length > 0) {
      await newProject.setAssignedUsers(projectAssignedTo); // works only if association is defined
    }

    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get all projects

// router.get("/", async (req, res) => {
//   try {
//     const projects = await Project.findAll({
//       order: [["createdAt", "DESC"]],
//     });
//     res.status(200).json(projects);
//   } catch (err) {
//     console.error("Error fetching projects:", err);
//     res.status(500).json({ error: "Failed to fetch projects" });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const userId = parseInt(req.query.userId);
//     const whereClause = userId
//       ? {
//           [Op.or]: [
//             { projectCreatedBy: userId },
//             { projectAssignedTo: userId },
//           ],
//         }
//       : {};

//     const projects = await Project.findAll({
//       where: whereClause,
//       order: [["createdAt", "DESC"]],
//     });
//     res.status(200).json(projects);
//   } catch (err) {
//     console.error("Error fetching projects:", err);
//     res.status(500).json({ error: "Failed to fetch projects" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: Register,
          as: "assignedUsers",
          attributes: ["id", "name", "emailId"], // adjust fields as needed
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});


router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    // All created projects
    const myProjects = await Project.findAll({
      where: { projectCreatedBy: userId },
    });

    // All shared projects via M:N
    const sharedProjects = await Project.findAll({
      include: [
        {
          model: Register,
          as: "assignedUsers",
          where: { id: userId },
          attributes: [],
        },
      ],
      where: {
        projectCreatedBy: { [require("sequelize").Op.ne]: userId },
      },
    });

    res.json({ myProjects, sharedProjects });
  } catch (err) {
    console.error("Error fetching user projects:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});


module.exports = router;
