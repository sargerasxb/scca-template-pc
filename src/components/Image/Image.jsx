import { memo, useState } from "react";

const staticSrc = "#none";

export default memo((props) => {
  const { alt, src, onError, loadSrc, width, height } = props;
  const [href, setHref] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  const onComponentError = () => {
    if (isLoaded) return;
    if (typeof onError === "function") {
      onError();
    }

    setHref(loadSrc || staticSrc);
    setIsLoaded(true);
  };
  return (
    <img
      src={href}
      alt={alt}
      width={width}
      height={height}
      onError={onComponentError}
    />
  );
});
