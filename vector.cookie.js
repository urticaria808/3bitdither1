// Loon 脚本: 限制多次通知
const targetHost = "mainnet-api.vector.fun";
const targetPath = "/graphql";
const storageKey = "CapturedAuthorization";
const notifyKey = "AuthorizationNotified"; // 标记是否已通知

if ($request && $request.url.includes(targetHost) && $request.url.includes(targetPath)) {
    const headers = $request.headers;
    const authorization = headers["authorization"] || headers["Authorization"];
    const hasNotified = $persistentStore.read(notifyKey) === "true"; // 检查是否已通知

    if (authorization && !hasNotified) {
        // 存储 Authorization
        $persistentStore.write(authorization, storageKey);
        // 设置已通知标记
        $persistentStore.write("true", notifyKey);

        // 发送通知
        $notification.post("加入战壕", "已存储并通知", `${authorization}`);
        console.log(${authorization});
    } else if (!authorization) {
        $notification.post("挫败挫败", "未找到 Authorization", "请检查目标请求");
    }
}

$done();
