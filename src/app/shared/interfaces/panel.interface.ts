export interface ILink {
  text: string;
  img?: string;
  href?: string;
  rout?: string;
}


export interface IPanel {
  pTitle: string;
  pText?: string;
  pList?: Array<ILink>;
}

export interface IPanelFilter {
  name: string;
  criteria: Array<{ active: boolean, name: string }>;
  id?: string;
}
