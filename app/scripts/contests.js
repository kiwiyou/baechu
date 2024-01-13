const ext = global.browser || global.chrome;

ext.runtime.sendMessage({ query: 'getDB' }, (db) => {
  const contests = document.querySelectorAll(
    'td > a[href^="https://www.acmicpc.net/contest/view/"]',
  );
  for (const contest of contests) {
    const contestId = contest.href.split('/').at(-1);
    const info = db[contestId];
    if (!info) continue;
    for (const key in info) {
      const label = document.createElement('span');
      label.classList.add('label', 'label-primary');
      label.append(ext.i18n.getMessage(key));
      contest.append(label);
    }
  }
});
