import { mongooseConnect } from '@/lib/mongoose';
import { Madrasa } from '@/models/Madrasa';
import { compare } from 'bcrypt';

export default async function handler(req, res) {
    await mongooseConnect();
    const {method} =req;
  if (method === 'POST') {
    const { username, password } = req.body;

    // Retrieve user from the database
    const user = await Madrasa.findOne({username:username });
    const madrasa=user.madrasa
    // Check if the user exists and the password is correct
    if (!user || !(await compare(password, user.password))) {
      return res.status(200).json({ message: 'Invalid credentials.' });
    }

    // Set a session cookie
    res.setHeader(
      'Set-Cookie',
      `session=${encodeURIComponent(JSON.stringify({ username:madrasa }))}; HttpOnly; Path=/`
    );

    res.status(200).json({ message: 'Login successful.' });
  } else {
    res.status(200).json({ message: 'Method not allowed.' });
  }
}
