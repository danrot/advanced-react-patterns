// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.tsx

import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  function getTogglerProps<Props>({onClick, ...props}: {onClick?: React.DOMAttributes<HTMLButtonElement>['onClick']} & Props) {
		return {
			'aria-pressed': on,
			onClick: (event: any) => {
				onClick?.(event);
				toggle();
			},
			...props,
		};
  }

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // return {on, toggle, togglerProps: {'aria-pressed': on, onClick: toggle}}
  return {
	  on,
	  toggle,
	  getTogglerProps,
  };
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button {...getTogglerProps({'aria-label': 'custom-button', onClick: () => console.log('info')})}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
