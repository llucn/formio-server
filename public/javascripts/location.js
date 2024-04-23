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

    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://js.arcgis.com/4.4/esri/css/main.css";
    document.head.appendChild(link);

    var script = document.createElement('script');
    script.onload = function () {
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
    }
    script.src = "https://js.arcgis.com/4.4/";
    document.head.appendChild(script);
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
  return {
    components: [
      {
        key: "mainTabs",
        type: "tabs",
        components: [
          {
            key: "locprops",
            label: "Location Properties",
            weight: 0,
            components: [
              {
                type: 'textfield',
                key: 'apiKey',
                label: 'API Key',
              },
              {
                type: 'number',
                key: 'zoom',
                label: 'Zoom',
              },
              {
                type: 'select',
                key: 'basemap',
                label: 'Basemap',
                dataSrc: 'values',
                data: {
                  values: [
                    {label: 'Hybrid', value: 'hybrid'},
                    {label: 'National Geographic', value: 'national-geographic'},
                    {label: 'Oceans', value: 'oceans'},
                    {label: 'Satellite', value: 'satellite'},
                    {label: 'Streets', value: 'streets'},
                    {label: 'Terrain', value: 'terrain'},
                    {label: 'Topo', value: 'topo'},
                  ],
                },
              },
              {
                type: 'number',
                key: 'lng',
                label: 'Center Longitude',
              },
              {
                type: 'number',
                key: 'lat',
                label: 'Center Latitude',
              },
              {
                type: 'number',
                key: 'height',
                label: 'Map Height',
              },
              {
                type: 'number',
                key: 'width',
                label: 'Map Width',
              },
            ],
          },
          {
            key: "baseprops",
            label: "Field Properties",
            weight: 10,
            components: [
              ...editForm.components
            ],
          }
          ],
      }
    ],
  };
};
