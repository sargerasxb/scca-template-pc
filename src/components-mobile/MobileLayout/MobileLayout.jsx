import "./index.less";

export default function MobileLayout(props) {
  return (
    <div className="m-wrap" style={props.style || null}>
      {props.children}
    </div>
  );
}
