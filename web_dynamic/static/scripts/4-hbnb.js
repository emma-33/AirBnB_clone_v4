$(document).ready(function() {
  let listeAmenitiesSelectionnees = {};

  // Filter places
  function fetchPlaces(criteres) {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(criteres),
      dataType: 'json',
      success: function(data) {
        $('.places').empty();
        for (let place of data) {
          let newArticleDansSectionPlace = $("<article>").appendTo(".places");

          let divTitle_box = $("<div>").addClass("title_box").appendTo(newArticleDansSectionPlace);
          $("<h2>").text(place.name).appendTo(divTitle_box);
          $("<div>").addClass("price_by_night").text(place.price_by_night + "$").appendTo(divTitle_box);

          let divInformation = $("<div>").addClass("information").appendTo(newArticleDansSectionPlace);
          $("<div>").addClass("max_guest").text(place.max_guest).appendTo(divInformation);
          $("<div>").addClass("number_rooms").text(place.number_rooms).appendTo(divInformation);
          $("<div>").addClass("number_bathrooms").text(place.number_bathrooms).appendTo(divInformation);

          $("<div>").addClass("description").html(place.description).appendTo(newArticleDansSectionPlace);
        }
      },
      error: function(error) {
        console.error('Erreur :', error);
        alert('Erreur : http://127.0.0.1:5001/api/v1/places_search/');
      }
    });
  }

  $('.amenities input[type="checkbox"]').change(function() {
    $('button').show();

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

  fetchPlaces({});
  $('button').hide();

  $('button').click(function() {
    $('button').hide();
    fetchPlaces({amenities: Object.keys(listeAmenitiesSelectionnees)});
  });
});
