import type { ReactNode } from "react";
import type { TabKey } from "./TabList";

export interface TabItemProps {
  label: string;
  children: ReactNode;
  id: TabKey;
}

const TabItem: React.FC<TabItemProps> = ({ label, children }) => (
  <div
    className="tab-panel"
    role="tabpanel"
    aria-labelledby={`tab-${label}`}
    id={`panel-${label}`}
  >
    {children}
  </div>
);

export default TabItem;
