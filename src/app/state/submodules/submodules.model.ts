export interface Submodules {
  path: string;
  icon: string;
  charts: Chart[];
}

export interface Chart {
  name_chart: string;
}

export function createSubmodules(params: Partial<Submodules>) {
  return {

  } as Submodules;
}
