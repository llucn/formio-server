const FieldComponent = Formio.Components.components.field;

class CheckMatrixComponent extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.checks = [];
  }

  static schema(...extend) {
    return FieldComponent.schema({
      type: 'checkmatrix',
      numRows: 3,
      numCols: 3
    });
  }

  static get builderInfo() {
    return {
      title: 'Check Matrix',
      group: 'basic',
      icon: 'table',
      weight: 0,
      documentation: 'http://help.form.io/userguide/#table',
      schema: CheckMatrixComponent.schema()
    };
  }

  get tableClass() {
    let tableClass = 'table ';
    ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    return tableClass;
  }

  renderCell(row, col) {
    return this.renderTemplate('input', {
      input: {
        type: 'input',
        ref: `${this.component.key}-${row}`,
        attr: {
          id: `${this.component.key}-${row}-${col}`,
          class: 'form-control',
          type: 'checkbox',
        }
      }
    });
  }

  render(children) {
    let table = '<table class="table table-compressed"><tbody>';
    for (let i = 0; i < this.component.numRows; i++) {
    	table += '<tr>';
      for (let j = 0; j < this.component.numCols; j++) {
      	table += '<td>';
        table += this.renderCell(i, j);
        table += '</td>';
      }
      table += '</tr>';
    }
    table += '</tbody></table>';
    return super.render(table);
  }

  attach(element) {
    const refs = {};

    for (let i = 0; i < this.component.numRows; i++) {
      refs[`${this.component.key}-${i}`] = 'multiple';
    }

    this.loadRefs(element, refs);
    this.checks = [];
    for (let i = 0; i < this.component.numRows; i++) {
      this.checks[i] = Array.prototype.slice.call(this.refs[`${this.component.key}-${i}`], 0);

      // Attach click events to each input in the row
      this.checks[i].forEach(input => {
        this.addEventListener(input, 'click', () => this.updateValue())
      });
    }

    // Allow basic component functionality to attach like field logic and tooltips.
    return super.attach(element);
  }

  getValue() {
    var value = [];
    for (var rowIndex in this.checks) {
      var row = this.checks[rowIndex];
      value[rowIndex] = [];
      for (var colIndex in row) {
        var col = row[colIndex];
        value[rowIndex][colIndex] = !!col.checked;
      }
    }
    return value;
  }

  setValue(value) {
    if (!value) {
      return;
    }
    for (var rowIndex in this.checks) {
      var row = this.checks[rowIndex];
      if (!value[rowIndex]) {
        break;
      }
      for (var colIndex in row) {
        var col = row[colIndex];
        //if (!value[rowIndex][colIndex]) {
        //  return false;
        //}
        let checked = value[rowIndex][colIndex] ? 1 : 0;
        col.value = checked;
        col.checked = checked;
      }
    }
  }
}

CheckMatrixComponent.editForm = (...args) => {
  const editForm = FieldComponent.editForm(...args);
  return {
    components: [
      {
        key: "mainTabs",
        type: "tabs",
        components: [
          {
            key: "cmprops",
            label: "Check Matrix Properties",
            weight: 0,
            components: [
              {
                type: 'number',
                key: 'numRows',
                label: 'Rows',
              },
              {
                type: 'number',
                key: 'numCols',
                label: 'Columns',
              }
            ]
          },
          {
            key: "fieldprops",
            label: "Field Properties",
            weight: 10,
            components: [
              ...editForm.components
            ],
          }
        ]
      }
    ],
  };
};