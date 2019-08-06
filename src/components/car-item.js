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
    };
  }

  // eslint-disable-next-line require-jsdoc
  // connectedCallback() {
  //   super.connectedCallback;
  //   console.log('my-element created!');
  // }
  //
  // // eslint-disable-next-line require-jsdoc
  // ready() {
  //   super.ready();
  //   console.log('my element is ready!');
  // }
}

customElements.define('car-item', carItem);
