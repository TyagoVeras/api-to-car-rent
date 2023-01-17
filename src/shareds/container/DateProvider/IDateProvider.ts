interface IDateProvider {
  compareInHours(dateStart: Date, dateEnd: Date): number;
}

export { IDateProvider }