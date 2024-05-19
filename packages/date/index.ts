import { Result, ValueObject } from 'rich-domain';
import { TimeZones } from './types';

const DateFormats = {
	'DD-MM-YYYY': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: null },
	'MM-DD-YYYY': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: null },
	'DD-MM-YY': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: null },
	'MM-DD-YY': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: null },

	'MM/DD/YYYY': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: null },
	'MM/DD/YY': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: null },
	'DD/MM/YYYY': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: null },
	'DD/MM/YY': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: null },

	'YYYY-DD-MM': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: null },
	'YYYY-MM-DD': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: null },
	'YYYY/MM/DD': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: null },
	'YYYY/DD/MM': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: null },

	// with time 12h
	'DD/MM/YYYY hh:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'DD-MM-YYYY hh:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'DD/MM/YY hh:mm:ss': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'DD-MM-YY hh:mm:ss': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'MM/DD/YYYY hh:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'MM-DD-YYYY hh:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'MM/DD/YY hh:mm:ss': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'MM-DD-YY hh:mm:ss': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },

	// with time 24h
	'DD/MM/YYYY HH:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'DD-MM-YYYY HH:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'DD/MM/YY HH:mm:ss': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'DD-MM-YY HH:mm:ss': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'MM/DD/YYYY HH:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'MM-DD-YYYY HH:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'MM/DD/YY HH:mm:ss': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'MM-DD-YY HH:mm:ss': { date: { year: '2-digit', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },

	// manual
	'YYYY/DD/MM hh:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'YYYY-DD-MM hh:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'YYYY/MM/DD hh:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },
	'YYYY-MM-DD hh:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } },

	'YYYY/DD/MM HH:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'YYYY-DD-MM HH:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'YYYY/MM/DD HH:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
	'YYYY-MM-DD HH:mm:ss': { date: { year: 'numeric', month: '2-digit', day: '2-digit' }, time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } },
}

type DateFormat = keyof typeof DateFormats;

type FormatParams = { date: Intl.DateTimeFormatOptions; time: Intl.DateTimeFormatOptions | null };

export class Dates extends ValueObject<Date> {
	protected static readonly MESSAGE: string = 'Invalid date value';
	private readonly ONE_DAY: number = 86400000;
	private readonly ONE_HOUR: number = 3600000;
	private readonly ONE_MINUTE: number = 60000;
	private readonly ONE_MONTH: number = 2678400000;
	private readonly ONE_WEEK: number = 604800000;
	private readonly ONE_YEAR: number = 31622400000;

	private constructor(props: Date) {
		super(props);
	}

	/**
	 * @returns instance value as Date
	 */
	value(): Date {
		return this.props;
	}

	/**
	 *
	 * @param days to be added
	 * @returns Date with updated value
	 */
	addDays(days: number): Dates {
		return new Dates(this.util.date(this.props).add(days).days());
	}

	/**
	 *
	 * @param months to be added
	 * @returns Date with updated value
	 */
	addMonths(months: number): Dates {
		return new Dates(this.util.date(this.props).add(months).months());
	}

	/**
	 *
	 * @param hours to be added
	 * @returns Date with updated value
	 */
	addHours(hours: number): Dates {
		return new Dates(this.util.date(this.props).add(hours).hours());
	}

	/**
	 *
	 * @param minutes to be added
	 * @returns Date with updated value
	 */
	addMinutes(minutes: number): Dates {
		return new Dates(this.util.date(this.props).add(minutes).minutes());
	}

	/**
	 *
	 * @param weeks to be added
	 * @returns Date with updated value
	 */
	addWeeks(weeks: number): Dates {
		return new Dates(this.util.date(this.props).add(weeks).weeks());
	}

	/**
	 *
	 * @param years to be added
	 * @returns Date with updated value
	 */
	addYears(years: number): Dates {
		return new Dates(this.util.date(this.props).add(years).years());
	}

	/**
	 *
	 * @param days to be subtracted
	 * @returns Date with updated value
	 */
	subtractDays(days: number): Dates {
		return new Dates(this.util.date(this.props).remove(days).days());
	}

	/**
	 *
	 * @param months to be subtracted
	 * @returns Date with updated value
	 */
	subtractMonths(months: number): Dates {
		return new Dates(this.util.date(this.props).remove(months).months());
	}

	/**
	 *
	 * @param hours to be subtracted
	 * @returns Date with updated value
	 */
	subtractHours(hours: number): Dates {
		return new Dates(this.util.date(this.props).remove(hours).hours());
	}

	/**
	 *
	 * @param minutes to be subtracted
	 * @returns Date with updated value
	 */
	subtractMinutes(minutes: number): Dates {
		return new Dates(this.util.date(this.props).remove(minutes).minutes());
	}

	/**
	 *
	 * @param weeks to be subtracted
	 * @returns instance Date with updated value
	 */
	subtractWeeks(weeks: number): Dates {
		return new Dates(this.util.date(this.props).remove(weeks).weeks());
	}

