export class Language {
  constructor() { }
  displayName: string;
  lang: string;
}


export class ZipCode {
  id: string;
  code: string;
  city: string;
  province: string;
  county: string;
  countryCode: string;
  latitude: string;
  longitude: string;
  constructor() { }
}

export class Country {
  id: string;
  code: string;
  title: string;
  continentCode: string;
  isLookupEnabled: boolean;
  isSupportCounty: boolean;
  isSupportProvince: boolean;
  isSupportZip: boolean;
  constructor() { }
}


export class ziplookupData {
  zip_code: string;
  lat: string;
  lng: string;
  city: string;
  state: string
  constructor() { }
}


export class SecurityQuestions {

  id: string;
  question: string;
  constructor() { }
}

