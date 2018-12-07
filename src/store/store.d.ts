declare interface ApplicationState {
  linodes: {
    data: Linode[];
    loading: boolean;
    error?: Error;
  }
  authentication: { token?: string },
}

