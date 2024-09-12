/*
 * @Author: yeyu98
 * @Date: 2024-09-12 10:35:05
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 11:43:39
 * @FilePath: \template-vite-react-ts-tailwind\.prettierrc.cjs
 * @Description: 
 */
module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'always',
  jsxBracketSameLine: false,
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
}
