var Android = {
getUser : function() {
  return 'abc' ;
} ,
getPass : function() {
  return '123';
}

}


function _(x) {return document.querySelector(x);}
var base = 'http://frequency-dz.com/api/menumax/2.0/';
// var moment = moment();
moment.locale('fr');




$(function(){
mmx.init();
});

var mmx = {
  userName : Android.getUser ,
  passWord : Android.getPass ,
  init : function(){
    document.querySelector('.username').focus();

  },
  Disconnect : function(){
mmx.closeInfos();
document.querySelector('.username').value = "";
document.querySelector('.username').focus();
document.querySelector('.password').value = "";

  } ,
  connect : function(){
    mmx.userName = document.querySelector('.username').value ,
   mmx.passWord = document.querySelector('.password').value ;
   if (mmx.userName.length > 2 && mmx.passWord.length > 2) {

     $.ajax({
         type: 'GET',
         url: base+'login.php',
         crossDomain: true,
         data: {'login':mmx.userName ,'password':mmx.passWord},
         dataType: 'text',
         success: function(responseData, textStatus, jqXHR) {
              console.log(responseData);
              if (responseData !== '') {
                var data = responseData.split(';;')[0];
                console.log(data);
                mmx.loginSuccess(mmx.userName,data);

              } else {
                mmx.failed();

              }
         },
         error: function (responseData, textStatus, errorThrown) {
          //   alert(textStatus);
          mmx.failed();
         }
     });


   }
 } ,
 failed : function(){
// document.querySelector('.username').value = '';
document.querySelector('.password').value = '';
document.querySelector('.login').classList.remove('btn-warning');
document.querySelector('.login').classList.add('btn-danger');

window.setTimeout(function(){
  document.querySelector('.login').classList.add('btn-warning');
  document.querySelector('.login').classList.remove('btn-danger');

},1500);


 } ,
 loginSuccess : function(user,file) {
   $.ajax({
       type: 'GET',
       url: base+'get.php',
       crossDomain: true,
       data: {'user':user ,'file':file,'callback':'x'},
       dataType: 'json',
       success: function(responseData, textStatus, jqXHR) {
          //  console.log(responseData);
           mmx.showData(responseData);
           mmx.openInfos();

       },
       error: function (responseData, textStatus, errorThrown) {
          console.log(errorThrown);
          // console.log(responseData.responseText);
        //mmx.failed();
       }
   });
 } ,
 openInfos : function(){
   _('.mainInfos').classList.add('show');
 } ,
 closeInfos : function(){
   _('.mainInfos').classList.remove('show');
 },
 showData : function(d){
console.log(d);
var mmnt = moment(d.infos.now , "YYYY-MM-DD HH:mm").fromNow();

_('.fromNow').innerText = mmnt;
_('.mname').innerText = d.infos.Cname;
_('.madress').innerText = d.infos.Cadress;



 }


} ;


var Acounter = {
  today : function(d) {

  }
}
