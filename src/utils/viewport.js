import { IS_MOBILE } from "./util";

function changeView() {
  const defaultWidth = 375;
  const { width, height } = window.screen;
  let ratio = Math.min(height, width) / defaultWidth;
  ratio = ratio > 1.3 ? 1.3 : ratio;
  let meta = document.querySelector("meta[name=viewport]");
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "viewport");
    document.head.appendChild(meta);
  }
  meta.setAttribute(
    "content",
    `initial-scale=${ratio}, maximum-scale=${ratio}, minimum-scale=${ratio}, user-scalable=no`
  );
}

if (IS_MOBILE) {
  changeView();
  window.addEventListener("orientationchange", changeView);
  window.addEventListener("resize", changeView);
}
