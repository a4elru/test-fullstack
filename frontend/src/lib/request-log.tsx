export function getRequestLog() {
  if (typeof window === 'undefined') {
    return;
  }
  return localStorage.getItem('request-log') || '';
}

export function addRequestLog(newRecord: string) {
  if (typeof window === 'undefined') {
    return;
  }
  const oldLog = localStorage.getItem('request-log') || '';
  let newLog: string;
  if (oldLog == '') {
    newLog = newRecord;
  } else {
    newLog = oldLog + '\r\n\r\n' + newRecord;
  }
  localStorage.setItem('request-log', newLog);
}

export function clearRequestLog() {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem('request-log', '');
}
