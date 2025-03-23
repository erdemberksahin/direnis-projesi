module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Ban types kuralını devre dışı bırakıyoruz
    '@typescript-eslint/ban-types': 'off',
    // Prettier ile uyumluluğu sağlamak için aşağıdaki kuralları ekleyebilirsiniz
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // Tek tırnak kullanımı
        semi: true, // Satır sonlarında noktalı virgül
      },
    ],
  },
};
