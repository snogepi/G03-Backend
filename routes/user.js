import express from 'express';

import { staffRegister, studentRegister, staffLogin, studentLogin } from '../controllers/user.js'
import { forgotPassword, resetPassword } from '../controllers/password.js';

const router = express.Router()

router.post('/studentregistration', async (req, res) => {
    const isAdded = await studentRegister(req.body)
    res.json({ isAdded })
})

router.post('/staffregistration', async (req, res) => {
    const isAdded = await staffRegister(req.body)
    res.json({ isAdded })
})

router.post('/studentlogin', async (req, res) => {
    const result = await studentLogin(req.body)
    res.json(result)
})

router.post('/stafflogin', async (req, res) => {
    const result = await staffLogin(req.body)
    res.json(result)
})

router.post('/forgotpassword', forgotPassword);

router.post('/resetpassword', resetPassword);

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await StudentModel.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', (req, res) => {
    res.json({ message: 'Pending PUT /user implementation' })
})

router.delete('/:id', (req, res) => {
    res.json({ message: 'Pending DELETE /user implementation' })
})

export { router as userRoutes };