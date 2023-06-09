export abstract class IMapper<I, O> {
  abstract mapCrcaAllFrom(param: I | I[]): O | O[];
  abstract mapCrcaAllTo(param: O | O[]): I | I[];
  abstract mapPersonaByCiFrom(param: I | I[]): O | O[];
  // abstract mapCrcaAllTo(param: O | O[]): I | I[];
}