import { useState } from 'react';
import { DraggableBox } from './DraggableBox';
import { IWidget } from '../types';

/**
 * ComponentManager
 *
 * Description: This compoenent return compoenets library in side bar which
 * has all the component that need to drag
 */
export const ComponentManager = ({
  componentTypes,
  zoomLevel
}: {
  componentTypes: IWidget[];
  zoomLevel: number;
}) => {
  /**
   * It filter the component base on the search text
   */
  const [filteredComponents, setFilteredComponents] =
    useState<Array<IWidget>>(componentTypes);

  /**
   *
   * @param component - IWiget configuration of component
   * @param index - index of component from array
   * @returns DraggableBox as draggable component
   */
  const renderComponentCard = (component: IWidget, index: number) => {
    return (
      <>
        <DraggableBox index={index} component={component} zoomLevel={zoomLevel} />
      </>
    );
  };

  /**
   *
   * @param header Type of component
   * @param items IWiget configuration of component with universal properties
   * @returns JSX of DraggableBox
   */
  const renderList = (header: string, items: IWidget[]) => {
    // if (isEmpty(items)) return null;
    return (
      <>
        <span className="m-1 widget-header">{header}</span>
        {items.map((component, i) => renderComponentCard(component, i))}
      </>
    );
  };

  /**
   * Function define the logic which use to segregate the component by section
   * @returns JSX of DraggableBox
   */
  const segregateSections = () => {
    type TCommonSection = {
      title: string;
      items: IWidget[];
    };
    const commonSection: TCommonSection = {
      title: 'commonly used',
      items: []
    };

    /**
     * Need to define list of section of component
     */
    const commonItems: string[] = ['Button', 'Form'];

    /**
     * Filter compoenent as per search text
     */
    filteredComponents.forEach(f => {
      if (commonItems.includes(f.name)) commonSection.items.push(f);
    });
    return <>{renderList(commonSection.title, commonSection.items)}</>;
  };

  /**
   *
   * @param search search text - component that need to search
   */
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
