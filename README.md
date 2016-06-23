# TreeView component 

> Generic TreeView component. It generates a tree view with expand/collapse functionality based in a JS object or JSON coming from AJAX.

## Technologies

> [Node.js](https://nodejs.org/) Local server and environment,
> [Webpack](https://webpack.github.io/) Module loader and task manager,
> [eslint](http://eslint.org/) Javascript linter,
> [Babel](http://babeljs.io/) ESnext transpiler.
> [jQuery](http://jquery.com/) DOM library.

## Directory Layout

```
├── /app/                       # The source code of the application
│   ├── /modules/               # JS modules
│   ├── /styles/                # Main Styles of the application
│   └── index.js                # Entry point for the JS modules
│── /build/                     # The application final output
├── /node_modules/              # Node.js modules
│── .editorconfig               # Config file to keep standards for text editors
│── .gitignore                  # Git ignore rules
│── .seslintrc                  # Eslint confi file
│── package.json                # The node.js modules dependencies file
└── README.md                   # Important information related
```

## Installation
Make sure you have [Node.js](https://nodejs.org/) installed. Run:

```shell
$ npm install
```

## Start Development server

```shell
$ npm start                     # Starts webpack-dev-server with hot reloading
```

## Run Production build
```shell
$ npm run build          # Generates the final assets inside the build folder
```

## Usage
Import the TreeView component.

```shell
import TreeView from './modules/TreeView';
```

Init the component (inline data)

```shell
 const topView = new TreeView({
        data: TreeData(), 
        wrapper: '.topTreeView', 
        nodeClass: 'node', 
        keyLabel: 'title', 
        keyChildren: 'childs', 
        toggleEffect: 'slide'
    });
```

Init the component (ajax)

```shell
const bottomView = new TreeView({
    ajax: true, 
    url: 'data/treeData.html', 
    wrapper: '.bottomTreeView',
    nodeClass: 'node', 
    keyLabel: 'label', 
    keyChildren: 'items', 
    toggleEffect: 'fade'
});
```

## Options

##### data (optional)
`object` Object passed to the TreeView with the data. Must be a valid JS Object.

##### ajax (optional)
`object` Enable to fetch the data via AJAX

##### url (optional)
`object` Url to fetch the data with AJAX. This is required if ajax option is passed

##### wrapper
`string` Class or ID to the wrapper to insert the Treeview component

##### nodeClass
`string` CSS Class to apply each tree view node

##### keyLabel
`string` Key of the title of each node in the object

##### keyChildren
`string` Key to access the children in the object

##### toggleEffect
`string` Effect to display/hide the items
###### Options
`fade` Fade Effect
`slide` Slide Effect

## Methods
##### getNumberofItems()
Return the number of nodes in the TreeView

##### collapseTreeView()
Collapse the TreeView completely

##### expandTreeView()
Expand all the TreeView nodes

##### toogleItem(item)
Open or close the item passed

`item` Should have the node element to toggle

