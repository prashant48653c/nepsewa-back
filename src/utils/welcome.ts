// src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'acharyaprashant227@gmail.com', // Your Gmail account
        pass: process.env.APP_PASS
      }
    });
  }

  async sendWelcomeEmail(to: string, username: string, type: string = 'welcome'): Promise<void> {
    const templatePath = type === 'job' ? join(__dirname, '../../templates/jobalert.hbs') : join(__dirname, '../../templates/welcome.hbs')


    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);

    // Generate the email content
    const html = template({ userName: username });

    const mailOptions = {
      from: 'acharyaprashant227@gmail.com',
      to,
      subject: 'NepSewa ',
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
