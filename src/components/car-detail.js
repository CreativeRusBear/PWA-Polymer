import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

/**
 * @customElement
 * @extends PolymerElement
 */
class CarDetail extends PolymerElement {
  /**
   *
   * @return {{car: {type: *},
   * id: {observer: string, type: *}}}
   */
  static get properties() {
    return {
      id: {
        type: String,
        observer: '_onIdChange',
      },
      car: {
        type: Object,
      },
    };
  }

  /**
   *
   * @return {HTMLTemplateElement}
   */
  static get template() {
    debugger;
    return html`
      <style include="granite-bootstrap">
        section {
            text-align: center;
            padding: 5vw;
            
        }
        img{
            width: 50%;
            margin: 20px 0;
        }
        p{
            margin: 0;
            width: 100%;
        }
        svg{
          position: fixed;
          width: 64px;
          height: 64px;
        }
      </style>
    <a href="#/cars">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#52bfa1" d="M65 88L73 80 43 50 73 20 65 12 27 50z"></path><path fill="#1f212b" d="M65,89c-0.256,0-0.512-0.098-0.707-0.293l-38-38c-0.391-0.391-0.391-1.023,0-1.414l38-38 c0.391-0.391,1.023-0.391,1.414,0l8,8c0.391,0.391,0.391,1.023,0,1.414L44.414,50l29.293,29.293c0.391,0.391,0.391,1.023,0,1.414 l-8,8C65.512,88.902,65.256,89,65,89z M28.414,50L65,86.586L71.586,80L42.293,50.707c-0.391-0.391-0.391-1.023,0-1.414L71.586,20 L65,13.414L28.414,50z"></path><path fill="#1f212b" d="M32.5 50.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l1.5-1.5c.195-.195.512-.195.707 0s.195.512 0 .707l-1.5 1.5C32.756 50.451 32.628 50.5 32.5 50.5zM36.5 46.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l3.5-3.5c.195-.195.512-.195.707 0s.195.512 0 .707l-3.5 3.5C36.756 46.451 36.628 46.5 36.5 46.5zM62 80c-.128 0-.256-.049-.354-.146l-24-24c-.195-.195-.195-.512 0-.707s.512-.195.707 0l24 24c.195.195.195.512 0 .707C62.256 79.951 62.128 80 62 80zM45.5 37.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l16.5-16.5c.195-.195.512-.195.707 0s.195.512 0 .707l-16.5 16.5C45.756 37.451 45.628 37.5 45.5 37.5z"></path></svg>
    </a>
    <section 
        class="d-flex justify-content-center align-items-center flex-wrap">
        <h2 class="el-name">
                [[car.name]]
        </h2>  
        <p class="el-description">
            [[car.description]]
        </p>
        <img src="[[car.image]]" alt="[[car.name]]">
        <p class="float-right el-country">
                    Country: [[car.country]]
        </p>
        <p class="float-right el-max-speed">
           Max. speed: [[car.speed]] km/h
        </p>
        </section>
    `;
  }

  /**
   *
   * @returns {Promise<void>}
   * @private
   */
  async _onIdChange() {
    const url = `./data/cars.json`;
    try {
      const res = await fetch(url);
      const cars = await res.json();
      this.car = cars.find((item) => item.id === this.id);
    } catch (e) {
      throw new Error(e);
    }
  }
}

customElements.define('car-detail', CarDetail);
