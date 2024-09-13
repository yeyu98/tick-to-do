<!--
 * @Author: yeyu98
 * @Date: 2024-09-12 22:50:43
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 22:51:51
 * @Description: 
-->
# 问题记录

- 如果动态配置title或者一些自定义的参数呢，类似vue-router中的meta？
    - 1.通过在配置的时候在组件的props里传入
    - 2.通过react-router里的handle，传入之后通过useMatches来获取，只能在createBrowserRouter中使用

- 换行问题，输入数字或字母时无法自动换行
- 无内容disabled样式问题
- placeholder如何监听