import { EmailMessage } from "../../types";
import nodemailer from "nodemailer";

/**
 * @class mailService
 * @classdesc service for sending emails
 */
class MailService {
	/**
	 * @description create and configure a nodemailer transporter
	 *
	 * @returns {Object} Transporter
	 */
	private configureTranspoter(): nodemailer.Transporter {
		const serviceEmail = process.env.SERVICE_EMAIL as string;
		const servicePass = process.env.SERVICE_PASSWORD as string;

		return nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: serviceEmail,
				pass: servicePass
			}
		});
	}

	/**
	 * @description sends the given message with the configured transporter
	 *
	 * @param message {EmailMessage} message to be sent with transporter
	 * @returns {Promise<boolean>} boolean represents the success of the sendin process
	 */
	async sendMail(message: EmailMessage): Promise<boolean> {
		const transporter = this.configureTranspoter();

		await transporter.sendMail(message, (error, info) => {
			console.log(info);
			console.log(error);
			if (error) throw new Error("Sending mail failed");
			return false;
		});
		return true;
	}
}

const mailService = new MailService();

export { mailService };
