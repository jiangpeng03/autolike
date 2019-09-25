let kaiguan = document.getElementById('kaiguan');

  chrome.storage.local.get('opened', function(data) {
    console.log(data.opened);
    console.log(data);
    if(data.opened) {
      kaiguan.checked=true;
    }else {
      kaiguan.checked=false;
    }
  });
  console.log('click0');
  // open.onclick = function(element) {
  //   let color = element.target.value;
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     chrome.tabs.executeScript(
  //         tabs[0].id,
  //         {code: 'document.body.style.backgroundColor = "' + color + '";'});
  //   });
  // };

  kaiguan.onclick=function(){
    console.log('click');
    if(kaiguan.checked) {
      chrome.storage.local.set({'opened': true}, function() {
        console.log("open autolike.");
      });
    } else{
      chrome.storage.local.remove('opened',function() {
        console.log("close autolike.");
      });
    }
  };

  