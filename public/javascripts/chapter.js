$(function() {
  checkNavButtons();
  listenForPageNavigation();
});

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
        window.location.href = "/testindex"
    else 
        window.location.href = next;
  });
}

function getPage() {
  var pathname = window.location.pathname;
  var page = pathname.split('/')[2];
  return parseInt(page);
}