import { useState } from 'react';
import { DraggableBox } from './DraggableBox';
import { IWidget } from '../types';

export const ComponentManager = ({
  componentTypes,
  zoomLevel
}: {
  componentTypes: IWidget[];
  zoomLevel: number;
}) => {
  const [filteredComponents, setFilteredComponents] =
    useState<Array<IWidget>>(componentTypes);

  const renderComponentCard = (component: IWidget, index: number) => {
    return (
      <>
        <DraggableBox index={index} component={component} zoomLevel={zoomLevel} />
      </>
    );
  };

  const renderList = (header: string, items: IWidget[]) => {
    // if (isEmpty(items)) return null;
    return (
      <>
        <span className="m-1 widget-header">{header}</span>
        {items.map((component, i) => renderComponentCard(component, i))}
      </>
    );
  };
  const segregateSections = () => {
    type TCommonSection = {
      title: string;
      items: IWidget[];
    };
    const commonSection: TCommonSection = {
      title: 'commonly used',
      items: []
    };

    const commonItems: string[] = ['Button', 'Form'];

    filteredComponents.forEach(f => {
      if (commonItems.includes(f.name)) commonSection.items.push(f);
    });
    return <>{renderList(commonSection.title, commonSection.items)}</>;
  };

  const filterComponentBySearch = (search: string) => {
    if (search) {
      setFilteredComponents(filteredComponents);
    }
  };

  return (
    <div className="components-container mx-3">
      <div className="input-icon">
        <input
          type="text"
          className="form-control mt-3 mb-2 "
          placeholder={'Search'}
          data-cy="widget-search-box"
          onChange={event => filterComponentBySearch(event.target.value)}
        />
      </div>
      <div className="widgets-list m-0 col-sm-12 col-lg-12 row">
        {segregateSections()}
      </div>
    </div>
  );
};
