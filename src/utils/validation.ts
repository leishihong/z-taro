// 手机号正则
export const patternTelephone = (value, cb) => {
  var reg = /^1((3[0-9]|4[57]|5[0-35-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$)/;
  if (reg.test(value)) {
      cb();
  } else {
      cb('请输入有效的电话号码');
  }
};
// 银行卡号正则
export const bankCode = (value, cb) => {
  var reg = /^([1-9]{1})(\d{14}|\d{15}|\d{18})$/;
  if (reg.test(value)) {
      cb();
  } else {
      cb('请输入正确的银行卡账号');
  }
};
// 密码正则
export const password = (value, cb) => {
  var reg = /^[A-Za-z0-9]{6,12}$/;
  if (reg.test(value)) {
      cb();
  } else {
      cb('请输入正确的密码格式');
  }
};
// 邮箱正则
export const isEmail = (value, cb) => {
  /* eslint-disable */
  const reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  if (reg.test(value)) {
      cb();
  } else {
      cb('请输入正确的邮箱');
  }
};
// 身份证正则
export const isIdCard = (value, cb) => {
  var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  if (reg.test(value)) {
      cb();
  } else {
      cb('请输入正确的身份证');
  }
};
