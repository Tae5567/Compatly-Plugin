//Main plugin code

// Declare Figma global types
//declare const figma: any;
//declare const __html__: string;

import { BASELINE_FEATURES, BaselineFeature, BaselineStatus } from './baseline-data';

figma.showUI(__html__, { 
  width: 480, 
  height: 700,
  themeColors: true 
});

interface DetectedFeature {
  featureKey: string;
  feature: BaselineFeature;
  nodeName: string;
  nodeId: string;
  context: string;
  value?: string;
}

interface AnalysisResult {
  features: DetectedFeature[];
  nodeCount: number;
  warnings: string[];
  cssCode: string;
}

// Analyze the current selection or page
async function analyzeDesign(): Promise<AnalysisResult> {
  const selection = figma.currentPage.selection;
  const nodesToAnalyze = selection.length > 0 ? selection : [figma.currentPage];
  
  const detectedFeatures: DetectedFeature[] = [];
  const warnings: string[] = [];
  let nodeCount = 0;

  function analyzeNode(node: SceneNode) {
    nodeCount++;

    // Check for Auto Layout (Flexbox)
    if ('layoutMode' in node && node.layoutMode !== 'NONE') {
      detectedFeatures.push({
        featureKey: 'flexbox',
        feature: BASELINE_FEATURES['flexbox'],
        nodeName: node.name,
        nodeId: node.id,
        context: 'Auto Layout detected',
        value: `direction: ${node.layoutMode === 'HORIZONTAL' ? 'row' : 'column'}`
      });

      // Check for gap
      if ('itemSpacing' in node && node.itemSpacing > 0) {
        detectedFeatures.push({
          featureKey: 'gap',
          feature: BASELINE_FEATURES['gap'],
          nodeName: node.name,
          nodeId: node.id,
          context: 'Item spacing in Auto Layout',
          value: `${node.itemSpacing}px`
        });
      }
    }

    // Check for Grid Layout
    if ('layoutGrids' in node && node.layoutGrids.length > 0) {
      const gridLayouts = node.layoutGrids.filter(grid => grid.pattern === 'GRID');
      if (gridLayouts.length > 0) {
        detectedFeatures.push({
          featureKey: 'grid',
          feature: BASELINE_FEATURES['grid'],
          nodeName: node.name,
          nodeId: node.id,
          context: 'Layout Grid detected'
        });
      }
    }

    // Check for backdrop filter (blur effects)
    if ('effects' in node && node.effects.length > 0) {
      const blurEffects = node.effects.filter(effect => 
        effect.type === 'BACKGROUND_BLUR' || effect.type === 'LAYER_BLUR'
      );
      
      if (blurEffects.length > 0) {
        const blur = blurEffects[0] as BlurEffect;
        detectedFeatures.push({
          featureKey: 'backdrop-filter',
          feature: BASELINE_FEATURES['backdrop-filter'],
          nodeName: node.name,
          nodeId: node.id,
          context: 'Blur effect detected',
          value: `blur(${blur.radius}px)`
        });
      }
    }

    // Check for aspect ratio (if frame has specific proportions)
    if ('width' in node && 'height' in node) {
      const width = node.width;
      const height = node.height;
      const ratio = width / height;
      
      // Common aspect ratios
      const commonRatios = [
        { ratio: 16/9, name: '16:9' },
        { ratio: 4/3, name: '4:3' },
        { ratio: 1, name: '1:1' },
        { ratio: 21/9, name: '21:9' }
      ];
      
      for (const common of commonRatios) {
        if (Math.abs(ratio - common.ratio) < 0.01) {
          detectedFeatures.push({
            featureKey: 'aspect-ratio',
            feature: BASELINE_FEATURES['aspect-ratio'],
            nodeName: node.name,
            nodeId: node.id,
            context: 'Fixed aspect ratio frame',
            value: common.name
          });
          break;
        }
      }
    }

    // Check for blend modes
    if ('blendMode' in node && node.blendMode !== 'NORMAL') {
      const blendMode = node.blendMode.toLowerCase().replace(/_/g, '-');
      detectedFeatures.push({
        featureKey: 'blend-mode',
        feature: {
          name: 'Blend Modes',
          cssProperty: 'mix-blend-mode',
          status: 'widely-available',
          description: 'Blend element with background',
          browserSupport: { chrome: '41', firefox: '32', safari: '8', edge: '79' }
        },
        nodeName: node.name,
        nodeId: node.id,
        context: 'Blend mode applied',
        value: blendMode
      });
    }

    // Check for rotation/transforms
    if ('rotation' in node && Math.abs(node.rotation) > 0.5) {
      detectedFeatures.push({
        featureKey: 'transform',
        feature: {
          name: 'CSS Transform',
          cssProperty: 'transform',
          status: 'widely-available',
          description: 'Transform elements (rotate, scale, etc.)',
          browserSupport: { chrome: '36', firefox: '16', safari: '9', edge: '12' }
        },
        nodeName: node.name,
        nodeId: node.id,
        context: 'Rotation applied',
        value: `${node.rotation.toFixed(1)}°`
      });
    }

    // Check for corner radius
    if ('cornerRadius' in node && node.cornerRadius !== 0) {
      detectedFeatures.push({
        featureKey: 'border-radius',
        feature: {
          name: 'Border Radius',
          cssProperty: 'border-radius',
          status: 'widely-available',
          description: 'Rounded corners',
          browserSupport: { chrome: '4', firefox: '4', safari: '5', edge: '12' }
        },
        nodeName: node.name,
        nodeId: node.id,
        context: 'Rounded corners',
        value: typeof node.cornerRadius === 'number' ? `${node.cornerRadius}px` : 'mixed'
      });
    }

    // Check for complex shadows
    if ('effects' in node && node.effects.length > 0) {
      const shadows = node.effects.filter(e => e.type === 'DROP_SHADOW');
      if (shadows.length > 1) {
        detectedFeatures.push({
          featureKey: 'multiple-shadows',
          feature: {
            name: 'Multiple Box Shadows',
            cssProperty: 'box-shadow',
            status: 'widely-available',
            description: 'Multiple shadow layers',
            browserSupport: { chrome: '10', firefox: '4', safari: '5.1', edge: '12' }
          },
          nodeName: node.name,
          nodeId: node.id,
          context: 'Multiple shadows detected',
          value: `${shadows.length} layers`
        });
      }
    }

    // Recursively analyze children
    if ('children' in node) {
      node.children.forEach(child => analyzeNode(child));
    }
  }

  // Analyze all nodes
  nodesToAnalyze.forEach(node => analyzeNode(node));

  // Remove duplicates
  const uniqueFeatures = detectedFeatures.filter((feature, index, self) =>
    index === self.findIndex(f => 
      f.featureKey === feature.featureKey && 
      f.nodeName === feature.nodeName &&
      f.context === feature.context
    )
  );

  // Generate warnings for limited/newly-available features
  uniqueFeatures.forEach(detected => {
    if (detected.feature.status === 'newly-available') {
      warnings.push(
        `⚠️ ${detected.feature.name} is newly available. Consider providing fallbacks for older browsers.`
      );
    } else if (detected.feature.status === 'limited') {
      warnings.push(
        `❌ ${detected.feature.name} has limited browser support. ${detected.feature.fallback || 'Use alternative approach.'}`
      );
    }
  });

  // Generate CSS code
  const cssCode = generateCSS(uniqueFeatures);

  return {
    features: uniqueFeatures,
    nodeCount,
    warnings: [...new Set(warnings)], // Remove duplicate warnings
    cssCode
  };
}

