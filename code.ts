figma.showUI(__html__, { width: 300, height: 140 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "get-instances-by-name") {
    let nodeName: String;
    let getInstances;
    const { selection } = figma.currentPage;

    function getInstanceByName() {
      nodeName = selection[0].name;
    }

    getInstanceByName();

    getInstances = figma.currentPage
      .findAll()
      .filter((node) => node.name === nodeName);
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} "${nodeName}'s" selected`);
    figma.closePlugin();
  }

  if (msg.type === "get-instances-by-type") {
    let nodeType: String;
    let getInstances;
    const { selection } = figma.currentPage;

    function getInstanceByType() {
      nodeType = selection[0].type;
    }

    getInstanceByType();

    getInstances = figma.currentPage
      .findAll()
      .filter((node) => node.type === nodeType);
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} "${nodeType}'s" selected`);
    figma.closePlugin();
  }

  if (msg.type === "get-instances-by-size") {
    let nodeWidth: Number;
    let nodeHeight: Number;
    let getInstances;
    const { selection } = figma.currentPage;

    function getInstanceBySize() {
      nodeWidth = selection[0].width;
      nodeHeight = selection[0].height;
    }

    getInstanceBySize();

    getInstances = figma.currentPage
      .findAll()
      .filter((node) => node.width === nodeWidth && node.height === nodeHeight);
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
    figma.closePlugin();
  }

  if (msg.type === "get-instances-by-radius") {
    let nodeRadius: String;
    let getInstances;
    let nodetypes = [
      "FRAME",
      "COMPONENT",
      "INSTANCE",
      "GROUP",
      "VECTOR",
      "LINE",
      "STAR",
      "ELLIPSE",
      "RECTANGLE",
      "POLYGON",
    ];
    const { selection } = figma.currentPage;

    function getInstanceByRadius(node) {
      nodetypes.includes(node.type) ? (nodeRadius = node.cornerRadius) : null;
    }
    getInstanceByRadius(selection[0]);

    getInstances = figma.currentPage
      .findAll()
      .filter((node) => node.cornerRadius === nodeRadius);
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
    figma.closePlugin();
  }

  if (msg.type === "get-instances-by-strokeWeight") {
    let nodeStrokeWeight;
    let getInstances;
    let nodetypes = [
      "FRAME",
      "COMPONENT",
      "INSTANCE",
      "GROUP",
      "VECTOR",
      "LINE",
      "STAR",
      "ELLIPSE",
      "RECTANGLE",
      "POLYGON",
    ];
    const { selection } = figma.currentPage;

    function getInstanceByStrokeWeight(node) {
      nodetypes.includes(node.type)
        ? (nodeStrokeWeight = node.strokeWeight)
        : null;
    }
    getInstanceByStrokeWeight(selection[0]);

    getInstances = figma.currentPage
      .findAll()
      .filter((node) => node.strokeWeight === nodeStrokeWeight);
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
    figma.closePlugin();
  }

  if (msg.type === "get-instances-by-textSize") {
    let nodeTextSize;
    let getInstances;
    const { selection } = figma.currentPage;

    function getInstanceByTextSize(node) {
      node.type === "TEXT" ? (nodeTextSize = node.fontSize) : null;
    }
    getInstanceByTextSize(selection[0]);

    getInstances = figma.currentPage
      .findAll()
      .filter((node) => node.fontSize === nodeTextSize);
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
    figma.closePlugin();
  }
};
