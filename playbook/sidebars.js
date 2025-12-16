/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Main/Home Sidebar (shown on index page)
  mainSidebar: [
    'index',
  ],

  // Developer Guide Sidebar
  developerSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'developer-guide/getting-started/developer-guide-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Daily Usage',
      items: [
        'developer-guide/daily-usage/code-completion',
        'developer-guide/daily-usage/code-generation-comments',
        'developer-guide/daily-usage/test-generation',
        'developer-guide/daily-usage/refactoring',
        'developer-guide/daily-usage/anti-patterns',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'developer-guide/examples/python-example',
        'developer-guide/examples/javascript-example',
        'developer-guide/examples/java-example',
        'developer-guide/examples/dotnet-example',
        'developer-guide/examples/language-agnostic-patterns',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Practices',
      items: [
        'developer-guide/advanced/senior-practices',
        'developer-guide/advanced/lead-practices',
        'developer-guide/advanced/principal-practices',
      ],
    },
  ],

  // Architect Guide Sidebar
  architectSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'architect-guide/getting-started/architect-guide-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Standards',
      items: [
        'architect-guide/standards/model-selection',
        'architect-guide/standards/context-management',
        'architect-guide/standards/copilot-instructions',
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      items: [
        'architect-guide/governance/governance-policies',
        'architect-guide/governance/human-oversight',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Practices',
      items: [
        'architect-guide/advanced/senior-practices',
        'architect-guide/advanced/lead-practices',
        'architect-guide/advanced/principal-practices',
      ],
    },
  ],

  // QA Guide Sidebar
  qaSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'qa-guide/getting-started/qa-guide-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Practices',
      items: [
        'qa-guide/advanced/senior-practices',
        'qa-guide/advanced/lead-practices',
        'qa-guide/advanced/principal-practices',
      ],
    },
  ],

  // DevOps Guide Sidebar
  devopsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'devops-guide/getting-started/devops-guide-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Practices',
      items: [
        'devops-guide/advanced/senior-practices',
        'devops-guide/advanced/lead-practices',
        'devops-guide/advanced/principal-practices',
      ],
    },
  ],

  // Product Owner Guide Sidebar
  productOwnerSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'product-owner-guide/getting-started/product-owner-guide-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Practices',
      items: [
        'product-owner-guide/advanced/senior-practices',
        'product-owner-guide/advanced/lead-practices',
        'product-owner-guide/advanced/principal-practices',
      ],
    },
  ],

  // Product Manager Guide Sidebar
  productManagerSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'product-manager-guide/getting-started/product-manager-guide-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Practices',
      items: [
        'product-manager-guide/advanced/senior-practices',
        'product-manager-guide/advanced/lead-practices',
        'product-manager-guide/advanced/principal-practices',
      ],
    },
  ],

  // UI Designer Guide Sidebar
  uiDesignerSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'ui-designer-guide/getting-started/ui-designer-guide-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Practices',
      items: [
        'ui-designer-guide/advanced/senior-practices',
        'ui-designer-guide/advanced/lead-practices',
        'ui-designer-guide/advanced/principal-practices',
      ],
    },
  ],

  // UX Designer Guide Sidebar
  uxDesignerSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'ux-designer-guide/getting-started/ux-designer-guide-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Practices',
      items: [
        'ux-designer-guide/advanced/senior-practices',
        'ux-designer-guide/advanced/lead-practices',
        'ux-designer-guide/advanced/principal-practices',
      ],
    },
  ],

  // Shared Content Sidebar
  sharedSidebar: [
    {
      type: 'category',
      label: 'Prompt Engineering',
      items: [
        'shared/prompt-engineering/prompt-engineering-introduction',
        'shared/prompt-engineering/rice-framework',
        {
          type: 'category',
          label: 'Templates',
          items: [
            'shared/prompt-engineering/templates/code-generation-template',
            'shared/prompt-engineering/templates/refactoring-template',
            'shared/prompt-engineering/templates/testing-template',
            'shared/prompt-engineering/templates/debugging-template',
          ],
        },
        'shared/prompt-engineering/before-after-examples',
      ],
    },
    {
      type: 'category',
      label: 'Security & Compliance',
      items: [
        'shared/security-compliance/security-compliance-overview',
      ],
    },
    {
      type: 'category',
      label: 'AI Tools Ecosystem',
      items: [
        'shared/ai-tools-ecosystem/ai-tools-ecosystem-overview',
        'shared/ai-tools-ecosystem/extensibility-framework',
      ],
    },
    {
      type: 'category',
      label: 'AI-Native SDLC',
      items: [
        'shared/ai-native-sdlc/ai-native-sdlc-workflows',
        'shared/ai-native-sdlc/spec-first',
        'shared/ai-native-sdlc/tdd-with-ai',
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      items: [
        'shared/governance/measuring-success',
        'shared/governance/conflict-resolution',
      ],
    },
  ],
};

module.exports = sidebars;

