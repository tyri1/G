import type { RendererPlugin } from '@antv/g';
import type { Syringe } from 'mana-syringe';
import { Module } from 'mana-syringe';
import { MobileInteractionPlugin } from './MobileInteractionPlugin';

const containerModule = Module((register) => {
  register(MobileInteractionPlugin);
});

export class Plugin implements RendererPlugin {
  init(container: Syringe.Container): void {
    container.load(containerModule, true);
  }
  destroy(container: Syringe.Container): void {
    container.unload(containerModule);
  }
}