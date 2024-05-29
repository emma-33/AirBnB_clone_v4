$(document).ready(function() {
  const Amenities = [];
  $('input[type=checkbox]').click(function() {
    if (this.checked) {
      Amenities.push($(this).attr('data-id'))
    } else {
      Amenities.pop($(this).attr('data-id'))
    }
    $('.amenities h4').text(Amenities.join(', '));
    });
});
