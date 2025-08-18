import styles from "./TabList.module.css";
import React, { type JSX } from "react";
import { useState, type FC, type ReactElement } from "react";
import type { TabItemProps } from "./TabItem";
import TabItem from "./TabItem";

export type TabKey = "rel" | "abs" | "now";

interface TabsListProps {
  children: JSX.Element | JSX.Element[];
  defaultActive?: TabKey;
  onAbsTabClick?: () => void;
}

const TabList: FC<TabsListProps> = ({
  children,
  defaultActive = "abs",
  onAbsTabClick,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(defaultActive);

  const tabs = React.Children.toArray(children).filter(
    (child): child is ReactElement<TabItemProps> =>
      React.isValidElement(child) && child.type === TabItem
  );

  return (
    <div className={styles.tabs}>
      <nav className={styles.tabListWrapper}>
        <ul
          className={styles.tabList}
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabs.map((tab) => {
            const id = tab.props.id;
            const isActive = activeTab === id;
            return (
              <li key={`tab-${id}`}>
                <button
                  role="tab"
                  id={`tab-${id}`}
                  aria-controls={`panel-${id}`}
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveTab(id);
                    if (id === "abs") onAbsTabClick?.();
                  }}
                  className={`tab-btn ${isActive ? "tab-btn--active" : ""}`}
                >
                  {tab.props.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {tabs.map((tab) => {
        const id = tab.props.id;
        const isActive = activeTab === id;
        return (
          <div
            key={`panel-${id}`}
            role="tabpanel"
            id={`panel-${id}`}
            aria-labelledby={`tab-${id}`}
            hidden={!isActive}
          >
            {tab.props.children}
          </div>
        );
      })}
    </div>
  );
};

export default TabList;
