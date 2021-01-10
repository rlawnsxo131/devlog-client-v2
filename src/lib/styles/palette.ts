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
  /* red */
  red0: '#fff5f5',
  red1: '#ffe3e3',
  red2: '#ffc9c9',
  red3: '#ffa8a8',
  red4: '#ff8787',
  red5: '#ff6b6b',
  red6: '#fa5252',
  red7: '#f03e3e',
  red8: '#e03131',
  red9: '#c92a2a',
  /* indigo */
  indigo0: '#edf2ff',
  indigo1: '#dbe4ff',
  indigo2: '#bac8ff',
  indigo3: '#91a7ff',
  indigo4: '#748ffc',
  indigo5: '#5c7cfa',
  indigo6: '#4c6ef5',
  indigo7: '#4263eb',
  indigo8: '#3b5bdb',
  indigo9: '#364fc7',
};

export const darkmodeBackground = {
  main: '#282c35',
  other: '#292f35',
};

export const commentColor: {
  [key: number]: {
    background: string;
  };
} = {
  1: {
    background: 'rgba(0, 0, 0, 0.016)',
  },
  2: {
    background: 'rgba(0, 0, 0, 0.020)',
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
  red: {
    background: palette.red5,
    color: 'white',
    hoverBackground: palette.red4,
  },
  indigo: {
    background: palette.indigo5,
    color: 'white',
    hoverBackground: palette.indigo4,
  },
};

export default palette;
