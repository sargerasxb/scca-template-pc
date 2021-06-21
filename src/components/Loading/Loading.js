import ReactDOM from "react-dom";
import "./loading.less";
import loadingSvg from "./loading.svg";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false });

let loadingEl = null;

const LoadingComponent = {
  getDom(text) {
    return (
      <div className="loading-wrap">
        <img
          src={loadingSvg}
          style={{
            display: "block",
            margin: "auto",
          }}
          width="48"
          height="48"
          alt=""
        />
        <p>{text}</p>
      </div>
    );
  },
  showLoading(text = "加载中...") {
    if (loadingEl) {
      return;
    }
    nprogress.start();

    const dom = this.getDom(text);
    loadingEl = document.createElement("div");
    loadingEl.className = "r-loading";
    document.body.appendChild(loadingEl);
    ReactDOM.render(dom, loadingEl);
  },
  hideLoading(isImmediate) {
    if (!loadingEl) return;

    const destroy = (_) => {
      try {
        document.body.removeChild(loadingEl);
        loadingEl = null;
      } catch {
        console.warn("dom has been deleted!");
      }
    };
    nprogress.done();

    if (isImmediate) {
      destroy();
    } else {
      loadingEl.classList.add(`leave`);
      setTimeout(destroy, 300);
    }
  },
};

export default LoadingComponent;
