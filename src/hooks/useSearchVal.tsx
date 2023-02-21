import { useOutletContext } from 'react-router-dom';
import { HeaderOutletContext } from 'src/layouts/SidebarLayout';

export function useSearchVal() {
  return useOutletContext<HeaderOutletContext>();
}
