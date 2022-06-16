import { PeriodicitySelected } from 'src/app/modules/shared/components/bar-filters/state';

export interface ProgrammedDownload {
  glnretailer: number;
  periodicity: PeriodicitySelected;
  execution_day: number;
}

export function createProgrammedDownload(params: Partial<ProgrammedDownload>) {
  return {

  } as ProgrammedDownload;
}
