import request from "@/http";
//产品
export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  });
}
