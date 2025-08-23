import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, password } = await request.json();

    // Basic validation
    if (!email || !firstName || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Hash the password
    // 2. Save user to database
    // 3. Generate verification token
    // 4. Send welcome email

    const emailService = new EmailService();
    const emailResult = await emailService.sendWelcomeEmail(email, firstName);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Failed to send welcome email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      emailSent: emailResult.success
    });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}