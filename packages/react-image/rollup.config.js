import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      // file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
      dir: 'dist/cjs'
    },
    {
      // file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      strict: false,
      dir: 'dist/esm'
    },
  ],
  plugins: [typescript({
    declaration: true,
    declarationDir: 'dist/ts'
  })],
  external: ['react', 'react-dom'],
};
