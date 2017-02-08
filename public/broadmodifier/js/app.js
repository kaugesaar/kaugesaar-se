$('#broadmodifier').submit(function(e) {
  e.preventDefault();

  var keywords = $('#keywords')
    .val()
    .split('\n')
    .map(function(s){
      return '+' + s.replace(/\s{1,}/g,' +');
  });

  keywords.forEach(function(keyword) {
    $('#result').append('<li>'+ keyword +'</li>')
  })
});

$('#clear-list').click(function(e) {
  e.preventDefault();
  
  $('#result > li').remove();
})
