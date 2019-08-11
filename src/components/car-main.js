import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/app-route/app-route';
import '@polymer/app-route/app-location';
import '@polymer/polymer/lib/elements/dom-if';
import '@granite-elements/granite-bootstrap/granite-bootstrap';
import './cars-list';

class CarMain extends PolymerElement {
  static get template() {
    return html`
      <style unclude="granite-bootstrap"></style>

      <app-location route="{{route}}" use-hash-as-path></app-location>
        
      <app-route 
        route="[[route]]" 
        pattern="/cars" 
        active="{{carsListActive}}">      
      </app-route>
      <app-route 
        route="[[route]]" 
        pattern="/car/:id" 
        data="{{carId}}" 
        active="{{carIdActive}}">
      </app-route> 
      
      <template is="dom-if" if="{{carsListActive}}">
        <cars-list></cars-list>
      </template>
      <template is="dom-if" if="{{carIdActive}}">
        <div class="container">
            <div class="alert alert-success" role="alert">You have selected car: {{carId.id}}</div>
        </div>
      </template>
    `;
  }

  static get properties() {
    return {
      carsListActive: {
        type: Boolean,
      },
      carIdActive: {
        type: Boolean,
      },
      carId: {
        type: Boolean,
      },
      route: {
        type: Object,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.route.path) {
      this.route = {...this.route, path: '/cars'};
    }
  }
}

customElements.define('car-main', CarMain);
