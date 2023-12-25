const express=require('express');
const session=require('express-session');
const flash = require('connect-flash');
const nocache=require('nocache');
const bodyparser=require('body-parser');
const expressLayouts=require('express-ejs-layouts');
const path=require('path');

const router=require('./router');
const app=express();

const port=process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use(expressLayouts);
app.set('layout','./layout/indexLayouts.ejs');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))



app.use(session({
    secret:'your-secret-key',
    resave:false,
    saveUninitialized:false
}));


app.use(flash());
app.use(nocache());

app.use('/',router);

app.use((req,res,next)=>{
    res.locals.successMessage=req.flash('successMessage');
    res.locals.errorMessage=req.flash('errorMessage');
});

app.listen(port,()=>{console.log("listening to the server on http://localhost:3000")});
