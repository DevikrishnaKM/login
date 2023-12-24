
var express = require('express');
var router = express.Router();

const credential = {
    email: "devikrishna1234@gmail.com",
    password: "devikrishna123"
}

router.post('/login', (req, res) => {
    console.log("Entered Email:", req.body.email);
    console.log("Entered Password:", req.body.password);

    if (req.body.email === credential.email && req.body.password === credential.password) {
        console.log("Credentials Matched");
        req.session.user = req.body.email;
        req.session.user=req.body.password;
        res.redirect('/route/dashboard');
    } else {
        console.log("Invalid Credentials");
        req.session.user
        res.redirect("/");
       
    }
});


//route for dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    } else {
        res.send("Unauthorize User")
    }
})

router.get('/logout', (req, res) => {
    console.log("Attempting to destroy session...");
    req.session.destroy(function (err) {
        if (err) {
            console.log("Error destroying session:", err);
            res.send("Error");
        } else {
            console.log("Session destroyed successfully.");
            res.render('base', { title: "Express", logout: "Logout successfully!" });
        }
    });
    
});


module.exports = router;