import * as moment from "moment";
import { TimeProviderInterface } from "./TimeProviderInterface";

export class RealTimeProvider2 implements TimeProviderInterface
{
    getDay(): number
    {
        return moment().day();
    }
}
