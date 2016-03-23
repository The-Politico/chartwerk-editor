var redux = require('redux');
var _ = require('underscore');


function option_exclusive(state, action){

    // Default state
    if(typeof state === 'undefined'){
        return [
            { value: 'base', label: 'Base axis', disabled: false },
            { value: 'series', label: 'Data series' },
            { value: 'group', label: 'Grouping column', disabled: false },
            { value: 'annotation', label: 'Annotation column' },
            { value: 'ignore', label: 'Ignore column' }
        ];
    }

    var newstate = _.extend({}, state);

    switch(action.type){
        case 'BASE_CLOSE':
            newstate[0].disabled = true;
            return newstate;
        case 'GROUP_CLOSE':
            newstate[2].disabled = true;
            return newstate;
        case 'BASE_OPEN':
            newstate[0].disabled = false;
            return newstate;
        case 'GROUP_OPEN':
            newstate[2].disabled = false;
            return newstate;
        default:
            return newstate;
    }
}

module.exports = redux.createStore(option_exclusive);
