
var express = require('express');
var router = express.Router();

function isAuthentificated(req,res,next){
    if(req.session && req.session.user){
        next();
    }else{
        req.flash('errorMessage',"Please log in to access the page.");
        res.redirect("/login");
    }
}

const isLoggedOut=(req,res,next)=>{
   if(req.session && req.session.user){
    res.redirect("/");
   }else{
    next();
   }
}


const credential = {
    email: "devikrishna1234@gmail.com",
    password: "devikrishna123"
}

router.get("/login",isLoggedOut,(req,res)=>{
    const locals={
        title:'Login System'
    }
    res.render('login',{
        locals,
        errorMessage:req.flash("errorMessage"),
        successMessage:req.flash("successMessage")
    });
});

router.post("/login",(req,res)=>{
    if(req.body){
        const {email,password}=req.body;
        if(email=== credential.email){
            if(password===credential.password){
                req.flash("successMessage","you have successfully logged in.");
                req.session.user=email;
                res.redirect("/");
            }
        }else{
            req.flash("errorMessage","Invalid Email.");
            res.redirect("/login");
        }
    }else{
        req.flash("errorMessage","Please enter email and password");
        res.redirect("/login");
    }
});


router.get('/logout', (req, res) => {
   req.flash("successMessage","You have been Logged out.")
    req.session.destroy();
    req.redirect("/login");
});

router.get("/",isAuthentificated,(req,res)=>{
    const locals={
        title:'Home page'
    }
    res.render("index",{
        locals,
        successMessage:req.flash("successMessage"),
        user:req.session.user
    });
});


module.exports = router;