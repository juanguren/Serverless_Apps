import { events } from '@serverless/cloud';
import { EventEmitter } from 'events';

/**
 * Option 1: Go ahead with Node's native event emitter
 * Option 2: Re-make this using cloud's events
 */

// ! Does this make sense? I'm instantiating the EventBus class just like a normal EventEmitter

export default class EventBus {
  private bus: EventEmitter;

  constructor() {
    this.bus = new EventEmitter();
  }

  emit(eventName: string, data: any) {
    this.bus.emit(eventName, data);
  }

  listen(eventName: string, callback: any) {
    this.bus.on(eventName, callback);
  }
}
