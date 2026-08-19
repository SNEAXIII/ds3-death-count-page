// Babel Standalone utilise par défaut le runtime JSX "automatic", qui émet des
// `import` — impossible dans des scripts classiques. On enregistre donc un
// preset qui force le runtime "classic" (React.createElement).
Babel.registerPreset('react-classic', {
  presets: [[Babel.availablePresets.react, { runtime: 'classic' }]]
});
