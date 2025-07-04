const prisma = require('../prisma/client');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.sessionToken;

  if (!token) {
    return res.status(401).json({ error: 'No session token provided' });
  }

  try {
    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      include: { user: true }
    });

    if (!session || session.expires < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    // Attach user to request
    req.user = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role
    };

    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

// Attach admin wrapper to the same export
authMiddleware.withAdmin = [
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  }
];

module.exports = authMiddleware;