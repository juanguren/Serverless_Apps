export interface AcceptedData {
  content: any;
  instructions: Instructions;
}

interface Instructions {
  keyName?: string;
  overwrite?: boolean | undefined;
  timeToLive?: number | Date | undefined;
}

export enum DataAction {
  CREATE = 'Item succesfully stored',
  UPDATE = 'Record updated',
}
