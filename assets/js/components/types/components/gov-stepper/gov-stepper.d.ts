import { EventEmitter } from '../../stencil-public-runtime';
import { StepperSizesType } from './constants';
import { GovStepperItemChangeEvent } from './gov-stepper-item.d';
export declare class GovStepper {
  private h;
  constructor();
  readonly host: HTMLGovStepperElement;
  /**
   * Size of stepper
   */
  readonly size?: StepperSizesType;
  /**
   * Called when the Stepper state changes
   */
  govChange: EventEmitter<GovStepperItemChangeEvent>;
  validateSize(newValue: string): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  render(): any;
}
