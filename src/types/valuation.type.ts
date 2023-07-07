import {VALUATION_STATE_OPTIONS} from "../constants/valuation.constant";

type ValuationStateKeys = keyof typeof VALUATION_STATE_OPTIONS;
export type ValuationState = typeof VALUATION_STATE_OPTIONS[ValuationStateKeys];