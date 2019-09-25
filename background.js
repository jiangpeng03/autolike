// 用定时任务打开作者的主页
// 事先定义需要打开的作者列表，主要包含作者的主页Id和文章更新时间（时和分）
var authorList =
  [
    { "authorId": "21303", "authorUpdateTime": "0550", "isLike": "0", "likeDate": "20090820" },
    { "authorId": "22918", "authorUpdateTime": "0708", "isLike": "0", "likeDate": "20090820" },
    { "authorId": "20007", "authorUpdateTime": "1035", "isLike": "0", "likeDate": "20090820" },
    { "authorId": "356267", "authorUpdateTime": "1900", "isLike": "0", "likeDate": "20090820" },
    { "authorId": "298113", "authorUpdateTime": "2050", "isLike": "0", "likeDate": "20090820" },
    { "authorId": "31102", "authorUpdateTime": "2111", "isLike": "0", "likeDate": "20090820" },
    { "authorId": "42268", "authorUpdateTime": "2232", "isLike": "0", "likeDate": "20090820" }
  ];

// 作者首页的前缀链接
var authorHostUrl = "https://bihu.com/people/";

// 设置定时器，不断的轮询检测
var timer = setInterval(function () { checkTimeIsOk(timer) }, 3000);

// 检查当前时间是否为点赞的时间点
function checkTimeIsOk(timer) {
  // 获取当前时间的小时和分钟

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();
  var hour = now.getHours();
  var minu = now.getMinutes();
  // 拼接成日期格式，yyyyMMdd
  var nowDate = year + "" + month + "" + date;
  var nowHourAndMinu = hour + "" + minu;
  // var authorList = JSON.parse(authorStr);
  // 循环遍历需要关注的作者列表
  for (var i = 0; i < authorList.length; i++) {
    var author = authorList[i];
    var authorId = author.authorId;
    var authorUpdateTime = author.authorUpdateTime;
    var isLike = author.isLike;
    var likeDate = author.likeDate;

    // 判断今天该作者是否已经点赞，如果已经点赞，则直接跳过
    if (likeDate == nowDate && isLike == "1") {
      continue;
    }

    var intervalTime = nowHourAndMinu - authorUpdateTime;
    // 因为作者文章比较热门，所以如果当前时间与文章更新时间差小于6s，则打开作者主页，否则不做处理
    if (intervalTime >= 0 && intervalTime <= 1) {
      var authorMainPage = authorHostUrl + authorId;
      chrome.tabs.create({ url: authorMainPage });
      // 把点赞标识更新为已点赞，点赞日期更新为当天
      author.isLike = "1";
      author.likeDate = nowDate;
      authorList[i] = author;
    }
  }
}