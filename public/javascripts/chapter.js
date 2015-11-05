$(function() {
  colorize();
  checkNavButtons();
  listenForPageNavigation();
});

function colorize() {
  var characters = ['ardrian', 'axell', 'cressen', 'davos', 'duram', 'guncer', 
                    'melisandre', 'monford', 'patchface', 'pylos', 'salladhor', 
                    'selyse', 'shireen', 'stannis'];

  $.ajax({
    dataType: 'json',
    url: '../javascripts/color_scheme.json',
    success: function(colors) {
      for (var i = 0; i < colors.length; i++) {
        $('.' + characters[i]).css('color', colors[i]);
      };

      for (var i = 0; i < colors.length; i++) {
        $('.box.' + characters[i]).css('background', colors[i]);
      };
    }
  });
}

function checkNavButtons() {
  if(getPage() == 1) {
    $('#pager-previous').remove();
  }
}

function listenForPageNavigation() {
  $('#pager-previous').click(function(e) {
    e.preventDefault();
    var previous = getPage() - 1;
    window.location.href = previous;
  });

  $('#pager-next').click(function(e) {
    e.preventDefault();
    var next = getPage() + 1;
    if (next == 19) 
        window.location.href = "/test"
    else 
        window.location.href = next;
  });
}

function getPage() {
  var pathname = window.location.pathname;
  var page = pathname.split('/')[2];
  return parseInt(page);
}