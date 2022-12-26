import { Canvas, CanvasEvent, Text, Group } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as CanvaskitRenderer } from '@antv/g-canvaskit';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Renderer as WebGPURenderer } from '@antv/g-webgpu';
import * as lil from 'lil-gui';
import Stats from 'stats.js';
import cloud from 'd3-cloud';

const words = [
  'Hello',
  'world',
  'normally',
  'you',
  'want',
  'more',
  'words',
  'than',
  'this',
].map(function (d) {
  return { text: d, size: 10 + Math.random() * 90 };
});

// create a renderer
const canvasRenderer = new CanvasRenderer();
const webglRenderer = new WebGLRenderer();
const svgRenderer = new SVGRenderer();
const canvaskitRenderer = new CanvaskitRenderer({
  wasmDir: '/',
  fonts: [
    {
      name: 'sans-serif',
      url: '/NotoSansCJKsc-VF.ttf',
    },
  ],
});
const webgpuRenderer = new WebGPURenderer();

// create a canvas
const canvas = new Canvas({
  container: 'container',
  width: 600,
  height: 500,
  renderer: canvasRenderer,
});

canvas.addEventListener(CanvasEvent.READY, () => {
  const layout = cloud()
    .size([600, 500])
    .words(words)
    .padding(5)
    .rotate(() => Math.floor(Math.random() * 2) * 90)
    .font('Impact')
    .fontSize((d) => d.size)
    .on('end', draw);
  layout.start();

  function draw(words) {
    const wrapper = new Group({
      style: {
        x: layout.size()[0] / 2,
        y: layout.size()[1] / 2,
      },
    });
    canvas.appendChild(wrapper);
    words.forEach((d) => {
      const text = new Text({
        style: {
          x: d.x,
          y: d.y,
          fontFamily: 'Verdana',
          text: d.text,
          fontSize: d.size,
          textAlign: 'center',
          fill: '#1890FF',
          // stroke: '#F04864',
          // lineWidth: 5,
          transform: `rotate(${d.rotate}deg)`,
        },
      });
      wrapper.appendChild(text);

      text.addEventListener('mouseenter', () => {
        text.style.fontSize = d.size * 1.2;
        text.style.stroke = '#F04864';
        text.style.lineWidth = 5;
      });
      text.addEventListener('mouseleave', () => {
        text.style.fontSize = d.size;
        text.style.stroke = 'none';
        text.style.lineWidth = 0;
      });
    });
  }
});

// stats
const stats = new Stats();
stats.showPanel(0);
const $stats = stats.dom;
$stats.style.position = 'absolute';
$stats.style.left = '0px';
$stats.style.top = '0px';
const $wrapper = document.getElementById('container');
$wrapper.appendChild($stats);
canvas.addEventListener(CanvasEvent.AFTER_RENDER, () => {
  if (stats) {
    stats.update();
  }
});

// GUI
const gui = new lil.GUI({ autoPlace: false });
$wrapper.appendChild(gui.domElement);
const rendererFolder = gui.addFolder('renderer');
const rendererConfig = {
  renderer: 'canvas',
};
rendererFolder
  .add(rendererConfig, 'renderer', [
    'canvas',
    'svg',
    'webgl',
    'webgpu',
    'canvaskit',
  ])
  .onChange((rendererName) => {
    let renderer;
    if (rendererName === 'canvas') {
      renderer = canvasRenderer;
    } else if (rendererName === 'svg') {
      renderer = svgRenderer;
    } else if (rendererName === 'webgl') {
      renderer = webglRenderer;
    } else if (rendererName === 'webgpu') {
      renderer = webgpuRenderer;
    } else if (rendererName === 'canvaskit') {
      renderer = canvaskitRenderer;
    }
    canvas.setRenderer(renderer);
  });
rendererFolder.open();
