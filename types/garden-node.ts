export type GardenMaturity = 'seed' | 'seedling' | 'budding' | 'evergreen';

export interface GardenNodeFrontmatter {
  slug: string;
  title: string;
  maturity: GardenMaturity;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface GardenNode {
  slug: string;
  title: string;
  content: string;
  maturity: GardenMaturity;
  tags: string[];
  linksTo: string[]; // outgoing links [[]]
  linkedFrom: string[]; // incoming links
  createdAt: Date;
  updatedAt: Date;
}

export interface GardenGraphData {
  nodes: GardenGraphNode[];
  links: GardenGraphLink[];
}

export interface GardenGraphNode {
  id: string;
  slug: string;
  title: string;
  maturity: GardenMaturity;
  group: string; // category/tag
}

export interface GardenGraphLink {
  source: string;
  target: string;
}