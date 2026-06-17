// JOBS ROUTE
app.get('/api/jobs', (req, res) => {
  res.json([
    { id: 1, title: "Senior React Developer", company: "TechCorp", location: "Remote", salary: "$80k - $120k" }
  ]);
});

// ADMIN LOGIN ROUTE - ADD THIS!
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@luxetrailco.xyz' && password === 'Admin123!') {
    res.json({ success: true, token: 'test-token-123' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// SETTINGS ROUTE
app.get('/api/settings', (req, res) => {
  res.json({ email: 'support@luxetrailco.xyz', phone: '+123 456 7890', address: '123 Main Street' });
});
