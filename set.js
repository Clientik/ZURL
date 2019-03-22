
////////////////////БАЗА ДАННЫХ///////////////
const { Pool } = require('pg')
const pool = new Pool({
  user: 'zurl',
  host: '80.250.183.237',
  database: 'zurl',
  password: '',
})
//////////////
var scrape = require('website-scraper');
var zipFolder = require('zip-folder');
const phantomHtml = require('website-scraper-phantom');
module.exports.options = {
      urls: [''],
  directory: 'save',
  maxRecursiveDepth: 1,
recursive: true,
httpResponseHandler: phantomHtml,
  sources: [
    {selector: 'img', attr: 'src'},
    {selector: 'link[rel="stylesheet"]', attr: 'href'},
    {selector: 'script', attr: 'src'}
  ]
  };
  module.exports.getzip=function(file) {

    zipFolder('saved/'+file+'/', 'public/files/'+file+'.zip', function(err) {
        if(err) {
          pool.query('UPDATE hash SET status = 2 WHERE hash = $1',
          [file])
          .then((res) => console.log('База данных для файла '+file+' обновлена и присвоен статус 2(НЕУДАЧА)')) 
          .catch(err => console.log('Error executing query'+err.stack))
        } else {
          pool.query('UPDATE hash SET status = 1 WHERE hash = $1',
          [file])
          .then((res) => console.log('База данных для файла '+file+' обновлена и присвоен статус 1(УСПЕШНО)')) 
          .catch(err => console.log('Error executing query'+err.stack))
         // console.log('УПАКОВКА '+file+' прошла успешна');
        }
    });
  }
  module.exports.addhash=function(sha,ip,url,unix) {  //Промис
    return new Promise(function(resolve,reject) {
      pool.query('INSERT INTO hash(hash,ip,status,time,url) values($1, $2,$3,$4,$5)',
      [sha,ip,'0',unix,url])
      .then((res) => resolve(sha)) 
      .catch(err => reject('Error executing query'+err.stack))
  });              
  }
  module.exports.checkhash=function(sha,ip) {  //Промис
    return new Promise(function(resolve,reject) {
      pool.query('SELECT * FROM hash WHERE hash=$1 AND ip=$2',
      [sha,ip])
      .then((res) => resolve(res.rows[0])) 
      .catch(err => reject('Error executing query'+err.stack))
  });              
  }
  module.exports.starthash=function(sha,ip) {  //Промис
    return new Promise(function(resolve,reject) {
      pool.query('SELECT * FROM hash WHERE hash=$1 AND ip=$2',
      [sha,ip])
      .then((res) => {
        if(res.rows[0]){
          if(res.rows[0].status==0){
         resolve({success:true,url:res.rows[0].url});
        }else{
          resolve({success:false, desc:"ДАННЫЙ ФАЙЛ УЖЕ В ОБРАБОТКЕ"});
        }
        }else{
         resolve({success:false, desc:"ДАННЫЕ О СЕССИИ НЕ НАЙДЕНЫ"});
        }
     }).catch((err) => {
         console.log(err)
            reject('Ошибка');
        });
      });              
    }
    module.exports.errsetstatus=function(sha) {  //Промис
      pool.query('UPDATE hash SET status = 2 WHERE hash = $1',
                [sha])
                .then((res) => console.log('База данных для файла '+file+' обновлена и присвоен статус 2(НЕУДАЧА)')) 
                .catch(err => console.log('Error executing query'+err.stack)) 
      }

 

