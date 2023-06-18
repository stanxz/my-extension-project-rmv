const vscode = require('vscode')
const fs = require('fs')
const path = require('path');

module.exports = async function (params) {
    const name = await vscode.window.showInputBox({placeHolder:'Enter name:'});

    console.log("name: " + name);

    if(!name) {
        vscode.window.showWarningMessage('Name is required.');
        return;
    }

    const ruta = path.win32.normalize(params.path);
    console.log("ruta dizque normalizada: " + ruta);

    const dir = path.join(ruta.substring(1), name);
   
    console.log("dir: " + dir);

    if(fs.existsSync(dir)){
        vscode.showWarningMessage('Directory already exists.');
        return;
    }

try {
    fs.mkdirSync(dir);
    fs.mkdirSync(path.join(dir,'create'));
    fs.mkdirSync(path.join(dir,'read'));
    fs.mkdirSync(path.join(dir,'update'));
    fs.mkdirSync(path.join(dir,'delete'));
} catch (error) {
    console.log('error: '+error);
}

    

    const data = `export default {}`;
    fs.writeFileSync(path.join(dir,'index.js'), data);
    fs.writeFileSync(path.join(dir,'create','index.js'), data);
    fs.writeFileSync(path.join(dir,'read','index.js'), data);
    fs.writeFileSync(path.join(dir,'update','index.js'), data);
    fs.writeFileSync(path.join(dir,'delete','index.js'), data);

    vscode.window.showInformationMessage('CRUD generated successfully ps');
    return;
}