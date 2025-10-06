(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/baseline-data.ts
  var BASELINE_FEATURES;
  var init_baseline_data = __esm({
    "src/baseline-data.ts"() {
      BASELINE_FEATURES = {
        "flexbox": {
          name: "Flexbox",
          cssProperty: "display: flex",
          status: "widely-available",
          availableSince: "2015",
          description: "Flexible box layout for one-dimensional layouts",
          browserSupport: {
            chrome: "29",
            firefox: "28",
            safari: "9",
            edge: "12"
          }
        },
        "grid": {
          name: "CSS Grid",
          cssProperty: "display: grid",
          status: "widely-available",
          availableSince: "2017",
          description: "Two-dimensional grid-based layout system",
          browserSupport: {
            chrome: "57",
            firefox: "52",
            safari: "10.1",
            edge: "16"
          }
        },
        "gap": {
          name: "Gap Property",
          cssProperty: "gap",
          status: "widely-available",
          availableSince: "2020",
          description: "Spacing between flex/grid items",
          browserSupport: {
            chrome: "84",
            firefox: "63",
            safari: "14.1",
            edge: "84"
          }
        },
        "subgrid": {
          name: "CSS Subgrid",
          cssProperty: "grid-template-columns: subgrid",
          status: "newly-available",
          availableSince: "2023-09",
          description: "Nested grids that inherit parent grid tracks",
          fallback: "Use regular CSS Grid with manual alignment",
          browserSupport: {
            chrome: "117",
            firefox: "71",
            safari: "16",
            edge: "117"
          }
        },
        "container-queries": {
          name: "Container Queries",
          cssProperty: "@container",
          status: "newly-available",
          availableSince: "2023-02",
          description: "Style elements based on container size",
          fallback: "Use media queries or JavaScript resize observers",
          browserSupport: {
            chrome: "105",
            firefox: "110",
            safari: "16",
            edge: "105"
          }
        },
        "has-selector": {
          name: ":has() Selector",
          cssProperty: ":has()",
          status: "newly-available",
          availableSince: "2023-12",
          description: "Parent selector based on descendants",
          fallback: "Use JavaScript or restructure CSS",
          browserSupport: {
            chrome: "105",
            firefox: "121",
            safari: "15.4",
            edge: "105"
          }
        },
        "nesting": {
          name: "CSS Nesting",
          cssProperty: "& { }",
          status: "newly-available",
          availableSince: "2023-12",
          description: "Native CSS nesting without preprocessors",
          fallback: "Use Sass/PostCSS or flatten selectors",
          browserSupport: {
            chrome: "120",
            firefox: "117",
            safari: "16.5",
            edge: "120"
          }
        },
        "backdrop-filter": {
          name: "Backdrop Filter",
          cssProperty: "backdrop-filter",
          status: "widely-available",
          availableSince: "2022",
          description: "Apply filters to area behind element",
          browserSupport: {
            chrome: "76",
            firefox: "103",
            safari: "9",
            edge: "79"
          }
        },
        "aspect-ratio": {
          name: "Aspect Ratio",
          cssProperty: "aspect-ratio",
          status: "widely-available",
          availableSince: "2021",
          description: "Set preferred aspect ratio for elements",
          fallback: "Use padding-bottom percentage trick",
          browserSupport: {
            chrome: "88",
            firefox: "89",
            safari: "15",
            edge: "88"
          }
        },
        "cascade-layers": {
          name: "Cascade Layers",
          cssProperty: "@layer",
          status: "widely-available",
          availableSince: "2022",
          description: "Control specificity with named layers",
          browserSupport: {
            chrome: "99",
            firefox: "97",
            safari: "15.4",
            edge: "99"
          }
        },
        "color-mix": {
          name: "color-mix()",
          cssProperty: "color-mix()",
          status: "newly-available",
          availableSince: "2023-06",
          description: "Mix colors in specified color spaces",
          fallback: "Use preprocessor color functions or hardcode values",
          browserSupport: {
            chrome: "111",
            firefox: "113",
            safari: "16.2",
            edge: "111"
          }
        },
        "scroll-snap": {
          name: "Scroll Snap",
          cssProperty: "scroll-snap-type",
          status: "widely-available",
          availableSince: "2019",
          description: "Control scroll position snapping",
          browserSupport: {
            chrome: "69",
            firefox: "68",
            safari: "11",
            edge: "79"
          }
        },
        "logical-properties": {
          name: "Logical Properties",
          cssProperty: "margin-inline, padding-block, etc.",
          status: "widely-available",
          availableSince: "2020",
          description: "Flow-relative CSS properties",
          browserSupport: {
            chrome: "87",
            firefox: "68",
            safari: "14.1",
            edge: "87"
          }
        },
        "view-transitions": {
          name: "View Transitions API",
          cssProperty: "view-transition-name",
          status: "limited",
          availableSince: "Not yet",
          description: "Smooth transitions between page states",
          fallback: "Use CSS transitions and JavaScript",
          browserSupport: {
            chrome: "111",
            safari: "Not supported",
            firefox: "Not supported",
            edge: "111"
          }
        },
        "anchor-positioning": {
          name: "CSS Anchor Positioning",
          cssProperty: "anchor-name",
          status: "limited",
          availableSince: "Not yet",
          description: "Position elements relative to anchors",
          fallback: "Use JavaScript positioning",
          browserSupport: {
            chrome: "125",
            safari: "Not supported",
            firefox: "Not supported",
            edge: "125"
          }
        }
      };
    }
  });

  // src/code.ts
  var require_code = __commonJS({
    "src/code.ts"() {
      init_baseline_data();
      figma.showUI(__html__, {
        width: 480,
        height: 700,
        themeColors: true
      });
      var latestCSSCode = "";
      async function analyzeDesign() {
        const selection = figma.currentPage.selection;
        const nodesToAnalyze = selection.length > 0 ? selection : [figma.currentPage];
        const detectedFeatures = [];
        const warnings = [];
        let nodeCount = 0;
        function analyzeNode(node) {
          nodeCount++;
          if ("layoutMode" in node && node.layoutMode !== "NONE") {
            detectedFeatures.push({
              featureKey: "flexbox",
              feature: BASELINE_FEATURES["flexbox"],
              nodeName: node.name,
              nodeId: node.id,
              context: "Auto Layout detected",
              value: `direction: ${node.layoutMode === "HORIZONTAL" ? "row" : "column"}`
            });
            if ("itemSpacing" in node && node.itemSpacing > 0) {
              detectedFeatures.push({
                featureKey: "gap",
                feature: BASELINE_FEATURES["gap"],
                nodeName: node.name,
                nodeId: node.id,
                context: "Item spacing in Auto Layout",
                value: `${node.itemSpacing}px`
              });
            }
          }
          if ("layoutGrids" in node && node.layoutGrids.length > 0) {
            const gridLayouts = node.layoutGrids.filter((grid) => grid.pattern === "GRID");
            if (gridLayouts.length > 0) {
              detectedFeatures.push({
                featureKey: "grid",
                feature: BASELINE_FEATURES["grid"],
                nodeName: node.name,
                nodeId: node.id,
                context: "Layout Grid detected"
              });
            }
          }
          if ("effects" in node && node.effects.length > 0) {
            const blurEffects = node.effects.filter(
              (effect) => effect.type === "BACKGROUND_BLUR" || effect.type === "LAYER_BLUR"
            );
            if (blurEffects.length > 0) {
              const blur = blurEffects[0];
              detectedFeatures.push({
                featureKey: "backdrop-filter",
                feature: BASELINE_FEATURES["backdrop-filter"],
                nodeName: node.name,
                nodeId: node.id,
                context: "Blur effect detected",
                value: `blur(${blur.radius}px)`
              });
            }
          }
          if ("width" in node && "height" in node) {
            const width = node.width;
            const height = node.height;
            const ratio = width / height;
            const commonRatios = [
              { ratio: 16 / 9, name: "16:9" },
              { ratio: 4 / 3, name: "4:3" },
              { ratio: 1, name: "1:1" },
              { ratio: 21 / 9, name: "21:9" }
            ];
            for (const common of commonRatios) {
              if (Math.abs(ratio - common.ratio) < 0.01) {
                detectedFeatures.push({
                  featureKey: "aspect-ratio",
                  feature: BASELINE_FEATURES["aspect-ratio"],
                  nodeName: node.name,
                  nodeId: node.id,
                  context: "Fixed aspect ratio frame",
                  value: common.name
                });
                break;
              }
            }
          }
          if ("blendMode" in node && node.blendMode !== "NORMAL") {
            const blendMode = node.blendMode.toLowerCase().replace(/_/g, "-");
            detectedFeatures.push({
              featureKey: "blend-mode",
              feature: {
                name: "Blend Modes",
                cssProperty: "mix-blend-mode",
                status: "widely-available",
                description: "Blend element with background",
                browserSupport: { chrome: "41", firefox: "32", safari: "8", edge: "79" }
              },
              nodeName: node.name,
              nodeId: node.id,
              context: "Blend mode applied",
              value: blendMode
            });
          }
          if ("rotation" in node && Math.abs(node.rotation) > 0.5) {
            detectedFeatures.push({
              featureKey: "transform",
              feature: {
                name: "CSS Transform",
                cssProperty: "transform",
                status: "widely-available",
                description: "Transform elements (rotate, scale, etc.)",
                browserSupport: { chrome: "36", firefox: "16", safari: "9", edge: "12" }
              },
              nodeName: node.name,
              nodeId: node.id,
              context: "Rotation applied",
              value: `${node.rotation.toFixed(1)}\xB0`
            });
          }
          if ("cornerRadius" in node && node.cornerRadius !== 0) {
            detectedFeatures.push({
              featureKey: "border-radius",
              feature: {
                name: "Border Radius",
                cssProperty: "border-radius",
                status: "widely-available",
                description: "Rounded corners",
                browserSupport: { chrome: "4", firefox: "4", safari: "5", edge: "12" }
              },
              nodeName: node.name,
              nodeId: node.id,
              context: "Rounded corners",
              value: typeof node.cornerRadius === "number" ? `${node.cornerRadius}px` : "mixed"
            });
          }
          if ("effects" in node && node.effects.length > 0) {
            const shadows = node.effects.filter((e) => e.type === "DROP_SHADOW");
            if (shadows.length > 1) {
              detectedFeatures.push({
                featureKey: "multiple-shadows",
                feature: {
                  name: "Multiple Box Shadows",
                  cssProperty: "box-shadow",
                  status: "widely-available",
                  description: "Multiple shadow layers",
                  browserSupport: { chrome: "10", firefox: "4", safari: "5.1", edge: "12" }
                },
                nodeName: node.name,
                nodeId: node.id,
                context: "Multiple shadows detected",
                value: `${shadows.length} layers`
              });
            }
          }
          if ("children" in node) {
            node.children.forEach((child) => analyzeNode(child));
          }
        }
        nodesToAnalyze.forEach((node) => analyzeNode(node));
        const uniqueFeatures = detectedFeatures.filter(
          (feature, index, self) => index === self.findIndex(
            (f) => f.featureKey === feature.featureKey && f.nodeName === feature.nodeName && f.context === feature.context
          )
        );
        uniqueFeatures.forEach((detected) => {
          if (detected.feature.status === "newly-available") {
            warnings.push(
              `${detected.feature.name} is newly available. Consider providing fallbacks for older browsers.`
            );
          } else if (detected.feature.status === "limited") {
            warnings.push(
              `${detected.feature.name} has limited browser support. ${detected.feature.fallback || "Use alternative approach."}`
            );
          }
        });
        const cssCode = generateCSS(uniqueFeatures);
        latestCSSCode = cssCode;
        return {
          features: uniqueFeatures,
          nodeCount,
          warnings: [...new Set(warnings)],
          // Remove duplicate warnings
          cssCode
        };
      }
      function generateCSS(features) {
        let css = `/* Baseline-Validated CSS */
/* Generated from Figma design */

`;
        const featureGroups = features.reduce((acc, f) => {
          if (!acc[f.featureKey]) {
            acc[f.featureKey] = [];
          }
          acc[f.featureKey].push(f);
          return acc;
        }, {});
        Object.entries(featureGroups).forEach(([key, detectedList]) => {
          const first = detectedList[0];
          css += `/* ${first.feature.name} - ${first.feature.status} */
`;
          if (first.feature.status !== "widely-available" && first.feature.fallback) {
            css += `/* Fallback: ${first.feature.fallback} */
`;
          }
          detectedList.forEach((detected) => {
            var _a, _b;
            const className = detected.nodeName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            css += `.${className} {
`;
            switch (detected.featureKey) {
              case "flexbox":
                css += `  display: flex;
`;
                if ((_a = detected.value) == null ? void 0 : _a.includes("row")) {
                  css += `  flex-direction: row;
`;
                } else {
                  css += `  flex-direction: column;
`;
                }
                break;
              case "gap":
                css += `  gap: ${detected.value};
`;
                break;
              case "grid":
                css += `  display: grid;
`;
                css += `  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;
                break;
              case "backdrop-filter":
                css += `  backdrop-filter: ${detected.value};
`;
                css += `  -webkit-backdrop-filter: ${detected.value}; /* Safari */
`;
                break;
              case "aspect-ratio":
                css += `  aspect-ratio: ${(_b = detected.value) == null ? void 0 : _b.replace(":", " / ")};
`;
                break;
              case "border-radius":
                css += `  border-radius: ${detected.value};
`;
                break;
              case "transform":
                css += `  transform: rotate(${detected.value});
`;
                break;
              case "blend-mode":
                css += `  mix-blend-mode: ${detected.value};
`;
                break;
            }
            css += `}

`;
          });
        });
        return css;
      }
      figma.ui.onmessage = async (msg) => {
        console.log("Received message:", msg);
        if (msg.type === "analyze") {
          console.log("Starting analysis...");
          try {
            const result = await analyzeDesign();
            console.log("Analysis complete:", result);
            figma.ui.postMessage({
              type: "analysis-complete",
              data: result
            });
          } catch (error) {
            console.error("Analysis error:", error);
            figma.ui.postMessage({
              type: "error",
              message: "Failed to analyze design"
            });
          }
        }
        if (msg.type === "select-node") {
          const node = figma.getNodeById(msg.nodeId);
          if (node) {
            figma.currentPage.selection = [node];
            figma.viewport.scrollAndZoomIntoView([node]);
          }
        }
        if (msg.type === "copy-css") {
          if (latestCSSCode) {
            figma.ui.postMessage({
              type: "css-to-copy",
              css: latestCSSCode
            });
          }
        }
        if (msg.type === "close") {
          figma.closePlugin();
        }
      };
      setTimeout(() => {
        if (figma.currentPage.selection.length > 0) {
          figma.ui.postMessage({ type: "auto-analyze" });
        }
      }, 100);
    }
  });
  require_code();
})();
