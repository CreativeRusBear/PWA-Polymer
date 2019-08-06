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
              <input type="text" class="form-control" id="search"  placeholder="Enter search" on-input="_inputChange">
            </div>
          </div>
          <div class="col-md-9">
            <div class="cars">
              <template id="carList" is="dom-repeat" items="[[cars]]" as="car" filter="_carFilter">
                <car-item name="[[car.name]]" description=[[car.description]]"></car-item>
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
    };
  }

  constructor() {
    super();
    this.cars = [
      {
        name: 'Mitsubishi 3000GT',
        description: 'Mitsubishi 3000GT — спортивный автомобиль класса GT японской компании Mitsubishi Motors. Выпускался с 1990 по 2000 год. На внутреннем рынке Японии был известен как Mitsubishi GTO. Для Северной Америки автомобиль был дособран корпорацией Chrysler и получил название Dodge Stealth.',
        country: 'Япония',
      },
      {
        name: 'Toyota Corolla AE86',
        description: 'Toyota AE86, также известная, как Toyota Corolla Levin и Toyota Sprinter Trueno, - легкий (923 кг) автомобиль в кузове хетчбек или купе, производящийся с 1983 года по 1987 год компанией Toyota. Для краткости код шасси «AE86» обозначает 1600-кубовую заднеприводную модель.',
        country: 'Япония',
      },
      {
        name: 'Toyota Mark II',
        description: 'Toyota Mark II (яп. トヨタ・マークII) — среднеразмерный седан, выпускавшийся компанией Toyota с 1968 по 2004 годы. Наименование Mark II использовалось компанией Toyota на протяжении нескольких десятилетий и первоначально использовалось в составе названия Toyota Corona Mark II. Отметка II была введена, чтобы машина выделялась из основной платформы Toyota Corona. Как только в 1970-е годы платформа была разделена, автомобиль стал известен просто как Mark II.',
        country: 'Япония',
      },
      {
        name: 'Toyota Crown',
        description: 'Toyota Crown (яп. トヨタクラウン Toyota Kuraun) — автомобиль производства компании Toyota, превративший эту модель в линейку полноразмерных седанов класса «люкс». Первоначально продавались в Японии и некоторых других азиатских странах, изначально разрабатываясь для эксплуатации в качестве такси. Так было в последние годы продаж в США, где автомобиль продавали с конца 1950-х годов и по 1971. Crown — старейший седан, всё ещё выпускаемый Toyota. По социальному статусу он конкурирует лишь с Toyota Century, Toyota Celsior и Toyota Crown Majesta. Crown используется многими японскими организациями в качестве лимузинов компании.',
        country: 'Япония',
      },
    ];
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
}

customElements.define('cars-list', carsList);
