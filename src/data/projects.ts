export type Project = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  tagsKey: string[];
  repo: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'wechat-mpc',
    nameKey: 'projects.wechatMpc.name',
    descriptionKey: 'projects.wechatMpc.description',
    tagsKey: ['tags.mpc', 'tags.wallet'],
    repo: 'https://github.com/carzygod/Wechat-Alipay-MPC-Wallet-Solution',
    featured: true,
  },
  {
    id: 'tgwc',
    nameKey: 'projects.tgwc.name',
    descriptionKey: 'projects.tgwc.description',
    tagsKey: ['tags.telegram', 'tags.wallet'],
    repo: 'https://github.com/carzygod/Tonspay/TGWC',
    featured: true,
  },
  {
    id: 'egba',
    nameKey: 'projects.egba.name',
    descriptionKey: 'projects.egba.description',
    tagsKey: ['tags.chrome', 'tags.extension'],
    repo: 'https://github.com/carzygod/eGBA',
    featured: true,
  },
  {
    id: 'nostrlink',
    nameKey: 'projects.nostrlink.name',
    descriptionKey: 'projects.nostrlink.description',
    tagsKey: ['tags.nostr', 'tags.community'],
    repo: 'https://github.com/carzygod/NostrLink',
    featured: true,
  },
  {
    id: 'lastpush-dashboard',
    nameKey: 'projects.lastpush.name',
    descriptionKey: 'projects.lastpush.description',
    tagsKey: ['tags.react', 'tags.dashboard'],
    repo: 'https://github.com/carzygod/lastpush/dashboard',
    featured: true,
  },
  {
    id: 'hotspot-app',
    nameKey: 'projects.hotspot.name',
    descriptionKey: 'projects.hotspot.description',
    tagsKey: ['tags.mobile', 'tags.ios'],
    repo: 'https://github.com/carzygod/hotspot-app',
    featured: true,
  },
];
