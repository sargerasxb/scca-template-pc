import { Input, Button, message, Select } from "antd";
import { useState, useEffect } from "react";
import { IS_MOBILE } from "./utils/util";

const { Option } = Select;

function App() {
  // const { origin, hash } = window.location;
  // const baseUrl = origin + (hash ? "/#/" : "");

  const baseUrl = `http://172.18.89.50:9005/#/`;
  const [contractId, setContractId] = useState("");
  const [shouldDialogShow, setDialogShow] = useState(false);
  const [frameSrc, setFrameSrc] = useState("#");
  const [tag, setTag] = useState(1);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [urlPrefix, setUrlPrefix] = useState("http://");
  const [arys, setArys] = useState([]);

  const urlMap = {
    1: baseUrl + "e-signature?contractId=" + contractId + "&credential=123",
    2: baseUrl + "check-contract?contractId=" + contractId + "&credential=123",
  };

  const styleMap = {
    1: {
      width: `800px`,
      height: `530px`,
      borderRadius: "6x",
      overflow: "hidden",
    },
    2: {
      width: `375px`,
      height: `667px`,
      borderRadius: "6x",
      overflow: "hidden",
    },
  };

  const reciever = (e) => {
    const line = { msg: e.data, time: new Date().toLocaleString() };
    arys.push(line);
    setArys([...arys]);
  };

  useEffect(() => {
    window.top.changeFrameSrc = (url) => {
      setFrameSrc(url);
    };
    window.addEventListener("message", reciever);
    return () => window.removeEventListener("message", reciever);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStyle = (tag) => styleMap[tag];

  const confirm = (tag) => {
    if (!contractId) return message.error("请输入合同ID");
    if (IS_MOBILE) {
      const url = urlPrefix + redirectUrl;
      window.location.href =
        urlMap[tag] + (redirectUrl ? `&_redirect=${url}` : "");
    } else {
      setTag(tag);
      setDialogShow(true);
      setFrameSrc(urlMap[tag]);
    }
  };

  const styleObj = {
    position: `fixed`,
    width: `100%`,
    height: `100%`,
    background: `rgba(0,0,0,.5)`,
    top: `0`,
    left: `0`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  };

  const handleWrapClick = (e) => {
    setDialogShow(false);
  };

  const selectBefore = (
    <Select
      defaultValue="http://"
      className="select-before"
      onChange={(e) => setUrlPrefix(e)}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  const root = IS_MOBILE ? (
    <div style={{ padding: "1.2rem", marginTop: "10vh" }}>
      <div>
        <Input
          placeholder="合同号"
          style={{ width: "100%" }}
          size="large"
          onChange={(e) => setContractId(e.target.value)}
        />
      </div>
      <div>
        <Input
          placeholder="签署成功回调地址"
          style={{ width: "100%", marginTop: ".5rem" }}
          size="large"
          addonBefore={selectBefore}
          onChange={(e) => setRedirectUrl(e.target.value)}
        />
      </div>
      <Button
        type="primary"
        size="large"
        style={{ width: "100%", marginTop: "1.5rem" }}
        onClick={() => confirm(2)}
      >
        公众号测试
      </Button>
    </div>
  ) : (
    <div
      className="App"
      style={{
        width: `800px`,
        margin: "auto",
        paddingTop: "150px",
        justifyContent: "center",
      }}
    >
      <div>
        <Input
          placeholder="输入合同号"
          style={{ width: "300px" }}
          onChange={(e) => setContractId(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => confirm(1)}
          style={{ marginLeft: "20px" }}
        >
          PC测试
        </Button>
        <Button
          type="primary"
          onClick={() => confirm(2)}
          style={{ marginLeft: "20px" }}
        >
          公众号测试
        </Button>
      </div>
      {shouldDialogShow ? (
        <div style={styleObj} onClick={handleWrapClick}>
          <iframe title="test" src={frameSrc} style={getStyle(tag)}>
            {" "}
          </iframe>
        </div>
      ) : null}

      <ul style={{ marginTop: "32px" }}>
        {arys.map((v, index) => (
          <li key={index}>{`时间：${v.time}，消息：${v.msg}`}</li>
        ))}
      </ul>
    </div>
  );

  return root;
}

export default App;
