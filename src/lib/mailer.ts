import nodemailer from "nodemailer";

// Validate required environment variables
const requiredEnvVars = ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_USER", "EMAIL_PASS"];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error("Email configuration is missing in environment variables");
    }
});

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email?token=${token}`;

    const mailOptions = {
        from: `"VERIDUS" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your VERIDUS Account",
        text: `
Welcome to VERIDUS

Verify your account:
${verificationUrl}

This link expires in 15 minutes.
`,
        html: `
            <div style="font-family:Arial;padding:24px;">
                <h2>Verify your VERIDUS Account</h2>
                <p>Please verify your email to activate your account.</p>
                <p>
                    <a href="${verificationUrl}" 
                       style="display:inline-block; 
                       background:#0070f3; 
                       color:#ffffff; 
                       padding:12px 20px; 
                       border-radius:6px; 
                       text-decoration:none; 
                       font-weight:600;">
                       Verify Email
                    </a>
                </p>
                <p style="font-size:13px;color:#666;">
                    Link expires in 15 minutes.
                </p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};
