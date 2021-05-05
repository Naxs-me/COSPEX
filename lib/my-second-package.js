'use babel';

import MySecondPackageView from './my-second-package-view';
import { CompositeDisposable } from 'atom';
var Promise = require('promise');

export default {

    mySecondPackageView: null,
    subscriptions: null,

    activate(state) {
        this.mySecondPackageView = new MySecondPackageView(state.mySecondPackageViewState);
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        // atom.workspace.activePaneContainer.paneContainer.element.addEventListener("dblclick", this.toggle());
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'my-second-package:toggle': () => this.toggle()
        }));
    },

    deactivate() {
        // Deactivates the package
        this.subscriptions.dispose();
        this.mySecondPackageView.destroy();

    },

    toggle() {
        // The package is toggled

        const fs = require('fs');
        const path = require('path');
        const p = path.join(__dirname, '..', 'node_modules', 'node-powershell')
        const shell = require(p);
        
        mySecondPackageView = this.mySecondPackageView;
        
        const editor = atom.workspace.getActiveTextEditor();
        // Gets the name of the file highlighted in the editor
        var activePane = editor.getTitle();
        // Gets the code from the file highlighted in the editor
        var completeCode = editor.getText();
        
        // Gets the python file which generates the example(injectCodepython.py)
        const injectionCode_python_path = path.join(__dirname, 'injectCodepython.py');
        var read_python_path = path.join(__dirname, 'read_python.txt');
        var webpage = path.join(__dirname, 'cospex.html');
        read_python_path = read_python_path.replace(/\\/gi, "\\\\");

        // Contains the code of the python file
        var injectCode_python = fs.readFileSync(injectionCode_python_path);
        
        step0();
        function step0(){
            // Injects users code into the injectCodepython.py and saves it as a new python file called python_output.py
            combining_code(injectCode_python, step1);
        }
        function step1() {
            // executes the python_output.py
            run_powershell(step2);
        }
        function step2() {
            // Opens the webpage created in atom
            display_webpage();
        }

        function combining_code(injectCode_python, callback) {
            injectCode_python = new TextDecoder("utf-8").decode(injectCode_python);
            // Replaces the code 
            injectCode_python = injectCode_python.replace(/<__b__s__>/gi, completeCode);
            // Replaces the name of the file
            injectCode_python = injectCode_python.replace(/<__f__n__>/gi, activePane);

            const fname = path.join(__dirname, 'python_output.py');
            let data = injectCode_python;
            fs.writeFileSync(fname, data, 'utf-8');
            
            callback();

        }

        function run_powershell(callback) {
            let ps = new shell({
                executionPolicy: 'Bypass',
                noProfile: true
            });

            ps.addCommand('cd ' + __dirname)
            ps.invoke()
                .then(output => {
                    let ps1 = new shell({
                        executionPolicy: 'Bypass',
                        noProfile: true
                    });
                    ps.addCommand('py python_output.py')
                    ps.invoke()
                        .then(output => {
                            callback();
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err);
                });

        }

        function display_webpage() {
            window.open(webpage);
        }

    }
};
