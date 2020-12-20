// https://yeun.github.io/open-color/
const palette = {
  /* gray */
  gray0: '#F8F9FA',
  gray1: '#F1F3F5',
  gray2: '#E9ECEF',
  gray3: '#DEE2E6',
  gray4: '#CED4DA',
  gray5: '#ADB5BD',
  gray6: '#868E96',
  gray7: '#495057',
  gray8: '#343A40',
  gray9: '#212529',
  /* pink */
  pink0: '#fff0f6',
  pink1: '#ffdeeb',
  pink2: '#fcc2d7',
  pink3: '#faa2c1',
  pink4: '#f783ac',
  pink5: '#f06595',
  pink6: '#e64980',
  pink7: '#d6336c',
  pink8: '#c2255c',
  pink9: '#a61e4d',
};

export const darkModeBackground: {
  [key: string]: string;
} = {
  main: '#282c35',
  other: '#292f35',
};

export const commentColor: {
  [key: number]: {
    background: string;
    border: string;
  };
} = {
  1: {
    background: 'rgba(0, 0, 0, 0.016)',
    border: '1px solid rgba(0, 0, 0, 0.02)',
  },
  2: {
    background: palette.gray0,
    border: `1px solid ${palette.gray1}`,
  },
};

export const buttonColorMap: {
  [key: string]: {
    background: string;
    color: string;
    hoverBackground: string;
  };
} = {
  darkGray: {
    background: palette.gray7,
    color: 'white',
    hoverBackground: palette.gray6,
  },
  pink: {
    background: palette.pink5,
    color: 'white',
    hoverBackground: palette.pink4,
  },
};

export default palette;
