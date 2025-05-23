import {createTransport} from "nodemailer";

// Original Mailtrap implementation
export const sendMail = async(userMessage) => {
    console.log("Using Mailtrap for email sending...");
    
    try {
        const transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            },
            secure: false,
        });
        
        const info = await transporter.sendMail({
            subject: "CONTACT REQUEST FROM PORTFOLIO", 
            to: process.env.MYMAIL, 
            from: process.env.MYMAIL, 
            text: userMessage
        });
        
        console.log("Email sent successfully via Mailtrap:", info.messageId);
        return info;
    } catch (error) {
        console.error("Mailtrap email sending failed:", error);
        throw error;
    }
}

// Alternative implementation using Gmail
export const sendMailGmail = async(userMessage) => {
    console.log("Using Gmail for email sending...");
    
    try {
        // Create Gmail transporter
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'your-email@gmail.com', // Add this to your .env
                pass: process.env.GMAIL_PASS || 'your-app-password'     // Add this to your .env
            }
        });
        
        const info = await transporter.sendMail({
            subject: "CONTACT REQUEST FROM PORTFOLIO", 
            to: process.env.MYMAIL, 
            from: process.env.GMAIL_USER || process.env.MYMAIL, // Gmail requires the from address to be your Gmail
            text: userMessage
        });
        
        console.log("Email sent successfully via Gmail:", info.messageId);
        return info;
    } catch (error) {
        console.error("Gmail email sending failed:", error);
        throw error;
    }
}

// Simple logging implementation (no actual email sent)
export const logMessageOnly = async(userMessage) => {
    console.log("CONTACT FORM SUBMISSION (Email not sent):");
    console.log("----------------------------------------");
    console.log(userMessage);
    console.log("----------------------------------------");
    
    // Return a fake success response
    return {
        messageId: `dummy-${Date.now()}`,
        response: "250 Message accepted"
    };
}
