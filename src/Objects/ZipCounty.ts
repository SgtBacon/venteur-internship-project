export interface IZipCounty {
  id: string;
  zip: string;
  city: string;
  state: string;
  county: string;
}

export class ZipCounty {
  public data: IZipCounty;
  constructor(data: IZipCounty) {
    this.data = data;
  }

  get id(): string {
    return this.data.id;
  }
  get zip(): string {
    return this.data.zip;
  }
  get city(): string {
    return this.data.city;
  }
  get state(): string {
    return this.data.state;
  }
  get county(): string {
    return this.data.county;
  }
}
