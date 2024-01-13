const ext = global.browser || global.chrome;

ext.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.query === 'getDB') {
    fetch('https://raw.githubusercontent.com/kiwiyou/baechu/main/db.json')
      .then((r) => r.json())
      .then(sendResponse);
    return true;
  }
  return false;
});
