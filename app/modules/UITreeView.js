import $ from 'jquery';

/**
 * Renders a TreeView
 * @todo improve documentation
*/

export default class UITreeView {

    constructor(wrapper, data = {}) {
        // Cache data
        this._data = data;

        // Cache elements
        this.$wrapper = $(wrapper);
    }

    /**
     * Public methods
    */

    // Return number of nodes
    getNumberofItems() {
        return this.$wrapper.find('.node__label').length;
    }

    // Collapse the component
    collapseTreeView() {
        this.$wrapper.find('.node__parent .node__child').slideUp();
    }

    // Expand the component
    expandTreeView() {
        this.$wrapper.find('.node__parent .node__child').slideDown();
    }

    toogleItem(item, toggleEffect) {
        (toggleEffect === 'fade') ? $(item).next().fadeToggle() : $(item).next().slideToggle();
    }

    /**
     * Private methods
    */

    // Build the node elements
    _buildTreeElem(elem = []){

        let $nodeWrapper = $(`<li class="${this._nodeClass}__parent"></li>`);

        $nodeWrapper.append(`<span class="${this._nodeClass} ${this._nodeClass}__label">${elem[this._keyLabel]}</span>`);

        elem[this._keyChildren] = elem[this._keyChildren] || [];

        if(elem[this._keyChildren].length > 0){
            $nodeWrapper.append(this._buildElemChild(elem));
        }

        return $nodeWrapper;

    }

    // Build children wrapper
    _buildElemChild(elem = []){

        let $childrenWrapper = $(`<ul class="${this._nodeClass} ${this._nodeClass}__child"></ul>`);

        elem[this._keyChildren].forEach((value, index) => {
            $childrenWrapper.append(this._buildTreeElem(value));
        });

        return $childrenWrapper;
    }

    //  Render the final markup
    _render(){

        let $treeWrapper = $('<ul class="treeWrapper"></ul>'),
            treeElems    = this._buildTreeElem(this._data);

        $treeWrapper.append(treeElems);
        this.$wrapper.html($treeWrapper);
        this._eventHandlers();

    }

    // Events component related
    _eventHandlers(){
        this.$wrapper.on('click', '.'+this._nodeClass, (e) => {
            this.toogleItem(e.currentTarget, this._toggleEffect);
            e.stopPropagation();
        });
    }

}
