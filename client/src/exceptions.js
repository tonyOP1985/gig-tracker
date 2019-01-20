export function APIException(message) {
  this.notifyParams = {
    group: 'default',
    title: message,
    type: 'error'
  }
  this.name = 'APIException';
}

export function AuthenticationException(message) {
  this.notifyParams = {
    group: 'default',
    title: message,
    type: 'error'
  };
  this.name = 'AuthenticationException';
}

export function HTTPException(message, status) {
  this.notifyParams = {
    group: 'default',
    title: `${status} ${message}`,
    type: 'error'
  };
  this.name = 'HTTPException';
}

export function EmptyFieldException(message) {
  this.notifyParams = {
    group: 'default',
    title: message,
    type: 'error'
  };
  this.name = 'EmptyFieldException';
}
