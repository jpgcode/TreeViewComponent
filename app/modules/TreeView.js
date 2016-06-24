import $ from 'jquery';
import Utils from './Utils';
import UITreeView from './UITreeView';

/**
 * Render a TreeView from a Javascript object
 * @todo improve documentation
*/

export default class TreeView {

    constructor(config = {}) {

        // @todo document each config variable
        this._config = $.extend(true, {
            keyChildren : null,
            keyLabel : null,
            view : {
                wrapper : null,
                nodeClass : null,
                toggleEffect : null
            }
        }, config);

        this._utils = new Utils();

        this._addedEvents = false;

        (this._config.ajax === true) ?
            this._pullData(this._config.url) :
            this._setData(this._config.data);
    }

    /**
     * Public methods
    */

    //Return number of nodes
    getNumberofItems() {
        return this._ui.getNumberofItems();
    }

    //Collapse the component
    collapseTreeView() {
         this._ui.collapseTreeView();
    }

    //Expand the component
    expandTreeView() {
        this._ui.expandTreeView();
    }

    toogleItem(item, toggleEffect) {
        this._ui.toogleItem();
    }

    /**
     * Private methods
    */

    // Get AJAX data
    _pullData(source) {
        $.get(source, (data) => {
            this._setData(data);
        });
    }

    // Set retrived data
    _setData(data) {
        this._validateData(data);
    }

    // Check data format
    _validateData(data) {

        const typeChecker = this._utils.typeChecker,
              isValidJSON = this._utils.isValidJSON;

        //Parse JSON
        if(isValidJSON(data)) {
            data = JSON.parse(data);
        }

        const dataType = typeChecker(data);

        //Data filter
        if(dataType === 'Object' || dataType === 'Array') {
            this._ui = new UITreeView(this._config.wrapper, data);
        }else{
            console.log('The object passed is not valid JSON');
        }
    }
}
