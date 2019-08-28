import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

/**
 * @extends PolymerElement
 */
class CarDetail extends PolymerElement {
  /**
   *
   * @return {{car: {type: *},
   * id: {observer: string, type: *}}}
   */
  static get property() {
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
    return html`
      <style include="granite-bootstrap"></style>
      <style>
      .car {
        margin: 10px;
        padding: 10px;
        border: solid 1px black;
        border-radius: 10px;
        min-height: 150px;
      }
      .back {
        width: 50px;
        height: 50px;
      }
      .img {
        float: left;
        border: 1px solid black;
        margin-right: 3em;
        margin-bottom: 2em;
        background-color: white;
        padding: 2em;
        height: 400px;
        width: 400px;
      }
      .speed, .country {
        clear:both;
      }

      ul.car-thumbs {
        margin: 0;
        list-style: none;
      }

      ul.car-thumbs li {
        border: 1px solid black;
        display: inline-block;
        margin: 1em;
        background-color: white;
      }

      ul.car-thumbs img {
        height: 100px;
        width: 100px;
        padding: 1em;
      }

      ul.specs {
        clear: both;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      ul.specs > li{
        display: inline-block;
        width: 200px;
        vertical-align: top;
      }

      ul.specs > li > span{
        font-weight: bold;
        font-size: 1.2em;
      }

      ul.specs dt {
        font-weight: bold;
      }

      h1 {
        border-bottom: 1px solid gray;
      }
    </style>
     <div id="{{car.id}}" class="car clearfix">
      <a href="#/cars"><img class="pull-right back" src="../img/back.png"></a>
      <h1 class="name">{{car.name}}</h1>
      <img class="pull-right img" src="../../data/{{mainImg}}">
      <p class="description">{{car.description}}</p>

      <ul class="car-thumbs">
        <li>
          <img src="../../data/{{car.img}}" beer="{{car.img}}" on-click="setImage">
        </li>
        <li>
          <img src="../../data/{{car.label}}" beer="{{car.label}}" on-click="setImage">
        </li>
      </ul>
      <ul class="specs">
        <li>
          <dl>
            <dt>Country</dt>
            <dd>{{car.country}}%</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Max. speed</dt>
            <dd>{{car.speed}}</dd>
          </dl>
        </li>
      </ul>
    </div>
    `;
  }

  /**
   *
   * @return {Promise<void>}
   */
  async onIdChange() {
    const url = `/data/details/${this.id}.json`;
    try {
      const res = await fetch(url);
      this.car = await res.json();
    } catch (e) {
      throw new Error(e);
    }
  }
}

customElements.define('car-detail', CarDetail);
