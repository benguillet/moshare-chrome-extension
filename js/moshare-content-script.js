(function($, window, undefined) {
    var moshareIcon16URL = chrome.extension.getURL("icons/moshare-16.png");

    var moshareButtonTemplate = _.template(
        '<a class="moshare-link" href="http://www.mogreet.com/moshare/it/?share=">' +
        '<img class="moshare-icon" alt="moShare icon" src="' + '<%= moshareIconURL %>' + '" />' +
        '</a>'
    );

    var makeMoshareDiv = function() {
        return $(moshareButtonTemplate({
            moshareIconURL: moshareIcon16URL
        }));
    };

    var extractScreenName = {
        '.js-tweet-text':   function(idx, el) {
            var old = $('a.tweet-screen-name', el);
            if (old && old.length > 0) {
                // "Old" Twitter selector.
                //console.log(old);
                return old;
            } else {
                // New-new Twitter "Fly" selector.
                var fly = $('.fullname', el);
                // Remap function of the node which has the text value we want (Screen-name.)
                fly.text = function() { return $('.username b', el).text() };
                //console.log(fly);
                return fly;
            }
        }
    };

    var foreachVisibleScreenName = function(fn) {
        _.each(_.keys(extractScreenName), function(selector) {
            $(selector).each(function(idx, el) {
                fn(extractScreenName[selector](idx, el), el);
            });
        });
    };

    var checkTweets = function() {
        foreachVisibleScreenName(function(el, parentEl) {
            if (0 === $('.moshare-link', parentEl).length) {
                var moshareButton = makeMoshareDiv();     
                moshareButton.click(function(e) {
                    window.open('http://www.mogreet.com/moshare/it');
                    e.preventDefault();
                    e.stopPropagation();
                });
                $(el).append(moshareButton);
            }
        });
    };

    
    // var checkTweets = function() {
    //     foreachVisibleScreenName(function(el, parentEl) {
    //         var screenName = el.text();
    //         var score = scores[screenName.toLowerCase()];
    //         if (null != score && 0 === $('.klout-score-span', parentEl).length) {
    //             var scoreDiv = makeScoreDiv(screenName, score, parentEl);
    //             scoreDiv.click(function(e) {
    //                 window.open('http://klout.com/user/' + screenName);
    //                 e.preventDefault();
    //                 e.stopPropagation();
    //             });
    //             $(el).before(scoreDiv);
    //         }
    //     });
    // }

    // var intervals = [ 500, 1000, 5000, 10000 ];
    // var check = function() {
    //     _.each(intervals, function(interval) {
    //         _.delay(function() { checkTweets(); }, interval);
    //     });
    // };

    // $(window).scroll(_.debounce(function() {
    //     fetchMissingScores();
    //     checkTweets();
    // }, 500));

    //$('body').live('mouseup', check);
    //$(check);
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
