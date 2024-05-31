$(document).ready(function() {
  let listeAmenitiesSelectionnees = {};

  $('.amenities input[type="checkbox"]').change(function() {
    if (this.checked) {
      listeAmenitiesSelectionnees[$(this).data('id')] = $(this).data('name');
    } else {
      delete listeAmenitiesSelectionnees[$(this).data('id')];
    }

    $('.amenities h4').text(Object.values(listeAmenitiesSelectionnees).join(', '));
  });

  $.get("http://127.0.0.1:5001/api/v1/status/")
    .done(function(data, textStatus) {
      if (data.status === "OK") {
        $('#api_status').addClass("available");
      } else {
        $('#api_status').removeClass("available");
      }
    })
    .fail(function() {
      $('#api_status').removeClass("available");
      alert('get("http://127.0.0.1:5001/api/v1/status/") à échoué');
    });
  });