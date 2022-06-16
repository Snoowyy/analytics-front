import { ID } from '@datorama/akita';

export interface Pinned {
  filters: string;
}

export interface InitialPinned {
  id: string;
  isPinned: boolean;
}

export function createPinned(params: Partial<Pinned>) {
  return {

  } as Pinned;
}
