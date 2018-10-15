export class Device {
  constructor(
    public id: number,
    public code: String,
    public systemId: number,
    public brandId: number,
    public shopId: number,
    public type: String,
    public systemVersion: String,
    public brandName: String,
    public shopName: String,
  ) {}
}
