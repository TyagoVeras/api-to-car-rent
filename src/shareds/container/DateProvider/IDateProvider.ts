interface IDateProvider {
  compareInHours(dateStart: Date, dateEnd: Date): number;
  compareInDays(dateAnd: Date, dateStart: Date): number;
  addDays(days: number): Date;
}

export { IDateProvider };
