import { h, Component } from 'preact';
import { withStateHandlers } from 'recompose';

export const withTabState = withStateHandlers(() => ({ currTab: null }), {
  setTab: () => (tabId) => ({ currTab: tabId })
});
