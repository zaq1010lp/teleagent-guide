import DefaultTheme from 'vitepress/theme'
import { h, defineComponent, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import './styles/custom.css'

// Mermaid 图表组件（支持点击放大、滚轮缩放、拖拽平移）
const Mermaid = defineComponent({
  name: 'Mermaid',
  props: {
    code: String,
  },
  setup(props) {
    const svg = ref('')
    const error = ref('')
    const showOverlay = ref(false)
    const wrapperRef = ref<HTMLElement | null>(null)
    const overlayContentRef = ref<HTMLElement | null>(null)
    const svgWrapRef = ref<HTMLElement | null>(null)

    // 缩放与拖拽状态
    const scale = ref(1)
    const offsetX = ref(0)
    const offsetY = ref(0)
    const isDragging = ref(false)
    const dragStartX = ref(0)
    const dragStartY = ref(0)
    const dragStartOffsetX = ref(0)
    const dragStartOffsetY = ref(0)

    const openOverlay = () => {
      showOverlay.value = true
      scale.value = 1
      offsetX.value = 0
      offsetY.value = 0
      // 等待 DOM 渲染后自动适配屏幕（双层延时确保 SVG 已挂载完成）
      nextTick(() => {
        setTimeout(() => fitToScreen(), 50)
      })
    }
    const closeOverlay = () => { showOverlay.value = false }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') showOverlay.value = false
    }

    const zoomIn = () => {
      scale.value = Math.min(scale.value * 1.25, 8)
    }
    const zoomOut = () => {
      scale.value = Math.max(scale.value / 1.25, 0.3)
    }
    const zoomReset = () => {
      offsetX.value = 0
      offsetY.value = 0
      scale.value = 1
      nextTick(() => {
        setTimeout(() => fitToScreen(), 50)
      })
    }

    // 自动适配屏幕：清除 SVG 内联尺寸限制，按 viewBox 计算最佳缩放
    const fitToScreen = () => {
      const svgEl = svgWrapRef.value?.querySelector('svg')
      const canvas = overlayContentRef.value
      if (!svgEl || !canvas) return
      // 清除 Mermaid 生成的内联 width/height/max-width，让 SVG 按 viewBox 尺寸渲染
      const vbWidth = (svgEl as SVGSVGElement).viewBox?.baseVal?.width
        || parseFloat(svgEl.getAttribute('width') || '0')
      const vbHeight = (svgEl as SVGSVGElement).viewBox?.baseVal?.height
        || parseFloat(svgEl.getAttribute('height') || '0')
      if (!vbWidth || !vbHeight) return
      // 设置 SVG 为 viewBox 原始尺寸（像素）
      svgEl.setAttribute('width', String(vbWidth))
      svgEl.setAttribute('height', String(vbHeight))
      svgEl.style.removeProperty('max-width')
      svgEl.style.width = vbWidth + 'px'
      svgEl.style.height = vbHeight + 'px'
      const canvasRect = canvas.getBoundingClientRect()
      // 留 40px 水平边距、80px 上下边距（给工具栏留空间）
      const availW = canvasRect.width - 40
      const availH = canvasRect.height - 80
      const scaleX = availW / vbWidth
      const scaleY = availH / vbHeight
      const fitScale = Math.min(scaleX, scaleY, 8)
      scale.value = Math.max(fitScale, 0.3)
      offsetX.value = 0
      offsetY.value = 0
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 1 / 1.15 : 1.15
      scale.value = Math.max(0.3, Math.min(scale.value * delta, 8))
    }

    const onMouseDown = (e: MouseEvent) => {
      isDragging.value = true
      dragStartX.value = e.clientX
      dragStartY.value = e.clientY
      dragStartOffsetX.value = offsetX.value
      dragStartOffsetY.value = offsetY.value
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.value) return
      offsetX.value = dragStartOffsetX.value + (e.clientX - dragStartX.value)
      offsetY.value = dragStartOffsetY.value + (e.clientY - dragStartY.value)
    }
    const onMouseUp = () => {
      isDragging.value = false
    }

    onMounted(async () => {
      document.addEventListener('keydown', onKeyDown)
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          fontFamily: 'inherit',
          flowchart: {
            curve: 'basis',
            padding: 20,
            nodeSpacing: 50,
            rankSpacing: 60,
          },
          themeVariables: {
            primaryColor: '#eff6ff',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#2563eb',
            lineColor: '#64748b',
            edgeLabelBackground: '#ffffff',
            secondaryColor: '#f0fdf4',
            tertiaryColor: '#fefce8',
            fontSize: '14px',
          },
        })
        const id = `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        const result = await mermaid.render(id, decodeURIComponent(props.code || ''))
        svg.value = result.svg
      } catch (e) {
        error.value = String(e)
      }
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onKeyDown)
    })

    return () => {
      const code = decodeURIComponent(props.code || '')

      if (error.value) {
        return h('pre', { class: 'mermaid-error' }, code)
      }
      if (!svg.value) {
        return h('div', { class: 'mermaid-loading' }, '加载图表中…')
      }

      // 缩放变换样式
      const transformStyle = `transform: translate(${offsetX.value}px, ${offsetY.value}px) scale(${scale.value})`

      return [
        h('div', {
          class: 'mermaid-wrapper',
          ref: wrapperRef,
          onClick: openOverlay,
          innerHTML: svg.value,
        }),
        showOverlay.value
          ? h('div', {
              class: 'mermaid-overlay',
              onClick: (e: Event) => {
                if (e.target === e.currentTarget) closeOverlay()
              },
            }, [
              // 工具栏
              h('div', { class: 'mermaid-overlay-toolbar' }, [
                h('button', {
                  class: 'mermaid-toolbar-btn',
                  title: '放大',
                  onClick: (e: Event) => { e.stopPropagation(); zoomIn() },
                }, '+'),
                h('button', {
                  class: 'mermaid-toolbar-btn',
                  title: '缩小',
                  onClick: (e: Event) => { e.stopPropagation(); zoomOut() },
                }, '−'),
                h('button', {
                  class: 'mermaid-toolbar-btn',
                  title: '重置',
                  onClick: (e: Event) => { e.stopPropagation(); zoomReset() },
                }, '↺'),
                h('span', { class: 'mermaid-toolbar-scale' }, `${Math.round(scale.value * 100)}%`),
                h('span', { class: 'mermaid-toolbar-hint' }, '滚轮缩放 · 拖拽移动 · ESC 关闭'),
              ]),
              // SVG 容器（可拖拽区域）
              h('div', {
                class: 'mermaid-overlay-canvas',
                ref: overlayContentRef,
                onWheel,
                onMousedown: onMouseDown,
                onMousemove: onMouseMove,
                onMouseup: onMouseUp,
                onMouseleave: onMouseUp,
              }, [
                h('div', {
                  class: 'mermaid-overlay-svg-wrap',
                  ref: svgWrapRef,
                  style: transformStyle,
                  innerHTML: svg.value,
                }),
              ]),
              // 关闭按钮
              h('button', {
                class: 'mermaid-overlay-close',
                onClick: (e: Event) => { e.stopPropagation(); closeOverlay() },
              }, '×'),
            ])
          : null,
      ]
    }
  },
})

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: any) {
    app.component('Mermaid', Mermaid)
  },
}
