define(function (require, exports, module) {
    "use strict";
    // Brackets modules
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        AppInit        = brackets.getModule("utils/AppInit"),
        Docs           = brackets.getModule("document/DocumentManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Widgets        = brackets.getModule("widgets/Dialogs"),
        LiveDevMB      = brackets.getModule("LiveDevelopment/LiveDevMultiBrowser");

    // String
    var Strings = require("strings");

    // Discord-RPC
    const DiscordRPC = require("discord-rpc");

    // Constant variables
    const INTEGRATION_MENU_ID = "appmenu.integration"
    const DISCORD_RECONNECT = "discordrpc.reconnect";
    const DISCORD_RPC_CLIENTID = "760877027611508796";

    // RPC Client
    DiscordRPC.register(DISCORD_RPC_CLIENTID);
    var rpc = new DiscordRPC.Client();
    var startTimeStamp = new Date();
    var isReady = false;

    function getDocString() {
        let doc = Docs.getCurrentDocument();
        return (doc) ? doc.file.fullPath.split("/").pop() : "A File";
    }
    function getCurrentFunction() {
        return (LiveDevMB.isActive()) ? Strings.STATE_LIVE_EDITING : Strings.STATE_LIVE_EDITING;
    }
    function getCurrentFunctionAfter(){
        return (LiveDevMB.isActive()) ? Strings.STATE_LIVE_EDITING_AFTER : String.STATE_EDITING_AFTER;
    }
    function reconnect() {
        var dialog = Widgets.showModal("discordrpc.reconnectmodal", Strings.RECONNECTING, Strings.RECONNECTING_DESCRICPTION);
        setActicity();
        dialog.close();
    }
    function setActicity(){
        if(!rpc || !startTimeStamp){
            return;
        }
        var fnName = getCurrentFunction();
        var fnNameAfter = getCurrentFunctionAfter();
        var docName = getDocString();
        var largeImageKey = "brackets_default";
        if(docName.endsWith(".js")){
            largeImageKey = "javascript";
        }else if(docName.endsWith(".html") ||
                 docName.endsWith(".htm")
                ){
            largeImageKey = "html";
        }else if(docName.endsWith(".css") ||
                 docName.endsWith(".sass") ||
                 docName.endsWith(".scss")
                ){
            largeImageKey = "css";
        }else if(docName.endsWith(".xml")){
            largeImageKey = "xml";
        }
        rpc.setActivity({
            details: fnName + docName + fnNameAfter,
            state: "Brackets",
            startTimestamp: startTimeStamp,
            largeImageKey: largeImageKey,
            largeImageText: docName,
            smallImageKey: "brackets_default",
            smallImageText: "Brackets",
            instance: false
        });
    }
    AppInit.appReady(() => {

        CommandManager.register(Strings.RECONECT_TO_DISCORD, DISCORD_RECONNECT, reconnect);
        var menusKeys = Object.keys(Menus.getAllMenus());
        var menu = null;
        if(menusKeys.indexOf(INTEGRATION_MENU_ID) < 0){
            menu = Menus.addMenu(Strings.MENU_ITEM_TITLE, INTEGRATION_MENU_ID);
        }else{
            menu = Menus.getAllMenus()[INTEGRATION_MENU_ID];
        }
        menu.addMenuItem(DISCORD_RECONNECT);
        console.log(getDocString());
    });
    function autoUpdateRPC(){
        if(isReady){
            setActicity();
        }
        setTimeout(updateRPC, 20e3);
    }
    rpc.on('ready', ()=>{
        autoUpdateRPC();
    });
    rpc.login({DISCORD_RPC_CLIENTID}).catch(console.error);
});
