import icons from './icons.js';
import systemsModule from './systems.js';

let game = (entities, components, iconDraw) => {

    icons.addIcons(iconDraw);

    let {systems, systemTypes, addComponents} = systemsModule;

    addComponents(components);

    let calls = {};

    let ctx = canvas.getContext('2d');
    let timer = 0;
    let delta = 0;
    let onF = time => {
        delta = time - timer;
        timer = time;
        //console.log(delta);

        systemTypes.forEach(sys => {
            calls[sys] = [];
        });

        entities.system.states.forEach(stateId => {
            entities[stateId].state.entities.forEach(id => {
                let entity = entities[id];
                Object.keys(entity).forEach(comp => {
                    let component = entity[comp];
                    systemTypes.forEach(sys => {
                        if (systems[sys][comp] !== undefined) {
                            calls[sys].push({
                                system: systems[sys][comp],
                                c: {
                                    entities,
                                    id,
                                    entity,
                                    comp,
                                    component,
                                    stateId,
                                    delta,
                                    time,
                                    ctx
                                }
                            });
                        }
                    });
                });
            });
        });

        systemTypes.forEach(systemType => {
            calls[systemType].forEach(call => {
                let {system, c} = call;
                system(c);
            });
        });

        requestAnimationFrame(onF);
    };
    onF(0);
};

export default Object.freeze({
    game
});
