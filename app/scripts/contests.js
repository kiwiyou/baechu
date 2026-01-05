const ext = global.browser || global.chrome;

const iconify = document.createElement('script');
iconify.src =
  'https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js';
document.head.append(iconify);

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
      const text = info[key];
      if (key === 'warning' || key === 'order') {
        contest.parentElement.append(' ', createIconLabel(key, text));
        continue;
      }
      contest.parentElement.append(' ', createLabel(key, text));
    }
  }
  button.click();
});

function createLabel(key, text) {
  const label = document.createElement('span');
  label.classList.add('label', `baechu-label-${key}`);
  label.setAttribute('data-toggle', 'tooltip');
  label.setAttribute('data-placement', 'top');
  label.setAttribute('title', text);
  label.append(ext.i18n.getMessage(key));
  return label;
}

function createIconLabel(key, text) {
  const label = document.createElement('iconify-icon');
  label.classList.add('baechu-icon', `baechu-label-${key}`);
  label.setAttribute('data-toggle', 'tooltip');
  label.setAttribute('data-placement', 'top');
  label.setAttribute('title', text);
  return label;
}
