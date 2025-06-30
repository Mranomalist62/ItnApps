// const fs = require('fs');
// const path = require('path');
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const UserController = {
  register: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      // phone_number,
      // location
    } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Check for existing email`
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password_hash: hashedPassword,
          // phone_number,
          // location,
          profile_picture: "default.png",
        },
      });

      res.status(201).json({
        message: "User registered successfully",
        userId: newUser.id,
        profile_picture_url: `http://localhost:5000/uploads/default.png`,
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ error: "Server error during registration" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing credentials" });

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      // Optional: Invalidate existing sessions
      await prisma.session.deleteMany({ where: { userId: user.id } });

      // Session setup
      const sessionToken = uuidv4();
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day

      await prisma.session.create({
        data: {
          userId: user.id,
          sessionToken,
          expires,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { last_login: new Date() },
      });

      res.cookie("sessionToken", sessionToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          location: user.location,
          member_since: user.member_since,
          profile_picture: user.profile_picture
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error during login" });
    }
  },

  logout: async (req, res) => {
    const token = req.cookies.sessionToken;

    if (!token) {
      return res.status(200).json({ message: "Already logged out" });
    }

    try {
      await prisma.session.deleteMany({ where: { sessionToken: token } });

      res.clearCookie("sessionToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).json({ error: "Logout failed" });
    }
  },

  validate: async (req, res) => {
    const token = req.cookies.sessionToken;
    if (!token) return res.status(401).json({ message: "No session token" });

    try {
      const session = await prisma.session.findUnique({
        where: { sessionToken: token },
        include: { user: true },
      });

      if (!session) return res.status(401).json({ message: "Invalid session" });

      res.json({ message: "Session valid", user: session.user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = UserController;
