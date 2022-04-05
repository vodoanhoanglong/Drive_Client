// generate default password from username
export function generateDefaultPassword(email) {
  const hashStr = '5041851675A827cBC3272e8AaCdFb5D1';
  return hashStr + email.substr(0, email.indexOf('@'));
}
