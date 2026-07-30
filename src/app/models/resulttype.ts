export type Success<T> = { kind: 'success', value: T };
export type Failure<E> = { kind: 'failure', error: E };
export type Result<T, E> = Success<T> | Failure<E>;
