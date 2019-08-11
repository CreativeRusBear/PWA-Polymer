import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

// eslint-disable-next-line require-jsdoc
class carItem extends PolymerElement {
  // eslint-disable-next-line require-jsdoc
  static get template() {
    return html`
    <style include="granite-bootstrap"></style>
      <style>
        .car {
            margin: 10px;
            padding: 10px;
            border: 1px solid black;
            border-radius: 10px;
            min-height: 150px;
        }
        .el-img {
            max-height: 100px;
        }
        .el-country, .el-max-speed{
            clear: both;
        }
      </style>
      
      <div class="car clearfix" id="[[id]]">
        <img src="[[img]]" alt="[[name]]" class="float-right el-img">
        <a href="#/car/[[id]]">
            <h2 class="el-name">[[name]]</h2>        
        </a>
        <p class="el-description">[[description]]</p>
        <p class="float-right el-country">Country: [[country]]</p>
        <p class="float-right el-max-speed">Max. speed: [[speed]] km/h</p>
      </div>   
    `;
  }

  static get properties() {
    return {
      id: {
        type: String,
      },
      img: {
        type: String,
      },
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
