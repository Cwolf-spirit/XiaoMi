import request from "@/http";
//产品
export function getProductList(data) {
  return request({
    url: "/products",
    method: "get",
    params: data
  });
}
