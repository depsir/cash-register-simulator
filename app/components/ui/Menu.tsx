import React, { useState } from 'react';
import Button, { Variant } from '~/components/ui/Button';

interface MenuConfig {
  label?: string;
  icon?: string;
  action?: () => void;
  component?: React.ComponentType<{ onBack: () => void; onReset: () => void }>;
  customElement?: React.ReactNode; // New property for directly rendering a custom element
  children?: MenuConfig[];
}

interface MenuProps {
  config: MenuConfig[];
  onBack?: () => void;
  onReset?: () => void;
}

const Menu: React.FC<MenuProps> = ({ config, onBack, onReset }) => {
  const [menuPath, setMenuPath] = useState<number[]>([]);
  const [ActiveComponent, setActiveComponent] = useState<React.ComponentType<{ onBack: () => void; onReset: () => void }> | null>(null);

  const getCurrentMenu = (): MenuConfig[] => {
    return menuPath.reduce((currentMenu, index) => currentMenu[index].children || [], config);
  };

  const handleNavigate = (menu: MenuConfig, index: number) => {
    if (menu.component) {
      setActiveComponent(() => menu.component);
    } else if (menu.children) {
      setMenuPath([...menuPath, index]);
    } else if (menu.action) {
      menu.action();
    }
  };

  const handleBack = () => {
    if (ActiveComponent) {
      setActiveComponent(null);
    } else if (menuPath.length > 0) {
      setMenuPath(menuPath.slice(0, -1));
    } else if (onBack) {
      onBack();
    }
  };

  const handleReset = () => {
    setActiveComponent(null);
    setMenuPath([]);
    if (onReset) {
      onReset();
    }
  };

  return (
    <div>
      {ActiveComponent ? (
        <div className="menu-component">
          <ActiveComponent onBack={handleBack} onReset={handleReset} />
        </div>
      ) : (
        <div>
          <div className="menu-header">
            {menuPath.length > 0 && (
              <Button variant={Variant.FULL} onClick={handleBack} icon="back">
                Indietro
              </Button>
            )}
          </div>
          <div className="flex flex-col h-full overflow-auto gap-1">
            {getCurrentMenu().map((item, index) => (
              <div key={index}>
                {item.customElement ? (
                  <div>{item.customElement}</div> // Render the custom element directly
                ) : (
                  <Button
                    variant={Variant.FULL}
                    onClick={() => handleNavigate(item, index)}
                    icon={item.icon}
                  >
                    {item.label}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;