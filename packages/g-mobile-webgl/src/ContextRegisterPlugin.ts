import { AbstractRendererPlugin, Module } from '@antv/g';
import type * as DeviceRenderer from '@antv/g-plugin-device-renderer';
import { DeviceRendererPlugin } from './tokens';
import { WebGLContextService } from './WebGLContextService';

const containerModule = Module((register) => {
  /**
   * implements ContextService
   */
  register(WebGLContextService);
});

export class ContextRegisterPlugin extends AbstractRendererPlugin {
  name = 'mobile-webgl-context-register';

  constructor(private rendererPlugin: DeviceRenderer.Plugin) {
    super();
  }

  init(): void {
    this.container.register(DeviceRendererPlugin, {
      useValue: this.rendererPlugin,
    });
    this.container.load(containerModule, true);
  }
  destroy(): void {
    this.container.unload(containerModule);
    this.container.remove(DeviceRendererPlugin);
  }
}