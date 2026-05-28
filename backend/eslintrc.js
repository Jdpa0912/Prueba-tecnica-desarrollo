// Configuración de ESLint para el backend Node/Express
// eslint-config-prettier desactiva las reglas de ESLint que chocan con Prettier
// eslint-plugin-prettier ejecuta Prettier como una regla de ESLint
module.exports = {
  env: {
    node: true,      // habilita globales de Node (require, process, __dirname…)
    es2021: true,    // habilita sintaxis ES2021
  },
  extends: [
    'eslint:recommended',        // reglas base recomendadas por ESLint
    'plugin:prettier/recommended', // activa prettier como regla + deshabilita conflictos
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'commonjs', // el backend usa require/module.exports
  },
  rules: {
    // Prettier se encarga del formato; aquí solo reglas de calidad de código
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // avisa variables no usadas
    'no-console': 'off',   // permitimos console.log en backend (logs de servidor)
  },
};
