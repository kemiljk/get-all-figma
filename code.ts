figma.showUI(__html__, { width: 400, height: 440 });

async function findAllFonts() {
  const nodes = [];

  figma.currentPage
    .findAll((node) => node.type === "TEXT")
    .forEach((node: TextNode) =>
      nodes.push(node.fontName !== figma.mixed && node.fontName.family)
    );

  const uniqueFonts = [...new Set(nodes)];
  const selectList = uniqueFonts.filter((val) => val !== false);

  figma.ui.postMessage({ fontNames: selectList });
}
findAllFonts();

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
  }

  if (msg.type === "get-instances-by-width") {
    let nodeWidth: Number;
    let getInstances;
    const { selection } = figma.currentPage;

    function getInstanceByWidth() {
      nodeWidth = selection[0].width;
    }

    getInstanceByWidth();

    getInstances = figma.currentPage
      .findAll()
      .filter((node) => node.width === nodeWidth);
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
  }

  if (msg.type === "get-instances-by-height") {
    let nodeHeight: Number;
    let getInstances;
    const { selection } = figma.currentPage;

    function getInstanceByHeight() {
      nodeHeight = selection[0].height;
    }

    getInstanceByHeight();

    getInstances = figma.currentPage
      .findAll()
      .filter((node) => node.height === nodeHeight);
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
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
      .filter(
        (node: any) =>
          nodetypes.includes(node.type) && node.cornerRadius === nodeRadius
      );
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
  }

  if (msg.type === "get-instances-by-fills") {
    if (figma.currentPage.selection.length === 1) {
      let getInstances;
      const { selection } = figma.currentPage;
      const selectionFill = (selection[0] as any).fills[0];
      const { type, color, blendMode, opacity } = selectionFill;

      // console.log(type);
      // console.log(color);
      // console.log(blendMode);
      // console.log(opacity);

      getInstances = figma.currentPage
        .findAll((node: any) => node.fills[0].type === type)
        .filter(
          (node: any) =>
            node.fills[0].type !== "IMAGE" && node.fills[0].type !== undefined
        );

      figma.currentPage.selection = getInstances;
      figma.notify(`${getInstances.length} nodes selected`);
    }
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
      "SHAPE_WITH_TEXT",
      "STICKY",
      "CONNECTOR",
      "STAMP",
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
      .filter(
        (node) => node.type === "TEXT" && node.strokeWeight === nodeStrokeWeight
      );
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
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
      .filter((node) => node.type === "TEXT" && node.fontSize === nodeTextSize);
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
  }

  if (msg.type === "get-instances-by-fontName") {
    figma.currentPage.selection.length === 0 &&
      figma.notify("You need to select some text to continue");

    if (figma.currentPage.selection.length === 1) {
      let getInstances: SceneNode[] = [];
      let selectionFont = (figma.currentPage.selection[0] as TextNode).fontName;

      getInstances = figma.currentPage
        .findAll((node) => node.type === "TEXT")
        .filter((node: TextNode) =>
          node.fontName !== figma.mixed && selectionFont !== figma.mixed
            ? node.fontName.family === selectionFont.family &&
              node.fontName.style === selectionFont.style
            : null
        );
      figma.currentPage.selection = getInstances;
      figma.notify(
        `${getInstances.length} ${
          selectionFont !== figma.mixed ? selectionFont.family : null
        } (${
          selectionFont !== figma.mixed ? selectionFont.style : null
        }) selected`
      );
    }
  }

  if (msg.type === "get-instances-by-fontFamily") {
    figma.currentPage.selection.length === 0 &&
      figma.notify("You need to select some text to continue");

    if (figma.currentPage.selection.length === 1) {
      let getInstances: SceneNode[] = [];
      let selectionFont = (figma.currentPage.selection[0] as TextNode).fontName;

      getInstances = figma.currentPage
        .findAll((node) => node.type === "TEXT")
        .filter((node: TextNode) =>
          node.fontName !== figma.mixed && selectionFont !== figma.mixed
            ? node.fontName.family === selectionFont.family
            : null
        );
      figma.currentPage.selection = getInstances;
      figma.notify(
        `${getInstances.length} ${
          selectionFont !== figma.mixed ? selectionFont.family : null
        } selected`
      );
    }
  }

  if (msg.type === "get-instances-by-fontStyle") {
    figma.currentPage.selection.length === 0 &&
      figma.notify("You need to select some text to continue");

    if (figma.currentPage.selection.length === 1) {
      let getInstances: SceneNode[] = [];
      let selectionFont = (figma.currentPage.selection[0] as TextNode).fontName;

      getInstances = figma.currentPage
        .findAll((node) => node.type === "TEXT")
        .filter((node: TextNode) =>
          node.fontName !== figma.mixed && selectionFont !== figma.mixed
            ? node.fontName.style === selectionFont.style
            : null
        );
      figma.currentPage.selection = getInstances;
      figma.notify(
        `${getInstances.length} ${
          selectionFont !== figma.mixed ? selectionFont.style : null
        } selected`
      );
    }
  }

  if (msg.type === "get-instances-by-characters") {
    const nodes = figma.currentPage.findAll();
    let getInstances;
    getInstances = nodes.filter(
      (node: TextNode) =>
        node.characters ===
          (figma.currentPage.selection[0] as TextNode).characters &&
        node.characters.length ===
          (figma.currentPage.selection[0] as TextNode).characters.length
    );
    figma.currentPage.selection = getInstances;
    figma.notify(`${getInstances.length} nodes selected`);
  }

  if (msg.type === "get-instances-by-findBySelect") {
    let getInstances: SceneNode[] = [];

    getInstances = figma.currentPage
      .findAll((node) => node.type === "TEXT")
      .filter((node: TextNode) =>
        node.fontName !== figma.mixed && msg.pickFromSelect !== figma.mixed
          ? node.fontName.family === msg.pickFromSelect
          : null
      );
    figma.currentPage.selection = getInstances;
    figma.notify(
      `${getInstances.length} ${
        msg.pickFromSelect !== figma.mixed ? msg.pickFromSelect : null
      } selected`
    );
  }

  // if (msg.type === "get-instances-by-effects") {
  //   let nodeEffects = [{}];
  //   let getInstances;
  //   let nodetypes = [
  //     "FRAME",
  //     "COMPONENT",
  //     "INSTANCE",
  //     "GROUP",
  //     "VECTOR",
  //     "LINE",
  //     "STAR",
  //     "ELLIPSE",
  //     "RECTANGLE",
  //     "POLYGON",
  //     "TEXT",
  //   ];
  //   const { selection } = figma.currentPage;

  //   async function getInstanceByEffects(node) {
  //     nodeEffects = node.effects.map((e) =>
  //       nodetypes.includes(node.type)
  //         ? {
  //             type: e.type,
  //             color: e.color,
  //             blendMode: e.blendMode,
  //             offset: e.offset,
  //             spread: e.spread,
  //           }
  //         : e
  //     );
  //     console.log(nodeEffects);
  //   }
  //   getInstanceByEffects(selection[0]);

  //   getInstances = figma.currentPage
  //     .findAll()
  //     .filter(
  //       (node) => nodetypes.includes(node.type) && node.effects === nodeEffects
  //     );
  //   console.log(getInstances);

  //   figma.currentPage.selection = getInstances;
  //   figma.notify(`${getInstances.length} nodes selected`);
  // }
};
