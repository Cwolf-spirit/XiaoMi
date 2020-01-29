import request from "@/http";
//获取购物车数据
export function getCartList(data) {
  return request({
    url: "/carts",
    method: "get",
    params: data
  });
}
//全选
export function toggleAll(url) {
  return request({
    url: url,
    method: "put"
  });
}
//更新状态
export function updateCart(id, data) {
  return request({
    url: `/carts/${id}`,
    method: "put",
    data
  });
}
//删除商品
export function deleteItem(id) {
  return request({
    url: `/carts/${id}`,
    method: "delete"
  });
}
