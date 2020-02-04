define(function (require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        AppInit        = brackets.getModule("utils/AppInit"),
        Docs           = brackets.getModule("document/DocumentManager"),
        EditorManager  = brackets.getModule("editor/EditorManager");
    function reconnect() {
        let doc = Docs.getCurrentDocument();
        window.alert(doc.file.fullPath.split("/").pop());
    }
    AppInit.appReady(() => {
      var DISCORD_RECONNECT = "discordrpc.reconnect";
      CommandManager.register("Reconnect to Discord", DISCORD_RECONNECT, reconnect);
      var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
      menu.addMenuItem(DISCORD_RECONNECT, "Ctrl-Shift-R");

      let doc = Docs.getCurrentDocument();
      if (doc) {
        window.alert(doc.file.fullPath.split("/").pop());
      } else {window.alert("Tumbleweed");}
    });
    EditorManager.on("activeEditorChange",() => {
      let doc = Docs.getCurrentDocument();
      if (doc) {
        window.alert(doc.file.fullPath.split("/").pop());
      } else {window.alert("Tumbleweed 2");}
    });
});
