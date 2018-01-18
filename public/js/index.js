var socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');

  // socket.emit() sends event to server
});;

// socket.on() listens to events from server
socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

// data emitted by server event is available as a parameter in the callback

socket.on('newMessage', function (message) {
  console.log('newMessage event received from server:\n', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);

});

socket.on('newLocationMessage', function (message) {
  console.log('newLocationMessage event received from server:\n', message);

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>')

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);


  jQuery('#messages').append(li);
});




jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'Anonymous',
    text: jQuery('[name=message]').val()
  }, function (e) {

  })
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation API is not available in this browser.');
  };

  navigator.geolocation.getCurrentPosition(function (position) {

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function () {
    alert('Unable to fetch location.')
  })
})
