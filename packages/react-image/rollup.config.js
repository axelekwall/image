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
      dir: pkg.files[0]
    },
    // {
    //   file: pkg.module,
    //   format: 'esm',
    //   exports: 'named',
    //   sourcemap: true,
    //   strict: false,
    // },
  ],
  plugins: [typescript()],
  external: ['react', 'react-dom'],
};
