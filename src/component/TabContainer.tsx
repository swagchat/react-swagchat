import * as React from 'react';
import Typography from 'material-ui/Typography';

export interface TabContainerProps {
  children: string | React.ReactNode;
  dir: string;
}

export function TabContainer(props: TabContainerProps) {
  const { children, dir } = props;
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}