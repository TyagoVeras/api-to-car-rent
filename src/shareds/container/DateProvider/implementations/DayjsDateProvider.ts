import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider{
  private convertDateToUtc = (date: Date) => dayjs(date).utc().local().format();

  compareInHours(dateStart: Date, dateEnd: Date): number {
    return dayjs(this.convertDateToUtc(dateStart)).diff(this.convertDateToUtc(dateEnd), 'hours')

  }

}

export { DayjsDateProvider }