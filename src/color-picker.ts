import { css, customElement, html, LitElement, property, queryAsync, unsafeCSS } from 'lit-element'
import colorPicker from 'tui-color-picker'
import { styles as tuiColorPickerStyles } from './tui-color-picker-styles'

@customElement('twc-color-picker')
class TWCColorPicker extends LitElement {
  @queryAsync('#wrapper')
  _wrapper: HTMLDivElement

  @property({ type: Array })
  preset = ['#000000', '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FFFFFF']
  @property()
  color

  static get styles() {
    const tuiCss = tuiColorPickerStyles
    return [
      css`
        :host {
          display: block;
          position: relative;
        }

        :host > #wrapper {
          position: relative;
        }
      `,
      unsafeCSS(tuiCss),
    ]
  }

  render() {
    return html`<div id="wrapper"></div>`
  }

  async firstUpdated() {
    const wrapper = await this._wrapper
    const colorpicker = colorPicker.create({
      container: wrapper,
      color: this.color,
      preset: this.preset,
    })

    colorpicker.on('selectColor', (e) => this.onSelectColor(e))
  }

  updated(changed) {
    if (changed.has('color')) {
      this.dispatchEvent(
        new CustomEvent('select-color', {
          composed: true,
          bubbles: true,
          detail: {
            color: this.color,
          },
        })
      )
    }
  }

  onSelectColor(e) {
    this.color = e.color
  }
}
