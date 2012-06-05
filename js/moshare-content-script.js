(function($, window, undefined) {
    var moshareIcon16URL = chrome.extension.getURL("icons/moshare-16.png");
    var moshareIcon19URL = chrome.extension.getURL("icons/moshare-19.png");

    var moshareButtonTemplate = _.template(
        '<a class="moshare-link" href="http://www.mogreet.com/moshare/it/?share=<%= share %>&message=<%=  message %>&channel=chrome-plugin-twitter">' +
        '<img class="moshare-icon" alt="moShare icon" src="' + '<%= moshareIconURL %>' + '" />' +
        '</a>'
    );

    var makeMoshareDiv = function(tweetURL, tweetText, parentEl) {
        return $(moshareButtonTemplate({
            share: tweetURL,
            message: tweetText,
            moshareIconURL: $(parentEl).hasClass('simple-tweet') ? moshareIcon16URL : moshareIcon19URL
        }));
    };

    var extractTextTweet = {    
        '.js-stream-tweet':   function(idx, el) {
            var text      = $('p.js-tweet-text', el);
            var permalink = $('a.js-permalink', el);
            return [text, permalink];
        }
    };

    var foreachVisibleScreenName = function(fn) {
        _.each(_.keys(extractTextTweet), function(selector) {
            $(selector).each(function(idx, el) {
                fn(extractTextTweet[selector](idx, el), el);
            });
        });
    };

    var checkTweets = function() {
        foreachVisibleScreenName(function(el, parentEl) {
            if (0 === $('.moshare-link', parentEl).length) {
                var tweetText = encodeURIComponent(el[0].text());
                var tweetURL  = encodeURIComponent('https://twitter.com/' + el[1].attr('href'));
                var moshareButton = makeMoshareDiv(tweetURL, tweetText, parentEl);     
                moshareButton.click(function(e) {
                    window.open('http://www.mogreet.com/moshare/it/?share=' + tweetURL + '&message=' + tweetText + '&channel=chrome-plugin-twitter');
                    e.preventDefault();
                    e.stopPropagation();
                });
                $(el[0]).append(moshareButton);
            }
        });
    };

    var intervals = [ 500, 1000, 5000, 10000 ];
    
    var check = function() {
        _.each(intervals, function(interval) {
            _.delay(function() { checkTweets(); }, interval);
        });
    };

    $(window).scroll(_.debounce(function() {
        checkTweets();
    }, 500));
;
    $('body').live('mouseup', check);
    $(check);
})(jQuery, window);
