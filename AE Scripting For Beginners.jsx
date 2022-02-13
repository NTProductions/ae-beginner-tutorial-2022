// AE Scripting Beginners Tutorial [2022]

// Introduction
// Scripting allows you automate the tasks you normally do by hand
// You can run repetitive operations as many times as you want, instantly
// Access any properties, comps, layers, effects, expressions, keyframes, menu items

// Programs
// Adobe ExtendScript (No longer works for Mac) - https://www.adobe.com/products/extendscript-toolkit.htmlESTK
// Visual Studio Code - https://code.visualstudio.com/Download
    // Extensions To Use:
        // ExtendScript Debugger (by Adobe)
        // Adobe Script Runner (by renderTom)

// Guides
// After Effects Scripting Guide - https://ae-scripting.docsforadobe.dev/
// UI Reference Guide - https://fotozcech.cz/wp-content/uploads/2015/11/scriptui-2-8.pdf

// UI
// There are 2 types of interface, floating and dockable
// For the purposes of this tutorial, we will make a floating version
var window = new Window("palette", "My Script", undefined);
window.orientation = "column";

var text = window.add("statictext", undefined, "Some Example Text");

var buttonGroup = window.add("group", undefined, "buttonGroup");
buttonGroup.orientation = "row";
var buttonOne = buttonGroup.add("button", undefined, "Button 1");
var buttonTwo = buttonGroup.add("button", undefined, "Button 2");

var dropdown = window.add("dropdownlist", undefined, ["DD Item 1", "DD Item 2"]);
dropdown.size = [170, 25];
dropdown.selection = 0;
dropdown.add("item", "DD Item 3");

var boxesPanel = window.add("panel", undefined, "Boxes");
boxesPanel.orientation = "row";
var radio = boxesPanel.add("radiobutton", undefined, "Radio Text");
var checkbox = boxesPanel.add("checkbox", undefined, "Checkbox Text");

var slider = window.add("slider", undefined, "");

buttonOne.onClick = function() {
    compAndLayerFunction();
}

buttonTwo.onClick = function() {
    importFileAndStuff();
}

window.center();
window.show();

// Comp/Layer Stuff
function compAndLayerFunction() {
    if(app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("Please select a composition first");
        return false;
    }

    app.beginUndoGroup("Process");

    var composition = app.project.activeItem;

    var selectedLayer = composition.layer(1);
    // var layer = composition.layer(1);
    // .property("Position")
    var positionValue = selectedLayer.property("ADBE Transform Group").property("ADBE Position").value;
    alert(positionValue);
    selectedLayer.property("ADBE Transform Group").property("ADBE Scale").expression = 'wiggle(.3, 50)';

    composition.width *= .5;
    composition.height *= .5;
    composition.name = "Resized Composition";

    var exposureEffect = selectedLayer.Effects.addProperty("ADBE Exposure2");
    // layer.effect(1)
    // layer.effect(1).property(2)
    exposureEffect.property(3).setValue(1);

    app.endUndoGroup();
}

// Import/Other Stuff
function importFileAndStuff() {
    var videoFile = File("~/Videos/test.mp4");
    var videoItem = app.project.importFile(new ImportOptions(videoFile));

    var videoLayer;

    for(var i = 1; i <= 5; i++) {
    videoLayer = app.project.activeItem.layers.add(videoItem);
    videoLayer.property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(i, 0);
    videoLayer.property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(i+1, 100);
    }

    app.project.renderQueue.items.add(app.project.activeItem);

    //app.project.renderQueue.render();

}

// What's Next?
// Consult the guide very often, it is your best friend
// More videos: https://www.youtube.com/playlist?list=PL0qACgPuF8dWIJrE99hnYj1T3qBh__GRQ
// Discord help: https://discord.gg/23eFbcY
// Pick a goal you have, and learn each step it takes to accomplish that with a script
// Each step you must learn something will get your more familiar with scripting