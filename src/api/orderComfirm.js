import request from "@/http";
//获取用户地址信息
export function getAddressList(data = {}) {
  return request({
    url: "/shippings",
    method: "get",
    params: data
  });
}
//用户地址信息
export function submitAddress(url, method, data = {}) {
  return request({
    url: url,
    method: method,
    data
  });
}
//提交订单
export function toAccount(data = {}) {
  return request({
    url: "/orders",
    method: "post",
    data
  });
}
