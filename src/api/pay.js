import request from "@/http";
//获取订单信息
export function getOrderDetail(data) {
  return request({
    url: `/orders/${data}`,
    method: "get"
  });
}
//支付宝支付接口
export function toPay(data) {
  return request({
    url: "/pay",
    method: "post",
    data
  });
}
