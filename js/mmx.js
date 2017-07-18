var Android = {
getUser : function() {
  return 'abc' ;
} ,
getPass : function() {
  return '123';
}

}







$(function(){
mmx.init();
});

var mmx = {
  useName : Android.getUser ,
  passWord : Android.getPass ,
  init : function(){

  },
  Disconnect : function(){

  } ,
  connect : function(){
    var user = Document.querySelector('.username').value ,
   pass = Document.querySelector('.password').value ;

  }
}
