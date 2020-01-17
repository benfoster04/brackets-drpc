define(function (require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus");
    function handleHelloWorld() {
        window.alert("Hello, world!");
    }
    var DISCORD_RECONNECT = "helloworld.sayhello";   // package-style naming to avoid collisions
    CommandManager.register("Reconnect to Discord", DISCORD_RECONNECT, reconnect);
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(DISCORD_RECONNECT);
    menu.addMenuItem(DISCORD_RECONNECT, "Ctrl-Shift-R");
});
