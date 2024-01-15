const ext = global.browser || global.chrome;

const button = document.createElement('button');
button.setAttribute('onclick', `$('[data-toggle="tooltip"]').tooltip();`);
document.body.append(button);

ext.runtime.sendMessage({ query: 'getDB' }, (db) => {
  const contests = document.querySelectorAll('td > a[href^="/contest/view"]');
  for (const contest of contests) {
    const contestId = contest.href.split('/').at(-1);
    const info = db[contestId];
    if (!info) continue;
    for (const key in info) {
      const label = document.createElement('span');
      label.classList.add('label', `label-${key}`);
      label.setAttribute('data-toggle', 'tooltip');
      label.setAttribute('data-placement', 'top');
      label.setAttribute('title', info[key]);
      label.append(ext.i18n.getMessage(key));
      contest.parentElement.append(' ', label);
    }
  }
  button.click();
});
