const targetHost = "mainnet-api.vector.fun";
const targetPath = "/graphql";
const storageKey = "CapturedAuthorization";

if ($request && $request.url.includes(targetHost) && $request.url.includes(targetPath)) {
    const headers = $request.headers;
    const authorization = headers["authorization"] || headers["Authorization"]; // 获取 Authorization

    if (authorization) {

        $persistentStore.write(authorization, storageKey);
        console.log(authorization);
        $notification.post("进入战壕", "Authorization已保存", `Authorization: ${authorization}`);
    } else {
        $notification.post("挫败挫败", "快快快", "自己想想办法吧");
    }
}




$done();