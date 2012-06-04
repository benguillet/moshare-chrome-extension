(function() {
    var popup_settings = {
        "title": "moShare",
        "specs": "location=no,scrollbars=no,status=no,resizable=no,toolbar=no,width=380,height=502"
    };

    var context_image = {
        "type": "normal",
        "title": chrome.i18n.getMessage("title_image"),
        "contexts": ["image"],
        "onclick": function (info, tab) {
            var url = gen_url("image", tab.title, info.pageUrl, "", info.srcUrl);
            window.open(url, popup_settings.title, popup_settings.specs);
        }
    };

    var context_video = {
        "type": "normal",
        "title": "moShare this video",
        "contexts": ["video"],
        "onclick": function (info, tab) {
            var url = gen_url("video", tab.title, info.pageUrl, "", info.srcUrl);
            window.open(url, popup_settings.title, popup_settings.specs);
        }
    };

    var context_audio = {
        "type": "normal",
        "title": "moShare this audio",
        "contexts": ["audio"],
        "onclick": function (info, tab) {
            var url = gen_url("audio", tab.title, info.pageUrl, "", info.srcUrl);
            window.open(url, popup_settings.title, popup_settings.specs);
        }
    };

    var context_page = {
        "type": "normal",
        "title": "moShare this page",
        "contexts": ["all"],
        "onclick": function (info, tab) {
            var url = gen_url("page", tab.title, info.pageUrl);
            window.open(url, popup_settings.title, popup_settings.specs);
        }
    };

    var context_link = {
        "type": "normal",
        "title": "moShare this link",
        "contexts": ["link"],
        "onclick": function (info, tab) {
            var url = gen_url("link", tab.title, info.linkUrl);
            window.open(url, popup_settings.title, popup_settings.specs);
        }
    };

    var context_selection = {
        "type": "normal",
        "title": "moShare '%s",
        "contexts": ["selection"],
        "onclick": function (info, tab) {
            var url = gen_url("snippet", tab.title, info.pageUrl, info.selectionText);
            window.open(url, popup_settings.title, popup_settings.specs);
        }
    };

    var gen_url = function(media_type, title, _location, message, content_url) {
        var url = "http://www.mogreet.com/moshare/it/";
        url += "?share=" + encodeURIComponent(_location);
        url += "&title=" + encodeURIComponent(title);
        url += "&media_type=" + encodeURIComponent(media_type);
        url += "&channel=chrome_plugin";

        if (content_url) {
            url += "&content_url=" + encodeURIComponent(content_url);
        }
        if (media_type == "image") {
            url += "&thumbnail=" + encodeURIComponent(content_url);
        }
        if (message) {
            url += "&message=" + encodeURIComponent(message);
        }
        return url;
    };

    chrome.browserAction.onClicked.addListener(function(tab) {
        var url = gen_url('page', tab.title, tab.url);
        var popupWidth  = 380;
        var popupHeight = 502;
        var left = (screen.width/2) - (popupWidth/2);
        var top  = (screen.height/2) - (popupHeight/2);

        chrome.windows.create({'url': url, 'type': 'popup', 'focused': true, 'top': top, 'left': left,'width': popupWidth, 'height': popupHeight});
    });

    var context_menu_image     = chrome.contextMenus.create(context_image);
    var context_menu_video     = chrome.contextMenus.create(context_video);
    var context_menu_audio     = chrome.contextMenus.create(context_audio);
    var context_menu_page      = chrome.contextMenus.create(context_page);
    var context_menu_link      = chrome.contextMenus.create(context_link);
    var context_menu_selection = chrome.contextMenus.create(context_selection);
})();
