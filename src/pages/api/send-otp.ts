
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  success: boolean;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: "Phone number is required" });
  }

  // In a real app, you would send an actual OTP via SMS
  // For this prototype, we'll just simulate success

  // Simulate processing delay
  setTimeout(() => {
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  }, 1000);
}
