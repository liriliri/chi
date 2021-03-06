import './shell.js';
import { startApplication } from './RuntimeInstantiator.js';

Root.allDescriptors.push(
  ...[
    {
      name: 'inspector_main',
      extensions: [
        {
          type: 'early-initialization',
          className: 'InspectorMain.InspectorMain',
        },
        {
          type: 'action',
          category: 'Navigation',
          actionId: 'inspector_main.reload',
          className: 'InspectorMain.ReloadActionDelegate',
          iconClass: 'largeicon-refresh',
          title: 'Reload page',
          bindings: [
            {
              platform: 'windows,linux',
              shortcut: 'Ctrl+R',
            },
            {
              platform: 'windows,linux',
              shortcut: 'F5',
            },
            {
              platform: 'mac',
              shortcut: 'Meta+R',
            },
          ],
        },
        {
          type: 'action',
          category: 'Navigation',
          actionId: 'inspector_main.hard-reload',
          className: 'InspectorMain.ReloadActionDelegate',
          title: 'Hard reload page',
          bindings: [
            {
              platform: 'windows,linux',
              shortcut: 'Shift+Ctrl+R',
            },
            {
              platform: 'windows,linux',
              shortcut: 'Shift+F5',
            },
            {
              platform: 'windows,linux',
              shortcut: 'Ctrl+F5',
            },
            {
              platform: 'windows,linux',
              shortcut: 'Ctrl+Shift+F5',
            },
            {
              platform: 'mac',
              shortcut: 'Shift+Meta+R',
            },
          ],
        },
        {
          type: '@UI.ToolbarItem.Provider',
          className: 'InspectorMain.NodeIndicator',
          order: 2,
          location: 'main-toolbar-left',
        },
        {
          type: 'setting',
          category: 'Network',
          title: 'Force ad blocking on this site',
          settingName: 'network.adBlockingEnabled',
          settingType: 'boolean',
          storageType: 'session',
          defaultValue: false,
          options: [
            {
              value: true,
              title: 'Block ads on this site',
            },
            {
              value: false,
              title: 'Show ads on this site, if allowed',
            },
          ],
        },
        {
          type: 'setting',
          category: 'Global',
          title: 'Auto-open DevTools for popups',
          settingName: 'autoAttachToCreatedPages',
          settingType: 'boolean',
          order: 2,
          defaultValue: false,
          options: [
            {
              value: true,
              title: 'Auto-open DevTools for popups',
            },
            {
              value: false,
              title: 'Do not auto-open DevTools for popups',
            },
          ],
        },
        {
          type: 'setting',
          category: 'Global',
          title: 'Emulate a focused page',
          settingName: 'emulatePageFocus',
          settingType: 'boolean',
          storageType: 'session',
          order: 2,
          defaultValue: false,
          options: [
            {
              value: true,
              title: 'Emulate a focused page',
            },
            {
              value: false,
              title: 'Do not emulate a focused page',
            },
          ],
        },
        {
          type: 'setting',
          category: 'Appearance',
          title: "Don't show Chrome Data Saver warning",
          settingName: 'disableDataSaverInfobar',
          settingType: 'boolean',
          defaultValue: false,
        },
        {
          type: 'view',
          location: 'drawer-view',
          id: 'rendering',
          title: 'Rendering',
          persistence: 'closeable',
          order: 50,
          className: 'InspectorMain.RenderingOptionsView',
          tags: 'paint, layout, fps, CSS media type, CSS media feature, vision deficiency, color vision deficiency',
        },
      ],
      dependencies: ['components', 'mobile_throttling'],
      scripts: [],
      modules: ['inspector_main.js', 'inspector_main-legacy.js', 'RenderingOptions.js', 'InspectorMain.js'],
      resources: ['nodeIcon.css', 'renderingOptions.css'],
    },
    {
      name: 'profiler',
      extensions: [
        {
          type: 'view',
          location: 'drawer-view',
          id: 'live_heap_profile',
          title: 'Live Heap Profile',
          persistence: 'closeable',
          className: 'Profiler.LiveHeapProfileView',
          order: 100,
          experiment: 'liveHeapProfile',
        },
        {
          type: '@UI.ContextMenu.Provider',
          contextTypes: ['SDK.RemoteObject'],
          className: 'Profiler.HeapProfilerPanel',
        },
        {
          type: 'setting',
          category: 'Performance',
          title: 'High resolution CPU profiling',
          settingName: 'highResolutionCpuProfiling',
          settingType: 'boolean',
          defaultValue: true,
        },
        {
          type: 'setting',
          category: 'Performance',
          title: 'Show native functions in JS Profile',
          settingName: 'showNativeFunctionsInJSProfile',
          settingType: 'boolean',
          defaultValue: true,
        },
        {
          type: 'action',
          actionId: 'live-heap-profile.toggle-recording',
          iconClass: 'largeicon-start-recording',
          toggleable: true,
          toggledIconClass: 'largeicon-stop-recording',
          toggleWithRedColor: true,
          className: 'Profiler.LiveHeapProfileView.ActionDelegate',
          category: 'Memory',
          experiment: 'liveHeapProfile',
          options: [
            {
              value: true,
              title: 'Start recording heap allocations',
            },
            {
              value: false,
              title: 'Stop recording heap allocations',
            },
          ],
        },
        {
          type: 'action',
          actionId: 'live-heap-profile.start-with-reload',
          iconClass: 'largeicon-refresh',
          className: 'Profiler.LiveHeapProfileView.ActionDelegate',
          category: 'Memory',
          experiment: 'liveHeapProfile',
          title: 'Start recording heap allocations and reload the page',
        },
        {
          type: 'action',
          actionId: 'profiler.heap-toggle-recording',
          category: 'Memory',
          iconClass: 'largeicon-start-recording',
          title: 'Start/stop recording',
          toggleable: true,
          toggledIconClass: 'largeicon-stop-recording',
          toggleWithRedColor: true,
          contextTypes: ['Profiler.HeapProfilerPanel'],
          className: 'Profiler.HeapProfilerPanel',
          bindings: [
            {
              platform: 'windows,linux',
              shortcut: 'Ctrl+E',
            },
            {
              platform: 'mac',
              shortcut: 'Meta+E',
            },
          ],
        },
        {
          type: 'action',
          actionId: 'profiler.js-toggle-recording',
          category: 'JavaScript Profiler',
          title: 'Start/stop recording',
          iconClass: 'largeicon-start-recording',
          toggleable: true,
          toggledIconClass: 'largeicon-stop-recording',
          toggleWithRedColor: true,
          contextTypes: ['Profiler.JSProfilerPanel'],
          className: 'Profiler.JSProfilerPanel',
          bindings: [
            {
              platform: 'windows,linux',
              shortcut: 'Ctrl+E',
            },
            {
              platform: 'mac',
              shortcut: 'Meta+E',
            },
          ],
        },
      ],
      dependencies: ['components', 'perf_ui', 'data_grid', 'heap_snapshot_model', 'object_ui'],
      scripts: [],
      modules: [
        'profiler.js',
        'profiler-legacy.js',
        'ProfileHeader.js',
        'ProfilesPanel.js',
        'ProfileView.js',
        'ProfileDataGrid.js',
        'ProfileSidebarTreeElement.js',
        'BottomUpProfileDataGrid.js',
        'TopDownProfileDataGrid.js',
        'ChildrenProvider.js',
        'CPUProfileFlameChart.js',
        'CPUProfileView.js',
        'HeapProfileView.js',
        'HeapProfilerPanel.js',
        'HeapSnapshotProxy.js',
        'HeapSnapshotDataGrids.js',
        'HeapSnapshotGridNodes.js',
        'HeapSnapshotView.js',
        'HeapTimelineOverview.js',
        'IsolateSelector.js',
        'LiveHeapProfileView.js',
        'ProfileLauncherView.js',
        'ProfileTypeRegistry.js',
      ],
      resources: [
        'heapProfiler.css',
        'liveHeapProfile.css',
        'profileLauncherView.css',
        'profilesPanel.css',
        'profilesSidebarTree.css',
      ],
    },
    {
      name: 'coverage',
      extensions: [
        {
          type: '@SourceFrame.LineDecorator',
          className: 'Coverage.CoverageView.LineDecorator',
          decoratorType: 'coverage',
        },
        {
          type: 'action',
          actionId: 'coverage.toggle-recording',
          iconClass: 'largeicon-start-recording',
          toggleable: true,
          toggledIconClass: 'largeicon-stop-recording',
          toggleWithRedColor: true,
          className: 'Coverage.CoverageView.ActionDelegate',
          category: 'Performance',
          options: [
            {
              value: true,
              title: 'Instrument coverage',
            },
            {
              value: false,
              title: 'Stop instrumenting coverage and show results',
            },
          ],
        },
        {
          type: 'action',
          actionId: 'coverage.start-with-reload',
          iconClass: 'largeicon-refresh',
          className: 'Coverage.CoverageView.ActionDelegate',
          category: 'Performance',
          title: 'Start instrumenting coverage and reload page',
        },
      ],
      dependencies: ['sdk', 'ui', 'source_frame', 'data_grid', 'formatter'],
      scripts: [],
      modules: [
        'coverage.js',
        'coverage-legacy.js',
        'CoverageModel.js',
        'CoverageListView.js',
        'CoverageView.js',
        'CoverageDecorationManager.js',
      ],
      resources: ['coverageListView.css', 'coverageView.css'],
    },
  ]
);

startApplication('chii_app');
