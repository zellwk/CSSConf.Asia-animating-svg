$(document).ready(function() {
  Reveal.addEventListener('ready', function() {
    $('section').not('.first').find('h1').each(function(index, el) {
      var $el = $(el);
      var arr = $el.text().split('');
      var html = '';
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == ' ') {
          arr[i] = '&nbsp;';
        }
        html += '<span>' + arr[i] + '</span>';
      };

      $(el).html(html);
    });

    triggerAnimations();
  });

  Reveal.addEventListener('slidechanged', function(event) {
    triggerAnimations();

  });

  $('.jsSVG').on('click', function(event) {
    event.preventDefault();
    var svgID = $(this).attr('id');
    playSVGTween(svgID);
  });
});

function triggerAnimations() {
  var $h1s = $('.present').find('h1 span');
  TweenMax.staggerFrom($h1s, 0.2, {
    autoAlpha: 0,
    scale: 5,
    rotation: -360,
    ease: Power0.easeOut
  }, 0.05);
}

var Tweens = {};

Tweens.svg1 = TweenMax.to($('#svg1').find('rect'), 1, {
  attr: {
    x: '100'
  },
  // repeat: -1
}).pause();

Tweens.svg2 = TweenMax.to($('#svg2').find('rect'), 1, {
  rotation: 360,
}).pause();

Tweens.svg3 = TweenMax.to($('#svg3').find('rect'), 1, {
  rotation: 360,
  transformOrigin: '50% 50%'
}).pause();

Tweens.svg4 = TweenMax.to($('#svg4').find('rect'), 1, {
  rotation: 360,
  svgOrigin: '200 200'
}).pause();

function playSVGTween(svgID) {
  Tweens[svgID].play();
}

$('rect').on('click', function(event) {
  event.preventDefault();
  /* Act on the event */
});

// More complex anims (JS Bouncing Ball)

var $ball = $('.jsBall .ball');

$ball.click(function(event) {
  TweenMax.to($(this), 2.5, {
    x: 600,
    rotation: 720,
    transformOrigin: '50% 50%',
    ease: 'Power1.easeOut'
  });
  TweenMax.to($(this), 2, {
    y: 400,
    ease: 'Bounce.easeOut'
  });
});

Reveal.addEventListener('fragmentshown', function(event) {

  if ($(event.fragment).attr('data-vivus')) {
    new Vivus('obturateur1', {
      duration: 100
    });
  }

  if ($(event.fragment).attr('data-drawsvg')) {
    var myPath = $('#drawsvg').get(0);
    segment = new Segment(myPath);
    segment.draw('50%', '50%', 0);

    TweenMax.to(myPath, 1.5, {strokeDasharray: segment.strokeDasharray('0%', '100%')});
  }
});

// Shape Morphing
var circle = Snap('#circle');

$('#circle').on('click', function(event) {
  var path = $(this).attr('data-morph-active');
  circle.select('path').animate({
    d: path
  }, 100, mina.easein, function() {
    circle.select('path').animate({
      d: 'M281,150c0,71.797-59.203,131-131,131S19,221.797,19,150S78.203,19,150,19S281,78.203,281,150z'
    }, 800, mina.elastic);
  });
});

var s = Snap('#button');
var elem = s.select('path');
var startPath = 'M281,150c0,71.797-59.203,131-131,131S19,221.797,19,150S78.203,19,150,19S281,78.203,281,150z';
var endPath = 'M251,150c0,93.5-29.203,143-101,143S49,243.5,49,150C49,52.5,78.203,7,150,7S251,51.5,251,150z';

$('#button').on('click', function() {
  elem.animate({d: endPath}, 100, mina.easein);
});

var elem2 = Snap('#button2').select('path');

$('#button2').on('click', function() {
  elem2.animate({d: endPath}, 100, mina.easein, onComplete);
});

function onComplete() {
  elem2.animate({d: startPath}, 800, mina.elastic);
}
