// Модуль связаться со мной 
var contacts = (function (){

	var init = function(){
				console.log('Инициализация модуля contact');
				_setUpListners();
			},
			_setUpListners = function (){
				$('#contact-form').on('submit', _submitForm);
			},
			_submitForm = function (ev) {
	      console.log('Работаем с формой связи');

	      ev.preventDefault();

	      var form = $(this),          
	          url = '/send_mail.php',
	          defObject = _ajaxForm(form, url);

	      if (defObject) {
	        defObject.done(function(ans) {
	          var mes = ans.mes,
	              status = ans.status;

	          if ( status === 'OK'){
	            form.trigger('reset');
	            form.find('.success-mes').text(mes).show();           
	          } else{
	            form.find('.error-mes').text(mes).show();
	          }
	        });
	      }
	    },
	    _ajaxForm = function (form, url) {
      
	      if (!validation.validateForm(form)) return false; 
	      var data = form.serialize();

	      return $.ajax({ // Возвращает Deferred Object
	        type: 'POST',
	        url: url,
	        dataType : 'JSON',
	        data: data
	      }).fail( function(ans) {
	        console.log('Проблемы в PHP');
	        form.find('.error-mes').text('На сервере произошла ошибка').show();
	      });
	    };   

	return {
		init: init
	};

})();

contacts.init();

