export interface IRoute {
  path: string;
  exact?: boolean;
  page: JSX.Element;
}
