const targetHost = "mainnet-api.vector.fun";
const targetPath = "/graphql";
const storageKey = "CapturedAuthorization";
const timestampKey = "AuthorizationTimestamp";

// 将时间戳转换为可读时间
function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // 将秒时间戳转换为毫秒
    return date.toISOString().replace("T", " ").split(".")[0]; // 格式化为 "YYYY-MM-DD HH:mm:ss"
}

if ($request && $request.url.includes(targetHost) && $request.url.includes(targetPath)) {
    const headers = $request.headers;
    const authorization = headers["authorization"] || headers["Authorization"]; // 获取 Authorization

    if (authorization) {
        const currentTimestamp = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
        const storedTimestamp = $persistentStore.read(timestampKey); // 读取保存的时间戳

        if (!storedTimestamp || (currentTimestamp - storedTimestamp > 120)) {
            // 转换时间戳为可读时间
            const lastSavedTime = storedTimestamp ? formatTimestamp(storedTimestamp) : "无记录";
            const currentSavedTime = formatTimestamp(currentTimestamp);

            // 保存 Authorization 和当前时间戳
            $persistentStore.write(authorization, storageKey);
            $persistentStore.write(String(currentTimestamp), timestampKey);

            // 打印日志并发送通知
            console.log(`上次保存时间: ${lastSavedTime}`);
            console.log(`本次保存时间: ${currentSavedTime}`);
            console.log(`Authorization: ${authorization}`);

            $notification.post(
                "进入战壕",
                "Authorization已保存",
                `Authorization: ${authorization}\n上次保存: ${lastSavedTime}\n本次保存: ${currentSavedTime}`
            );
        }
    } else {
        $notification.post("挫败挫败", "快快快", "自己想想办法吧");
    }
}

$done();