import nodemailer from "nodemailer";
import { EmailMessage } from "../types";

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
	 * @returns {Promise<boolean>} boolean represents the success of the email sending process
	 */
	async sendMail(message: EmailMessage): Promise<boolean> {
		const transporter = this.configureTranspoter();

		let success: boolean = await transporter
			.sendMail(message)
			.catch((err) => {
				// Error happens and success stays undefined
				console.log(err);
			});

		if (success === undefined) success = false;
		else success = true;

		return success;
	}
}

const mailService = new MailService();

export { mailService };
