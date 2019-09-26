function findNewArticle() {
    setTimeout(function () {
        try {
            var head_li = document.getElementsByClassName("alt-list").item(0).getElementsByTagName("li").item(0);
            var d_p = head_li.getElementsByClassName("item-top").item(0).getElementsByClassName("user-info").item(0).getElementsByTagName("p").item(1);
            if (d_p.innerText.indexOf("昨天") == -1 && d_p.innerText.indexOf("小时") == -1) {
                var content_a = head_li.getElementsByClassName("item-center").item(0).getElementsByClassName("content-info").item(0).getElementsByTagName("a").item(0);
                content_a.click()
            } else {
                // 第一条不是作者今天新发的长文，再刷新一次
                window.location.reload(true)
            }
        } catch (error) {
            findNewArticle();
        }

    }, 500)
}

function likeArticle() {
    setTimeout(function () {
        try {
            ldiv = document.getElementsByClassName("article-details-center2").item(0);
            like = ldiv.getElementsByTagName("button").item(1);
            like.click();
        } catch (error) {
            likeArticle();
        }
    }, 500);
}



var current_url = window.location.href;

if (current_url.indexOf("shortcontents") != -1) {
    // 本分支-微文自动点赞
    var ilike = function (it, delay) {
        setTimeout(function () {
            console.log(delay)
            it.click()
        }, delay)
    }

    setTimeout(function () {
        var ulist = document.getElementsByClassName("alt-list").item(0)
        var tt = ulist.getElementsByClassName("ShortItem")

        for (var i = 0; i < tt.length; i++) {
            like = tt[i].getElementsByClassName("item-bottom").item(0).getElementsByTagName("button").item(1)
            var num = Math.round(Math.random() * 10000 * i)
            ilike(like, num)
        }

    }, 3000);

    setTimeout(function () {
        window.location.reload(true)
    }, 1000 * 60 * 60 * 4);
} else if (current_url.indexOf("people") != -1) {
    // 本分支-找到作者新发长文并打开
    try {
        findNewArticle();
    } catch (error) {
        findNewArticle();
    }

} else if (current_url.indexOf("article") != -1) {
    // 本分支-给长文点赞
    try {
        likeArticle();
    } catch (error) {
        likeArticle();
    }

} else {
    console.log("error!" + current_url)
}

