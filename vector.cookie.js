// Loon 脚本: 存储 Authorization
const targetHost = "mainnet-api.vector.fun"; // 目标主机
const targetPath = "/graphql"; // 目标路径
const storageKey = "CapturedAuthorization"; // 存储的 Key

if ($request && $request.url.includes(targetHost) && $request.url.includes(targetPath)) {
    const headers = $request.headers; // 获取请求头
    const authorization = headers["authorization"] || headers["Authorization"]; // 获取 Authorization

    if (authorization) {
        // 写入存储
        $persistentStore.write(authorization, storageKey);
        $notification.post("存储成功", "Authorization 已保存", `Authorization: ${authorization}`);
    } else {
        $notification.post("存储失败", "未找到 Authorization", "请检查目标请求是否正确");
    }
}

$done();