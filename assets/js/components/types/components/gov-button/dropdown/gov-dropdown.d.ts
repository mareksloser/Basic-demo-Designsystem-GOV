import { EventEmitter } from "../../../stencil-public-runtime";
import { PositionType } from "./constants";
import { DropdownEvent } from "./gov-dropdown.types";
export declare class GovDropdown {
  private h;
  private readonly listId;
  private readonly controlId;
  constructor();
  host: HTMLGovButtonElement;
  /**
   * Dropdown open state
   */
  open: boolean;
  /**
   * Menu display position
   */
  readonly position: PositionType;
  /**
   * Emitted when the dropdown change state
   */
  govChange: EventEmitter<DropdownEvent>;
  componentWillLoad(): void;
  get trigger(): HTMLGovButtonElement;
  get list(): HTMLUListElement;
  render(): any;
  /**
   * Returns the current state of the dropdown
   */
  getState(): Promise<boolean>;
  /**
   * Sets the dropdown state
   */
  setOpen(state: boolean): Promise<void>;
}
