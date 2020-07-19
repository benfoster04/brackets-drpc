define(function (require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        AppInit        = brackets.getModule("utils/AppInit"),
        Docs           = brackets.getModule("document/DocumentManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Widgets        = brackets.getModule("widgets/Dialogs"),
        LiveDevMB      = brackets.getModule("LiveDevelopment/LiveDevMultiBrowser");

    function getDocString() {
      let doc = Docs.getCurrentDocument();
      return (doc) ? doc.file.fullPath.split("/").pop() : "A File";
    }
    function getCurrentFunction() {
      return (LiveDevMB.isActive()) ? "Live Editing" : "Editing";
    }
    function reconnect() {
        // Widgets.showModal("discordrpc.reconnectmodal", "Reconnecting", "We're trying to reconnect you now.");
    }
    AppInit.appReady(() => {
      var DISCORD_RECONNECT = "discordrpc.reconnect";
      CommandManager.register("Reconnect to Discord", DISCORD_RECONNECT, reconnect);
      var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
      menu.addMenuItem(DISCORD_RECONNECT);
      console.log(getDocString());
    });
    EditorManager.on("activeEditorChange",() => {
      console.log(getCurrentFunction()+" "+getDocString());
    });
});
