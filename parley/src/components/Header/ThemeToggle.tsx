import { IonToggle } from '@ionic/react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const [checked, setChecked] = useState(prefersDark.matches);

  // Listen for the toggle check/uncheck to toggle the dark class on the <body>
  const handleToggle = (shouldCheck) => {
    document.body.classList.toggle('dark', shouldCheck);
    setChecked(shouldCheck);
  };
  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addListener((e) => handleToggle(e.matches));

  return (
    <IonToggle
      id="themetoggle"
      checked={checked}
      onIonChange={e => handleToggle(e.detail.checked)}/>
  );
}

export default ThemeToggle