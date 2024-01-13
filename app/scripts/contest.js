const ext = global.browser || global.chrome;

const button = document.createElement('button');
button.setAttribute('onclick', `$('[data-toggle="tooltip"]').tooltip();`);
document.body.append(button);

ext.runtime.sendMessage({ query: 'getDB' }, (db) => {
  const qna = document.querySelector('a[href^="/contest/qna/"]');
  const contestId = qna.href.split('/').at(-1);
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  const a = document.createElement('a');
  a.append('뱃지/배경');
  a.title = Object.keys(db[contestId])
    .map((k) => `${ext.i18n.getMessage(k)}: ${db[contestId][k]}`)
    .join('<br />');
  a.setAttribute('data-toggle', 'tooltip');
  a.setAttribute('data-placement', 'right');
  a.setAttribute('data-html', 'true');
  a.href = '#';
  li.append(a);
  qna.parentElement.after(li);
  button.click();
});
