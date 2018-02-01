
export class AppPage {
  id: string;
  title: string;
  pageDesc: string;
  componentName: string;
  pageUrl: string;
  menuType: string;
  queryStringType: string;
}


export class PageAccess {
  id: string;
  roleId: string;
  appPageId: string;
}

export class PropertyEnabledPage {
  id: string;
  propertyInformationId: string;
  appPageId: string;
}
