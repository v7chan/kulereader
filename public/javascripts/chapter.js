var CHARACTERS = ['bran', 'ned', 'harwin', 'hullen', 'jon', 'jory', 'robb', 'theon', 'catelyn', 'arryn', 'rob', 'mance', 'nan'];
var COLOR_SCHEME = {};
var PAGE_CHARACTERS = [];

$(function() {
  mapColors();

  checkNavButtons();
  listenForPageNavigation();
});

function mapColors() {
  $.ajax({
    dataType: 'json',
    url: '../javascripts/color_scheme.json',
    success: function(colors) {
      for (var i = 0; i < CHARACTERS.length; i++) {
        COLOR_SCHEME[CHARACTERS[i]] = colors[i];
      }

      findNames();
      colorize(colors);
      generateTimeline(colors);
    }
  });
}

function colorize(colors) {
  for(var i = 0; i < PAGE_CHARACTERS.length; i++) {
    $('.' + PAGE_CHARACTERS[i]).css('color', COLOR_SCHEME[PAGE_CHARACTERS[i]]);
    // $('.' + CHARACTERS[i]).css('text-decoration', 'underline');
  };
}

function findNames() {
  var names = $('.name');
  
  if(names.length == 0) return;

  PAGE_CHARACTERS.push(parseName(names[0]));
  for(var i = 0; i < names.length; i++) {
    if(PAGE_CHARACTERS.indexOf(parseName(names[i])) == -1) PAGE_CHARACTERS.push(parseName(names[i]));
  }
}

function parseName(obj) {
  return $(obj).attr('class').split(' ')[1];
}

function generateTimeline(colors) {
  var appearanceCounts = []
  var appearancePercentages = [];
  var totalAppearances = 0;

  for (var i = 0; i < PAGE_CHARACTERS.length; i++) {
    appearanceCounts.push($('.' + PAGE_CHARACTERS[i]).length);
  };

  for (var i = 0; i < PAGE_CHARACTERS.length; i++) {
    totalAppearances += appearanceCounts[i];
  };

  for (var i = 0; i < PAGE_CHARACTERS.length; i++) {
    appearancePercentages.push(percentify(appearanceCounts[i]/totalAppearances));
  };

  var gradient = '-webkit-linear-gradient(left, ';
  var currentPercentage = 0;

  if(totalAppearances == 0) $('#timeline-container').hide();
  else {
    currentPercentage += appearancePercentages[0];

    gradient += COLOR_SCHEME[PAGE_CHARACTERS[0]] + ' ' + currentPercentage + '%,';

    for (var i = 1; i < (PAGE_CHARACTERS.length - 1); i++) {
      gradient += COLOR_SCHEME[PAGE_CHARACTERS[i]] + ' ' + currentPercentage + '%,';
      currentPercentage += appearancePercentages[i];
      gradient += COLOR_SCHEME[PAGE_CHARACTERS[i]] + ' ' + currentPercentage + '%,';
    };

    gradient += COLOR_SCHEME[PAGE_CHARACTERS[PAGE_CHARACTERS.length - 1]] + ' ' + currentPercentage + '%,';
    gradient += COLOR_SCHEME[PAGE_CHARACTERS[PAGE_CHARACTERS.length - 1]] + ' 100%)';
  }

  $('#timeline').css('padding', '10px');
  $('#timeline').css('background', gradient);
}

function percentify(decimal) {
  return (Math.floor(decimal * Math.pow(100,2)) / 100);
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