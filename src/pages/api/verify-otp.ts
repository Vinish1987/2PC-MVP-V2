
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

  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ success: false, message: "Phone number and OTP are required" });
  }

  // For this prototype, we'll assume OTP 1234 always works
  if (otp === "1234") {
    // Simulate processing delay
    setTimeout(() => {
      res.status(200).json({ success: true, message: "OTP verified successfully" });
    }, 1000);
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
}
