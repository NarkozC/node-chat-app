var socket = io()

socket.on('connect', function() {
  console.log('Connected to the server')
})

socket.on('disconnect', function() {
  console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('HH:mm a')
  var template = $('#message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  })

  $('#messages').append(html)
})

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('HH:mm a')
  var template = $('#location-message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })

  $('#messages').append(html)
})

$('#message-form').on('submit', function(e) {
  e.preventDefault()
  var messageTextbox = $('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('')
  })
})


var locationButton = $('#sendLocation')
$(locationButton).on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...')

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    locationButton.removeAttr('disabled').text('Send Location')
  }, function(e) {
    locationButton.removeAttr('disabled').text('Send Location')
    alert('Unable to fetch location')
  })
})
