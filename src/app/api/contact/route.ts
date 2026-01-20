import { NextRequest, NextResponse } from "next/server";

// Note: To enable email sending, install resend: npm install resend
// Then add RESEND_API_KEY to your .env.local file
// Get your API key from https://resend.com

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Alle velden zijn verplicht" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // Send email using Resend
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "SHE Website <onboarding@resend.dev>", // Update with verified domain
        to: process.env.CONTACT_EMAIL || "info@she-is.nl",
        replyTo: email,
        subject: `Nieuw contactbericht van ${name}`,
        html: `
          <h2>Nieuw bericht via de website</h2>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Bericht:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } else {
      // Log to console if Resend is not configured (for development)
      console.log("=== New Contact Form Submission ===");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);
      console.log("===================================");
      console.log(
        "Note: Set RESEND_API_KEY in .env.local to enable email sending"
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het versturen" },
      { status: 500 }
    );
  }
}
