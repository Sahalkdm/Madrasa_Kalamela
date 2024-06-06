import nodemailer from 'nodemailer'
import { mongooseConnect } from '@/lib/mongoose';
import { Contact } from '@/models/Contact';

export default async function handler(req, res) {
    await mongooseConnect();
    const {method} =req;
    
    if(method==="POST"){
        const {email,phone, subject, message}=req.body;
        await Contact.create({email,phone, subject, message})
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'sahalkdm@gmail.com',
        pass: '#######',
      },
      tls: {rejectUnauthorized: false}
    });
    const mailData = {
      from: 'sahalkdm@gmail.com',
      to: 'sahalkdm@gmail.com',
      subject:"OurFest Message : "+ subject,
      text: message + " | Sent from: " + email,
      html: `<div>${message}</div><p>Sent from:
      ${email}</p>`
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info)
    })
    console.log(req.body);
    res.json(true);
    }
}
