
let routerArr = [
  ["/product", () => import("@/project/product/product.vue"), { title: "Product", requiresAuth: false }, 'product'],
  ["/orderForm", () => import("@/project/order/order-form.vue"), { title: "Prder", requiresAuth: false }, 'orderForm'],
];


let routerOutputResult = [];
routerArr.forEach(itemArr => {
  let resObj = {
    path : itemArr[0],
    name : itemArr[3],
    component: itemArr[1],
    meta : itemArr[2]
  }
  routerOutputResult.push(resObj);
});
routerOutputResult.push({path : "/",redirect : '/product'});
routerOutputResult.push({path : "/*",redirect : '/product'});
export default routerOutputResult;
