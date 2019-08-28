import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';
import './car-item';

/**
 * @extends PolymerElement
 */
class CarsList extends PolymerElement {
  /**
   *
   * @return {HTMLTemplateElement}
   */
  static get template() {
    return html`
      <style include="granite-bootstrap">
        div{
          text-align: center;
        }
      </style>
      <div class="cars container">
        <div class="row d-flex justify-content-center header">
            <div class="col-md-3 form-group">
              <label for="search">Search</label>
              <input 
              type="text" 
              class="form-control" 
              id="search"  
              placeholder="Enter search" 
              on-input="_inputChange">
            </div>
           <div class="col-md-3 form-group">
            <label for="sort">Sort by</label>
              <select id="sort" class="form-control" on-change="_sortingChange">
                <template is="dom-repeat" items="[[criteria]]">
                    <option value="[[item.name]]">[[item.label]]</option>
                </template>
              </select>
              <label for="descending">Descending sort</label>
              <input 
              type="checkbox" 
              on-change="_descendingChange" 
              id="descending">
           </div>
        </div>
         <div class="row d-flex justify-content-center">
          <div class="col-md-9">
            <div class="cars">
              <template 
              id="carList" 
              is="dom-repeat" 
              items="[[cars]]"
              as="car" 
              filter="_carFilter"
              sort="_carsSorter">
                <car-item 
                  name="[[car.name]]" 
                  description=[[car.description]]" 
                  country="[[car.country]]" 
                  speed="[[car.speed]]"
                  id="[[car.id]]"
                  img="[[car.image]]">
                </car-item>
              </template>
            </div>
            <div>Number of cars in list: [[count]]</div>
          </div>          
        </div>
      </div>
    `;
  }

  /**
   *
   * @return {{cars: {type: *},
   * count: {computed: string, type: *},
   * criterium: {type: *},
   * descendingSort: {type: *},
   * filterText: {type: *}}}
   */
  static get properties() {
    return {
      cars: {
        type: Array,
      },
      filterText: {
        type: String,
      },
      count: {
        type: String,
        computed: '_getCurrentCount(cars, filterText)',
      },
      criterium: {
        type: String,
      },
      descendingSort: {
        type: Boolean,
      },
    };
  }

  /**
   * @constructor
   */
  constructor() {
    super();

    this.cars = [];
    this._getData();

    this.criteria = [
      {name: 'name', label: 'Alphabetical'},
      {name: 'speed', label: 'Max speed'},
    ];

    this.criterium = this.criteria[0].name;
  }

  /**
   *
   * @return {Promise<void>}
   * @private
   */
  async _getData() {
    try {
      const res = await fetch('./data/cars.json');
      this.cars = await res.json();
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @private
   */
  _inputChange() {
    this.filterText = this.$.search.value;
    this.$.carList.render();
  }

  /**
   * @param item
   * @return {Promise<Response | undefined> | RegExpMatchArray}
   * @private
   */
  _carFilter(item) {
    return item.name.match(new RegExp(this.filterText, 'i'));
  }

  /**
   *
   * @param cars
   * @param filterText
   * @return {*}
   * @private
   */
  _getCurrentCount(cars, filterText) {
    return cars.filter((item) =>
      item.name.match(new RegExp(filterText, 'i'))).length;
  }

  /**
   *
   * @param fisrtCar
   * @param secondCar
   * @return {number}
   * @private
   */
  _carsSorter(fisrtCar, secondCar) {
    const invert = (this.descedingSort) ? -1 : 1;
    return (fisrtCar[this.criterium] === secondCar[this.criterium])
        ? 0
        : ((fisrtCar[this.criterium] > secondCar[this.criterium])
            ? 1 * invert
            : -1 * invert);
  }

  /**
   *
   * @private
   */
  _sortingChange() {
    this.criterium = this.$.sort.selectedOptions[0].value;
    this.$.carList.render();
  }

  /**
   * @private
   */
  _descendingChange() {
    this.descedingSort = this.$.descending.checked;
    this.$.carList.render();
  }
}

customElements.define('cars-list', CarsList);
