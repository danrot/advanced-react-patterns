// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
const ToggleContext = React.createContext<{on: boolean, toggle: () => void} | undefined>(undefined);
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
// 💰 the default value should be `undefined`
// 🦺 the typing for the context value should be `{on: boolean; toggle: () => void}`
// but because we must initialize it to `undefined`, you need to union that with `undefined`

function useToggle() {
  const context = React.useContext(ToggleContext);

  if (!context) {
	  throw new Error('ToggleContext required');
  }

  return context;
}

function Toggle({children}: {children: React.ReactNode}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 💣 remove this and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it. Render children
  // within the provider.
  // return <>TODO...</>
  return <ToggleContext.Provider value={{on, toggle}}>
	{children}
  </ToggleContext.Provider>;
}

function ToggleOn({children}: {children: React.ReactNode}) {
  // 🐨 instead of this constant value, we'll need to get that from
  // React.useContext(ToggleContext)
  // 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
  const {on} = useToggle();
  return <>{on ? children : null}</>
}

function ToggleOff({children}: {children: React.ReactNode}) {
  // 🐨 do the same thing to this that you did to the ToggleOn component
  const {on} = useToggle();
  return <>{on ? null : children}</>
}

function ToggleButton(
  props: Omit<React.ComponentProps<typeof Switch>, 'on' | 'onClick'>,
) {
  // 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
  const {on, toggle} = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
