export type ToolboxItem = {
  id: string;
  categoryKey: string;
  nameKey: string;
  summaryKey: string;
  sceneKey: string;
  tagKeys: string[];
  url: string;
};

export const aiToolCategories = [
  'toolbox.ai.categories.agentFramework',
  'toolbox.ai.categories.ragMemory',
  'toolbox.ai.categories.toolCalling',
  'toolbox.ai.categories.evalBenchmark',
  'toolbox.ai.categories.automation',
];

export const aiTools: ToolboxItem[] = [
  {
    id: 'atlas',
    categoryKey: 'toolbox.ai.categories.agentFramework',
    nameKey: 'toolbox.ai.tools.atlas.name',
    summaryKey: 'toolbox.ai.tools.atlas.summary',
    sceneKey: 'toolbox.ai.tools.atlas.scene',
    tagKeys: ['tags.orchestration', 'tags.memory', 'tags.workflow'],
    url: 'https://example.com',
  },
  {
    id: 'lumen-rag',
    categoryKey: 'toolbox.ai.categories.ragMemory',
    nameKey: 'toolbox.ai.tools.lumen.name',
    summaryKey: 'toolbox.ai.tools.lumen.summary',
    sceneKey: 'toolbox.ai.tools.lumen.scene',
    tagKeys: ['tags.rag', 'tags.vector', 'tags.context'],
    url: 'https://example.com',
  },
  {
    id: 'signal-call',
    categoryKey: 'toolbox.ai.categories.toolCalling',
    nameKey: 'toolbox.ai.tools.signal.name',
    summaryKey: 'toolbox.ai.tools.signal.summary',
    sceneKey: 'toolbox.ai.tools.signal.scene',
    tagKeys: ['tags.tooling', 'tags.routing', 'tags.runtime'],
    url: 'https://example.com',
  },
  {
    id: 'pulse-eval',
    categoryKey: 'toolbox.ai.categories.evalBenchmark',
    nameKey: 'toolbox.ai.tools.pulse.name',
    summaryKey: 'toolbox.ai.tools.pulse.summary',
    sceneKey: 'toolbox.ai.tools.pulse.scene',
    tagKeys: ['tags.eval', 'tags.qa', 'tags.benchmark'],
    url: 'https://example.com',
  },
  {
    id: 'drift-automation',
    categoryKey: 'toolbox.ai.categories.automation',
    nameKey: 'toolbox.ai.tools.drift.name',
    summaryKey: 'toolbox.ai.tools.drift.summary',
    sceneKey: 'toolbox.ai.tools.drift.scene',
    tagKeys: ['tags.automation', 'tags.ops', 'tags.monitoring'],
    url: 'https://example.com',
  },
];

export const devToolCategories = [
  'toolbox.dev.categories.templates',
  'toolbox.dev.categories.cli',
  'toolbox.dev.categories.deploy',
  'toolbox.dev.categories.automation',
  'toolbox.dev.categories.observability',
];

export const devTools: ToolboxItem[] = [
  {
    id: 'nova-templates',
    categoryKey: 'toolbox.dev.categories.templates',
    nameKey: 'toolbox.dev.tools.nova.name',
    summaryKey: 'toolbox.dev.tools.nova.summary',
    sceneKey: 'toolbox.dev.tools.nova.scene',
    tagKeys: ['tags.templates', 'tags.starter', 'tags.typescript'],
    url: 'https://example.com',
  },
  {
    id: 'neon-cli',
    categoryKey: 'toolbox.dev.categories.cli',
    nameKey: 'toolbox.dev.tools.neoncli.name',
    summaryKey: 'toolbox.dev.tools.neoncli.summary',
    sceneKey: 'toolbox.dev.tools.neoncli.scene',
    tagKeys: ['tags.cli', 'tags.release', 'tags.multichain'],
    url: 'https://example.com',
  },
  {
    id: 'pulse-deploy',
    categoryKey: 'toolbox.dev.categories.deploy',
    nameKey: 'toolbox.dev.tools.pulsedeploy.name',
    summaryKey: 'toolbox.dev.tools.pulsedeploy.summary',
    sceneKey: 'toolbox.dev.tools.pulsedeploy.scene',
    tagKeys: ['tags.deploy', 'tags.wallet', 'tags.guardrails'],
    url: 'https://example.com',
  },
  {
    id: 'auto-fleet',
    categoryKey: 'toolbox.dev.categories.automation',
    nameKey: 'toolbox.dev.tools.autofleet.name',
    summaryKey: 'toolbox.dev.tools.autofleet.summary',
    sceneKey: 'toolbox.dev.tools.autofleet.scene',
    tagKeys: ['tags.automation', 'tags.pipeline', 'tags.docs'],
    url: 'https://example.com',
  },
  {
    id: 'spectra-observe',
    categoryKey: 'toolbox.dev.categories.observability',
    nameKey: 'toolbox.dev.tools.spectra.name',
    summaryKey: 'toolbox.dev.tools.spectra.summary',
    sceneKey: 'toolbox.dev.tools.spectra.scene',
    tagKeys: ['tags.observability', 'tags.tracing', 'tags.alerts'],
    url: 'https://example.com',
  },
];
