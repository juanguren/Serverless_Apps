export default interface AcceptedData {
    content: object[] | string | number | boolean;
    instructions: Instructions
}

interface Instructions {
    keyName?: string;
    overwrite?: boolean | undefined;
    timeToLive?: number | Date | undefined;
}