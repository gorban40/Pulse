//Modal
$(document).ready(function(){
  $('[data-modal=consultation]').on('click',function() {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click',function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').on('click',function(){
    $('.overlay, #order').fadeIn('slow');
  });

  $('.button_mini').each(function(i){
    $(this).on('click',function(){
      $('#order .modal__descr').text($('.catalog-item__subtittle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  /* 

  .fadeOut(speed) --> + display: none. Убрать
                speed = slow,fast,милисекунды
  .fadeIn(speed) --> - displat: none. Доюавить

  .text() --> получать текст, или поместить текст

  */
});

const slider = tns({
  container: '.slider__inner',
  items: 1,
  speed: 1200,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false,
  mouseDrag: true,
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});

(function($) {
  $(function() {
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    function toggleSlide(item){
      $(item).each(function(i){
        $(this).on('click', function(e){
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
  
  });
    function validateForms(form){
      $(form).validate({
        rules:{
          name:{ 
            required:true,
            minlength: 2
          },
          phone: "required",
          email: {
            required:true,
            email:true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста введите имя",
            minlength: jQuery.validator.format("Введите {0} минимум символов")
          },
          phone: "Пожалуйста введите телефон",
          email:{
          required:"Пожалуйста введите email",
          email: "Неправильно введена почта"
          }
        }
        /* 
        rules: --> правила для inputa вывода ошибки или необходимости в точности
        */
      });
    };
    validateForms('#order form');
    validateForms('#consultation form');
    validateForms('#consultation-form');
    /* 
    .validate() --> валидация(необходимость заолнить файлы
    */

    $('input[name=phone]').mask("+38(999)999-99-99");

    $('form').submit(function(e) {
      e.preventDefault();
      if (!$(this).valid()){
        return;
      }
      $.ajax({
          type: 'POST',
          url: 'mailer/smart.php',
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
      });
      return false;
  });
    /* 
    .submit() --> подтверждаться, все условия выполнены

    e.preventDefault() --> отмена стандартного поведения браузера

    .ajax()--> отправить объект

    url: "mailer/smart.php", --> настройка, выбор обработки

    data: $(this) --> какие именно данные будут отправляться

    .serialize() --> обработка данных

    .done() --> когда операция выполнена
    */

    //SCROLL and PAGEUP

    $(window).scroll(function(){
      if ($(this).scrollTop()> 1600){   /* -----> появление и уберание стрелки  */
        $('.pageup').fadeIn();
      }else{
        $('.pageup').fadeOut();
      }
    });

    /* 
    
    window --> всё окно

    .scrollTop --> Макс занчение скролла
    
    */

    $("a[href^='#']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    /* 
    
    .attr()--> атрибут
    
    */

    new WOW().init();


})(jQuery);