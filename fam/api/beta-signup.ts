
    const adminToken = process.env.ADMIN_TOKEN;
    const authHeader = req.headers.authorization?.replace('Bearer ', '');
    if (!adminToken || authHeader !== adminToken) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }