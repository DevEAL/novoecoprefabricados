$(document).ready(function(){

  $('.quote .nav-link').mouseenter(function(){
    $('.cot-box').css('display','block');
    function show(){
      $('.cot-box').addClass("toogle-box");
    } setTimeout(show,100);
  })
  .mouseleave(function(){
    $('.cot-box').removeClass("toogle-box");
    function show(){
      $('.cot-box').css('display','none');
    } setTimeout(show,300);
  });

  $(window).scroll(function(){
      if($('.navbar').offset().top > 10){
        $('.navbar').addClass("nav-green");
        $('#logo-reciclados').attr('src','img/svg/reciclados-fullw.svg');
      } else {
        $('.navbar').removeClass("nav-green");
        $('#logo-reciclados').attr('src','img/svg/reciclados-wg-logo.svg');
      }
  });
    
})