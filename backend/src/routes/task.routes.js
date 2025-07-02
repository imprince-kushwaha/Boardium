const express = require("express");
const Task = require("../models/task.model");
const ProjectAssignment = require("../models/projectAssignment.model");
const router = express.Router();

// router.post("/", async (req, res) => {
//   const { title, description, icon, status, priority, date, createdBy, assignedTo } = req.body;
//   try {
//     const task = await Task.create({
//       title,
//       description,
//       icon,
//       status,
//       priority,
//       date,
//       createdBy,
//       assignedTo: assignedTo || createdBy, // use creator if no assignee provided
//     });
//     res.status(201).json(task);
//   } catch (error) {
//     console.error("Error creating task:", error);
//     res.status(500).json({ message: "Failed to create task" });
//   }
// });



// In your POST /task route
router.post("/", async (req, res) => {
  const {
    title,
    description,
    icon,
    status,
    priority,
    date,
    createdBy,
    assignedTo,
    projectId,
  } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      icon,
      status,
      priority,
      date,
      createdBy,
      assignedTo: assignedTo || createdBy,
      projectId,
    });

    // 👇 Automatically associate assigned user with the project
    if (assignedTo) {
      await ProjectAssignment.findOrCreate({
        where: {
          projectId,
          registerId: assignedTo,
        },
      });
    }

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
});


// router.get("/", async (req, res) => {
//    const { createdBy } = req.query;

//   const whereClause = createdBy ? { createdBy } : {};
//   try {
//     const task = await Task.findAll({ where: whereClause });
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(400).send("Error task not Found: " + err.message);
//   }
// });


// router.get("/", async (req, res) => {
//   const { createdBy, assignedTo } = req.query;

//   let whereClause = {};
//   if (createdBy) whereClause.createdBy = createdBy;
//   if (assignedTo) whereClause.assignedTo = assignedTo;

//   try {
//     const tasks = await Task.findAll({ where: whereClause });
//     res.status(200).json(tasks);
//   } catch (err) {
//     res.status(400).send("Error fetching tasks: " + err.message);
//   }
// });

router.get("/", async (req, res) => {
  const { createdBy, assignedTo, projectId } = req.query;

  let whereClause = {};
  if (createdBy) whereClause.createdBy = createdBy;
  if (assignedTo) whereClause.assignedTo = assignedTo;
  if (projectId) whereClause.projectId = projectId;
  //  if (projectId === "null") {
  //   whereClause.projectId = null;
  // } else if (projectId) {
  //   whereClause.projectId = projectId;
  // }

  try {
    const tasks = await Task.findAll({ where: whereClause });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).send("Error fetching tasks: " + err.message);
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      res.status(404).send("Task not Found...");
    }
    await task.destroy();
    res.json({ message: "Task Deleted Successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT use it when updating all fields VS PATCH when only 1,2 fields
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, icon, status, priority, date } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).send("Task Not Found...");
    }

    await task.update({ title, description, icon, status, priority, date });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
