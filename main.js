define(function (require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        AppInit        = brackets.getModule("utils/AppInit"),
        Docs           = brackets.getModule("document/DocumentManager"),
        EditorManager  = brackets.getModule("editor/EditorManager");

    function getDocString() {
      let doc = Docs.getCurrentDocument();
      return (doc) ? doc.file.fullPath.split("/").pop() : "A File";
    }
    function reconnect() {
        console.log(getDocString());
    }
    AppInit.appReady(() => {
      var DISCORD_RECONNECT = "discordrpc.reconnect";
      CommandManager.register("Reconnect to Discord", DISCORD_RECONNECT, reconnect);
      var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
      menu.addMenuItem(DISCORD_RECONNECT);
      console.log(getDocString());
    });
    EditorManager.on("activeEditorChange",() => {
      console.log(getDocString());
    });
});
