var Android = {
getUser : function() {
  return 'abc' ;
} ,
getPass : function() {
  return '123';
}

}

function mf(str) {str += '';return parseFloat(str.replace(',','.').replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ',''));}
function fm(Money) {return parseFloat(Money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');}

function _(x) {return document.querySelector(x);}
var base = 'http://frequency-dz.com/api/menumax/2.0/';
// var moment = moment();
moment.locale('fr');




$(function(){
mmx.init();
});

var mmx = {
  logged : false,
  currentFile : '' ,
  userName : Android.getUser ,
  passWord : Android.getPass ,
  init : function(){
    document.querySelector('.username').focus();

  },
  Disconnect : function(){
    mmx.logged = false;
    mmx.currentFile = '' ;
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
   mmx.logged = true;
   mmx.userName = user;
   mmx.currentFile = file;
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
var sales = d.vents;
Acounter.today(sales);
Acounter.yesterday(sales);
Acounter.thisWeek(sales);
Acounter.lastWeek(sales);
var up = moment(d.infos.now , "YYYY-MM-DD HH:mm"),
mmnt = up.fromNow(),
diff = moment().diff(up ,'minutes');

_('.fromNow').innerText = mmnt;
_('.mname').innerText = d.infos.Cname.toUpperCase();
_('.madress').innerText = d.infos.Cadress;

_('.onoff').classList.remove('blink');
if (diff > 20) {
_('.onoff').classList.remove('on');
_('.status').innerText = 'Hors ligne';
// window.setTimeout(function(){_('.screen').classList.add('full');},1000)
} else {
  _('.status').innerText = 'En ligne';
  _('.onoff').classList.add('on');
}



 }


} ;


var Acounter = {
  today : function(d) {
    var today = moment().format("YYYYMMDD");

    var res = 0;
    if (d[today] ) res = d[today].val;
    _('.recette').innerText = fm(res);

  } ,
  yesterday: function(d){
    var yest = moment().add(-1, 'days').format("YYYYMMDD") ,res = 0;
    if (d[yest] ) res = d[yest].val;
    _('[hier]').innerText = fm(res);
  },
  thisWeek : function(d){
    var lastw = moment().add(-6 ,'days').format("YYYYMMDD"),
    tod = moment().format("YYYYMMDD"),
    res = 0;

for (k in d) {
if (mf(k) >= lastw && mf(k) <= tod) res += mf(d[k].val);
}
_('[cettesemaine]').innerText = fm(res);
  } ,
  lastWeek : function(d){
    var lastw = moment().add(-13 ,'days').format("YYYYMMDD"),
    tod = moment().add(-7 ,'days').format("YYYYMMDD"),
    res = 0;
for (k in d) {
if (mf(k) >= lastw && mf(k) <= tod) res += mf(d[k].val);
}
_('[semainepasse]').innerText = fm(res);
  }

}

function intrev(){
if (mmx.logged) {
  _('.onoff').classList.remove('on');
  _('.onoff').classList.add('blink');
  mmx.loginSuccess(mmx.userName , mmx.currentFile);

}
window.setTimeout(intrev,60000);
}

intrev();
