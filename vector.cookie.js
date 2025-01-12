const targetHost = "mainnet-api.vector.fun";
const targetPath = "/graphql";
const storageKey = "CapturedAuthorization";
const notifyKey = "AuthorizationNotified";

if ($request && $request.url.includes(targetHost) && $request.url.includes(targetPath)) {
    const headers = $request.headers;
    const authorization = headers["authorization"] || headers["Authorization"];
    const hasNotified = $persistentStore.read(notifyKey) === "true";

    if (authorization && !hasNotified) {
        $persistentStore.write(authorization, storageKey);
        $persistentStore.write("true", notifyKey);
        $notification.post("加入战壕", "已存储并通知", `${authorization}`);
        console.log(authorization);
    } else if (!authorization) {
        $notification.post("挫败挫败", "未找到 Authorization", "请检查目标请求");
    }
}

$done();
