import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { MenuContextProvider } from './contexts/MenuContext';

export function App() {
  return (
    <MenuContextProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </MenuContextProvider>
  )
}