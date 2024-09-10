import { IComplicatedLogger } from "./Interfaces/IComplicatedLogger";

// this real logger might have file or network dependencies
export class RealComplicatedLogger implements IComplicatedLogger
{
    debug(text: string, obj: any)
    {
    }

    error(text: string, location: string, stacktrace: string)
    {
    }

    info(text: string)
    {
    }

    warn(text: string)
    {
    }

}
