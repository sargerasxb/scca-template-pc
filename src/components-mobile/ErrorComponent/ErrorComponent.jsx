import { memo } from "react";
import MobileLayoutComponent from "@/components-mobile/MobileLayout/MobileLayout";
import { Button } from "antd";

const svgMap = {};
const files = require.context("./", false, /.svg$/);

files.keys().forEach((key) => {
  svgMap[key.replace(/\.\/(.*)\.svg/, "$1")] = files(key).default;
});

export default memo((props) => {
  const { showFixedFooter, handleclick, type, message } = props;

  const svg = svgMap[type];
  const fixedFooter = showFixedFooter ? (
    <div className="m-foot fix-footer">
      <Button
        className="m-btn error"
        style={{ width: "100%" }}
        onClick={() => handleclick && handleclick()}
      >
        返回
      </Button>
    </div>
  ) : null;

  return (
    <MobileLayoutComponent
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        zIndex: 10,
        background: "#fff",
      }}
    >
      <div
        style={{
          height: `calc(100vh - 3.6rem)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-2rem",
          fontSize: "1.1rem",
          flexDirection: "column",
        }}
      >
        <img
          src={svg}
          alt=""
          style={{
            userSelect: "none",
            display: "block",
            width: "25vw",
          }}
        />
        <div
          style={{
            marginTop: "30px",
            color: "#999999",
          }}
        >
          {message}
        </div>
      </div>
      {fixedFooter}
    </MobileLayoutComponent>
  );
});
