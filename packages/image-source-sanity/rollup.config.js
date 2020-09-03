import typescript from '@rollup/plugin-typescript';

// import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
      dir: 'dist',
    },
  ],
  plugins: [typescript()],
};
