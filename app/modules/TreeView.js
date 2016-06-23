import $ from 'jquery';
import Utils from './Utils';

/**
 * Render a TreeView from a Javascript object
*/

export default class TreeView {

    constructor(config = {}) {

        this._data;
        this._wrapper       = config.wrapper;
        this._nodeClass     = config.nodeClass;
        this._keyChildren   = config.keyChildren;
        this._keyLabel      = config.keyLabel;
        this._toggleEffect  = config.toggleEffect;
        this._utils         = new Utils();
        this._addedEvents   = false;

        (config.ajax === true)? this._pullData(config.url) : this._setData(config.data);

    }


    /**
     * Public methods
    */

    //Return number of nodes
    getNumberofItems(){
        return $(this._wrapper).find('.node__label').length;
    }

    //Collapse the component
    collapseTreeView(){
        $(this._wrapper).find('.node__parent .node__child').slideUp();
    }

    //Expand the component
    expandTreeView(){
        $(this._wrapper).find('.node__parent .node__child').slideDown();
    }

    toogleItem(item, toggleEffect){
        (toggleEffect === 'fade')? $(item).next().fadeToggle() : $(item).next().slideToggle();
    }


    /**
     * Private methods
    */

    //Get AJAX data
    _pullData(source){
        $.get(source, (data) => {
            this._setData(data);
        });
    }

    //Set retrived data
    _setData(data){
        this._data = data;
        this._validateData();
    }

    //Check data format
    _validateData(){

        const typeChecker = this._utils.typeChecker,
              isValidJSON = this._utils.isValidJSON;

        //Parse JSON
        if(isValidJSON(this._data)){
            this._data = JSON.parse(this._data);
        }

        const dataType = typeChecker(this._data);

        //Data filter
        if(dataType === 'Object' || dataType === 'Array'){
            this._render();
        }else{
            console.log('The object passed is not valid JSON');
        }
    }

    //Build the node elements
    _buildTreeElem(elem = []){

        let $nodeWrapper = $(`<li class="${this._nodeClass}__parent"></li>`);

        $nodeWrapper.append(`<span class="${this._nodeClass} ${this._nodeClass}__label">${elem[this._keyLabel]}</span>`);

        elem[this._keyChildren] = elem[this._keyChildren] || [];

        if(elem[this._keyChildren].length > 0){
            $nodeWrapper.append(this._buildElemChild(elem));
        }

        return $nodeWrapper;

    }

    //Build children wrapper
    _buildElemChild(elem = []){

        let $childrenWrapper = $(`<ul class="${this._nodeClass} ${this._nodeClass}__child"></ul>`);

        elem[this._keyChildren].forEach((value, index) => {
            $childrenWrapper.append(this._buildTreeElem(value));
        });

        return $childrenWrapper;
    }

    //Render the final markup
    _render(){

        let $treeWrapper = $('<ul class="treeWrapper"></ul>'),
            treeElems    = this._buildTreeElem(this._data);

        $treeWrapper.append(treeElems);
        $(this._wrapper).html($treeWrapper);
        this._eventHandlers();

    }

    //Events component related
    _eventHandlers(){
        $(this._wrapper).on('click', '.'+this._nodeClass, (e) => {
            this.toogleItem(e.currentTarget, this._toggleEffect);
            e.stopPropagation();
        });
    }

}
