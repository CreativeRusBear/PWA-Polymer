import {PolymerElement, html} from '@polymer/polymer/polymer-element';

// eslint-disable-next-line require-jsdoc
class carItem extends PolymerElement {
  // eslint-disable-next-line require-jsdoc
  static get template() {
    return html`
      <style>
        .car {
            margin: 10px;
            padding: 10px;
            border: 1px solid black;
            border-radius: 10px;
            min-height: 50px;
        }
        h2 {
            color: red
        }
      </style>
      
      <div class="car">
        <h2>[[name]]</h2>
        <p>[[description]]</p>
        <p>Страна: [[country]]</p>
        <p>Макс. скрость: [[speed]] km/h</p>
      </div>   
    `;
  }

  static get properties() {
    return {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      speed: {
        type: Number,
      },
      country: {
        type: String,
      },
    };
  }
}

customElements.define('car-item', carItem);
