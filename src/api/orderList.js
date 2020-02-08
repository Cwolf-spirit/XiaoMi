import request from "@/http";
//获取订单信息
export function getList(data) {
  return request({
    url: "/orders",
    method: "get",
    params: data
  });
}
