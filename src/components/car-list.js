import {PolymerElement, html} from '@polymer/polymer/polymer-element';

// eslint-disable-next-line require-jsdoc
class carList extends PolymerElement {
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
      </style>
      
      <div class="car">
        <h2>[[model]]</h2>
        <p>[[description]]</p>
      </div>   
    `;
  }

  static get properties() {
    return {
      model: {
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

customElements.define('car-list', carList);
