import { inspect } from 'util';

// Server side redux action logger
export default function createLogger() {
  return store => next => (action) => {
    const formattedPayload = inspect(action.payload, {
      colors: true,
    });
    console.log(` * ${action.type}: ${formattedPayload}`);
    return next(action);
  };
}
