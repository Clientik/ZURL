﻿ /*
  ---------------------------------------------
 Валидация формы

  ---------------------------------------------
   */
    var id=0;
    var status=0;
    var email, form, message;
    form = $('#subscribe-form');
    message = $('.subscribe-form-info');
    email = $('#subscribe-form-email');
    statusload=$('.status');
    imgload=$('.gifimg');
    btn_load=$('.btn_load');
    btn_exit=$('.btn_exit');
  function sendurl() {
    /*message.html('<p class="bg-success"><i class="mdi mdi-checkbox-marked-circle-outline"></i> ЛУПА СМОТРЕЛА ЗА ЛУПУ</p>')
      output = '<p class="bg-success"><i class="mdi mdi-checkbox-marked-circle-outline"></i> ' + data.text + '</p>';
      output = '<p class="bg-danger"><i class="mdi mdi-close-circle-outline"></i> ' + data.text + '</p>';
      output = '<p class="bg-load"><i class="mdi mdi-information-outline"></i> ' + data.text + '</p>';
    */
     isUrlValid(email.val());
       };
function isUrlValid(userInput) {
/* var res = userInput.match(/(http[s]?:\/\/)?([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2}(\/([-~%\.\(\)\w\d]*\/*)*(#[-\w\d]+)*?)/g);
    if(res == null){
    */
     var str = "/";
     if(!str.localeCompare(userInput.slice(-1))==0){
     	userInput=userInput+"/";
     	console.log(userInput);
     }    
     var RegExp = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

    if(!RegExp.test(userInput)){
         email.parent().addClass('has-error');
    }else{
        $. ajax({
            url: '/create',
            type: 'POST' ,
            timeout: 600000,
            dataType:   'json',
            retryInterval : 500000,
            data: {url:userInput},
            success: function(data){
            if(data.success){
                //console.log('eboy');
                id=data.id;
                console.log(id);
                showstart();
                start(id);
            } else {
             statusload.html('<p class="bg-danger"><i class="mdi mdi-close-circle-outline"></i>'+data.error+'</p>');
		$(".gifimg").hide(500); 
    returnr();         
 // $container.html('Возникла проблема.' );
            }
            },
            error: function(jqXHR,textStatus,errorThrown){
              console.log(textStatus+'-'+errorThrown);
               if(textStatus==="timeout"){
                     alert("Время на обработку истекло.Перезапустите страницу");
             }else{
                       statusload.html('<p class="bg-danger"><i class="mdi mdi-close-circle-outline"></i>ОШИБКА ОЖИДАНИЯ</p>');
                            $(".gifimg").hide(500);
                            $(".greeting-message").text("К сожалению данный сайт обработать невозможно.Повторите попытку позже")

                    //                      alert("В ходе оработки возникла ошибка.Перезапустите страницу");
               }
           // $container.html('Возникла проблема.' );
            }
            });
           return true;
        }

      };
      function start(ids){
      $. ajax({
        url: '/start',
        type: 'POST' ,
        timeout: 600000,
        dataType:   'json',
        retryInterval : 500000,
        data: {id:ids},
        success: function(data){
        if(data.success){
            console.log(data);
            status=1;
        } else {
          console.log(data.desc);
          returnr();
          error(data.desc);
        }
        },
        error: function(jqXHR,textStatus,errorThrown){
          console.log(textStatus+'-'+errorThrown);
           if(textStatus==="timeout"){
                 alert("Время на обработку истекло.Перезапустите страницу");
         }else{
                  
           }
       // $container.html('Возникла проблема.' );
        }
        });
      }
      /* statusload.html('<p class="bg-success"><i class="mdi mdi-checkbox-marked-circle-outline"></i>УСПЕШНО');
                console.log(data.url);
                $(".gifimg").hide(500);
                btn_load.html('<a href="'+data.url+'"><button type="button" name="submit" id="subscribe-form-submit">СКАЧАТЬ</a>');
                $(".greeting-message").text("Архив с копией сайта готов.Нажмите кнопку скачать.")
                */
      function returning(){
        email.parent().removeClass('has-error');
                $("#subscribe-form").show(500);
                $(".greeting-subheader").show(500);
                $(".greeting-message").text("ПРОДОЛЖИМ НАЧАТОЕ")
                $(".gifload").hide(500);
                statusload.hide(500);
                btn_load.html('');
                btn_exit.html('');

                //statusload.html('<p class="bg-load"><i class="mdi mdi-information-outline"></i>ОБРАБОТКА');

      }
      function returnr(){
        btn_exit.html('<a><button onclick="returning()" type="button" name="submit" id="subscribe-form-submit">НАЗАД</a>');
      }
      function error(mess){
        statusload.html('<p class="bg-danger"><i class="mdi mdi-close-circle-outline"></i>'+mess+'</p>');
        $(".gifimg").hide(500);
        $(".greeting-message").text("Произошла ошибка.Повторите попытку.");
         returnr();
      }
      function showstart(){
                email.parent().removeClass('has-error');
                $("#subscribe-form").hide(500);
                $(".greeting-subheader").hide(500);
                $(".greeting-message").text("Сейчас ваша ссылка обрабытвается.Обработка сайта может занять от 1 до 5 минут в зависимости от структуры скачиваемого сайта.")
                $(".gifload").show(500);
                $('.gifimg').show(500);
                statusload.show(500);
                statusload.html('<p class="bg-load"><i class="mdi mdi-information-outline"></i>ОБРАБОТКА');
      }
      var timerId = setInterval(function() {
       if(!id==0&&!status==0){
        $. ajax({
          url: '/check',
          type: 'POST' ,
          timeout: 600000,
          dataType:   'json',
          retryInterval : 500000,
          data: {hash:id},
          success: function(data){
          if(data.success){
            statusload.html('<p class="bg-success"><i class="mdi mdi-checkbox-marked-circle-outline"></i>УСПЕШНО');
            console.log(data.url);
            $(".gifimg").hide(500);
            btn_load.html('<a href="'+data.url+'"><button type="button" name="submit" id="subscribe-form-submit">СКАЧАТЬ</a>');
            $(".greeting-message").text("Архив с копией сайта готов.Нажмите кнопку скачать.");
            status=0;
            id=0;
            returnr();
          } else {
            console.log(data.desc);
            if(data.status==2){
            error(data.desc);
            status=0;
            id=0;
            returnr();
            }
            if(data.status==3){
            error(data.desc);
            status=0;
            id=0;
            returnr();
            }
          }
          },
          error: function(jqXHR,textStatus,errorThrown){
            console.log(textStatus+'-'+errorThrown);
             if(textStatus==="timeout"){
                   alert("Время на обработку истекло.Перезапустите страницу");
                   returnr();
           }else{
                    
             }
         // $container.html('Возникла проблема.' );
          }
          });
        }
      }, 5000);
