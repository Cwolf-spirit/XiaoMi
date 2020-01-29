import request from "@/http";
//获取用户信息
export function addCart(data) {
  return request({
    url: "/carts",
    method: "post",
    data
  });
}
