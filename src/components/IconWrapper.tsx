import Icon from "@mui/material/Icon";

const IconWrapper = ({ src, style = {} }: { src: string; style: React.CSSProperties }) => {
  return (
    <Icon style={style}>
      <img alt={src} style={{ height: "100%", width: "100%" }} src={src} />
    </Icon>
  );
};

export default IconWrapper;
