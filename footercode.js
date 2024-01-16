
$(document).ready(function() {
  initCookieHandling();
  initIframes();
  initNavigationScroll();
});

function initCookieHandling() {
  $(window).on('CookieScriptAcceptAll', loadCalendlyWidget)
           .on('CookieScriptReject', unloadCalendlyWidget);

  isCookieConsentGiven() ? loadCalendlyWidget() : unloadCalendlyWidget();
}

function initIframes() {
  $(".w-richtext figure iframe, .w-embed-youtubevideo iframe, .w-video iframe").each(function() {
    var $this = $(this);
    var url = $this.attr("src");
    $this.attr({
      "src": "",
      "data-src": url,
      "data-cookiescript": "accepted",
      "data-cookiecategory": "targeting",
      "data-alt-img": "URL"
    });
    $this.closest("div").append($(".example-video-iframe").html());
  });
}

function initNavigationScroll() {
  const $navButton = $('.w-nav-button');
  if ($navButton.length) {
    const observer = new MutationObserver(function(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          letBodyScroll($navButton.hasClass('w--open'));
        }
      }
    });

    observer.observe($navButton[0], { attributes: true });
  }
}

function letBodyScroll(menuIsOpen) {
  document.body.style.overflow = menuIsOpen ? 'hidden' : 'auto';
}

function loadCalendlyWidget() {
  if (isCookieConsentGiven()) {
    $.ajax({
      url: "https://assets.calendly.com/assets/external/widget.js",
      dataType: "script",
      cache: true,
      success: function() {
        $('.calendly-inline-widget').show();
        $('.no-cookies-placeholder').hide();
      }
    });
  }
}

function unloadCalendlyWidget() {
  $('.calendly-inline-widget').hide();
  $('.no-cookies-placeholder').show();
}

window.onload = function() {
  window.setTimeout(loadExternalScript, 3000);
};

function loadExternalScript() {
  var script = document.createElement('script');
  script.defer = true;
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  document.querySelector('head').appendChild(script);
}

  
  
  
  

// Akzeptiert Cookies und lädt das Calendly-Widget neu
function acceptCookiesAndReloadWidget() {
  CookieScript.instance.acceptAllAction();
  loadCalendlyWidget();
}
