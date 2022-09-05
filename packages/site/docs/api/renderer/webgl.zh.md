---
title: WebGL 渲染器
order: 2
---

使用 [WebGLRenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) 或者 [WebGL2RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext) 渲染。相比 [Canvas 渲染器](/zh/docs/api/renderer/canvas)和 [SVG 渲染器](/zh/docs/api/renderer/svg) 拥有更强大的渲染能力，在大规模数量图形以及 3D 场景下有明显的优势。

# 使用方式

和 `@antv/g` 一样，也有以下两种使用方式。

## NPM Module

安装 `@antv/g-webgl` 后可以从中获取渲染器：

```js
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-webgl';

const webglRenderer = new Renderer();

const canvas = new Canvas({
    container: 'container',
    width: 600,
    height: 500,
    renderer: webglRenderer,
});
```

## CDN 方式

```html
<script
  src="https://unpkg.com/@antv/g-webgl/dist/index.umd.min.js"
  type="application/javascript">
```

从 `G.WebGL` 命名空间下可以获取渲染器：

```js
const webglRenderer = new window.G.WebGL.Renderer();
```

# 初始化配置

## targets

选择渲染环境。默认值为 `['webgl2', 'webgl1']` 并自动按该优先级自动降级。

例如在某些特殊环境下，仅选择在 WebGL1 环境下运行：

```js
const webglRenderer = new WebGLRenderer({
    targets: ['webgl1'],
});
```

# 内置插件

该渲染器内置了以下插件：

-   [g-plugin-device-renderer](/zh/docs/plugins/device-renderer) 基于 GPUDevice 提供渲染能力
-   [g-plugin-webgl-device](/zh/docs/plugins/webgl-device) 基于 [WebGLRenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) 和 [WebGL2RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext) 实现 GPUDevice 能力
-   [g-plugin-dom-interaction](/zh/docs/plugins/dom-interaction) 基于 DOM API 绑定事件

# 可选插件

除了内置插件，还可以选择以下插件。

## 3D 渲染能力

[g-plugin-3d](/zh/docs/plugins/3d) 提供 3D 渲染能力，包括 [Mesh](/zh/docs/api/3d/mesh) [Material](/zh/docs/api/3d/material) [Geometry](/zh/docs/api/3d/geometry) 等常见对象。

## 相机交互

[g-plugin-control](/zh/docs/plugins/control) 为 3D 场景提供相机交互，内部使用 Hammer.js 响应鼠标移动、滚轮事件。根据不同的 [相机类型](/zh/docs/api/camera#%E7%9B%B8%E6%9C%BA%E7%B1%BB%E5%9E%8B)，提供不同的交互效果。