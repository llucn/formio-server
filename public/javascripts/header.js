const HTMLComponent = Formio.Components.components.htmlelement;

class HeaderComponent extends HTMLComponent {
  static schema(...extend) {
    return HTMLComponent.schema({
      label: 'Header',
      type: 'header',
      tag: 'h1'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Header',
      group: 'layout',
      icon: 'code',
      weight: 0,
      documentation: '/userguide/#html-element-component',
      schema: HeaderComponent.schema()
    };
  }
  
  render(content) {
    const cont = this.component.content;
    console.log('header render', content);
    return super.render(content);
  }
}

HeaderComponent.editForm = (...args) => {
  const editForm = HTMLComponent.editForm(...args);
  const tagComponent = Formio.Utils.getComponent(editForm.components, 'tag');
  tagComponent.type = 'select';
  tagComponent.dataSrc = 'values';
  tagComponent.data = {
    values: [
      {label: 'H1', value: 'h1'},
      {label: 'H2', value: 'h2'},
      {label: 'H3', value: 'h3'},
      {label: 'H4', value: 'h4'},
      {label: 'H5', value: 'h5'}
    ]
  };
  return editForm;
};

//Formio.Components.addComponent('header', HeaderComponent);