//Imports
import $ from 'jquery';
import TreeView from './modules/TreeView';
import TreeData from './data/TreeData';

//APP object
const APP = {

    init: function(){

        //Get data from inline object
        const topView = new TreeView({
            data: TreeData(), //Data source inline
            wrapper: '.topTreeView', //Wrapper to insert the tree view
            nodeClass: 'node', //Class to apply each tree view node
            keyLabel: 'title', //Key to access the label in the object
            keyChildren: 'childs', //Key to access the children in the object
            toggleEffect: 'slide' //Effect to expand/collapse the nodes
        });

        //Get data with AJAX
        const bottomView = new TreeView({
            ajax: true, //Use ajax to get the data
            url: 'data/treeData.html', //The url to fetch
            wrapper: '.bottomTreeView', //Wrapper to insert the tree view
            nodeClass: 'node', //Class to apply each tree view node
            keyLabel: 'label', //Key to access the label in the object
            keyChildren: 'items', //Key to access the children in the object
            toggleEffect: 'fade' //Effect to expand/collapse the nodes
        });

    }
};

//jQuery document.ready
$(function(){
    APP.init();
});
