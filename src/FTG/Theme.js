// theme

const colors = {
    darkBlue: '#0B3452',
    notice: '#FFB628',
    point: '#3CDC84',
    darkGreen: '#33C97E',
    primaryDark: '#219957',
    interactionNotice: '#FFB628',
    interactionError: '#FC3F3F',
    gray: '#81818A',
    lightGray: '#DCDCE5',
    darkGray: '#414141',
    darkGray1: '#555454',
    opacityGray: 'rgba(244,244,249,0.6)',
    grayscale1: '#fafafa',
    grayscale2: '#f6f6f6',
    grayscale3: '#EEEEEE',
    grayscale4: '#e4e4e4',
    grayscale5: '#dbdbdb',
    grayscale6: '#bdbdbd',
    grayscale7: '#999999',
    grayscale8: '#666666',
    grayscale9: '#333333',
    lightDarkGray: '#D7D7E1',
  
    fontBlack: '#1E1E20',
    fontBlue: '#0F61FD',
    fontRed: '#FF0000',
  
    backgroundGreen: '#F7F9FA',
    backgroundGray: '#F4F4F9',
  
    borderBlack: '#1E1E20',
    secondary: '#7471EE',
    secondary2: '#7471ee',
    secondary3: '#9099AA',
    secondary4: '#9099AA33',
  };
  
  const deviceSizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '450px',
    mobile: '576px',
    tabletS: '768px',
    tablet: '1024px',
    minDesktop: '1200px',
    maxDesktop: '1400px',
  };
  
  const device = {
    mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
    mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
    mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
    mobile: `only screen and (max-width: ${deviceSizes.mobile})`,
    tabletS: `only screen and (max-width: ${deviceSizes.tabletS})`,
    tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
    minDesktop: `only screen and (max-width: ${deviceSizes.minDesktop})`,
    maxDesktop: `only screen and (max-width: ${deviceSizes.maxDesktop})`,
    ratio: `only screen and (max-width: 1280px) and (min-aspect-ratio: 16/9),
    screen and (max-width: 1900px) and (min-aspect-ratio: 2/1)`,
  };
  
  const theme = {
    deviceSizes,
    colors,
    device,
  };
  
  export default theme;