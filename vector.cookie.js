// Loon 脚本: 抓取 Authorization 并发送通知
const targetHost = "mainnet-api.vector.fun"; // 目标主机
const targetPath = "/graphql"; // 目标路径

// 检查是否是目标请求
if ($request && $request.url.includes(targetHost) && $request.url.includes(targetPath)) {
    const headers = $request.headers; // 获取请求头
    const authorization = headers["authorization"] || headers["Authorization"]; // 获取 Authorization

    if (authorization) {
        // 发送通知
        const title = "加入战壕";
        const subtitle = "已捕获请求头";
        const content = `Authorization: ${authorization}`;
        $notification.post(title, subtitle, content);
    } else {
        // 如果没有找到 Authorization
        $notification.post("挫败挫败", "未找到 Authorization", "请检查目标请求是否正确");
    }
}

// 必须调用 $done 结束脚本
$done();
