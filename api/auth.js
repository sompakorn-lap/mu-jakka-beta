const router = require('express').Router()

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if(username === 'admin' && password === '1234'){
        const authToken = (Buffer.from(JSON.stringify({ username, role: 'admin' }))).toString('base64')
        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ username, role: 'admin' })
    }
    else {
        res.status(401).json({ role: '' })
    }
})

router.delete('/logout', async (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    })
    res.status(200).json({ 'message': 'successful logout' })
})

router.get('/refresh', async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.authToken) return res.status(401).json({ role: '' })
    const authToken = JSON.parse(Buffer.from(cookies.authToken, 'base64').toString())
    const { username, role } = authToken
    if(role === 'admin'){
        return res.status(200).json({ username, role })
    }
    res.status(200).json({ role: '' })
})

module.exports = router