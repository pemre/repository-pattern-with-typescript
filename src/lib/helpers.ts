export const log = (message: string, value: any = '') => {
  console.log(message, value);
  document
    .querySelector('.logs')
    .insertAdjacentHTML('beforeend', `<li>${message} ${value}</li>`);
};
