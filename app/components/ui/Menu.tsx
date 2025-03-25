import React, { useState } from 'react';
import Button from '~/components/ui/Button';

interface MenuConfig {
  label: string;
  icon: string;
  action?: () => void;
  component?: React.ComponentType<{ onBack: () => void; onReset: () => void }>;
  children?: MenuConfig[];
}

interface MenuProps {
  config: MenuConfig[];
  onBack?: () => void;
  onReset?: () => void;
}

const Menu: React.FC<MenuProps> = ({ config, onBack, onReset }) => {
  const [currentMenu, setCurrentMenu] = useState<MenuConfig[] | null>(config);
  const [previousMenus, setPreviousMenus] = useState<MenuConfig[][]>([]);
  const [ActiveComponent, setActiveComponent] = useState<React.ComponentType<{ onBack: () => void; onReset: () => void }> | null>(null);

  const handleNavigate = (menu: MenuConfig) => {
    if (menu.component) {
      setPreviousMenus([...previousMenus, currentMenu!]);
      setCurrentMenu(null);
      setActiveComponent(() => menu.component);
    } else if (menu.children) {
      setPreviousMenus([...previousMenus, currentMenu!]);
      setCurrentMenu(menu.children);
    } else if (menu.action) {
      menu.action();
    }
  };

  const handleBack = () => {
    if (ActiveComponent) {
      setActiveComponent(null);
      const lastMenu = previousMenus.pop();
      setCurrentMenu(lastMenu || null);
      setPreviousMenus([...previousMenus]);
    } else if (previousMenus.length > 0) {
      const lastMenu = previousMenus.pop();
      setCurrentMenu(lastMenu || null);
      setPreviousMenus([...previousMenus]);
    } else if (onBack) {
      onBack();
    }
  };

  const handleReset = () => {
    setActiveComponent(null);
    setCurrentMenu(config);
    setPreviousMenus([]);
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
            {previousMenus.length > 0 && (
              <Button onClick={handleBack} icon="back">
                Indietro
              </Button>
            )}
          </div>
          <div className="menu-content">
            {currentMenu?.map((item, index) => (
              <div key={index}>
                <Button
                  onClick={() => handleNavigate(item)}
                  icon={item.icon}
                >
                  {item.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;