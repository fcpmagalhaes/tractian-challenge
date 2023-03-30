export type SizeTypes = keyof typeof sizes;

export const sizes = {
  xs: '12px',
  s: '14px',
  m: '16px',
  xm: '18px',
  l: '22px',
  xl: '30px',
  xxl: '35px',
};

export const mobileSizes = {
  s: '15px',
  m: '20px',
  l: '27px',
  xl: '32px',
};

export const fonts = {
  biryani: '"Biryani", sans-serif',
  roboto: '"Roboto", sans-serif',
};

export default {
  fonts,
  sizes,
  mobileSizes,
};
