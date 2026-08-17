import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

export default defineConfig({
  lang: 'zh-CN',
  title: 'TeleAgent 蓝皮书',
  description: 'TeleAgent 实战蓝皮书 — 从真实工作到 AI 工作系统',
  base: '/teleagent-guide/',
  head: [
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],
  cleanUrls: true,
  markdown: {
    lineNumbers: false,
    config: (md) => {
      // 将 ```mermaid 代码块渲染为 <Mermaid /> 组件
      const defaultRender = md.renderer.rules.fence
        ? md.renderer.rules.fence.bind(md.renderer.rules)
        : (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options)
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        if (token.info.trim() === 'mermaid') {
          return `<Mermaid code="${encodeURIComponent(token.content)}" />`
        }
        return defaultRender(tokens, idx, options, env, self)
      }
    },
  },
  themeConfig: {
    siteTitle: 'TeleAgent Guide',
    nav: [
      { text: '首页', link: '/' },
      { text: '开始阅读', link: '/bluebook/' },
      { text: '案例集', link: '/cases/' },
      { text: '帮你解决', link: '/help/' },
      { text: '阅读指南', link: '/reading-guide' },
    ],
    sidebar: sidebar,
    // socialLinks 已隐藏，GitHub 页面待开发后恢复
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/AlephAITech/WorkBuddyGuide' },
    // ],
    outline: {
      label: '本页目录',
      level: [2, 3],
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdatedText: '最后更新',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '侧边栏导航',
    darkModeSwitchLabel: '深色模式',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除查询',
            backButtonTitle: '返回',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上',
              navigateDownKeyAriaLabel: '向下',
              closeText: '关闭',
              closeKeyAriaLabel: '关闭',
            },
          },
        },
        miniSearch: {
          options: {
            // 对中文文本做单字+双字 n-gram 分词，使任意中文字符串都能被搜到
            tokenize: (string: string) => {
              const tokens: string[] = []
              // 先按空白和标点拆分
              const segments = string.split(/[\n\r\s\p{P}]+/u).filter(Boolean)
              for (const seg of segments) {
                // 单字 token
                for (const ch of seg) {
                  tokens.push(ch.toLowerCase())
                }
                // 双字 token（bigram）
                for (let i = 0; i < seg.length - 1; i++) {
                  tokens.push((seg[i] + seg[i + 1]).toLowerCase())
                }
              }
              return tokens
            },
            processTerm: (term: string) => term.toLowerCase(),
          },
          searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            combineWith: 'OR',
            boost: { title: 4, text: 2, titles: 1 },
          },
        },
      },
    },
    footer: {
      message: '以真实任务为主线的 TeleAgent 社区实战读本',
      copyright: 'Copyright © 2026 TeleAgent Guide Contributors',
    },
  },
})
