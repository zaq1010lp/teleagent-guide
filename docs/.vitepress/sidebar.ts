export interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

// 蓝皮书侧边栏
const bluebookSidebar: SidebarItem[] = [
  {
    text: '蓝皮书总览',
    link: '/bluebook/',
  },
  {
    text: '第一篇 · 使用手册',
    collapsed: false,
    items: [
      {
        text: '本篇导读',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/',
      },
      {
        text: '1.1 初识 TeleAgent',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.1 初识 TeleAgent',
      },
      {
        text: '1.2 下载、安装与登录',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.2 下载、安装与登录',
      },
      {
        text: '1.3 界面、设置与工作空间',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.3 界面、设置与工作空间',
      },
      {
        text: '1.4 完成第一个任务',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.4 完成第一个任务',
      },
      {
        text: '1.5 加载第一个 Skills 技能',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.5 加载第一个 Skills 技能',
      },
      {
        text: '1.6 MCP 连接器与外部工具',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.6 MCP 连接器与外部工具',
      },
      {
        text: '1.7 长期记忆与个性化',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.7 长期记忆与个性化',
      },
      {
        text: '1.8 定时任务与自动化',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.8 定时任务与自动化',
      },
      {
        text: '1.9 多模型切换与适配',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.9 多模型切换与适配',
      },
      {
        text: '1.10 安全与权限控制',
        link: '/bluebook/第一篇 使用手册：先把 TeleAgent 用起来/1.10 安全与权限控制',
      },
    ],
  },
  {
    text: '第二篇 · 实战案例',
    collapsed: false,
    items: [
      {
        text: '本篇导读',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/',
      },
      {
        text: '2.1 办公文档：Excel、Word、PPT',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.1 办公文档：Excel、Word、PPT',
      },
      {
        text: '2.2 文件管理与桌面整理',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.2 文件管理与桌面整理',
      },
      {
        text: '2.3 数据分析与经营报告',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.3 数据分析与经营报告',
      },
      {
        text: '2.4 深度调研与信息整合',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.4 深度调研与信息整合',
      },
      {
        text: '2.5 合同审核与法务辅助',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.5 合同审核与法务辅助',
      },
      {
        text: '2.6 知识库构建与管理',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.6 知识库构建与管理',
      },
      {
        text: '2.7 会议纪要与语音转写',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.7 会议纪要与语音转写',
      },
      {
        text: '2.8 招标信息监测与追踪',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.8 招标信息监测与追踪',
      },
      {
        text: '2.9 PPT 生成与演示制作',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.9 PPT 生成与演示制作',
      },
      {
        text: '2.10 IM 集成与消息推送',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.10 IM 集成与消息推送',
      },
      {
        text: '2.11 OCR 识别与文档数字化',
        link: '/bluebook/第二篇 案例篇：从一项任务到一支 AI 团队/2.11 OCR 识别与文档数字化',
      },
    ],
  },
  {
    text: '第三篇 · 进阶系统',
    collapsed: false,
    items: [
      {
        text: '本篇导读',
        link: '/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/',
      },
      {
        text: '3.1 打造 Skills：把经验蒸馏为可执行技能',
        link: '/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/3.1 打造 Skills',
      },
      {
        text: '3.2 技能广场生态',
        link: '/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/3.2 技能广场生态',
      },
      {
        text: '3.3 多 Agent 系统设计',
        link: '/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/3.3 多 Agent 系统设计',
      },
      {
        text: '3.4 自动化工作流的可靠性',
        link: '/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/3.4 自动化工作流的可靠性',
      },
      {
        text: '3.5 技能自进化与持续迭代',
        link: '/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/3.5 技能自进化与持续迭代',
      },
    ],
  },
  {
    text: '第四篇 · 岗位与行业落地',
    collapsed: false,
    items: [
      {
        text: '本篇导读',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/',
      },
      {
        text: '4.1 岗位应用框架',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.1 岗位应用框架',
      },
      {
        text: '4.2 行政文秘岗位',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.2 行政文秘岗位',
      },
      {
        text: '4.3 财务审计岗位',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.3 财务审计岗位',
      },
      {
        text: '4.4 法务合规岗位',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.4 法务合规岗位',
      },
      {
        text: '4.5 销售市场岗位',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.5 销售市场岗位',
      },
      {
        text: '4.6 技术研发岗位',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.6 技术研发岗位',
      },
      {
        text: '4.7 政务场景：数据不出域的AI落地',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.7 政务场景：数据不出域的AI落地',
      },
      {
        text: '4.8 金融行业',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.8 金融行业',
      },
      {
        text: '4.9 教育行业',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.9 教育行业',
      },
      {
        text: '4.10 医疗行业',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.10 医疗行业',
      },
      {
        text: '4.11 制造业',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.11 制造业',
      },
      {
        text: '4.12 建筑与房地产行业',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.12 建筑与房地产行业',
      },
      {
        text: '4.13 跨境贸易行业',
        link: '/bluebook/第四篇 岗位与行业落地：从个人效率到组织能力/4.13 跨境贸易行业',
      },
    ],
  },
  {
    text: '附录',
    collapsed: false,
    items: [
      {
        text: '附录导读',
        link: '/bluebook/附录/',
      },
      {
        text: '附录 A 常用指令模板',
        link: '/bluebook/附录/附录 A 常用指令模板',
      },
      {
        text: '附录 B 场景速查表',
        link: '/bluebook/附录/附录 B 场景速查表',
      },
    ],
  },
]

// 帮你解决页面独立侧边栏（无侧边栏）
const helpSidebar: SidebarItem[] = []

// 案例集独立侧边栏
const casesSidebar: SidebarItem[] = [
  {
    text: '案例集总览',
    link: '/cases/',
  },
  {
    text: '主题分类',
    collapsed: false,
    items: [
      {
        text: '办公文档与PPT制作（30个案例）',
        link: '/cases/office-docs-ppt',
      },
      {
        text: '数据分析与经营分析（17个案例）',
        link: '/cases/data-analysis',
      },
      {
        text: '合同审核与法律合规（9个案例）',
        link: '/cases/contract-legal',
      },
      {
        text: '采购与招投标（14个案例）',
        link: '/cases/procurement-bidding',
      },
      {
        text: '信息采集调研与舆情监测（16个案例）',
        link: '/cases/research-monitoring',
      },
      {
        text: '软件开发与系统搭建（16个案例）',
        link: '/cases/software-dev',
      },
    ],
  },
]

export const sidebar = {
  '/cases/': casesSidebar,
  '/bluebook/': bluebookSidebar,
  '/help/': helpSidebar,
}
