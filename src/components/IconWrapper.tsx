import Icon from '@mui/material/Icon';

const IconWrapper = ({ src }: { src: string }) => {
  return (
    <Icon>
      <img alt={src} style={{ height: '100%', width: '100%' }} src={src} />
    </Icon>
  );
};

export default IconWrapper;
