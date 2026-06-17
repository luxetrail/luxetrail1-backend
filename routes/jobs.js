const express = require('express');
const router = express.Router();

// Get all jobs (public)
router.get('/', async (req, res) => {
  try {
    const jobs = [
      {
        id: 1,
        title: "Senior React Developer",
        company: "TechCorp",
        location: "Remote",
        salary: "$80k - $120k",
        type: "Full-time",
        tags: ["React", "Node.js", "MongoDB"]
      },
      {
        id: 2,
        title: "UX/UI Designer",
        company: "DesignStudio",
        location: "New York",
        salary: "$70k - $95k",
        type: "Remote",
        tags: ["Figma", "Adobe XD"]
      },
      {
        id: 3,
        title: "Data Scientist",
        company: "AnalyticsPro",
        location: "London",
        salary: "$90k - $140k",
        type: "Contract",
        tags: ["Python", "SQL", "Machine Learning"]
      }
    ];
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const jobs = [
      { id: 1, title: "Senior React Developer", company: "TechCorp", location: "Remote", salary: "$80k - $120k", description: "Exciting React role!" },
      { id: 2, title: "UX/UI Designer", company: "DesignStudio", location: "New York", salary: "$70k - $95k", description: "Design amazing products!" },
      { id: 3, title: "Data Scientist", company: "AnalyticsPro", location: "London", salary: "$90k - $140k", description: "Work with big data!" }
    ];
    const job = jobs.find(j => j.id === parseInt(req.params.id));
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
