import { Router } from "express";
import { z } from "zod";
import { sendContactEmail } from "../controllers/contactController";

const router = Router();

const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Subject is too short").max(120),
  message: z.string().min(10, "Message is too short").max(3000),
});

router.post("/contact", async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    await sendContactEmail(parsed.data);
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("CONTACT EMAIL ERROR:", err);
    return res.status(500).json({ message: "Failed to send message" });
  }
});

export default router;
