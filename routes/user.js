const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../models/user');

router.post('/register', async (req, res)=>{
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({ msg: 'Input all fields' });
    }   

    const findUser = await User.find({ email: email });
    if(findUser.length > 0) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
        username: username,
        email: email,
        password: password             
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    newUser.password = hashedPassword;
    
    const token = jwt.sign({id: newUser._id }, process.env.TOKEN_SECRET, {expiresIn: 3600});

    const saveUser = await newUser.save();

    res.json({ 
        token, 
        user: {
            id: saveUser._id,
            name: saveUser.username,
            email: saveUser.email
        }
        });
});

router.post('/login', async (req, res)=>{
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: 'Input all fields' });
    }

    const user = await User.findOne({email: email});
    if(!user) return res.status(400).json({msg: 'User does not exist'});

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) return res.status(400).json({msg: 'Invalid credentials'});

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {expiresIn: 3600});

    res.json({ 
        token,
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        }
     });
});

//get the current user's data
router.get('/', auth, async(req, res)=>{
    const getUser = await User.findById(req.user.id);
    res.json(getUser);
});

module.exports = router;