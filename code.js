figma.showUI(__html__, { width: 300, height: 120 });
figma.ui.onmessage = (msg) => {
    if (msg.type === "get-instances") {
        let iconName;
        let getInstances;
        const { selection } = figma.currentPage;
        function getInstanceByName() {
            iconName = selection[0].name;
        }
        getInstanceByName();
        getInstances = figma.currentPage
            .findAll()
            .filter((node) => node.name === iconName);
        figma.currentPage.selection = getInstances;
        figma.notify(`${getInstances.length} "${iconName}'s" selected`);
    }
    figma.closePlugin();
};
