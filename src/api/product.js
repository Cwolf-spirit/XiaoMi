import request from "@/http";
//产品详情
export function getDetail(data) {
  return request({
    url: `/products/${data}`,
    method: "get"
  });
}
