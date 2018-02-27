const apiLogColor = '#039BE5';
const realtimeLogColor = '#304FFE';

const normalLogColor = '#33333';
const debugLogColor = '#33333';
const infoLogColor = '#03A9F4';
const errorLogColor = '#F44336';

export function logger(label: string, level: string, message: string) {
  let labelName = 'CHAT-API';
  let logColor = apiLogColor;
  if (label === 'realtime') {
    labelName = 'CONSOLE-RTM';
    logColor = realtimeLogColor;
  }
  switch (level) {
    case 'normal':
      window.console.log('%c[' + labelName + ']%c' + message, 'color:' + logColor, 'color: ' + normalLogColor);
      break;
    case 'debug':
      window.console.debug('%c[' + labelName + ']%c' + message, 'color:' + logColor, 'color: ' + debugLogColor);
      break;
    case 'info':
      window.console.info('%c[' + labelName + ']%c' + message, 'color:' + logColor, 'color: ' + infoLogColor);
      break;
    case 'error':
      window.console.log('%c[' + labelName + ']%c' + message, 'color:' + logColor, 'color: ' + errorLogColor);
      break;
    default:
      break;
  }
}