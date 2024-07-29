module.exports = {
  env: {
    node: true,
    es2021: true, // Поддержка ECMAScript 2021
  },

  extends: [
    "expo",
    "eslint:recommended",
  ],

  globals: {
    __dirname: "readonly",
    // Добавьте любые другие глобальные переменные, которые могут потребоваться
  },

  rules: {
    // Здесь можно добавить или переопределить правила ESLint
    "no-unused-vars": ["warn"],
    "no-undef": ["error"],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
  },

  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        // Переопределите или добавьте правила для определенных типов файлов, если необходимо
      },
    },
  ],
};
