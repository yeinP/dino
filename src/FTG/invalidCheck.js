function invalidCheck(invalids, setInvalids, name, value) {
    const nameCheck = /^[0-9가-힣a-zA-Z\s_]*$/;
    const realNameCheck = /^[가-힣a-zA-Z]*$/;
    const phoneCheck = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
    const emailCheck =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    const accountIdCheck = /^[0-9]{0,15}/;
    const otpNumberCheck = /^[0-9]{6}/;
    const slackCheck = 'hooks.slack.com/services';
  
    switch (name) {
        case 'email':
            if (!emailCheck.test(value)) {
              setInvalids({
                ...invalids,
                email: {
                  invalid: true,
                  text: 'findPassword.notCorrectEmail',
                },
              });
            } else {
              setInvalids({
                ...invalids,
                email: {
                  invalid: false,
                  text: '',
                },
              });
            }
            break;
          case 'code':
            if (value.length === 0) {
              setInvalids({
                ...invalids,
                code: {
                  invalid: true,
                  text: 'findPassword.plzInput',
                },
              });
            } else if (value.length !== 6 || !otpNumberCheck.test(value.toString())) {
              setInvalids({
                ...invalids,
                code: {
                  invalid: true,
                  text: 'findPassword.otpInsert',
                },
              });
            } else {
              setInvalids({
                ...invalids,
                code: {
                  invalid: false,
                  text: '',
                },
              });
            }
            break;
      case 'name':
        if (!realNameCheck.test(value)) {
          setInvalids({
            ...invalids,
            name: {
              invalid: true,
              text: 'signUp.onlyCharacters',
            },
          });
        } else if (
          value.toLowerCase() === 'admin' ||
          value === '관리자' ||
          value === '파인더갭' ||
          value.toLowerCase() === '파인더갭admin' ||
          value.toLowerCase() === 'findthegap'
        ) {
          setInvalids({
            ...invalids,
            name: {
              invalid: true,
              text: 'signUp.notCorrectName',
            },
          });
        } else if (value.length === 0) {
          setInvalids({
            ...invalids,
            name: {
              invalid: true,
              text: 'signUp.realNameRequired',
            },
          });
        } else if (value.length < 2) {
          setInvalids({
            ...invalids,
            name: {
              invalid: true,
              text: '최소 2자를 입력해야 합니다.',
            },
          });
        } else {
          setInvalids({
            ...invalids,
            name: {
              invalid: false,
              text: 'signUp.realNameAlertInfo',
            },
          });
        }
        break;
      case 'phoneNumber':
        if (value.length === 0) {
          setInvalids({
            ...invalids,
            phoneNumber: {
              invalid: true,
              text: 'signUp.phoneNumRequired',
            },
          });
        } else if (!phoneCheck.test(value)) {
          setInvalids({
            ...invalids,
            phoneNumber: {
              invalid: true,
              text: 'signUp.notCorrectPhoneNum',
            },
          });
        } else if (
          value.includes('-') ||
          (value.length > 0 && value.length < 9) ||
          value.length > 15
        ) {
          setInvalids({
            ...invalids,
            phoneNumber: {
              invalid: true,
              text: 'signUp.notCorrectPhoneNum',
            },
          });
        } else {
          setInvalids({
            ...invalids,
            phoneNumber: {
              invalid: false,
              text: '',
            },
          });
        }
        break;
      case 'businessEmail':
        if (value.length === 0) {
          setInvalids({
            ...invalids,
            businessEmail: {
              invalid: true,
              text: 'setting.nav.myAccount.emailRequired',
            },
          });
        } else if (!emailCheck.test(value)) {
          setInvalids({
            ...invalids,
            businessEmail: {
              invalid: true,
              text: 'signUp.notCorrectEmail',
            },
          });
        } else {
          setInvalids({
            ...invalids,
            businessEmail: {
              invalid: false,
              text: '',
            },
          });
        }
        break;
      case 'displayName':
        if (value.length > 21) {
          setInvalids({
            ...invalids,
            displayName: {
              invalid: true,
              text: 'signUp.lessThan20',
            },
          });
        } else if (
          value.toLowerCase() === 'admin' ||
          value === '관리자' ||
          value === '파인더갭' ||
          value.toLowerCase() === '파인더갭admin' ||
          value.toLowerCase() === 'findthegap'
        ) {
          setInvalids({
            ...invalids,
            displayName: {
              invalid: true,
              text: 'signUp.notCorrectNickname',
            },
          });
        } else if (!nameCheck.test(value)) {
          setInvalids({
            ...invalids,
            displayName: {
              invalid: true,
              text: 'signUp.charactersAndDigit',
            },
          });
        } else if (value.length === 0) {
          setInvalids({
            ...invalids,
            displayName: {
              invalid: true,
              text: 'signUp.nicknameRequired',
            },
          });
        } else if (value.length < 2) {
          setInvalids({
            ...invalids,
            displayName: {
              invalid: true,
              text: 'signUp.nicknameLength',
            },
          });
        } else {
          setInvalids({
            ...invalids,
            displayName: {
              invalid: false,
              text: 'signUp.nickNameAlertInfo',
            },
          });
        }
        break;
      case 'realName':
        if (!realNameCheck.test(value)) {
          setInvalids({
            ...invalids,
            realName: {
              invalid: true,
              text: 'signUp.charactersAndDigit.',
            },
          });
        } else if (
          value.toLowerCase() === 'admin' ||
          value === '관리자' ||
          value === '파인더갭' ||
          value.toLowerCase() === '파인더갭admin' ||
          value.toLowerCase() === 'findthegap'
        ) {
          setInvalids({
            ...invalids,
            realName: {
              invalid: true,
              text: 'signUp.notCorrectName',
            },
          });
        } else if (value.length === 0) {
          setInvalids({
            ...invalids,
            realName: {
              invalid: true,
              text: 'signUp.realNamePlaceholder',
            },
          });
        } else {
          setInvalids({
            ...invalids,
            realName: {
              invalid: false,
              text: 'signUp.realNameAlertInfo',
            },
          });
        }
        break;
      case 'accountId':
        if (value.length === 0) {
          setInvalids({
            ...invalids,
            accountId: {
              invalid: true,
              text: 'setting.nav.myAccount.accountRequired',
            },
          });
        } else if (!accountIdCheck.test(value)) {
          setInvalids({
            ...invalids,
            accountId: {
              invalid: true,
              text: 'setting.nav.myAccount.notCorrectAccount',
            },
          });
        } else if (
          value.includes('-') ||
          (value.length > 0 && value.length < 10) ||
          value.length > 15
        ) {
          setInvalids({
            ...invalids,
            accountId: {
              invalid: true,
              text: 'setting.nav.myAccount.notCorrectAccount',
            },
          });
        } else {
          setInvalids({
            ...invalids,
            accountId: {
              invalid: false,
              text: '',
            },
          });
        }
        break;
      case 'otpNumber':
        if (value.length === 0) {
          setInvalids({
            ...invalids,
            otpNumber: {
              invalid: true,
              text: 'setting.nav.myAccount.otpRequired',
            },
          });
        } else if (value.length === 6 && !otpNumberCheck.test(value.toString())) {
          setInvalids({
            ...invalids,
            otpNumber: {
              invalid: true,
              text: 'setting.nav.myAccount.notCorrectOtp',
            },
          });
        } else {
          setInvalids({
            ...invalids,
            otpNumber: {
              invalid: false,
              text: '',
            },
          });
        }
        break;
      case 'slackUrl':
        if (value.length === 0) {
          setInvalids({
            ...invalids,
            slack: {
              invalid: true,
              text: 'setting.nav.myAccount.otpRequired',
            },
          });
        } else if (
          !value.toString().toUpperCase().includes(slackCheck.toUpperCase())
        ) {
          setInvalids({
            ...invalids,
            slack: {
              invalid: true,
              text: 'setting.nav.myAccount.notCorrectOtp',
            },
          });
        } else {
          setInvalids({
            ...invalids,
            slack: {
              invalid: false,
              text: '',
            },
          });
        }
        break;
      default:
        break;
    }
  }
  
  export default invalidCheck;