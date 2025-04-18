import {hex2RgbA} from './helpers/Utils';
import {useSelector} from 'react-redux';

const useCustomStyles = () => {
  const display = useSelector(state => state.display);

  const normal = display.darkMode ? '#e2e8f0' : '#000000';
  const blue = display.darkMode ? '#2196F3' : '#0d6efd';
  const indigo = display.darkMode ? '#9FA8DA' : '#6610f2';
  const purple = display.darkMode ? '#B39DDB' : '#a945e3';
  const pink = display.darkMode ? '#F48FB1' : '#d63384';
  const red = display.darkMode ? '#EF9A9A' : '#dc3545';

  const orange = '#fd7e14';
  const yellow = '#ffc107';
  const green = '#198754';
  const teal = '#20c997';
  const cyan = '#0dcaf0';
  const black = '#000';
  const white = '#fff';
  const gray = '#6c757d';
  const grayDark = '#343a40';
  const gray100 = '#f8f9fa';
  const gray200 = '#e9ecef';
  const gray300 = '#dee2e6';
  const gray400 = '#ced4da';
  const gray500 = '#adb5bd';
  const gray600 = '#6c757d';
  const gray700 = '#495057';
  const gray800 = '#343a40';
  const gray900 = '#212529';
  const primary = '#0d6efd';
  const secondary = display.darkMode ? '#94a3b8' : '#6c757d';
  const success = '#198754';
  const info = '#0dcaf0';
  const warning = '#ffc107';
  const danger = '#dc3545';
  const light = '#f8f9fa';
  const dark = display.darkMode ? '#1f293b' : '#212529';
  const bodyFontSize = '1rem';
  const bodyFontWeight = 400;
  const bodyLineHeight = 1.5;
  const bodyColor = '#212529';
  const bodyBg = display.darkMode ? '#000000' : '#FFFFFF';
  const borderWidth = '1px';
  const borderStyle = 'solid';
  const borderColor = '#dee2e6';
  const borderColorTranslucent = 'rgba(0, 0, 0, 0.175)';
  const borderRadius = '0.375rem';
  const borderRadiusSm = '0.25rem';
  const borderRadiusLg = '0.5rem';
  const borderRadiusXl = '1rem';
  const borderRadius2xl = '2rem';
  const borderRadiusPill = '50rem';
  const linkColor = '#0d6efd';
  const linkHoverColor = '#0a58ca';
  const codeColor = '#d63384';
  const highlightBg = '#fff3cd';
  const shadowColor = display.darkMode ? '#FFFFFF' : '#000000';

  const borderLight = display.darkMode ? '#2b3647' : '#EAE9EA';
  const bgLight = display.darkMode ? '#1f293b' : '#f2f2f6';
  const bgMain = display.darkMode ? '#0d172a' : 'white';
  const bgSuccess = display.darkMode ? success : 'green';
  const bgCard = display.darkMode ? '#334155' : 'white';
  const body = '#fff3cd';
  const muted = '#495057';
  const black50 = '#000000';
  const white50 = '#ffffff';

  return {
    borderLightColor: borderLight,
    bgMainColor: bgMain,
    bgSuccessColor: bgSuccess,
    bgLightColor: bgLight,
    textNormalColor: normal,
    textPrimaryColor: primary,
    textSecondaryColor: secondary,
    textWhiteColor: white,
    textDangerColor: danger,
    w40: {
      width: 40,
    },
    w40Circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    flexGrow1: {
      flex: 1,
    },
    textNormal: {
      fontSize: 16,
      color: normal,
    },
    textPrimary: {
      color: primary,
    },
    textPurple: {
      color: purple,
    },
    textSecondary: {
      color: secondary,
    },
    textSuccess: {
      color: success,
    },
    textInfo: {
      color: info,
    },
    textWarning: {
      color: warning,
    },
    textDanger: {
      color: danger,
    },
    textLight: {
      color: light,
    },
    textDark: {
      color: dark,
    },
    textBlack: {
      color: black,
    },
    textWhite: {
      color: white,
    },
    textBody: {
      color: body,
    },
    textMuted: {
      color: muted,
    },
    textBlack50: {
      color: black50,
    },
    textWhite50: {
      color: white50,
    },
    textCenter: {
      textAlign: 'center',
    },
    textOpacity: {
      25: {
        opacity: 0.25,
      },
      50: {
        opacity: 0.5,
      },
      75: {
        opacity: 0.75,
      },
      100: {
        opacity: 1,
      },
    },
    textUpperCase: {
      textTransform: 'uppercase',
    },
    small: {
      fontSize: 12,
    },
    smaller: {
      fontSize: 10,
    },
    bgPrimary: {backgroundColor: '#0c5ed7'},
    bgSecondary: {backgroundColor: secondary},
    bgSecondaryOpacity25: {
      backgroundColor: hex2RgbA(secondary, 0.25),
    },
    bgSuccess: {backgroundColor: 'rgba(40,167,69,1)'},
    bgInfo: {backgroundColor: 'rgba(23,162,184,1)'},
    bgWarning: {backgroundColor: 'rgba(255,193,7,1)'},
    bgDanger: {backgroundColor: 'rgba(220,53,69,1)'},
    bgLight: {
      backgroundColor: bgLight,
    },
    bgCard: {
      backgroundColor: bgCard,
    },
    bgMain: {
      backgroundColor: bgMain,
    },
    bgDark: {
      backgroundColor: dark,
    },
    bgBlack: {
      backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    bgWhite: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    bgBody: {
      backgroundColor: bodyBg,
      // use the following line to set the opacity
      // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    bgTransparent: {
      backgroundColor: 'transparent',
    },
    card: {
      backgroundColor: bgMain,
      borderRadius: 12,
      paddingVertical: 8,
      paddingLeft: 12,
    },
    cardBody: {
      paddingRight: 12,
    },
    cardHr: {
      width: '100%',
      height: 0.5,
      backgroundColor: borderLight,
      marginVertical: 6,
    },
    m0: {
      margin: 0,
    },
    m1: {
      margin: 0.25,
    },
    m2: {
      margin: 0.5,
    },
    m3: {
      margin: 1,
    },
    m4: {
      margin: 1.5,
    },
    m5: {
      margin: 3,
    },
    mAuto: {
      margin: 'auto',
    },
    mx0: {
      marginRight: 0,
      marginLeft: 0,
    },
    mx1: {
      marginRight: 0.25,
      marginLeft: 0.25,
    },
    mx2: {
      marginRight: 0.5,
      marginLeft: 0.5,
    },
    mx3: {
      marginRight: 1,
      marginLeft: 1,
    },
    mx4: {
      marginRight: 16,
      marginLeft: 16,
    },
    mx5: {
      marginRight: 3,
      marginLeft: 3,
    },
    mxAuto: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    my0: {
      marginTop: 0,
      marginBottom: 0,
    },
    my1: {
      marginTop: 4,
      marginBottom: 4,
    },
    my2: {
      marginTop: 8,
      marginBottom: 8,
    },
    my3: {
      marginTop: 1,
      marginBottom: 1,
    },
    my4: {
      marginTop: 16,
      marginBottom: 16,
    },
    my5: {
      marginTop: 20,
      marginBottom: 20,
    },
    myAuto: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    mt0: {
      marginTop: 0,
    },
    mt1: {
      marginTop: 4,
    },
    mt2: {
      marginTop: 8,
    },
    mt3: {
      marginTop: 12,
    },
    mt4: {
      marginTop: 16,
    },
    mt5: {
      marginTop: 20,
    },
    mtAuto: {
      marginTop: 'auto',
    },
    me0: {
      marginRight: 0,
    },
    me1: {
      marginRight: 4,
    },
    me2: {
      marginRight: 8,
    },
    me3: {
      marginRight: 12,
    },
    me4: {
      marginRight: 16,
    },
    me5: {
      marginRight: 20,
    },
    meAuto: {
      marginRight: 'auto',
    },
    mb0: {
      marginBottom: 0,
    },
    mb1: {
      marginBottom: 4,
    },
    mb2: {
      marginBottom: 8,
    },
    mb3: {
      marginBottom: 12,
    },
    mb4: {
      marginBottom: 16,
    },
    mb5: {
      marginBottom: 20,
    },
    mbAuto: {
      marginBottom: 'auto',
    },
    ms0: {
      marginLeft: 0,
    },
    ms1: {
      marginLeft: 4,
    },
    ms2: {
      marginLeft: 8,
    },
    ms3: {
      marginLeft: 12,
    },
    ms4: {
      marginLeft: 14,
    },
    ms5: {
      marginLeft: 16,
    },
    msAuto: {
      marginLeft: 'auto',
    },
    p0: {
      padding: 0,
    },
    py_0: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    py_1: {
      paddingTop: 0.25,
      paddingBottom: 0.25,
    },
    py_2: {
      paddingTop: 0.5,
      paddingBottom: 0.5,
    },
    py_3: {
      paddingTop: 1,
      paddingBottom: 1,
    },
    py_4: {
      paddingTop: 1.5,
      paddingBottom: 1.5,
    },
    py_5: {
      paddingTop: 3,
      paddingBottom: 3,
    },
    pt_0: {
      paddingTop: 0,
    },
    pt_1: {
      paddingTop: 0.25,
    },
    p1: {
      padding: 4,
    },
    p2: {
      padding: 8,
    },
    p3: {
      padding: 12,
    },
    p4: {
      padding: 16,
    },
    p5: {
      padding: 20,
    },
    px0: {
      paddingHorizontal: 0,
    },
    px1: {
      paddingHorizontal: 4,
    },
    px2: {
      paddingHorizontal: 8,
    },
    px3: {
      paddingHorizontal: 12,
    },
    px4: {
      paddingHorizontal: 16,
    },
    px5: {
      paddingHorizontal: 20,
    },
    py0: {
      paddingVertical: 0,
    },
    py1: {
      paddingVertical: 4,
    },
    py2: {
      paddingVertical: 8,
    },
    py3: {
      paddingVertical: 12,
    },
    py4: {
      paddingVertical: 16,
    },
    py5: {
      paddingVertical: 20,
    },
    pt0: {
      paddingTop: 0,
    },
    pt1: {
      paddingTop: 4,
    },
    pt2: {
      paddingTop: 8,
    },
    pt3: {
      paddingTop: 12,
    },
    pt4: {
      paddingTop: 16,
    },
    pt5: {
      paddingTop: 20,
    },
    pe0: {
      paddingRight: 0,
    },
    pe1: {
      paddingRight: 0.25,
    },
    pe2: {
      paddingRight: 0.5,
    },
    pe3: {
      paddingRight: 1,
    },
    pe4: {
      paddingRight: 16,
    },
    pe5: {
      paddingRight: 3,
    },
    pb0: {
      paddingBottom: 0,
    },
    pb1: {
      paddingBottom: 0.25,
    },
    pb2: {
      paddingBottom: 0.5,
    },
    pb3: {
      paddingBottom: 1,
    },
    pb4: {
      paddingBottom: 1.5,
    },
    pb5: {
      paddingBottom: 3,
    },
    ps0: {
      paddingLeft: 0,
    },
    ps1: {
      paddingLeft: 4,
    },
    ps2: {
      paddingLeft: 8,
    },
    ps3: {
      paddingLeft: 12,
    },
    ps4: {
      paddingLeft: 16,
    },
    ps5: {
      paddingLeft: 3,
    },
    rounded: {
      borderRadius: 6,
    },
    'rounded-0': {
      borderRadius: 0,
    },
    'rounded-1': {
      borderRadius: 2,
    },
    'rounded-2': {
      borderRadius: 4,
    },
    'rounded-3': {
      borderRadius: 6,
    },
    'rounded-4': {
      borderRadius: 8,
    },
    'rounded-5': {
      borderRadius: 10,
    },
    'rounded-circle': {
      borderRadius: '50%',
    },
    'rounded-pill': {
      borderRadius: 12,
    },
    'rounded-top': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    },
    'rounded-end': {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    },
    'rounded-bottom': {
      borderBottomRightRadius: 6,
      borderBottomLeftRadius: 6,
    },
    'rounded-start': {
      borderBottomLeftRadius: 6,
      borderTopLeftRadius: 6,
    },
    border: {
      borderWidth: 1,
      borderStyle: 'solid',
    },
    border0: {
      borderWidth: 0,
    },
    borderTop: {
      borderTopWidth: 1,
      borderTopStyle: 'solid',
    },
    borderTop0: {
      borderTopWidth: 0,
    },
    borderEnd: {
      borderRightWidth: 1,
      borderRightStyle: 'solid',
    },
    borderEnd0: {
      borderRightWidth: 0,
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
    },
    borderBottom0: {
      borderBottomWidth: 0,
    },
    borderStart: {
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
      borderLeftColor: '#000',
    },
    borderStart0: {
      borderLeftWidth: 0,
    },
    borderPrimary: {
      borderWidth: 1,
    },
    borderSecondary: {
      borderColor: hex2RgbA(secondary, 0.25),
    },
    borderSuccess: {
      borderColor: 'your-success-color',
    },
    borderInfo: {
      borderColor: 'your-info-color',
    },
    borderWarning: {
      borderColor: 'your-warning-color',
    },
    borderDanger: {
      borderColor: 'red',
    },
    borderLight: {
      borderColor: borderLight,
    },
    borderDark: {
      borderColor: 'your-dark-color',
    },
    borderWhite: {
      borderColor: '#fff',
    },
    border1: {
      borderWidth: 1,
    },
    border2: {
      borderWidth: 2,
    },
    border3: {
      borderWidth: 3,
    },
    border4: {
      borderWidth: 4,
    },
    border5: {
      borderWidth: 5,
    },
    borderOpacity10: {
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    borderOpacity25: {
      borderColor: 'rgba(0, 0, 0, 0.25)',
    },
    borderOpacity50: {
      borderColor: 'rgba(0, 0, 0, 0.5)',
    },
    borderOpacity75: {
      borderColor: 'rgba(0, 0, 0, 0.75)',
    },
    borderOpacity100: {
      borderColor: 'rgba(0, 0, 0, 1)',
    },
    dFlex: {
      flexDirection: 'row',
    },
    flexColumn: {
      flexDirection: 'column',
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    justifyContentEnd: {
      justifyContent: 'flex-end',
    },
    alignSelfStart: {
      alignSelf: 'flex-start',
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    alignItemsEnd: {
      alignItems: 'flex-end',
    },
    alignItemsBetween: {
      alignItems: 'space-between',
    },
    fs1: {
      fontSize: 28,
    },
    fs2: {
      fontSize: 26,
    },
    fs3: {
      fontSize: 24,
    },
    fs4: {
      fontSize: 22,
    },
    fs5: {
      fontSize: 20,
    },
    fs6: {
      fontSize: 18,
    },
    gap1: {
      gap: 4,
    },
    gap2: {
      gap: 8,
    },
    gap3: {
      gap: 12,
    },
    gap4: {
      gap: 16,
    },
    gap5: {
      gap: 20,
    },
    fstItalic: {
      fontStyle: 'italic',
    },
    fstNormal: {
      fontStyle: 'normal',
    },
    fwLight: {
      fontWeight: '300',
    },
    fwLighter: {
      fontWeight: '100',
    },
    fwNormal: {
      fontWeight: '400',
    },
    fwBold: {
      fontWeight: '700',
    },
    fwSemiBold: {
      fontWeight: '600',
    },
    fwBolder: {
      fontWeight: '800',
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '400',
      borderWidth: 1,
      borderColor: 'transparent',
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontSize: 16,
      borderRadius: 4,
      minHeight: 48,
    },
    btnBlock: {
      width: '100%',
    },
    btnCircleRounded: {
      borderRadius: 24,
    },
    btnPrimary: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
    },
    btnSecondary: {
      backgroundColor: '#6c757d',
      borderColor: '#6c757d',
    },
    btnInfo: {
      backgroundColor: '#17a2b8',
      borderColor: '#17a2b8',
    },
    btnWarning: {
      backgroundColor: '#ffc107',
      borderColor: '#ffc107',
    },
    btnDanger: {
      backgroundColor: '#dc3545',
      borderColor: '#dc3545',
    },
    btnLight: {
      backgroundColor: bgLight,
      borderColor: bgLight,
    },
    btnDark: {
      backgroundColor: '#343a40',
      borderColor: '#343a40',
    },
    btnOutlinePrimary: {
      borderColor: '#007bff',
    },
    btnOutlineSecondary: {
      borderColor: '#6c757d',
    },
    btnOutlineSuccess: {
      borderColor: '#28a745',
    },
    btnOutlineInfo: {
      borderColor: '#17a2b8',
    },
    btnOutlineWarning: {
      borderColor: '#ffc107',
    },
    btnOutlineDanger: {
      borderColor: '#dc3545',
    },
    btnOutlineLight: {
      borderColor: '#f8f9fa',
    },
    btnOutlineDark: {
      borderColor: '#343a40',
    },
    btnLink: {
      textDecorationLine: 'none',
    },
    btnLg: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      fontSize: 20,
      lineHeight: 30,
      borderRadius: 6,
    },
    btnGroupLg: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 6,
    },
    btnSm: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 14,
      lineHeight: 21,
      borderRadius: 3,
    },
    btnGroupSm: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 3,
    },
    shadow: {
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  };
};

export default useCustomStyles;