	/**
	 *
	 * @param years to be subtracted
	 * @returns instance DateValueObject with updated value
	 */
	subtractYears(years: number): Dates {
		return new Dates(this.util.date(this.props).remove(years).years());
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInDays(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_DAY;
			const dateTime = date.getTime() / this.ONE_DAY;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInDays(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInHours(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_HOUR;
			const dateTime = date.getTime() / this.ONE_HOUR;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInHours(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInMinutes(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_MINUTE;
			const dateTime = date.getTime() / this.ONE_MINUTE;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInMinutes(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInMonths(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_MONTH;
			const dateTime = date.getTime() / this.ONE_MONTH;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInMonths(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInYears(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_YEAR;
			const dateTime = date.getTime() / this.ONE_YEAR;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInYears(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInWeeks(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_WEEK;
			const dateTime = date.getTime() / this.ONE_WEEK;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInWeeks(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param format pattern to be applied
	 * @returns formatted date as string
	 */
	format(format: DateFormat, timeZone?: TimeZones): string {
		const firstChars = format.slice(0, 2);
		const dateLocale = firstChars === 'DD' ? 'pt-BR' : 'en-US';
		const formatDate = (date: Date, formats: FormatParams) => {

			const locale = (format.slice(0, 2) === 'YY') ? 'sv-SE' : undefined;
			const year = (format.includes('YYYY')) ? 'numeric' : '2-digit';

			const dateFn = new Intl.DateTimeFormat(locale || dateLocale, {
				...formats.date,
				year,
				timeZone
			}).format(date);

			if (formats.time) {
				const timeFn = new Intl.DateTimeFormat(dateLocale, {
					...formats.time,
					timeZone
				}).format(date);
				return { dateFn, timeFn }
			}

			return { dateFn, timeFn: '' };
		};
		const result = formatDate(this.props, DateFormats[format] as FormatParams);

		const applySeparator = (date: string): string => {
			if (format.includes('/')) return this.util.string(date).replace('-').to('/');
			if (format.includes('-')) return this.util.string(date).replace('/').to('-');
			return date;
		}
		return applySeparator(`${result.dateFn} ${result.timeFn}`.trim());
	}

	public static isValidProps(value: Date): boolean {
		return this.validator.isDate(value);
	}

	public static isValid(value: Date): boolean {
		return this.validator.isDate(value);
	}

	/**
	 *
	 * @param date optional value as date.
	 * If provide It will be checked, If It not be provided instance value will be considered
	 * @returns true if date day is week day [Monday-Friday]
	 */
	isWeekday(): boolean {
		return !this.isWeekend()
	}

	/**
	 *
	 * @param date optional value as date.
	 * If provide It will be checked, If It not be provided instance value will be considered
	 * @returns true if date day is weekend day [Sat-Sunday]
	 */
	isWeekend(): boolean {
		return this.validator.date(this.props).isWeekend();
	}

	/**
	 *
	 * @param date value as date.
	 * If provide It will be checked, If It not be provided instance value will be considered
	 * @returns true if date day is week day [Monday-Friday]
	 */
	public static isWeekday(date: Date): boolean {
		return !this.isWeekend(date);
	}

	/**
	 *
	 * @param date value as date.
	 * If provide It will be checked, If It not be provided instance value will be considered
	 * @returns true if date day is weekend day [Sat-Sunday]
	 */
	public static isWeekend(date: Date): boolean {
		return this.validator.date(date).isWeekend();
	}

	/**
	 *
	 * @param date as Date
	 * @returns true or false. True if instance date is greater than provided value
	 * @example
	 *
	 * const date = new Date("1989-05-31 11:42:00");
	 *
	 * const valueObj = DateValueObject.create(date).value();
	 *
	 * const isAfter = valueObj.isAfter(new Date());
	 *
	 * console.log(isAfter);
	 *
	 * > false
	 *
	 * ...
	 */
	isAfter(date: Date | Dates): boolean {
		if (date instanceof Date) {
			return this.validator.date(this.props).isAfterThan(date);
		}
		if (date instanceof Dates) {
			return this.isAfter(date.value());
		}
		return false;
	}

	/**
	 *
	 * @param date as Date
	 * @returns true or false. True if instance date is less than provided value
	 * @example
	 *
	 * const date = new Date("1989-05-31 11:42:00");
	 *
	 * const valueObj = DateValueObject.create(date).value();
	 *
	 * const isBefore = valueObj.isBefore(new Date());
	 *
	 * console.log(isBefore);
	 *
	 * > true
	 *
	 * ...
	 */
	isBefore(date: Date | Dates): boolean {
		if (date instanceof Date) {
			return this.validator.date(this.props).isBeforeThan(date);
		}
		if (date instanceof Dates) {
			return this.isBefore(date.value());
		}
		return false;
	}

	/**
	 *
	 * @param date as Date
	 * @returns true or false. True if instance date is equal to provided value
	 */
	isEqualDate(date: Date | Dates): boolean {
		if (date instanceof Date) {
			const time = date.getTime();
			const instanceTime = this.props.getTime();
			return this.validator.number(time).isEqualTo(instanceTime);
		}
		if (date instanceof Dates) {
			return this.isEqualDate(date.value());
		}
		return false;
	}

	/**
	 * 
	 * @param value value as string
	 * @returns instance of Dates or throw an error
	 */
	public static init(value?: Date): Dates {
		if (!value) return new Dates(new Date());
		const isValidValue = Dates.isValidProps(value);
		if (!isValidValue) throw new Error(Dates.MESSAGE);
		return new Dates(value);
	}

	public static create(date?: Date): Result<Dates> {
		const value = date ?? new Date();
		const isValid = Dates.isValidProps(value);
		if (!isValid) return Result.fail(Dates.MESSAGE);

		return Result.Ok(new Dates(value));
	}
}

export default Dates;
