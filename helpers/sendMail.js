import User from "@/models/user";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }
    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        passwordResetToken: hashedToken,
        resetTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      // host: "sandbox.smtp.mailtrap.io",
      // port: 2525,
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: "aizaz.0938@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Confirm your email" : "Reset your password",
      html: ` <p>
        Click <a href=http://localhost:3000/${
          emailType === "VERIFY" ? "verifymail" : "resetPassword"
        }?token=${hashedToken} >here</a>
        to ${emailType === "VERIFY" ? "verify" : "reset"} your ${
        emailType === "VERIFY" ? "mail" : "password"
      }!
      or copy and paste the below url <br/>
        </p> 
        <br/>
        <p>
        This link will expire with in 1 hour so please sure to handle your work
        with in one hour.
        <br/>
        otherwise you will submit new request for fresh link
        </p>
        
        http://localhost:3000/${
          emailType === "VERIFY" ? "verifymail" : "resetPassword"
        }?token=${hashedToken}
        <br/>
        <br/>
        <h3 style={{color:green}} >CEO Azaz ali:✔</h3>
        
        `,
    };

    const mailResponse = await transport.sendMail(mailOption);

    return mailResponse;
  } catch (error) {
    console.log("Error", error.message);
  }
};
