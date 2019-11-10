import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    return res.json({
      token: user.generateToken(user.id),
      user: {
        id: user.id,
        name: user.userName,
        email: user.email,
      }
    });
  }
}

export default new SessionController();
