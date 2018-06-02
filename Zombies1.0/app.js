var http = require('http');
var path=require('path');
var express=require('express');
var logger=require('morgan');
var bodyParser=require('body-parser');

var app=express();

app.use(express.static(path.resolve(__dirname,"public")));
app.set('views',path.resolve(__dirname,'views'));
app.set('view engine','ejs');
var entries=[];
app.locals.entries=entries;

app.get('/',(request,response)=>response.render('index'));
app.get('/zombie',(request,response)=>response.render('zombie'));
app.get('/victims2',(request,response)=>response.render('victims2'));
app.get('/weapons',(request,response)=>response.render('weapons'));
app.get('/victims',(request,response)=>response.render('victims'));
app.get('/register',(request,response)=>response.render('register'));
app.post('/register',(request,response)=>{
if(!request.body.nombre||!request.body.direccion||!request.body.tel||!request.body.instagram){
    response.status(400).render('400');
    return;
}
entries.push({
    nombre:request.body.nombre,
    direccion:request.body.direccion,
    tel:request.body.tel,
    instagram:request.body.instagram
});
response.redirect('/');
});
app.use((request, response)=>response.status(404).render('404'));

http.createServer(app).listen(3000);