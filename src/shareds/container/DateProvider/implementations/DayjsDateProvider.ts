import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'day').toDate();
  }

  private convertDateToUtc = (date: Date) => dayjs(date).utc().local().format();

  compareInDays(dateAnd: Date, dateStart: Date): number {
    return dayjs(this.convertDateToUtc(dateAnd)).diff(this.convertDateToUtc(dateAnd), 'days');
  }

  compareInHours(dateStart: Date, dateEnd: Date): number {
    return dayjs(this.convertDateToUtc(dateStart)).diff(this.convertDateToUtc(dateEnd), 'hours');
  }
}

export { DayjsDateProvider };
