import { ILogger } from "./Interfaces/ILogger";

//this class might have dependencies on files or network
class SimpleLogger implements ILogger
{
    info(text: string)
    {
    }
}
