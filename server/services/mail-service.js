import nodemailer from 'nodemailer';
// nodemailer 로 gmail transport 생성하기

const user = process.env.EMAIL_CERTIFICATION_USER;
const pass = process.env.EMAIL_CERTIFICATION_PASS;

async function sendMail(email, mailHashedCode) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });
  const mailOptions = {
    from: '[FUT.COM] <futdotcom@gmail.com>',
    to: email,
    subject: '풋닷컴 인증코드입니다',
    text: `인증코드입니다! 해당 코드를 회원가입 페이지에 입력해주세요!\n${mailHashedCode}`,
    html: `
    <div style="text-align: center;">
      <h3 style="color: #FA5882">FUT.COM</h3>
      <br />
      <p>인증코드입니다! 해당 코드를 회원가입 페이지에 입력해주세요!\n</p>
      <p style="color: red">${mailHashedCode}</p>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      return err;
    } else {
      return result;
    }
  });
}

async function makeCode() {
  const randomCode = Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart(6, '0');

  return randomCode;
}
async function verifyCode(code, getCode) {
  let result = {};
  if (`\"${code}\"` === getCode) {
    result = {
      result: 'success',
      message: `사용자가 입력한 ${code}와 서버의 ${getCode}가 일치합니다.`,
    };
  } else {
    result = {
      result: 'fail',
      message: `사용자가 입력한 ${code}와 서버의 ${getCode}가 불일치합니다.`,
    };
  }
  return result;
}
export { makeCode, sendMail, verifyCode };
