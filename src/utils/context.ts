interface Routes {
  home: string;
  jobs: string;
  noFound?: string;
}

export const routerHashDOM: Routes = { home: "#/", jobs: "#/jobs" };
export const routerDOM: Routes = {
  home: "/",
  jobs: "/jobs",
  noFound: "/No_found",
};

interface SocialNetworks {
  discor: string;
  linkedin: string;
  github: string;
  steam: string;
}

export const socialNetworks: SocialNetworks = {
  steam: "https://steamcommunity.com/profiles/76561198806125215",
  discor: "https://discord.com/channels/@edwynguzman",
  linkedin: "https://www.linkedin.com/in/edwyn-guzman-95324632b",
  github: "https://github.com/edwynG",
};

interface Database {
  name: string;
  registers: string[];
  version: number;
}

export const backendData: Database = {
  name: "order-now",
  version: 1,
  registers: ["Jobs"],
};
