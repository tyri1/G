import chai, { expect } from 'chai';
// @ts-ignore
import chaiAlmost from 'chai-almost';
// @ts-ignore
import sinon from 'sinon';
// @ts-ignore
import sinonChai from 'sinon-chai';
import type { DisplayObjectConfig, BaseStyleProps } from '@antv/g';
import { CustomElement, Circle, Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';

chai.use(chaiAlmost(0.0001));
chai.use(sinonChai);

const $container = document.createElement('div');
$container.id = 'container';
document.body.prepend($container);

const renderer = new CanvasRenderer();

// create a canvas
const canvas = new Canvas({
  container: 'container',
  width: 600,
  height: 500,
  renderer,
});

interface AProps extends BaseStyleProps {
  size: number;
}

describe('CustomElement', () => {
  it('create custom element', async () => {
    const connectedCallback = sinon.spy();
    const disconnectedCallback = sinon.spy();
    const attributeChangedCallback = sinon.spy();

    class ElementA extends CustomElement<AProps> {
      constructor(options: DisplayObjectConfig<AProps>) {
        super(options);
        // this.addEventListener('onclick', () => {});
        const circle = new Circle({ style: { r: options.style?.size || 0, fill: 'red' } });
        this.appendChild(circle);
      }
      connectedCallback() {
        connectedCallback();
      }
      disconnectedCallback() {
        disconnectedCallback();
      }
      attributeChangedCallback<Key extends never>(name: Key, oldValue: {}[Key], newValue: {}[Key]) {
        attributeChangedCallback();
      }
    }
    const a = new ElementA({ style: { size: 10 } });
    a.setPosition(100, 100);

    expect(a.style.size).to.be.eqls(10);
    a.setAttribute('size', 20);
    expect(a.style.size).to.be.eqls(20);

    // callback won't get called before mounted
    // @ts-ignore
    expect(connectedCallback).to.have.been.not.called;
    // @ts-ignore
    expect(disconnectedCallback).to.have.been.not.called;
    // @ts-ignore
    expect(attributeChangedCallback).to.have.been.not.called;

    // append to canvas
    canvas.appendChild(a);
    // @ts-ignore
    expect(connectedCallback).to.have.been.called;

    a.style.size = 100;
    // @ts-ignore
    expect(attributeChangedCallback).to.have.been.called;

    // unmounted
    canvas.removeChild(a);
    // @ts-ignore
    expect(disconnectedCallback).to.have.been.called;
  });
});
