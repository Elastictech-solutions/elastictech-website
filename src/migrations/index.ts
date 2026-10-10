import * as migration_20261010_111012_initial from './20261010_111012_initial';

export const migrations = [
  {
    up: migration_20261010_111012_initial.up,
    down: migration_20261010_111012_initial.down,
    name: '20261010_111012_initial'
  },
];
