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

    req.userId = session.user.id; // attach the user ID for downstream use
    next();

  } catch (err) {
    console.error('Auth error:', err);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;