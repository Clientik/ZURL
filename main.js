//Подключение модулей
const phantomHtml = require('website-scraper-phantom');
var set = require("./set.js");
var scrape = require('website-scraper');
var express = require('express');
var sha1 = require('sha1');
var fs = require('fs');
var bodyParser = require('body-parser');
var timeout = require('connect-timeout');
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });// Установка механизма представления handlebars
var app = express();
//Настройка хоста и представлений
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 2844); //Порт хоста
//Маршрутизация
app.use(express.static(__dirname + '/public'));//Обьявление папки с статистическими ресурсами
//
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'ЫЫЫ');
  });
  app.use(require('body-parser').urlencoded({ extended: true }));//Использование промежуточного ПО body-parser
///////
app.get('/', function(req, res) {
    res.render('home');
   });
   app.post('/check', function(req, res) {
    var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    var sha=req.body.hash;
    set.checkhash(sha,ip).then((result) => {
      if(result){
      if(result.status==0) res.send({ success: false,desc:'ФАЙЛ ЕЩЕ ОБРАБАТЫВАЕТСЯ',status:0});
      if(result.status==1) res.send({ success: true,url:'files/'+sha+'.zip'});
      if(result.status==2) res.send({ success: false,desc:'ОШИБКА ОБРАБОТКИ',status:2});
      }else{
        res.send({ success: false,desc:'ОШИБКА СЕССИИ',status:3});
      }
     }).catch((err) => {
       console.log(err)
       res.send({ error:'ОШИБКА СИСТЕМЫ' });
     });
   });
   app.post('/start', function(req, res) {
    var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    var sha=req.body.id;
    set.starthash(sha,ip).then((result) => {
      res.send(result);
      console.log('ОБРАБОТКА '+sha);
      var opt= set.options;
      opt.urls=[result.url];
      opt.directory='saved/'+sha;
      console.log(opt);
      scrape(opt).then((result) => {
          if(result[0].saved){ 
           set.getzip(sha);
               }else{
            set.errsetstatus(sha);
    }
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
      //
     });
   });
   
   app.post('/create', function(req, res){
    var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    var url=req.body.url;
    var unix = parseInt(new Date().getTime()/1000);
    var sha = sha1(unix+':'+ip);
    set.addhash(sha,ip,url,unix).then((result) => {
           res.send({ success: true,id:result});
          }).catch((err) => {
            console.log(err)
            res.send({ error:'ОШИБКА СИСТЕМЫ' });
          });
   });
   // пользовательская страница 404
   app.use(function(req, res, next){
    res.type('text/plain');
    res.status(404);
    res.send('404 — Не найдено');
   });

// пользовательская страница 500
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.type('text/plain');
 res.status(500);
 res.send('500 — Ошибка сервера');
});

app.listen(app.get('port'), function(){
 console.log( 'Express запущен на http://localhost:' +
 app.get('port') + '; нажмите Ctrl+C для завершения.' );
});
