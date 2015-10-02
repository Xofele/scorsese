$(function() {
  var ctrl = new ScrollMagic.Controller();

  var items = _($(".film")).map(function (item, i) {
    return {
      id: $(item).data("id"),
      elemFilm: item,
      elemSplash: item.querySelector(".splash"),
      elemOverlay: item.querySelector(".overlay"),
      elemQuote: item.querySelector(".quote"),
      elemTitle: item.querySelector(".title"),
      elemText: item.querySelector(".text")
    };
  }).value();

  _.forEach(items, function (item, i) {
    var tween = new TimelineMax().add([
      TweenMax.to(item.elemSplash, 1, { backgroundPosition: "0% 100%", ease: Linear.easeNone }),
      TweenMax.to(item.elemOverlay, 1, { opacity: 0, ease: Power1.easeIn }),
      TweenMax.to(item.elemQuote, 1, { opacity: 0, top: 0, ease: Linear.easeNone }),
      TweenMax.to(item.elemTitle, 1, { opacity: 1, ease: Power4.easeIn })
    ]);
    new ScrollMagic.Scene({
      triggerElement: item.elemSplash,
      triggerHook: 0,
      duration: "100%"
    })
    .setPin(item.elemSplash)
    .setTween(tween)
    // .addIndicators()
    .addTo(ctrl);

    if (items[i + 1]) {
      new ScrollMagic.Scene({
        triggerElement: items[i + 1].elemSplash,
        triggerHook: 1,
        duration: "100%"
      })
      .setPin(item.elemText, { pushFollowers: false })
      // .addIndicators()
      .addTo(ctrl);      
    }

  });

});