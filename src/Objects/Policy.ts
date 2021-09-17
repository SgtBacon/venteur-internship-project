export interface IPolicy {
  id: string;
  zipCountyId: string;
  carrierName: string;
  term: string;
  minBenefitAmount: number;
  maxBenefitAmount: number;
  annualPremiumRate: number;
}
export class Policy {
  private data: IPolicy;

  constructor(data: IPolicy) {
    this.data = data;
  }
  get id(): string {
    return this.data.id;
  }
  get zipCountyId(): string {
    return this.data.zipCountyId;
  }
  get carrierName(): string {
    return this.data.carrierName;
  }
  get term(): string {
    return this.data.term;
  }
  get minBenefitAmount(): number {
    return this.data.minBenefitAmount;
  }
  get maxBenefitAmount(): number {
    return this.data.maxBenefitAmount;
  }
  get annualPremiumRate(): number {
    return this.data.annualPremiumRate;
  }
}
