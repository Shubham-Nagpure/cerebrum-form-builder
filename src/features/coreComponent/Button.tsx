import { Button } from 'antd';

/**
 *
 * @returns Cerbrum Button Component
 */
export const CustomButton = () => {
  return (
    <div className="d-flex flex-column">
      <Button onClick={() => alert('This is click from the drop')}>Click me</Button>
    </div>
  );
};
