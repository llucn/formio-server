const Input = Formio.Components.components.input;

class MyInput extends Input {
    static schema(...extend) {
        return Input.schema({
            type: 'myinput',
            label: 'My Input',
            key: 'myinput',
        });
    }

    static get builderInfo() {
        return {
            title: 'My Input',
            icon: 'terminal',
            group: 'basic',
            documentation: '/userguide/#textfield',
            weight: 0,
            schema: MyInput.schema()
        };
    }

    constructor(component, options, data) {
        super(component, options, data);
    }

    init() {
        super.init();
    }

    get inputInfo() {
        const info = super.inputInfo;
        return info;
    }

    render(content) {
        return super.render('<div ref="customRef">This is a custom component!</div>');
    }

    attach(element) {
        this.loadRefs(element, {
            customRef: 'single',
        });

        this.addEventListener(this.refs.customRef, 'click', () => {
            console.log('Custom Ref has been clicked!!!');
        });
        return super.attach(element);
    }

    detach() {
        return super.detach();
    }

    destroy() {
        return super.destroy();
    }

    normalizeValue(value, flags = {}) {
        return super.normalizeValue(value, flags);
    }

    getValue() {
        return super.getValue();
    }

    getValueAt(index) {
        return super.getValueAt(index);
    }

    setValue(value, flags = {}) {
        return super.setValue(value, flags);
    }


    setValueAt(index, value, flags = {}) {
        return super.setValueAt(index, value, flags);
    }

    updateValue(value, flags = {}) {
        return super.updateValue(value, flags);
    }
}
