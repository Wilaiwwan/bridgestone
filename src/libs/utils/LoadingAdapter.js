import _ from "lodash";

class LoadingAdapter {
  static getInitialState(payload = {}) {
    return {
      isLoading: false,
      isSuccess: false,
      isFailure: false,
      error: null,
      ...payload,
    };
  }

  static clearAsyncState(state) {
    state.isLoading = false;
    state.isSuccess = false;
    state.isFailure = false;
    state.error = null;
  }

  static request(state) {
    state.isLoading = true;
    state.isSuccess = false;
    state.isFailure = false;
    state.error = null;
    return state;
  }

  static success(state, payload, keyName = "data") {
    state.isLoading = false;
    state.isSuccess = true;
    state.isFailure = false;
    state[keyName] = payload;
    return state;
  }

  static failure(state, error, keyName = "error") {
    state.isLoading = false;
    state.isSuccess = false;
    state.isFailure = true;
    state[keyName] = error;
    return state;
  }

  static applyAsyncBuilder = _.curry(
    (
      asyncAction,
      builder,
      [successKey, errorKey] = ["data", "error"],
      { mergePrevStateOnSuccess } = { mergePrevStateOnSuccess: false }
    ) => {
      let onRequest = () => { };
      let onSuccess = () => { };
      let onFailure = () => { };

      builder.addCase(asyncAction.pending, (state, action) => {
        const newState = LoadingAdapter.request(state, action);
        onRequest(newState);
      });
      builder.addCase(asyncAction.fulfilled, (state, action) => {
        const newState = LoadingAdapter.success(
          state,
          action.payload,
          successKey
        );

        if (mergePrevStateOnSuccess) {
          if (Array.isArray(state[successKey])) {
            newState[successKey] = _.concat(state[successKey], action.payload);
          } else if (typeof state[successKey] === "object") {
            newState[successKey] = { ...state[successKey], ...action.payload };
          }
        }
        onSuccess(newState, action);
      });
      builder.addCase(asyncAction.rejected, (state, action) => {
        const newState = LoadingAdapter.failure(state, action.error, errorKey);
        onFailure(newState, action);
      });

      const listernerCallback = {
        onRequest: (callback) => {
          onRequest = callback;
          return listernerCallback;
        },
        onSuccess: (callback) => {
          onSuccess = callback;
          return listernerCallback;
        },
        onFailure: (callback) => {
          onFailure = callback;
          return listernerCallback;
        },
        addCase: builder.addCase,
      };

      return listernerCallback;
    }
  );
}

export default LoadingAdapter;
