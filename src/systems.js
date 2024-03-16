let systems = {};

let systemTypes = [
    'preupdate',
    'update',
    'postupdate',
    'draw'
];
systemTypes.forEach(system => {
    systems[system] = {};
});

let addComponents = (components) => {
    Object.keys(components).forEach(comp => {
        systemTypes.forEach(sys => {
            if (components[comp][sys] !== undefined) {
                systems[sys][comp] = components[comp][sys];
            }
        });
    });
};

export default Object.freeze({
    systems,
    systemTypes,
    addComponents
});
