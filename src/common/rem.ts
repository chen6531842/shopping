/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-06-18 10:08:20
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-06-23 19:33:50
 */
function rem() {
  const docEl = document.documentElement;
  const resizeEvt =
    "orientationchange" in window ? "orientationchange" : "resize";
  // var _this = this;
  const reFn = function() {
    const clientWidth = docEl.clientWidth;
    let width;
    if (clientWidth < 750) {
      width = clientWidth;
    } else {
      width = 750;
    }
    docEl.style.fontSize = 100 * (width / 750) + "px";
    // _this.fontSize = 100 * (width / 750);
  };
  reFn();
  window.addEventListener(resizeEvt, reFn, false);
  document.addEventListener("DOMContentLoaded", reFn, false);
}

export default rem;
