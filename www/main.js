$(function() {
  var polling_status     = 'Start',
      polling_interval   = 5000,
      previous_poll_data = [],
      poller;

  checkDBStatus();
  $('#polling-status').text(polling_status);
  $('.loading').hide();
  $('#server-error').hide();

  function checkDBStatus() {
    $.getJSON("/checkDBStatus", function(data) {
      if(data.db == 'ok') {
        getData();
      } else {
        $('#server-error').slideDown('ease');
        $('.polling-status-btn').prop('disabled', true);
      }
    });
  }

  function startStopPolling(status) {
    if( status == 'Start' ) {
      console.log('stopping polling');
      $('.loading').slideUp('ease');
      $('#polling-status').parent().removeClass('btn-danger');
      $('#polling-status').parent().addClass('btn-success');
      $('.main-container').removeClass('is-polling');
      clearInterval(poller);
    } else {
      console.log('starting polling');
      $('.loading').slideDown('ease');
      $('#polling-status').parent().removeClass('btn-success');
      $('#polling-status').parent().addClass('btn-danger');
      $('.main-container').addClass('is-polling');
      startPolling();
    }
  }

  function getData() {
    $.getJSON( "/getData", function( data ) {
      if(data.join('') != previous_poll_data.join('')) {
        $('#medList').children("tr").remove();
        buildMedList(data);
        previous_poll_data = data;
      }

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('getJSON request failed! ' + textStatus);
    });
  }

  function buildMedList(data) {
    var medList = '';
    data.forEach(function(val) {
      medList +=  '<tr>' +
                    '<td>' + val.data.drug + '</td>' +
                    '<td>' + val.data.quantity + '</td>' +
                    '<td>' + val.data.when + '</td>' +
                    '<td>' + val.dts + '</td>' +
                  '</tr>';
    });
    $('#medList').append(medList);
  }

  function startPolling() {
    poller = setInterval(function(){
      console.log("polling...");
      getData();
    }, polling_interval);
  }

  $('.polling-status-btn').on('click', function() {
    polling_status = ( $('#polling-status').text() == 'Start' ) ? 'Stop' : 'Start';
    $('#polling-status').text(polling_status);
    startStopPolling(polling_status);
  });

});