function generateCSS(features: DetectedFeature[]): string {
  let css = `/* Baseline-Validated CSS */\n/* Generated from Figma design */\n\n`;

  const featureGroups = features.reduce((acc, f) => {
    if (!acc[f.featureKey]) {
      acc[f.featureKey] = [];
    }
    acc[f.featureKey].push(f);
    return acc;
  }, {} as Record<string, DetectedFeature[]>);

  Object.entries(featureGroups).forEach(([key, detectedList]) => {
    const first = detectedList[0];
    css += `/* ${first.feature.name} - ${first.feature.status} */\n`;
    
    if (first.feature.status !== 'widely-available' && first.feature.fallback) {
      css += `/* Fallback: ${first.feature.fallback} */\n`;
    }

    detectedList.forEach(detected => {
      css += `.${detected.nodeName.toLowerCase().replace(/\s+/g, '-')} {\n`;
      
      switch (detected.featureKey) {
        case 'flexbox':
          css += `  display: flex;\n`;
          if (detected.value?.includes('row')) {
            css += `  flex-direction: row;\n`;
          } else {
            css += `  flex-direction: column;\n`;
          }
          break;
        case 'gap':
          css += `  gap: ${detected.value};\n`;
          break;
        case 'grid':
          css += `  display: grid;\n`;
          css += `  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n`;
          break;
        case 'backdrop-filter':
          css += `  backdrop-filter: ${detected.value};\n`;
          css += `  -webkit-backdrop-filter: ${detected.value}; /* Safari */\n`;
          break;
        case 'aspect-ratio':
          css += `  aspect-ratio: ${detected.value?.replace(':', ' / ')};\n`;
          break;
        case 'border-radius':
          css += `  border-radius: ${detected.value};\n`;
          break;
        case 'transform':
          css += `  transform: rotate(${detected.value});\n`;
          break;
      }
      
      css += `}\n\n`;
    });
  });

  return css;
}

// Message handlers
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'analyze') {
    const result = await analyzeDesign();
    figma.ui.postMessage({
      type: 'analysis-complete',
      data: result
    });
  }

  if (msg.type === 'select-node') {
    const node = figma.getNodeById(msg.nodeId);
    if (node) {
      figma.currentPage.selection = [node as SceneNode];
      figma.viewport.scrollAndZoomIntoView([node as SceneNode]);
    }
  }

  if (msg.type === 'copy-css') {
    // CSS copying is handled in the UI
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};

// Auto-analyze on load if there's a selection
if (figma.currentPage.selection.length > 0) {
  setTimeout(() => {
    figma.ui.postMessage({ type: 'auto-analyze' });
  }, 500);
}