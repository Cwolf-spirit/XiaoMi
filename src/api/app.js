import request from "@/http";
//获取用户信息
export function getUserInfo(data) {
  return request({
    url: "/user",
    method: "get",
    params: data
  });
}
//购物车数量
export function getCartNum(data) {
  return request({
    url: "/carts/products/sum",
    method: "get",
    params: data
  });
}
