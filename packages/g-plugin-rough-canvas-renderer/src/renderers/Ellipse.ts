import type { DisplayObject, ParsedEllipseStyleProps } from '@antv/g';
import { singleton } from '@antv/g';
import { CanvasRenderer } from '@antv/g-canvas';
import { generateRoughOptions } from '../util';

@singleton({
  token: CanvasRenderer.EllipseRendererContribution,
})
export class EllipseRenderer implements CanvasRenderer.StyleRenderer {
  render(
    context: CanvasRenderingContext2D,
    parsedStyle: ParsedEllipseStyleProps,
    object: DisplayObject<any, any>,
  ) {
    const { rx, ry } = parsedStyle as ParsedEllipseStyleProps;
    // @ts-ignore
    context.roughCanvas.ellipse(rx, ry, rx * 2, ry * 2, generateRoughOptions(object));
  }
}