$(function(){

  function buildHTML(message){
    if ( message.content && message.image ) {
      var html =`<div class="message-list" data-message-id= ${message.id} >
        <div class="message-list__info">
          <div class="message-list__info__user-name">
            ${message.user_name}
          </div>
          <div class="message-list__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img src= ${message.image} class="lower-message__image" >
        </div>
       </div>` 
    } else if (message.content) {
      var html =`<div class="message-list" data-message-id= ${message.id} >
        <div class="message-list__info">
          <div class="message-list__info__user-name">
            ${message.user_name}
          </div>
          <div class="message-list__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>` 
    } else if (message.image) {
      var html =`<div class="message-list" data-message-id= ${message.id} >
        <div class="message-list__info">
          <div class="message-list__info__user-name">
            ${message.user_name}
          </div>
          <div class="message-list__info__date">
            ${message.created_at} 
          </div>
        </div>
        <div class="message-list__text">
          <img src= ${message.image} class="lower-message__image" >
        </div>
      </div>` 
    };
    return html;
  };

  var reloadMessages = function() {
    last_message_id = $('.message-list:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-lists').append(insertHTML);
        $('.message-lists').animate({ scrollTop: $('.message-lists')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  $('#new_message').on('submit', function(e){

    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.message-lists').append(html);
        $('.message-lists').animate({ scrollTop: $('.message-lists')[0].scrollHeight});
        $('form')[0].reset();
        $('.form__submit').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
        // $('.form__submit').prop('disabled', false);
    });

  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});