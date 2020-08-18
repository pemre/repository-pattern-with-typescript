export const log = (message: string, value: unknown = ''): void => {
  console.log(message, value);
  document
    .querySelector('.logs')
    .insertAdjacentHTML('beforeend', `<li>${message} ${value}</li>`);
};
