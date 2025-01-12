// 初始化脚本
const $loon = (() => {
  const isLoon = typeof $loon !== "undefined";
  const notify = (title, subtitle, message) => $notification.post(title, subtitle, message);
  const log = (message) => console.log(`[战壕捕获] ${message}`);
  return { isLoon, notify, log };
})();

(() => {
  try {
    // 从请求头中获取 Authorization
    const authHeader = $request.headers['Authorization'];
    if (authHeader) {
      // 发送通知
      $loon.notify('战壕 Authorization 捕获', '', `Authorization: ${authHeader}`);
      $loon.log(`捕获成功: ${authHeader}`);
    } else {
      $loon.log('未检测到 Authorization');
    }
  } catch (error) {
    $loon.log(`脚本运行出错: ${error}`);
  }
  $done({});
})();
