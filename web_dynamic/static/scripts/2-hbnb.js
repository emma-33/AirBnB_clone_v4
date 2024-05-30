$(document).ready(function() {
  const amenities = [];
  $('input[type=checkbox]').click(function() {
    if (this.checked) {
      amenities.push($(this).attr('data-name'));
    } else {
      const index = amenities.indexOf($(this).attr('data-name'));
      amenities.splice(index, 1);
    }
    $('.amenities h4').text(amenities.join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data, status){
    if (data.status == 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
  