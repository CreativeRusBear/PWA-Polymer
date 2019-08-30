import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

/**
 * @customElement
 * @extends PolymerElement
 */
class carItem extends PolymerElement {
  /**
   *
   * @return {HTMLTemplateElement}
   */
  static get template() {
    return html`
    <style include="granite-bootstrap"></style>
      <style>
        section {
            text-align: center;
            margin: 10vh 0;
        }
        img{
            width: 50%;
            margin: 20px 0;
        }
        p{
            margin: 0;
            width: 100%;
        }
        a, a:hover{
            color: #495057;
            text-decoration: none;
        }
      </style>
        <section 
        class="d-flex justify-content-center align-items-center flex-wrap">
            <a href="#/car/[[id]]">
              <h2 class="el-name">
                [[name]]
              </h2>        
            </a>
                <p class="el-description">
                    [[description]]
                </p>
                <img src="[[img]]" alt="[[name]]">
                <p class="float-right el-country">
                    Country: [[country]]
                </p>
                <p class="float-right el-max-speed">
                    Max. speed: [[speed]] km/h
                </p>
        </section>
    `;
  }

  /**
   *
   * @return {{country: {type: *},
   * img: {type: *}, name: {type: *},
   * description: {type: *},
   * id: {type: *},
   * speed: {type: *}}}
   */
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
