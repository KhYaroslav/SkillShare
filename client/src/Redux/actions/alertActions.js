import { ALERT_CONDITION } from '../types';

export const alertCondition = (num) => ({
  type: ALERT_CONDITION,
  payload: num,
});
