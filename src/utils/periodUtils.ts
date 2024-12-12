import { Supervisor } from '../types';

export const PERIODS = ['morning', 'afternoon'] as const;
export type Period = typeof PERIODS[number];

export const getRandomPeriod = (): Period => {
  const randomIndex = Math.floor(Math.random() * PERIODS.length);
  return PERIODS[randomIndex];
};

export const assignRandomPeriodIfNeeded = (supervisor: Supervisor): Supervisor => {
  if (!supervisor.preferredPeriod) {
    return {
      ...supervisor,
      preferredPeriod: getRandomPeriod()
    };
  }
  return supervisor;
};