const BaseComponent = Formio.Components.components.field;

class LocationComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.marks = [];
  }

  static schema(...extend) {
    return FieldComponent.schema({
      type: 'location',
      label: 'Location',
      key: 'location',
      apiKey: '',
      zoom: 8,
      basemap: 'streets',
      lng: -118.80543,
      lat: 34.02700,
      height: 300,
      width: 300,
    });
  }

  static get builderInfo() {
    return {
      title: 'Location',
      group: 'basic',
      icon: 'map',
      weight: 0,
      schema: LocationComponent.schema()
    };
  }

  render(content) {
    const key = this.component.key;
    const height = this.component.height;
    const width = this.component.width;
    let html = `<div id="viewDiv_${key}" style="width:${width}px; height:${height}px"></div>`;
    return super.render(html);
  }

  attach(element) {
    const ret = super.attach(element);
    this.loadRefs(element, {
      customRef: 'multiple',
    });

    const key = this.component.key;
    const basemap = this.component.basemap;
    const zoom = this.component.zoom;
    const lng = this.component.lng;
    const lat = this.component.lat;
    console.table({key: key, basemap: basemap, zoom: zoom, lng: lng, lat: lat});

    require([
      "esri/Map",
      "esri/views/MapView",
      "dojo/domReady!"
    ], function(Map, MapView) {
      var map = new Map({
        basemap: basemap,
      });
      var view = new MapView({
        container: "viewDiv_" + key,
        map: map,
        zoom: zoom,
        center: [lng, lat],
      });
    });
    
    return ret;
  }

  getValue() {
    return super.getValue();
  }

  setValue(value, flags = {}) {
    return super.setValue(value, flags);
  }
}

LocationComponent.editForm = (...args) => {
  const editForm = BaseComponent.editForm(...args);
  return editForm;
};
