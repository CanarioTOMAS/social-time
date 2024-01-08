import { Wheater } from "../entities/wheater";

export abstract class IWheater {
    abstract getByDay(date:Date):Promise<Wheater | null>;
}