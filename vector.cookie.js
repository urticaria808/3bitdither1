const chavy = init();

if ($request.headers['Authorization']) {
  const authHeader = $request.headers['Authorization'];
  chavy.msg('战壕 捕获成功', '', authHeader);
  chavy.log(`Authorization: ${authHeader}`);
}

chavy.done();

function init() {
  isSurge = () => undefined !== this.$httpClient;
  isQuanX = () => undefined !== this.$task;
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body);
    if (isQuanX()) $notify(title, subtitle, body);
  };
  log = (message) => console.log(message);
  done = (value = {}) => $done(value);
  return { isSurge, isQuanX, msg, log, done };
}
