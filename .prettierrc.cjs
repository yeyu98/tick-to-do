/*
 * @Author: yeyu98
 * @Date: 2024-09-12 10:35:05
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 10:53:49
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
  tailwindConfig: './tailwind.config.js',
  // 对非标准属性进行排序
  tailwindAttributes: ['wrapperClassName', 'wrapClassName', 'rootClassName'],
  // 对函数调用中的类进行排序
  tailwindFunctions: ['classNames', 'classnames', 'twMerge'],
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
}
