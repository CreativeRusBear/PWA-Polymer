import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';
import './car-item';

class carsList extends PolymerElement {
  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <div class="cars container">
         <div class="row">
          <div class="col-md-3">
            <div class="form-group">
            
              <label for="search">Search</label>
              <input 
              type="text" 
              class="form-control" 
              id="search"  
              placeholder="Enter search" 
              on-input="_inputChange">
              
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

  async _getData() {
    try {
      const res = await fetch('./data/cars.json');
      this.cars = await res.json();
    } catch (e) {
      throw new Error(e);
    }
  }

  _inputChange() {
    this.filterText = this.$.search.value;
    this.$.carList.render();
  }

  _carFilter(item) {
    return item.name.match(new RegExp(this.filterText, 'i'));
  }

  _getCurrentCount(cars, filterText) {
    return cars.filter((item) =>
      item.name.match(new RegExp(filterText, 'i'))).length;
  }

  _carsSorter(fisrtCar, secondCar) {
    const invert = (this.descedingSort) ? -1 : 1;
    return (fisrtCar[this.criterium] === secondCar[this.criterium])
        ? 0
        : ((fisrtCar[this.criterium] > secondCar[this.criterium])
            ? 1 * invert
            : -1 * invert);
  }

  _sortingChange() {
    this.criterium = this.$.sort.selectedOptions[0].value;
    this.$.carList.render();
  }

  _descendingChange() {
    this.descedingSort = this.$.descending.checked;
    this.$.carList.render();
  }
}

customElements.define('cars-list', carsList);
